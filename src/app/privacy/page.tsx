import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your information.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: false },
};

/**
 * TEMPLATE - review with a legal advisor before launch, and update it to match
 * the analytics, hosting and third-party services you actually run.
 */
const sections = [
  {
    heading: "What we collect",
    body: "When you submit our contact form we collect the name, email address, phone number, company, service interest, budget, timeline and message you provide. Our hosting provider records standard server logs, including IP address and browser type, for security and reliability purposes.",
  },
  {
    heading: "Why we collect it",
    body: "We use your contact details solely to respond to your enquiry, prepare a proposal, and communicate about a project. We do not use them for unrelated marketing unless you have separately asked to hear from us.",
  },
  {
    heading: "How long we keep it",
    body: "Enquiry emails are retained for up to 24 months so we can refer back to earlier conversations. If a project proceeds, related records are kept for as long as is necessary for contractual and tax purposes.",
  },
  {
    heading: "Who we share it with",
    body: "We do not sell your data. We share it only with the service providers needed to operate this site and communicate with you - currently our hosting provider (Vercel), our transactional email provider (Resend), and our error-monitoring provider (Sentry). Each processes data on our instructions.",
  },
  {
    heading: "Cookies and analytics",
    body: "This site sets no advertising or tracking cookies. We use Vercel Analytics and Vercel Speed Insights, which are cookie-free: they record aggregate page views and page-load timings, and do not follow you across other websites or build a profile of you.",
  },
  {
    heading: "Your rights",
    body: `You may ask us to provide a copy of the personal data we hold about you, correct it, or delete it. Write to ${site.contact.email} and we will respond within 30 days.`,
  },
  {
    heading: "Error monitoring",
    body: "When something on this site breaks, a diagnostic report is sent to Sentry so we can fix it. It contains the error, the page it happened on and your browser version. We do not enable session recording, and the form fields you type are not captured.",
  },
  {
    heading: "Security",
    body: "Traffic to this site is encrypted in transit. Access to enquiry data is limited to the people who need it to respond to you. No system is perfectly secure, but we take reasonable and current measures to protect your information.",
  },
  {
    heading: "Changes to this policy",
    body: "We may update this policy as our services change. The date below reflects the most recent revision.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        highlight="Policy"
        description="What we collect, why we collect it, and what you can ask us to do about it."
        breadcrumbs={[{ label: "Privacy" }]}
      />

      <Section className="pt-0">
        <Container>
          <div className="glass max-w-3xl rounded-3xl p-8 sm:p-12">
            <p className="mb-10 rounded-xl border border-accent-400/25 bg-accent-400/[0.07] p-4 text-sm text-accent-200">
              Template notice: this policy is a starting point. Have it reviewed
              by a legal advisor and updated to reflect the services you
              actually use before the site goes live.
            </p>

            <div className="space-y-9">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="mb-3 font-display text-2xl text-ash-50">
                    {section.heading}
                  </h2>
                  <p className="text-sm leading-relaxed text-ash-300">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            <p className="mt-12 border-t border-white/[0.07] pt-6 text-xs text-ash-500">
              Questions about this policy? Write to{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="text-brand-300 hover:text-brand-200"
              >
                {site.contact.email}
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
