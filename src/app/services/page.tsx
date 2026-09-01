import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Globe } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Spotlight from "@/components/ui/Spotlight";
import Cta from "@/components/sections/Cta";
import { serviceIcons } from "@/components/sections/Services";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website design and development, web applications, mobile apps, UI/UX design, e-commerce and ongoing maintenance. Clear scope, honest pricing, code you own.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything you need to"
        highlight="ship it well"
        description="Six services, one team. Most clients start with one and grow into two or three, because the same people who designed it also built it and still maintain it."
        breadcrumbs={[{ label: "Services" }]}
      />

      <Section className="pt-0">
        <Container>
          <div className="space-y-6">
            {services.map((service, i) => {
              const Icon = serviceIcons[service.icon] ?? Globe;

              return (
                <Reveal key={service.slug} delay={i * 50}>
                  <Spotlight className="halo-card glass overflow-hidden rounded-3xl">
                    <div className="relative z-10 grid gap-10 p-8 lg:grid-cols-[1.35fr_1fr] lg:p-10">
                      <div>
                        <div className="mb-6 flex items-center gap-4">
                          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-brand-500/25 bg-gradient-to-br from-brand-500/20 to-transparent">
                            <Icon className="h-6 w-6 text-brand-300" />
                          </span>
                          <div>
                            <span className="block font-display text-sm italic text-accent-400/80">
                              {service.sanskrit}
                            </span>
                            <h2 className="font-display text-3xl text-ash-50">
                              {service.title}
                            </h2>
                          </div>
                        </div>

                        <p className="mb-7 max-w-2xl text-sm leading-relaxed text-ash-300">
                          {service.description}
                        </p>

                        <ul className="grid gap-2.5 sm:grid-cols-2">
                          {service.deliverables.map((d) => (
                            <li
                              key={d}
                              className="flex items-start gap-2.5 text-sm text-ash-400"
                            >
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                              {d}
                            </li>
                          ))}
                        </ul>

                        <Link
                          href={`/services/${service.slug}`}
                          className="btn-ghost mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-ash-100"
                        >
                          Full details
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>

                      <aside className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7">
                        <dl className="space-y-5 text-sm">
                          <div>
                            <dt className="text-xs uppercase tracking-wider text-ash-500">
                              {service.startingAt ? "Starting at" : "Pricing"}
                            </dt>
                            <dd className="mt-1 font-display text-2xl text-brand-300">
                              {service.startingAt ?? "Quoted per project"}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs uppercase tracking-wider text-ash-500">
                              Typical timeline
                            </dt>
                            <dd className="mt-1 text-ash-200">
                              {service.timeline}
                            </dd>
                          </div>
                          <div>
                            <dt className="mb-2 text-xs uppercase tracking-wider text-ash-500">
                              Stack
                            </dt>
                            <dd className="flex flex-wrap gap-1.5">
                              {service.stack.map((t) => (
                                <span
                                  key={t}
                                  className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[10px] text-ash-400"
                                >
                                  {t}
                                </span>
                              ))}
                            </dd>
                          </div>
                        </dl>

                        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-5">
                          {service.outcomes.map((o) => (
                            <div key={o.label}>
                              <div className="text-sm text-ash-100">
                                {o.value}
                              </div>
                              <div className="mt-0.5 text-[10px] uppercase tracking-wide text-ash-500">
                                {o.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </aside>
                    </div>
                  </Spotlight>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Cta />
    </>
  );
}
