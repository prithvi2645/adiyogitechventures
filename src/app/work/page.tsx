import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Spotlight from "@/components/ui/Spotlight";
import Cta from "@/components/sections/Cta";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Case studies from websites, web applications, mobile apps and e-commerce builds - with the outcomes that followed.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Built, launched,"
        highlight="and still running"
        description={
          projects.length > 0
            ? "Every project here is a real business problem that got smaller. Open any one to read what was broken, what we did, and what changed."
            : "We are preparing our case studies for publication. In the meantime, tell us what you are building and we will walk you through the relevant work directly."
        }
        breadcrumbs={[{ label: "Work" }]}
      />

      <Section className="pt-0">
        <Container>
          {projects.length === 0 ? (
            <Reveal>
              <div className="glass mx-auto max-w-2xl rounded-3xl p-10 text-center sm:p-14">
                <h2 className="font-display text-2xl text-ash-50 sm:text-3xl">
                  Case studies coming soon
                </h2>
                <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ash-400">
                  We would rather publish nothing than publish work we cannot
                  attribute. Written case studies are being prepared with our
                  clients&rsquo; permission. Ask us and we will take you through
                  what we have built.
                </p>
                <Link
                  href="/contact"
                  className="btn-sacred mt-9 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-white"
                >
                  Talk to us about your project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 60}>
                <Spotlight className="halo-card glass group h-full overflow-hidden rounded-3xl">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(70% 100% at 20% 0%, ${project.accent}20 0%, transparent 60%)`,
                    }}
                  />

                  <Link
                    href={`/work/${project.slug}`}
                    className="relative z-10 flex h-full flex-col p-8"
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <span
                        className="rounded-full px-3 py-1 text-[11px] font-medium"
                        style={{
                          backgroundColor: `${project.accent}1a`,
                          color: project.accent,
                        }}
                      >
                        {project.category}
                      </span>
                      <span className="text-xs text-ash-500">{project.year}</span>
                    </div>

                    <h2 className="mb-3 font-display text-3xl text-ash-50 transition-colors duration-500 group-hover:text-brand-200">
                      {project.title}
                    </h2>

                    <p className="mb-7 flex-1 text-sm leading-relaxed text-ash-400">
                      {project.summary}
                    </p>

                    {project.metrics.length > 0 ? (
                      <div className="mb-6 grid grid-cols-3 gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                        {project.metrics.map((m) => (
                          <div key={m.label}>
                            <div
                              className="font-display text-xl"
                              style={{ color: project.accent }}
                            >
                              {m.value}
                            </div>
                            <div className="mt-0.5 text-[9px] uppercase tracking-wide text-ash-500">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <span className="mt-auto inline-flex items-center gap-2 text-sm text-brand-300">
                      Read case study
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Spotlight>
              </Reveal>
            ))}
          </div>
          )}
        </Container>
      </Section>

      <Cta />
    </>
  );
}
