import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, Globe } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Spotlight from "@/components/ui/Spotlight";
import Cta from "@/components/sections/Cta";
import { serviceIcons } from "@/components/sections/Services";
import { services, getService } from "@/content/services";
import { processSteps } from "@/content/process";
import { site } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${site.name}`,
      description: service.short,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const Icon = serviceIcons[service.icon] ?? Globe;
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: "Worldwide",
    // `offers` is included only when there is a real figure. Google requires a
    // price or priceSpecification on an Offer, so an empty one is worse than none.
    ...(service.startingAt
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            description: `Starting at ${service.startingAt}`,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHero
        eyebrow={service.sanskrit}
        title={service.title}
        description={service.short}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <Section className="pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            {/* ---------- Main ---------- */}
            <div className="space-y-6">
              <Reveal>
                <div className="glass rounded-3xl p-8 sm:p-10">
                  <span className="mb-6 grid h-14 w-14 place-items-center rounded-xl border border-brand-500/25 bg-gradient-to-br from-brand-500/20 to-transparent">
                    <Icon className="h-6 w-6 text-brand-300" />
                  </span>
                  <h2 className="mb-4 font-display text-3xl text-ash-50">
                    What this actually means
                  </h2>
                  <p className="text-base leading-relaxed text-ash-300">
                    {service.description}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={70}>
                <div className="glass rounded-3xl p-8 sm:p-10">
                  <h2 className="mb-6 font-display text-3xl text-ash-50">
                    What you get
                  </h2>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {service.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm text-ash-300"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="glass rounded-3xl p-8 sm:p-10">
                  <h2 className="mb-7 font-display text-3xl text-ash-50">
                    How we deliver it
                  </h2>
                  <ol className="space-y-5">
                    {processSteps.map((step) => (
                      <li key={step.number} className="flex gap-5">
                        <span className="font-display text-3xl leading-none text-brand-500/30">
                          {step.number}
                        </span>
                        <div>
                          <h3 className="font-display text-xl text-ash-100">
                            {step.title}
                          </h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-ash-400">
                            {step.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>

            {/* ---------- Sidebar ---------- */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal delay={100}>
                <div className="glass rounded-3xl p-8">
                  <dl className="space-y-6">
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-ash-500">
                        {service.startingAt ? "Starting at" : "Pricing"}
                      </dt>
                      <dd className="mt-1 font-display text-4xl text-sacred">
                        {service.startingAt ?? "On request"}
                      </dd>
                      <p className="mt-2 text-xs text-ash-500">
                        {service.startingAt
                          ? "Final quote after a free scoping call."
                          : "Scope drives the number, so we quote after a free 30-minute call rather than guessing."}
                      </p>
                    </div>

                    <div className="thread-divider" />

                    <div>
                      <dt className="mb-2.5 text-xs uppercase tracking-wider text-ash-500">
                        Technology
                      </dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {service.stack.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[11px] text-ash-300"
                          >
                            {t}
                          </span>
                        ))}
                      </dd>
                    </div>

                    <div className="grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-5">
                      {service.outcomes.map((o) => (
                        <div key={o.label}>
                          <div className="text-sm text-brand-300">{o.value}</div>
                          <div className="mt-0.5 text-[10px] uppercase tracking-wide text-ash-500">
                            {o.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </dl>

                  <Link
                    href="/contact"
                    className="btn-sacred group mt-8 flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-medium text-white"
                  >
                    Enquire about this
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </aside>
          </div>

          {/* ---------- Other services ---------- */}
          <div className="mt-20">
            <Reveal>
              <h2 className="mb-8 font-display text-3xl text-ash-50">
                You might also need
              </h2>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-3">
              {others.map((other, i) => {
                const OtherIcon = serviceIcons[other.icon] ?? Globe;
                return (
                  <Reveal key={other.slug} delay={i * 70}>
                    <Spotlight className="halo-card glass h-full rounded-2xl">
                      <Link
                        href={`/services/${other.slug}`}
                        className="group relative z-10 block h-full p-7"
                      >
                        <div className="mb-5 flex items-start justify-between">
                          <OtherIcon className="h-6 w-6 text-brand-300" />
                          <ArrowUpRight className="h-4 w-4 text-ash-500 transition-colors group-hover:text-brand-300" />
                        </div>
                        <h3 className="mb-2 font-display text-xl text-ash-50">
                          {other.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-ash-400">
                          {other.short}
                        </p>
                      </Link>
                    </Spotlight>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Cta />
    </>
  );
}
