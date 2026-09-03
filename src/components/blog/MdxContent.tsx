import Link from "next/link";
import Image from "next/image";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

/**
 * Element map for post bodies.
 *
 * Styling lives here as utility classes rather than a global `.prose` block, to
 * match how the rest of the site is styled and to keep article typography from
 * leaking into any other page.
 */
const components = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-14 scroll-mt-28 font-display text-3xl leading-tight text-ash-50 first:mt-0 sm:text-4xl"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-10 scroll-mt-28 font-display text-2xl leading-snug text-ash-100"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4
      className="mt-8 scroll-mt-28 text-base font-medium tracking-wide text-ash-100"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-6 text-[1.0625rem] leading-[1.75] text-ash-300" {...props} />
  ),
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const external = /^https?:\/\//.test(href);
    const className =
      "link-grow font-medium text-brand-300 transition-colors hover:text-brand-200";

    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      />
    ) : (
      <Link href={href} className={className} {...props} />
    );
  },
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mt-6 space-y-2.5 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.65em] [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full [&>li]:before:bg-brand-400/70"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mt-6 list-decimal space-y-2.5 pl-6 marker:text-brand-400/80"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="text-[1.0625rem] leading-[1.7] text-ash-300" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-9 rounded-r-2xl border-l-2 border-brand-400/70 bg-white/[0.025] py-1 pl-6 pr-5 font-display text-xl italic leading-relaxed text-ash-200 [&>p]:text-ash-200"
      {...props}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-ash-100" {...props} />
  ),
  hr: () => <hr className="thread-divider my-14 border-0" />,

  // Inline code. Fenced blocks arrive as <pre><code>, handled below, so this
  // must not restyle those - hence the check for a language class.
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) =>
    className?.startsWith("language-") ? (
      <code className={className} {...props} />
    ) : (
      <code
        className="rounded-md border border-white/[0.08] bg-white/[0.045] px-1.5 py-0.5 font-mono text-[0.875em] text-brand-200"
        {...props}
      />
    ),

  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="glass my-8 overflow-x-auto rounded-2xl p-5 font-mono text-[0.8125rem] leading-relaxed text-ash-200 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit"
      {...props}
    />
  ),

  // Tables come from remark-gfm. Wrapped so a wide table scrolls itself instead
  // of forcing the page sideways.
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-white/[0.12] px-4 py-3 text-xs font-medium uppercase tracking-wider text-ash-400"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td
      className="border-b border-white/[0.06] px-4 py-3 align-top text-ash-300"
      {...props}
    />
  ),

  img: ({ src, alt = "", ...props }: ComponentPropsWithoutRef<"img">) =>
    typeof src === "string" ? (
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        className="my-9 h-auto w-full rounded-2xl border border-white/[0.07]"
        {...(props as Record<string, unknown>)}
      />
    ) : null,

  /** Available inside MDX for a highlighted aside: <Callout>…</Callout> */
  Callout: ({ children }: { children: ReactNode }) => (
    <div className="glass my-9 rounded-2xl border-l-2 border-l-brand-400 p-6 text-[0.9375rem] leading-relaxed text-ash-200 [&>p:first-child]:mt-0">
      {children}
    </div>
  ),
};

export default function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
  );
}
