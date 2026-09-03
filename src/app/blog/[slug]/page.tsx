import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Cta from "@/components/sections/Cta";
import MdxContent from "@/components/blog/MdxContent";
import {
  getPosts,
  getPost,
  getAdjacent,
  getRelated,
  formatDate,
} from "@/lib/blog";
import { site } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

// Only the slugs above exist; anything else is a statically served 404, the
// same choice /work/[slug] makes.
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.length ? post.tags : undefined,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} | ${site.name}`,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const { newer, older } = getAdjacent(post.slug);
  const related = getRelated(post.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.description}
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
      />

      <Section className="pt-0">
        <Container>
          {/* Byline */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-white/[0.07] py-5 text-sm text-ash-400">
              <span className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 place-items-center rounded-full text-[11px] font-medium"
                  style={{
                    backgroundColor: `${post.accent}1f`,
                    color: post.accent,
                  }}
                >
                  {initialsOf(post.author)}
                </span>
                <span className="text-ash-200">{post.author}</span>
              </span>

              <time dateTime={post.date}>{formatDate(post.date)}</time>

              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readingMinutes} min read
              </span>

              {post.updated ? (
                <span className="text-ash-500">
                  Updated {formatDate(post.updated)}
                </span>
              ) : null}
            </div>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
            <article className="min-w-0 max-w-[68ch]">
              <MdxContent source={post.body} />

              {post.tags.length ? (
                <div className="mt-14 flex flex-wrap gap-2 border-t border-white/[0.07] pt-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[11px] text-ash-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              {related.length ? (
                <Reveal delay={90}>
                  <div className="glass rounded-3xl p-7">
                    <h2 className="mb-5 text-xs uppercase tracking-[0.2em] text-ash-500">
                      Keep reading
                    </h2>
                    <ul className="space-y-5">
                      {related.map((r) => (
                        <li key={r.slug}>
                          <Link href={`/blog/${r.slug}`} className="group block">
                            <span
                              className="text-[11px] font-medium"
                              style={{ color: r.accent }}
                            >
                              {r.category}
                            </span>
                            <span className="mt-1 block font-display text-lg leading-snug text-ash-100 transition-colors group-hover:text-brand-200">
                              {r.title}
                            </span>
                            <span className="mt-1.5 block text-xs text-ash-500">
                              {r.readingMinutes} min read
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ) : null}

              <Reveal delay={140}>
                <div className="glass mt-6 rounded-3xl p-7">
                  <p className="font-display text-xl leading-snug text-ash-100">
                    Working on something like this?
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ash-400">
                    Tell us what you are building and we will tell you how we
                    would approach it.
                  </p>
                  <Link
                    href="/contact"
                    className="btn-sacred group mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium text-white"
                  >
                    Start a conversation
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
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-ash-400 transition-colors hover:text-brand-300"
              >
                <ArrowLeft className="h-4 w-4" />
                All posts
              </Link>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                {newer ? (
                  <Link
                    href={`/blog/${newer.slug}`}
                    className="group inline-flex items-center gap-3"
                  >
                    <ArrowLeft className="h-4 w-4 text-brand-400 transition-transform duration-300 group-hover:-translate-x-1" />
                    <span>
                      <span className="block text-xs text-ash-500">Newer</span>
                      <span className="font-display text-lg text-ash-100 transition-colors group-hover:text-brand-200">
                        {newer.title}
                      </span>
                    </span>
                  </Link>
                ) : null}

                {older ? (
                  <Link
                    href={`/blog/${older.slug}`}
                    className="group inline-flex items-center gap-3 text-right"
                  >
                    <span>
                      <span className="block text-xs text-ash-500">Older</span>
                      <span className="font-display text-lg text-ash-100 transition-colors group-hover:text-brand-200">
                        {older.title}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-brand-400 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                ) : null}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Cta />
    </>
  );
}

/** "Prithvi Hiremath" -> "PH". Falls back to one letter for a single name. */
function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
