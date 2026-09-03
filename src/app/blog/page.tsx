import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, Rss } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Spotlight from "@/components/ui/Spotlight";
import Cta from "@/components/sections/Cta";
import { getPostMeta, formatDate } from "@/lib/blog";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on building fast websites and apps - engineering decisions, design thinking and what we have learned shipping software for growing businesses.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": `${site.url}/blog/rss.xml` },
  },
};

export default function BlogPage() {
  const posts = getPostMeta();
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Writing"
        title="Notes from"
        highlight="the workshop"
        description={
          posts.length > 0
            ? "What we are learning as we build - engineering decisions, design reasoning, and the tradeoffs behind them. Written by the people doing the work."
            : "We are preparing our first pieces on how we design and build. In the meantime, the fastest way to get our thinking on your project is to ask us directly."
        }
        breadcrumbs={[{ label: "Blog" }]}
      />

      <Section className="pt-0">
        <Container>
          {posts.length === 0 ? (
            <Reveal>
              <div className="glass mx-auto max-w-2xl rounded-3xl p-10 text-center sm:p-14">
                <h2 className="font-display text-2xl text-ash-50 sm:text-3xl">
                  First posts on the way
                </h2>
                <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ash-400">
                  We would rather publish something worth your time than fill a
                  page to look busy. Articles are being written now.
                </p>
                <Link
                  href="/contact"
                  className="btn-sacred mt-9 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-white"
                >
                  Ask us about your project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ) : (
            <>
              {/* Lead post, given the full width */}
              <Reveal>
                <Spotlight className="halo-card glass group overflow-hidden rounded-3xl">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(60% 100% at 15% 0%, ${lead.accent}22 0%, transparent 62%)`,
                    }}
                  />
                  <Link
                    href={`/blog/${lead.slug}`}
                    className="relative z-10 block p-8 sm:p-12"
                  >
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                      <span
                        className="rounded-full px-3 py-1 text-[11px] font-medium"
                        style={{
                          backgroundColor: `${lead.accent}1a`,
                          color: lead.accent,
                        }}
                      >
                        {lead.category}
                      </span>
                      <span className="text-xs text-ash-500">
                        {formatDate(lead.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-ash-500">
                        <Clock className="h-3 w-3" />
                        {lead.readingMinutes} min read
                      </span>
                    </div>

                    <h2 className="max-w-3xl font-display text-4xl leading-[1.1] text-ash-50 transition-colors duration-500 group-hover:text-brand-200 sm:text-5xl">
                      {lead.title}
                    </h2>

                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-ash-400">
                      {lead.description}
                    </p>

                    <span className="mt-8 inline-flex items-center gap-2 text-sm text-brand-300">
                      Read the post
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Spotlight>
              </Reveal>

              {rest.length > 0 ? (
                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  {rest.map((post, i) => (
                    <Reveal key={post.slug} delay={i * 60}>
                      <Spotlight className="halo-card glass group h-full overflow-hidden rounded-3xl">
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                          style={{
                            background: `radial-gradient(70% 100% at 20% 0%, ${post.accent}20 0%, transparent 60%)`,
                          }}
                        />
                        <Link
                          href={`/blog/${post.slug}`}
                          className="relative z-10 flex h-full flex-col p-8"
                        >
                          <div className="mb-5 flex items-start justify-between gap-4">
                            <span
                              className="rounded-full px-3 py-1 text-[11px] font-medium"
                              style={{
                                backgroundColor: `${post.accent}1a`,
                                color: post.accent,
                              }}
                            >
                              {post.category}
                            </span>
                            <span className="text-xs text-ash-500">
                              {formatDate(post.date)}
                            </span>
                          </div>

                          <h2 className="mb-3 font-display text-2xl leading-snug text-ash-50 transition-colors duration-500 group-hover:text-brand-200">
                            {post.title}
                          </h2>

                          <p className="mb-7 flex-1 text-sm leading-relaxed text-ash-400">
                            {post.description}
                          </p>

                          <div className="mt-auto flex items-center justify-between">
                            <span className="inline-flex items-center gap-2 text-sm text-brand-300">
                              Read
                              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs text-ash-500">
                              <Clock className="h-3 w-3" />
                              {post.readingMinutes} min
                            </span>
                          </div>
                        </Link>
                      </Spotlight>
                    </Reveal>
                  ))}
                </div>
              ) : null}

              <Reveal>
                <div className="mt-12 flex justify-center">
                  <a
                    href="/blog/rss.xml"
                    className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-ash-300"
                  >
                    <Rss className="h-4 w-4 text-brand-400" />
                    Subscribe via RSS
                  </a>
                </div>
              </Reveal>
            </>
          )}
        </Container>
      </Section>

      <Cta />
    </>
  );
}
