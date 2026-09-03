/**
 * Central site configuration.
 * Change these values and the whole site updates - nav, footer, SEO, schema.
 */
export type Stat = { value: string; label: string; suffix?: string };

/** The canonical origin, used as `metadataBase` and by sitemap.xml and the feed. */
const FALLBACK_URL = "https://adiyogitechventures.vercel.app";

/**
 * Reads NEXT_PUBLIC_SITE_URL defensively.
 *
 * `??` is not enough here: a host dashboard will happily store the variable as
 * an empty string, which is neither null nor undefined, so it passes straight
 * through and `new URL("")` throws ERR_INVALID_URL while collecting page data -
 * a build failure whose message names /_not-found and never mentions this
 * variable. `||` plus a trim also catches a value that is only whitespace.
 *
 * The trailing slash is stripped because every consumer appends its own path,
 * and an origin ending in "/" yields canonical URLs like "https://site.com//blog".
 */
function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_URL;

  const withProtocol = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
  const normalised = withProtocol.replace(/\/+$/, "");

  // A malformed value should not take the build down; fall back and carry on.
  try {
    new URL(normalised);
    return normalised;
  } catch {
    return FALLBACK_URL;
  }
}

/**
 * Headline numbers for the homepage hero and the About page.
 *
 * Deliberately empty. This previously read "60+ products shipped",
 * "98/100 avg. Lighthouse score", "12 countries served" and "4.9/5 average
 * client rating" - none of which had been substantiated, and the last of which
 * is a review aggregate over testimonials that do not exist. Both places that
 * render this hide themselves while it is empty.
 *
 * Put them back as soon as they are true, in this shape:
 *   { value: "60+", label: "Products shipped" }
 *   { value: "4.9", label: "Average client rating", suffix: "/5" }
 * `value` is animated by <Counter>, which counts up to the leading number.
 */
const stats: Stat[] = [];

export const site = {
  name: "Adiyogi Tech Ventures",
  shortName: "Adiyogi",
  legalName: "Adiyogi Tech Ventures",
  tagline: "Websites & Apps, Crafted with Consciousness",
  description:
    "Adiyogi Tech Ventures designs and engineers high-performance websites, web apps and mobile apps for founders and growing businesses. Strategy, design, development and care - under one roof.",
  url: siteUrl(),
  locale: "en_IN",

  contact: {
    email: "adiyogitechventures@gmail.com",
    /** Display form. India, so grouped the way it is read aloud locally. */
    phone: "+91 63625 58434",
    /** E.164, for tel: and WhatsApp links - no spaces, no punctuation. */
    phoneHref: "tel:+916362558434",
    whatsapp: "https://wa.me/916362558434",
    address: "Bengaluru, Karnataka, India",
    hours: "Mon - Sat, 10:00 - 19:00 IST",
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Process", href: "/#process" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  stats,
} as const;

export type Site = typeof site;
