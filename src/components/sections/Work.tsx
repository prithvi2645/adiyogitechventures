import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Spotlight from "@/components/ui/Spotlight";
import { featuredProjects } from "@/content/projects";

export default function Work() {
  // Nothing to show until real case studies land in src/content/projects.ts.
  // Rendering the heading over an empty grid, with a "View all work" button
  // leading to an empty page, would be worse than omitting the section.
  if (featuredProjects.length === 0) return null;

  return (
    <Section id="work">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Selected work"
            title="Products that earned"
            highlight="their keep"
            description="A few projects where the numbers moved, not just the pixels."
            className="max-w-2xl"
          />
          <Reveal delay={120}>
            <Link
              href="/work"
              className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-ash-100"
            >
              View all work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 space-y-6">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <Spotlight className="halo-card glass group relative overflow-hidden rounded-3xl">
                {/* Project accent wash */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(80% 120% at 12% 0%, ${project.accent}22 0%, transparent 62%)`,
                  }}
                />

                <Link
                  href={`/work/${project.slug}`}
                  className="relative z-10 grid gap-8 p-8 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:p-10"
                >
                  <div>
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-xs">
                      <span
                        className="rounded-full px-3 py-1 font-medium"
                        style={{
                          backgroundColor: `${project.accent}1a`,
                          color: project.accent,
                        }}
                      >
                        {project.category}
                      </span>
                      <span className="text-ash-500">{project.year}</span>
                    </div>

                    <h3 className="font-display text-3xl text-ash-50 transition-colors duration-500 group-hover:text-brand-200 sm:text-4xl">
                      {project.title}
                    </h3>

                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-ash-400">
                      {project.summary}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[10px] text-ash-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <span className="mt-7 inline-flex items-center gap-2 text-sm text-brand-300">
                      Read the case study
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.07] lg:grid-cols-1">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="bg-white/[0.02] px-5 py-5 text-center lg:text-left"
                      >
                        <div
                          className="font-display text-2xl sm:text-3xl"
                          style={{ color: project.accent }}
                        >
                          {metric.value}
                        </div>
                        <div className="mt-1 text-[10px] uppercase tracking-wider text-ash-500">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </Link>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
