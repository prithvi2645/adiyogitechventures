# Adiyogi Tech Ventures

Marketing and lead-generation website for a web & app development studio.
Built with Next.js 15 (App Router), TypeScript and Tailwind CSS v4.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Other scripts:

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript check, no emit |

---

## Environment variables

Copy `.env.example` to `.env.local`. The site runs without any of these (the
contact form logs to the console instead of emailing), but all of them should be
set before launch.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical URLs, sitemap, OG tags. No trailing slash. |
| `RESEND_API_KEY` | For email | API key from [resend.com](https://resend.com) |
| `CONTACT_TO_EMAIL` | For email | Where enquiries are delivered |
| `CONTACT_FROM_EMAIL` | For email | Sender, e.g. `Adiyogi <hello@yourdomain.com>` |
| `NEXT_PUBLIC_SENTRY_DSN` | For errors | Sentry project DSN. Safe to expose — write-only. |
| `SENTRY_ORG` | For stack traces | Sentry org slug, build-time only |
| `SENTRY_PROJECT` | For stack traces | Sentry project slug, build-time only |
| `SENTRY_AUTH_TOKEN` | For stack traces | **Secret.** Set in Vercel, never commit. |

---

## Editing content

All copy lives in `src/content/` as typed TypeScript. No component edits needed.

| File | Controls |
|---|---|
| `site.ts` | Company name, tagline, email, phone, address, social links, nav, stats |
| `services.ts` | The eight services, pricing, timelines, deliverables, tech stacks |
| `projects.ts` | Case studies (title, challenge, approach, result, metrics) |
| `testimonials.ts` | Client quotes |
| `process.ts` | The six-step process timeline |
| `faq.ts` | FAQ questions and answers (also feeds FAQ schema for Google) |
| `blog/*.mdx` | Blog posts, one MDX file each — see **Writing a blog post** below |

Adding a service, project or blog post automatically creates its detail page,
adds it to the listing page, the footer, and `sitemap.xml`. Nothing else to wire
up.

### Writing a blog post

Copy `src/content/blog/_template.mdx` to `src/content/blog/<slug>.mdx`. The file
name is the URL: `choosing-a-cms.mdx` serves at `/blog/choosing-a-cms`.

Frontmatter is validated at build time by `src/lib/blog.ts`. A missing or
malformed field **fails the build** naming the file and the field, rather than
rendering `undefined` onto a live page. Required: `title`, `description`, `date`
(YYYY-MM-DD, quoted or not), `author`, `category`. Optional: `updated`, `tags`,
`accent`, `published`, `featured`.

- `published: false` keeps a draft in the repo and off the site entirely — no
  page, no listing entry, no sitemap or feed entry.
- `featured: true` pins a post to the top of the listing; otherwise newest first.
- Files starting with `_` are skipped, which is how the template stays unpublished.

Post bodies are MDX with GitHub Flavored Markdown, so tables and strikethrough
work. Headings start at H2 — the H1 is the post title, rendered by the page.
Body elements are styled in `src/components/blog/MdxContent.tsx`, which also
exposes one custom component, `<Callout>`, for an aside. Internal links route
through `next/link` automatically; external ones get `target="_blank"` and
`rel="noopener noreferrer"`. Images go in `public/blog/` and are served through
`next/image`.

Reading time is computed at ~200 wpm, skipping fenced code blocks. Each post
emits `BlogPosting` JSON-LD and article OpenGraph tags, and the feed at
`/blog/rss.xml` is generated statically alongside the pages.

### Brand assets

| File | Used for |
|---|---|
| `public/brand/logo-mark.png` | The monogram. Rendered in the header and footer beside live type. |
| `public/brand/logo-full.png` | Monogram + ADIYOGI wordmark. For light backgrounds, decks and invoices. |
| `public/brand/backdrop.jpg` | The scroll-zoom backdrop. Generated, not stock - see below. |

Both were recovered from the supplied JPEG mockup (the logo photographed on a
concrete wall) by `scripts/extract-logo.py`, which isolates the artwork by
chroma - the wall is near-neutral grey, the logo is strongly saturated teal -
then fills interior holes so dark outlines and bevel highlights survive.

Two known limits of that source, both inherent to a lossy mockup rather than the
script:

- The thin teal **TECH-VENTURES** sub-line fragments and is not included.
- The navy **ADIYOGI** wordmark measures about 1.8:1 contrast against our dark
  ground, well under the 4.5:1 minimum, so the site chrome pairs the monogram
  with live text instead of using the full lockup.

**Ask the designer for the vector original** (SVG/AI/EPS) or a transparent PNG
export. Drop it over `public/brand/logo-mark.png` and no code changes are needed.
To re-run the extraction against a different source:

```bash
python scripts/extract-logo.py "path/to/source.jpg"
```

### The backdrop

`public/brand/backdrop.jpg` is a Kailash-style peak under an aurora, generated
procedurally by `scripts/generate-backdrop.py` from noise and maths. No stock
licence, no attribution, and it cannot turn up on a competitor's site. Change
`SEED` in that script for a different mountain range:

```bash
python scripts/generate-backdrop.py
```

`ScrollZoomBackdrop.tsx` scales it from 1 to 1.22 across the document as you
scroll, easing so fast flicks do not snap it. Static under
`prefers-reduced-motion`. The 270 KB source is served by `next/image` as a
**24 KB AVIF** at 1920px.

**Contrast constraint.** The image sits at 42% opacity under an 18% scrim. That
is not arbitrary: at the original 55% with no scrim, `ash-300` body text over the
brightest part of the aurora measured 4.31:1 - under the 4.5:1 AA minimum. The
current values put it at 5.83:1. If you brighten the image or raise its opacity,
re-measure before shipping.

### Palette

Every brand colour is sampled directly from the logo artwork and exposed as a
Tailwind token in `src/app/globals.css`. Change them there and the whole site
follows.

| Token | Value | Role |
|---|---|---|
| `brand-300` | `#59D7CD` | Bright aqua - highlights, links, icons |
| `brand-400` | `#34BBB6` | Teal - glows, particle field |
| `brand-500` | `#168DA1` | Primary - buttons, focus rings |
| `brand-700` | `#15376B` | Deep navy - gradients, depth |
| `accent-400` | `#93E7E0` | Pale aqua - dividers, ornament |
| `void` | `#04070E` | Page ground |

---

## Before this goes live — checklist

**Content (must do)**

- [ ] Add real case studies to `src/content/projects.ts`, with the client's
      written permission and numbers you can substantiate. The array is empty:
      the homepage "Selected work" section is hidden and `/work` shows a "case
      studies coming soon" state until you fill it.
- [ ] Add real, attributable testimonials to `src/content/testimonials.ts`. Also
      empty; the homepage section is hidden until you fill it.
- [ ] Add headline stats to `stats` in `site.ts` once they are true. Empty, so
      the hero strip and the About page's "By the numbers" panel are both hidden.

  > These three shipped as invented sample content to demonstrate the layout,
  > and were emptied before the repository went public. Adding anything back
  > that you cannot evidence puts the same problem back. See **Empty by
  > design** below.
- [ ] Set the real phone number, email and address in `site.ts`.
- [ ] Confirm the pricing in `services.ts` is what you want published.
- [ ] Get the vector or transparent-PNG original of the logo from your
      designer and drop it over `public/brand/logo-mark.png`. The current
      asset was recovered from a lossy JPEG mockup - see Brand assets above.
- [ ] Have a legal advisor review `/privacy` and `/terms` — both are marked as
      templates on the page itself. Remove the yellow template notices afterwards.

**Technical**

- [ ] Point `NEXT_PUBLIC_SITE_URL` at the real domain.
- [ ] Set up Resend, verify the sending domain (SPF/DKIM), and send a test enquiry.
- [ ] Submit `sitemap.xml` in Google Search Console.
- [ ] Turn on Analytics and Speed Insights in the Vercel dashboard (Project →
      Analytics). The code is already in place; the toggles are not.
- [ ] Create a Sentry project and set the four `SENTRY_*` variables in Vercel,
      then confirm an error arrives. Skipping this leaves the site working — it
      just reports nothing.
- [ ] Update the social links in `site.ts`, or delete the ones you do not have.

---

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. Import the repo at [vercel.com/new](https://vercel.com/new). Vercel detects
   Next.js automatically — no build settings to change.
3. Add the environment variables from `.env.example` under
   **Settings → Environment Variables**.
4. Add the custom domain under **Settings → Domains** and point the registrar's
   nameservers or A/CNAME records as Vercel instructs.
5. Deploy. Every push to `main` redeploys; every pull request gets a preview URL.

The whole site prerenders to static HTML at build time, so hosting cost on
Vercel's free tier is effectively zero at typical agency traffic.

---

## Architecture notes

```
src/
  app/                 Routes (App Router)
    actions.ts         Contact form server action - validation, rate limit, email
    layout.tsx         Fonts, metadata, Organization JSON-LD, background, chrome
    opengraph-image.tsx  Generated 1200x630 social card
    icon.tsx           Generated favicon
    sitemap.ts         Auto-generated from the content layer
    robots.ts
    global-error.tsx   Root-layout crash screen; reports to Sentry
  instrumentation.ts        Server/edge Sentry bootstrap + onRequestError
  instrumentation-client.ts Browser Sentry bootstrap (lazy-loaded)
  components/
    background/        DivineBackground, CosmicCanvas (particles), Yantra/Trishul SVG
    blog/              MdxContent - element map and styling for post bodies
    layout/            Header, Footer, Logo
    sections/          Page sections - Hero, Services, Process, Work, FAQ, Cta...
    ui/                Primitives - Reveal, Spotlight, Section, Button, Counter
  content/             All editable copy
    blog/              Blog posts as MDX, one file per post
  lib/                 utils, zod schemas, rate limiter, blog loader
```

**The blog.** Posts are MDX files read from disk at build time by
`src/lib/blog.ts` and rendered with `next-mdx-remote/rsc`, so a post is a server
component with no client JS beyond what the rest of the site already ships.
Frontmatter is parsed through a zod schema rather than trusted. `/blog/[slug]`
sets `dynamicParams = false`, so an unknown slug is a statically served 404 —
the same choice `/work/[slug]` makes.

**The background.** `DivineBackground` is a fixed six-layer composition: a radial
base, four breathing aurora fields, a rotating yantra, a horizon glow, a canvas
ember field, then a grid, vignette and animated film grain. The grain is what
stops it reading as flat digital gradient. Everything is CSS or canvas — no
images, so it costs nothing to download and stays sharp on every display.

**Motion and cursor.** Two Shaiva flourishes, both in `components/ui/`:

- `SacredIcons.tsx` holds a compact trishul-with-damru and a standalone damru,
  drawn solid rather than stroked so they stay legible at 24px.
- The trishul rides the tip of the scroll-progress line in the header, bobbing
  gently, with a glow pooled beneath it.
- `CursorAura.tsx` replaces the pointer with the damru, trailed by a soft teal
  aura. Three layers ease at different rates; the striker beads are sprung from
  horizontal pointer velocity, and the drum takes a squash-and-swing hit on
  click. It grows over links and buttons.

Cursor safety rails, since replacing the system cursor has a real usability
cost: it only runs on a fine pointer (never touch), never under
`prefers-reduced-motion`, text inputs keep their native caret, and the
`cursor: none` rule is applied by a class the component adds **after** mount -
so if JS fails or is disabled the normal cursor is untouched. To remove it
entirely, delete `<CursorAura />` from `src/app/layout.tsx`.

**Performance.** The particle canvas caps its count by viewport area, halts on
`visibilitychange`, and renders a single static frame under
`prefers-reduced-motion`. Scroll reveals use one `IntersectionObserver` per
element and unobserve after firing, rather than a motion library. First Load JS
is ~103 kB shared.

**Accessibility.** Skip link, visible focus rings, `aria-current` on active nav,
labelled form fields with inline errors, an `aria-live` region for the form
result, native `<details>` for the FAQ accordion, and a full
`prefers-reduced-motion` path that disables the grain and all animation.

### Empty by design

Three content files ship empty on purpose, each with a comment saying what it
held and how to refill it:

| File | Was | Hidden while empty |
|---|---|---|
| `src/content/projects.ts` | Eight sample case studies with invented clients, outcomes and metrics | Homepage "Selected work"; `/work` shows an empty state; no `/work/[slug]` pages, none in `sitemap.xml` |
| `src/content/testimonials.ts` | Sample quotes attributed to "Sample Name" | Homepage "In their words" |
| `stats` in `src/content/site.ts` | `60+ products shipped`, `98/100 Lighthouse`, `12 countries served`, `4.9/5 client rating` | Hero stats strip; About "By the numbers" |
| `src/content/blog/` | Never held posts; the route shipped with the template only | `/blog` shows an empty state; no `/blog/[slug]` pages, none in `sitemap.xml` or the feed |

A hardcoded five-star **"Rated 4.9 by our clients"** badge was also removed from
the hero trust row. The two claims left there — 30 days of free support, 100%
code ownership — are commitments, not assertions about a past that cannot be
evidenced.

None of this is a placeholder-shaped hole to be plugged with something similar.
It is the difference between a site that says nothing yet and a site that says
something untrue, and this repository is public.

**Contact form security.** Zod validation on the server, a honeypot field, and an
in-memory rate limit of 5 submissions per IP per hour. For a multi-instance
deploy, swap `src/lib/rate-limit.ts` for Upstash Redis — the call signature is
already the same shape.

**Analytics.** `<Analytics />` and `<SpeedInsights />` from Vercel sit at the
bottom of `layout.tsx`. Both are cookie-free, so no consent banner is needed,
and both no-op anywhere but a Vercel deployment — local dev and any other host
download nothing. They still have to be **enabled in the Vercel dashboard**
(Project → Analytics); the components alone do not switch them on. Speed
Insights reports field Core Web Vitals from real visitors, which is the number
Google ranks on, not the lab score.

**Error monitoring.** Sentry, wired so that it is invisible until configured:

- `src/instrumentation.ts` boots the Node and Edge SDKs and exports
  `onRequestError`, which catches every server component, server action and
  route handler failure — including a Resend outage on the contact form.
- `src/instrumentation-client.ts` boots the browser SDK, and
  `src/app/global-error.tsx` catches a root-layout crash.
- `next.config.ts` only applies `withSentryConfig` when `SENTRY_ORG`,
  `SENTRY_PROJECT` and `SENTRY_AUTH_TOKEN` are all set, so a build without them
  is byte-for-byte the plain Next.js build.

Two deliberate choices worth knowing about:

- **The browser SDK is lazy-loaded.** Imported statically it added 81 kB to the
  shared bundle — a 79% increase — for every visitor, whether or not a DSN was
  set. It is now a deferred `import()` behind the DSN check, which keeps First
  Load JS at 103 kB with Sentry off and 104 kB with it on. The cost is a gap of
  a few hundred milliseconds after first paint where a client error is missed.
  Server errors are captured from the first request regardless.
- **Session replay is off** (`replaysSessionSampleRate: 0`). It records what
  people type into the contact form. Turn it on only after `/privacy` says so.

Sampling is 10% of traces in production, 100% in preview. The `tunnelRoute`
option proxies browser events through `/monitoring` on our own domain, since ad
blockers block `sentry.io` outright and would otherwise swallow client errors
silently — it compiles to a Next.js rewrite, not a serverless function, so it
adds no hosting cost.

`/privacy` has been updated to name Vercel, Resend and Sentry and to describe
what each receives. That section still needs the legal review the page notice
asks for.

---

## Suggested next additions

Roughly in order of return on effort:

1. **CMS** — move `src/content/*` into Sanity so the client edits copy without a
   deploy. The content files are already shaped like CMS documents.
2. **Booking** — embed Cal.com on `/contact` so prospects book the call directly.
3. **Multi-language** — `next-intl` if you want Hindi or Kannada versions.

The **blog** that used to head this list is built — `/blog`, `/blog/[slug]` and
an RSS feed, driven by MDX files. It ships with no posts; see **Writing a blog
post** above.
