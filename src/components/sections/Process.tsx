import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { processSteps } from "@/content/process";

export default function Process() {
  return (
    <Section id="process" className="overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A path, walked"
          highlight="together"
          description="No black boxes, no month-long silences. You see the product take shape every week, and you can change your mind while changing it is still cheap."
        />

        <div className="relative mt-20">
          {/* The thread of light running down the centre of the path */}
          <div
            aria-hidden="true"
            className="absolute left-[27px] top-4 hidden h-[calc(100%-2rem)] w-px lg:left-1/2 lg:block lg:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(52,187,182,0.5) 8%, rgba(147,231,224,0.45) 50%, rgba(52,187,182,0.5) 92%, transparent)",
            }}
          />

          <ol className="space-y-10 lg:space-y-0">
            {processSteps.map((step, i) => {
              const isLeft = i % 2 === 0;

              return (
                <li key={step.number} className="relative lg:min-h-[13rem]">
                  <Reveal delay={i * 60}>
                    <div
                      className={[
                        "relative lg:grid lg:grid-cols-2 lg:gap-16",
                        isLeft ? "" : "lg:[direction:rtl]",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "glass halo-card rounded-2xl p-7 [direction:ltr]",
                          isLeft ? "lg:text-right" : "",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "mb-4 flex items-center gap-3",
                            isLeft ? "lg:justify-end" : "",
                          ].join(" ")}
                        >
                          <span className="font-display text-5xl leading-none text-brand-500/25">
                            {step.number}
                          </span>
                          <div className={isLeft ? "lg:text-right" : ""}>
                            <div className="font-display text-sm italic text-accent-400/80">
                              {step.sanskrit}
                            </div>
                            <h3 className="font-display text-2xl text-ash-50">
                              {step.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-sm leading-relaxed text-ash-400">
                          {step.description}
                        </p>

                        <div
                          className={[
                            "mt-5 flex flex-wrap items-center gap-2 text-[11px]",
                            isLeft ? "lg:justify-end" : "",
                          ].join(" ")}
                        >
                          <span className="rounded-full border border-brand-500/25 bg-brand-500/10 px-3 py-1 text-brand-300">
                            {step.duration}
                          </span>
                          <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-ash-400">
                            {step.deliverable}
                          </span>
                        </div>
                      </div>

                      {/* Node on the thread */}
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-400/60 bg-void lg:block"
                      >
                        <span className="absolute inset-[3px] rounded-full bg-brand-400 shadow-[0_0_14px_2px_rgba(52,187,182,0.75)]" />
                      </span>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
