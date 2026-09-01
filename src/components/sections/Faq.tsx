import Link from "next/link";
import { Plus } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { faqs } from "@/content/faq";

/**
 * Native <details>/<summary> accordion: keyboard accessible and open-by-default
 * for search engines and printing, with zero JavaScript.
 */
export default function Faq() {
  return (
    <Section id="faq">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="Questions"
              title="Answered"
              highlight="honestly"
              description="The things almost every client asks before we begin. If yours is not here, just ask."
            />
            <Reveal delay={180}>
              <Link
                href="/contact"
                className="btn-ghost mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-ash-100"
              >
                Ask us anything
              </Link>
            </Reveal>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={faq.question} delay={i * 45}>
                <details className="group glass overflow-hidden rounded-2xl transition-colors duration-500 open:border-brand-500/25">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5 p-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[0.95rem] font-medium leading-relaxed text-ash-100 transition-colors group-hover:text-brand-200">
                      {faq.question}
                    </h3>
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 text-brand-300 transition-all duration-500 group-open:rotate-45 group-open:border-brand-500/50 group-open:bg-brand-500/10">
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-sm leading-relaxed text-ash-400">
                    {faq.answer}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
