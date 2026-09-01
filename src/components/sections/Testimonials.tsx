import { Quote, Star } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/content/testimonials";

export default function Testimonials() {
  // Hidden until real, attributable quotes exist in src/content/testimonials.ts.
  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonials">
      <Container>
        <SectionHeading
          eyebrow="In their words"
          title="What our clients"
          highlight="say"
          description="The measure of the work is whether it made someone's business easier to run."
        />

        {/* Masonry-style columns so quotes of different lengths sit naturally */}
        <div className="mt-16 gap-6 sm:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.company} delay={i * 60} className="mb-6 break-inside-avoid">
              <figure className="glass halo-card relative overflow-hidden rounded-2xl p-7">
                <Quote
                  aria-hidden="true"
                  className="absolute -right-2 -top-2 h-20 w-20 text-brand-500/[0.07]"
                />

                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-accent-400 text-accent-400" />
                  ))}
                </div>

                <blockquote className="relative text-sm leading-relaxed text-ash-200">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand-500/25 bg-gradient-to-br from-brand-500/25 to-transparent font-display text-sm text-brand-200">
                    {t.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-ash-100">
                      {t.name}
                    </span>
                    <span className="block truncate text-xs text-ash-500">
                      {t.role}, {t.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
