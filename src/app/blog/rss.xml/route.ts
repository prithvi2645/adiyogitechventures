import { getPostMeta } from "@/lib/blog";
import { site } from "@/content/site";

/**
 * RSS 2.0 feed for the blog.
 *
 * Force-static: the posts are files read at build time, so the feed is baked
 * into the deploy alongside them rather than rendered per request.
 */
export const dynamic = "force-static";

/** Escapes the five XML entities. Titles and descriptions are plain text. */
function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getPostMeta();
  const self = `${site.url}/blog/rss.xml`;

  const lastBuild = posts.length
    ? new Date(`${posts[0].date}T00:00:00Z`).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${site.url}/blog/${post.slug}`;
      return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${xmlEscape(post.description)}</description>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <category>${xmlEscape(post.category)}</category>
      <author>${xmlEscape(`${site.contact.email} (${post.author})`)}</author>
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(`${site.name} - Blog`)}</title>
    <link>${site.url}/blog</link>
    <description>${xmlEscape(site.description)}</description>
    <language>en-in</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
