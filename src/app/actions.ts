"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactSchema, type ContactInput, type ContactState } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/content/site";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function clientIdentifier() {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    h.get("cf-connecting-ip") ||
    "unknown";
  return `contact:${ip}`;
}

function buildEmailHtml(data: ContactInput) {
  const row = (label: string, value?: string) =>
    value
      ? `<tr>
           <td style="padding:10px 16px;border-bottom:1px solid #eceef3;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
           <td style="padding:10px 16px;border-bottom:1px solid #eceef3;color:#111827;font-size:14px;">${escapeHtml(value)}</td>
         </tr>`
      : "";

  return `<!doctype html>
<html><body style="margin:0;background:#f5f6f9;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:640px;margin:32px auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
    <div style="background:linear-gradient(135deg,#168da1,#15376b);padding:22px 24px;">
      <div style="color:#eafbf9;font-size:11px;letter-spacing:.22em;text-transform:uppercase;">New Enquiry</div>
      <div style="color:#ffffff;font-size:20px;font-weight:600;margin-top:4px;">${escapeHtml(site.name)}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone || undefined)}
      ${row("Company", data.company || undefined)}
      ${row("Service", data.service)}
      ${row("Budget", data.budget || undefined)}
      ${row("Timeline", data.timeline || undefined)}
    </table>
    <div style="padding:18px 24px;">
      <div style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.12em;margin-bottom:8px;">Message</div>
      <div style="color:#111827;font-size:14px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
    </div>
    <div style="padding:14px 24px;background:#fafbfc;border-top:1px solid #eceef3;color:#9ca3af;font-size:12px;">
      Sent from the website contact form on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
    </div>
  </div>
</body></html>`;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
    };
  }

  const data = parsed.data;

  // Honeypot tripped - pretend it worked so bots do not retry.
  if (data.website) {
    return { status: "success", message: "Thank you. We will be in touch." };
  }

  const limit = rateLimit(await clientIdentifier());
  if (!limit.success) {
    return {
      status: "error",
      message:
        "You have sent several enquiries recently. Please email us directly at " +
        site.contact.email +
        ".",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  // No mail provider configured (local dev / preview) - log and succeed so the
  // UI can still be exercised end to end.
  if (!apiKey || !to || !from) {
    console.warn(
      "[contact] Mail not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.",
      { name: data.name, email: data.email, service: data.service },
    );
    return {
      status: "success",
      message:
        "Thank you. Your enquiry was received (mail delivery is not configured in this environment).",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: `New enquiry: ${data.service} - ${data.name}`,
      html: buildEmailHtml(data),
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return {
        status: "error",
        message: `Something went wrong sending your message. Please email us at ${site.contact.email}.`,
      };
    }

    return {
      status: "success",
      message:
        "Thank you. Your enquiry has reached us and we will reply within one working day.",
    };
  } catch (err) {
    console.error("[contact] Unexpected error", err);
    return {
      status: "error",
      message: `Something went wrong. Please email us directly at ${site.contact.email}.`,
    };
  }
}
