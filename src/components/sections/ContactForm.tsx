"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { submitContact } from "@/app/actions";
import {
  budgetOptions,
  serviceOptions,
  type ContactState,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

const fieldBase =
  "w-full rounded-xl border bg-white/[0.025] px-4 py-3.5 text-sm text-ash-100 placeholder:text-ash-500 transition-colors duration-300 focus:border-brand-500/60 focus:bg-white/[0.04] focus:outline-none";

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-ash-500">
        {label}
        {required ? <span className="ml-1 text-brand-400">*</span> : null}
      </span>
      {children}
      {error ? (
        <span className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </span>
      ) : null}
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-sacred group flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-medium text-white disabled:pointer-events-none disabled:opacity-70 sm:w-auto sm:px-10"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Sending your message
        </>
      ) : (
        <>
          Send enquiry
          <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </>
      )}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Clear the form after a successful send and move focus to the confirmation
  // so screen reader users are told what happened.
  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      statusRef.current?.focus();
    }
  }, [state.status]);

  const err = (field: keyof NonNullable<ContactState["errors"]>) =>
    state.errors?.[field];

  const borderFor = (field: keyof NonNullable<ContactState["errors"]>) =>
    err(field) ? "border-red-500/50" : "border-white/[0.09]";

  return (
    <div className="glass rounded-3xl p-7 sm:p-10">
      {/* Live region: announces success and failure without a page change */}
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={cn(
          "mb-7 flex items-start gap-3 rounded-xl border p-4 text-sm outline-none",
          state.status === "idle" && "hidden",
          state.status === "success" &&
            "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
          state.status === "error" &&
            "border-red-500/30 bg-red-500/10 text-red-200",
        )}
      >
        {state.status === "success" ? (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
        ) : (
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        )}
        <span>{state.message}</span>
      </div>

      <form ref={formRef} action={formAction} className="space-y-5" noValidate>
        {/* Honeypot - hidden from humans, irresistible to bots */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label>
            Do not fill this in
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name" error={err("name")} required>
            <input
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Priya Sharma"
              className={cn(fieldBase, borderFor("name"))}
            />
          </Field>

          <Field label="Email" error={err("email")} required>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="priya@company.com"
              className={cn(fieldBase, borderFor("email"))}
            />
          </Field>

          <Field label="Phone" error={err("phone")}>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              className={cn(fieldBase, borderFor("phone"))}
            />
          </Field>

          <Field label="Company" error={err("company")}>
            <input
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Company name"
              className={cn(fieldBase, borderFor("company"))}
            />
          </Field>
        </div>

        <Field label="What do you need?" error={err("service")} required>
          <select
            name="service"
            defaultValue=""
            className={cn(fieldBase, borderFor("service"), "cursor-pointer")}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {serviceOptions.map((o) => (
              <option key={o} value={o} className="bg-night">
                {o}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Budget range" error={err("budget")}>
            <select
              name="budget"
              defaultValue=""
              className={cn(fieldBase, borderFor("budget"), "cursor-pointer")}
            >
              <option value="" className="bg-night">
                Prefer not to say
              </option>
              {budgetOptions.map((o) => (
                <option key={o} value={o} className="bg-night">
                  {o}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Tell us about the project" error={err("message")} required>
          <textarea
            name="message"
            rows={6}
            placeholder="What are you building, who is it for, and what does success look like? Rough thoughts are fine."
            className={cn(fieldBase, borderFor("message"), "resize-y")}
          />
        </Field>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <SubmitButton />
          <p className="text-xs leading-relaxed text-ash-500 sm:max-w-[16rem] sm:text-right">
            We reply within one working day. Your details are never shared or
            sold.
          </p>
        </div>
      </form>
    </div>
  );
}
