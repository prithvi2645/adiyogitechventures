import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Section";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import Values from "@/components/sections/Values";
import Process from "@/components/sections/Process";
import Cta from "@/components/sections/Cta";
import { Trishul } from "@/components/background/Yantra";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Adiyogi Tech Ventures is a web and app studio building digital products with craft, honesty and care. Learn what we stand for and how we work.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A studio named after"
        highlight="the first teacher"
        description="Adiyogi is the first yogi - the one who, having found something worth knowing, gave the method away rather than guarding it. We are a technology studio, not a spiritual one, but that posture is the one we try to keep."
        breadcrumbs={[{ label: "About" }]}
      />

      <Section className="pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <article className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
                <Trishul className="pointer-events-none absolute -right-10 top-0 h-full text-brand-500/[0.05]" />

                <div className="relative space-y-6 text-base leading-relaxed text-ash-300">
                  <h2 className="font-display text-3xl text-ash-50">
                    Why we exist
                  </h2>
                  <p>
                    Most businesses have been burned by a website or an app at
                    least once. A quote that grew, a launch that slipped, a
                    developer who stopped replying, a beautiful design that
                    turned out to be unusable on a phone. We started this studio
                    because that experience is so common it has become normal,
                    and it should not be.
                  </p>
                  <p>
                    We work differently in three ways that matter. We tell you
                    what a project will really cost before it starts, in writing.
                    We show you the work every week on a live link, so nothing is
                    a surprise at the end. And we hand over everything - code,
                    designs, accounts, domains - so that if you ever want to
                    leave, you can, without asking permission.
                  </p>

                  <h2 className="pt-4 font-display text-3xl text-ash-50">
                    How we think about craft
                  </h2>
                  <p>
                    A website is not a brochure and an app is not a feature list.
                    Both are tools someone picks up while trying to get something
                    done, usually in a hurry, often on a mediocre connection. So
                    speed is not a technical nicety to us, it is respect for the
                    person on the other side. Accessibility is not a checkbox, it
                    is the difference between a customer and a lost one.
                  </p>
                  <p>
                    That is why every build ships with a performance budget,
                    keyboard and screen reader testing, and a monitoring setup
                    that tells us something is broken before your customers do.
                  </p>

                  <h2 className="pt-4 font-display text-3xl text-ash-50">
                    Who we work with
                  </h2>
                  <p>
                    Founders who need a first product. Established businesses
                    whose website has quietly fallen behind. Non-profits who need
                    to be trusted at a glance. Teams who have a designer but no
                    engineers, or engineers but no design. If you know what you
                    want to change about your business, we can usually help you
                    build the thing that changes it.
                  </p>
                </div>
              </article>
            </Reveal>

            <aside className="space-y-6">
              {site.stats.length > 0 && (
              <Reveal delay={90}>
                <div className="glass rounded-3xl p-8">
                  <h2 className="mb-6 font-display text-2xl text-ash-50">
                    By the numbers
                  </h2>
                  <dl className="space-y-6">
                    {site.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="border-b border-white/[0.06] pb-5 last:border-0 last:pb-0"
                      >
                        <dd className="font-display text-4xl text-sacred">
                          <Counter
                            value={stat.value}
                            suffix={
                              "suffix" in stat ? (stat.suffix as string) : ""
                            }
                          />
                        </dd>
                        <dt className="mt-1 text-xs uppercase tracking-[0.14em] text-ash-500">
                          {stat.label}
                        </dt>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
              )}

              <Reveal delay={160}>
                <div className="glass rounded-3xl p-8">
                  <h2 className="mb-4 font-display text-2xl text-ash-50">
                    The name
                  </h2>
                  <p className="text-sm leading-relaxed text-ash-400">
                    <span className="text-brand-300">Adi</span> means first.{" "}
                    <span className="text-brand-300">Yogi</span> means one who has
                    attained union - who has made the many into one. It is a high
                    bar for a technology studio, and we do not claim to have
                    cleared it. We just like being reminded, every time we open
                    the laptop, that the work is meant to bring things together:
                    design and engineering, business and craft, what you asked
                    for and what you actually needed.
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>

      <Values />
      <Process />
      <Cta />
    </>
  );
}
