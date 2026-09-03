# Adiyogi Tech Ventures

Marketing and lead-generation website for a web & app development studio.
Built with [Next.js 15](https://nextjs.org) (App Router), TypeScript and
Tailwind CSS v4.

**Live site:** [adiyogitechventures.com](https://adiyogitechventures.com)

## Quick start

```bash
npm install
cp .env.example .env.local   # optional - see below
npm run dev                  # http://localhost:3000
```

Runs with no environment variables set — the contact form just logs to the
console instead of sending an email.

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript check, no emit |
| `npm run lint` | ESLint |

## Environment variables

See `.env.example` for the full list with comments — site URL, Resend
(contact form email) and Sentry (error monitoring). All optional locally.

## Editing content

All copy lives in `src/content/` as typed TypeScript — no component edits
needed for routine changes (`site.ts`, `services.ts`, `projects.ts`,
`testimonials.ts`, `process.ts`, `faq.ts`). Blog posts are MDX files in
`src/content/blog/`; copy `_template.mdx` to `<slug>.mdx` to add one.

Adding a service, project or post automatically wires up its detail page,
listing entry and `sitemap.xml`. A homepage section hides itself while its
content file is empty.

## Deploying

Import the repo at [vercel.com/new](https://vercel.com/new), add the
environment variables from `.env.example`, and deploy — Vercel detects
Next.js automatically. Every push to `main` redeploys.

## Stack notes

Sentry and Vercel Analytics are both fully inactive until configured — an
unconfigured build ships without them. The custom cursor and background
animation respect `prefers-reduced-motion` and are disabled for touch
pointers where relevant.
