import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms under which ${site.name} provides design and development services.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: false },
};

/** TEMPLATE - have a legal advisor review before launch. */
const sections = [
  {
    heading: "Scope of work",
    body: "Each project is governed by a written proposal that sets out deliverables, timeline and price. That proposal, once accepted, takes precedence over anything stated on this website.",
  },
  {
    heading: "Payments",
    body: "Unless a proposal states otherwise, projects are invoiced 40% on commencement, 30% at design approval and 30% before launch. Invoices are payable within 14 days. Work may pause on overdue invoices.",
  },
  {
    heading: "Changes to scope",
    body: "Requests beyond the agreed scope are quoted separately before any work begins. We will always tell you when a request crosses that line rather than absorbing it silently and adjusting the timeline.",
  },
  {
    heading: "Client responsibilities",
    body: "Timely feedback, content and access to necessary accounts are needed to keep to schedule. Delays in these shift the timeline correspondingly.",
  },
  {
    heading: "Intellectual property",
    body: "On receipt of final payment, ownership of all custom code, design files and assets created for the project transfers to you. Third-party libraries, fonts and services remain under their own licences, which we will identify.",
  },
  {
    heading: "Warranty and support",
    body: "We correct defects in our work free of charge for 30 days after launch. This does not cover changes in scope, third-party service failures, or issues arising from modifications made by others.",
  },
  {
    heading: "Limitation of liability",
    body: "Our total liability in connection with a project is limited to the fees paid for it. We are not liable for indirect or consequential losses, including lost profits or data.",
  },
  {
    heading: "Confidentiality",
    body: "We treat your business information as confidential and will sign your NDA on request. We may reference the project in our portfolio only with your written permission.",
  },
  {
    heading: "Termination",
    body: "Either party may end an engagement with 14 days written notice. You pay for work completed to that point, and we hand over everything produced so far.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of"
        highlight="Service"
        description="The commercial terms we work under. Anything agreed in a signed proposal takes precedence over what is written here."
        breadcrumbs={[{ label: "Terms" }]}
      />

      <Section className="pt-0">
        <Container>
          <div className="glass max-w-3xl rounded-3xl p-8 sm:p-12">
            <p className="mb-10 rounded-xl border border-accent-400/25 bg-accent-400/[0.07] p-4 text-sm text-accent-200">
              Template notice: these terms are a starting point and are not legal
              advice. Have them reviewed and adapted to your jurisdiction before
              the site goes live.
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
              Questions? Write to{" "}
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
