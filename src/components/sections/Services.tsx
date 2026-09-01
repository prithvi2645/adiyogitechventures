import Link from "next/link";
import {
  ArrowUpRight,
  Clapperboard,
  Globe,
  Layers,
  Megaphone,
  Palette,
  Shield,
  ShoppingBag,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Spotlight from "@/components/ui/Spotlight";
import { services } from "@/content/services";

export const serviceIcons: Record<string, LucideIcon> = {
  globe: Globe,
  layers: Layers,
  smartphone: Smartphone,
  palette: Palette,
  shopping: ShoppingBag,
  shield: Shield,
  megaphone: Megaphone,
  clapperboard: Clapperboard,
};

export default function Services() {
  return (
    <Section id="services">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Six ways we can"
          highlight="serve you"
          description="Whether you need a website that finally does your business justice, or a product that does not exist yet, the work starts the same way - by understanding what you are actually trying to achieve."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon] ?? Globe;

            return (
              <Reveal key={service.slug} delay={i * 70}>
                <Spotlight className="halo-card glass group relative h-full overflow-hidden rounded-2xl">
                  <Link
                    href={`/services/${service.slug}`}
                    className="relative z-10 flex h-full flex-col p-7"
                  >
                    <div className="mb-6 flex items-start justify-between">
                      <span className="relative grid h-14 w-14 place-items-center rounded-xl border border-brand-500/25 bg-gradient-to-br from-brand-500/20 to-transparent">
                        <Icon className="h-6 w-6 text-brand-300" />
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 rounded-xl opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                          style={{ background: "rgba(52,187,182,0.35)" }}
                        />
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-ash-500 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300" />
                    </div>

                    <span className="mb-2 block font-display text-sm italic tracking-wide text-accent-400/80">
                      {service.sanskrit}
                    </span>

                    <h3 className="mb-3 font-display text-2xl leading-snug text-ash-50">
                      {service.title}
                    </h3>

                    <p className="mb-6 flex-1 text-sm leading-relaxed text-ash-400">
                      {service.short}
                    </p>

                    <div className="mt-auto space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {service.stack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[10px] text-ash-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs">
                        <span className="text-ash-500">
                          {service.startingAt ? (
                            <>
                              From{" "}
                              <span className="text-ash-200">
                                {service.startingAt}
                              </span>
                            </>
                          ) : (
                            "Quoted per project"
                          )}
                        </span>
                        <span className="text-ash-500">{service.timeline}</span>
                      </div>
                    </div>
                  </Link>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={140}>
          <p className="mt-12 text-center text-sm text-ash-400">
            Not sure which one you need?{" "}
            <Link
              href="/contact"
              className="link-grow text-brand-300 hover:text-brand-200"
            >
              Book a free 30-minute call
            </Link>{" "}
            and we will tell you honestly.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
