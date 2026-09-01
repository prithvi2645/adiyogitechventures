/**
 * Central site configuration.
 * Change these values and the whole site updates - nav, footer, SEO, schema.
 */
export type Stat = { value: string; label: string; suffix?: string };

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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://adiyogitechventures.com",
  locale: "en_IN",

  contact: {
    email: "adiyogitechventures@gmail.com",
    // No phone or WhatsApp until there is a real business number to publish.
    // Adding them back means restoring `phone`, `phoneHref` and `whatsapp`
    // here and un-hiding the blocks in Header, Footer, Cta and /contact.
    address: "Bengaluru, Karnataka, India",
    hours: "Mon - Sat, 10:00 - 19:00 IST",
  },

  social: [
    { label: "LinkedIn", href: "https://linkedin.com/company/adiyogitechventures" },
    { label: "Instagram", href: "https://instagram.com/adiyogitechventures" },
    { label: "GitHub", href: "https://github.com/adiyogitechventures" },
    { label: "X", href: "https://x.com/adiyogitech" },
  ],

  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Process", href: "/#process" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  stats,
} as const;

export type Site = typeof site;
