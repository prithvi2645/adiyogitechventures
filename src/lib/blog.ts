import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

/**
 * Blog posts are MDX files in src/content/blog, read at build time.
 *
 * Every page that consumes them is statically generated, so this only ever runs
 * on the build machine - never per request. Files whose name begins with an
 * underscore are ignored, which is how _template.mdx stays out of the listing.
 */
const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

/**
 * YAML parses an unquoted `2026-09-03` into a Date, but a quoted one into a
 * string, so a post's frontmatter yields a different type depending on a detail
 * nobody should have to remember. Normalise both to YYYY-MM-DD before checking.
 */
const isoDate = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be a YYYY-MM-DD date"),
);

/**
 * Frontmatter contract. Parsed rather than trusted: a typo in a post's
 * frontmatter fails the build with the file name and the offending field,
 * instead of rendering "undefined" into a published page.
 */
const frontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  /** ISO date, e.g. 2026-09-03. Drives ordering and the <time> element. */
  date: isoDate,
  /** Optional ISO date; set it when a post is meaningfully revised. */
  updated: isoDate.optional(),
  author: z.string().min(1),
  /** One word or two, shown as the card's pill, e.g. "Engineering". */
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  /** Hex colour for the card wash and accents, matching the projects pattern. */
  accent: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "must be a 6-digit hex colour")
    .default("#34bbb6"),
  /** Set false to keep a post in the repo but out of the site. */
  published: z.boolean().default(true),
  /** Pins a post to the top of the listing. */
  featured: z.boolean().default(false),
});

export type PostMeta = z.infer<typeof frontmatterSchema> & {
  slug: string;
  readingMinutes: number;
};

export type Post = PostMeta & { body: string };

/** ~200 wpm, rounded up, floor of 1. Close enough to be useful, cheap to compute. */
function readingMinutes(body: string): number {
  const words = body
    .replace(/```[\s\S]*?```/g, " ") // code blocks are skimmed, not read
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function readAll(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);

      const parsed = frontmatterSchema.safeParse(data);
      if (!parsed.success) {
        const issues = parsed.error.issues
          .map((i) => `  ${i.path.join(".") || "(root)"}: ${i.message}`)
          .join("\n");
        throw new Error(
          `Invalid frontmatter in src/content/blog/${file}:\n${issues}`,
        );
      }

      return {
        ...parsed.data,
        slug,
        readingMinutes: readingMinutes(content),
        body: content,
      };
    })
    .filter((post) => post.published)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.date.localeCompare(a.date);
    });
}

/**
 * Read once per process. Next spins up a fresh worker per build, and `next dev`
 * discards the module on change, so this does not stale in either mode.
 */
let cache: Post[] | null = null;

export function getPosts(): Post[] {
  cache ??= readAll();
  return cache;
}

export const getPostMeta = (): PostMeta[] =>
  getPosts().map(({ body, ...meta }) => meta);

export const getPost = (slug: string): Post | undefined =>
  getPosts().find((p) => p.slug === slug);

/** Newest-first neighbours for the prev/next footer on a post page. */
export function getAdjacent(slug: string) {
  const posts = getPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  return {
    newer: i > 0 ? posts[i - 1] : undefined,
    older: i >= 0 && i < posts.length - 1 ? posts[i + 1] : undefined,
  };
}

/** Same category first, then anything else, never the post itself. */
export function getRelated(slug: string, limit = 2): PostMeta[] {
  const current = getPost(slug);
  if (!current) return [];
  const others = getPosts().filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit).map(({ body, ...m }) => m);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
