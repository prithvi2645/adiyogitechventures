import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Cta from "@/components/sections/Cta";
import { projects, getProject } from "@/content/projects";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Only the slugs above exist; anything else is a 404 served statically, rather
// than a serverless render that would just call notFound() anyway.
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Case study not found" };

  return {
    title: `${project.title} - Case Study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} | ${site.name}`,
      description: project.summary,
      url: `/work/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const sections = [
    { heading: "The challenge", body: project.challenge },
    { heading: "Our approach", body: project.approach },
    { heading: "The result", body: project.result },
  ];

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        description={project.summary}
        breadcrumbs={[
          { label: "Work", href: "/work" },
          { label: project.title },
        ]}
      />

      <Section className="pt-0">
        <Container>
          {/* Metrics band. Hidden entirely when a project has no measured
              figures yet, rather than rendering empty panels. */}
          {project.metrics.length > 0 ? (
            <Reveal>
              <div className="glass grid grid-cols-1 gap-px overflow-hidden rounded-3xl sm:grid-cols-3">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="bg-white/[0.015] px-8 py-10 text-center"
                  >
                    <div
                      className="font-display text-4xl sm:text-5xl"
                      style={{ color: project.accent }}
                    >
                      {m.value}
                    </div>
                    <div className="mt-2 text-xs uppercase tracking-[0.16em] text-ash-500">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ) : null}

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-6">
              {sections.map((section, i) => (
                <Reveal key={section.heading} delay={i * 70}>
                  <article className="glass rounded-3xl p-8 sm:p-10">
                    <div className="mb-5 flex items-center gap-3">
                      <span
                        className="h-8 w-1 rounded-full"
                        style={{ backgroundColor: project.accent }}
                      />
                      <h2 className="font-display text-3xl text-ash-50">
                        {section.heading}
                      </h2>
                    </div>
                    <p className="text-base leading-relaxed text-ash-300">
                      {section.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal delay={90}>
                <div className="glass rounded-3xl p-8">
                  <dl className="space-y-6 text-sm">
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-ash-500">
                        Client
                      </dt>
                      <dd className="mt-1 text-ash-100">{project.client}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-ash-500">
                        Year
                      </dt>
                      <dd className="mt-1 text-ash-100">{project.year}</dd>
                    </div>
                    <div>
                      <dt className="mb-2 text-xs uppercase tracking-wider text-ash-500">
                        Services
                      </dt>
                      <dd className="space-y-1.5">
                        {project.services.map((s) => (
                          <div key={s} className="text-ash-200">
                            {s}
                          </div>
                        ))}
                      </dd>
                    </div>
                    <div>
                      <dt className="mb-2.5 text-xs uppercase tracking-wider text-ash-500">
                        Stack
                      </dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {project.stack.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[11px] text-ash-300"
                          >
                            {t}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost group mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm text-ash-100"
                    >
                      View live site
                      <ExternalLink className="h-4 w-4 text-brand-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ) : null}

                  <Link
                    href="/contact"
                    className={cn(
                      "btn-sacred group flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-medium text-white",
                      project.liveUrl ? "mt-3" : "mt-8",
                    )}
                  >
                    Build something like this
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </aside>
          </div>

          {/* Prev / next */}
          <Reveal>
            <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/[0.07] pt-10 sm:flex-row">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-sm text-ash-400 transition-colors hover:text-brand-300"
              >
                <ArrowLeft className="h-4 w-4" />
                All work
              </Link>
              <Link
                href={`/work/${next.slug}`}
                className="group inline-flex items-center gap-3 text-right"
              >
                <span>
                  <span className="block text-xs text-ash-500">Next case study</span>
                  <span className="font-display text-xl text-ash-100 transition-colors group-hover:text-brand-200">
                    {next.title}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 text-brand-400 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Cta />
    </>
  );
}
