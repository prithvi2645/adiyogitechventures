export type Service = {
  slug: string;
  title: string;
  sanskrit: string;
  short: string;
  description: string;
  icon: string;
  deliverables: string[];
  stack: string[];
  timeline: string;
  /**
   * Optional. Left unset deliberately - we do not publish a number before
   * scoping the work. Set it and the "Starting at" figures reappear on the
   * services listing, the detail page and the homepage cards.
   */
  startingAt?: string;
  outcomes: { label: string; value: string }[];
};

export const services: Service[] = [
  {
    slug: "website-design-development",
    title: "Website Design & Development",
    sanskrit: "Rachana",
    short:
      "Marketing sites, landing pages and corporate websites that load fast, rank well and convert.",
    description:
      "We design and build websites that carry your brand with clarity. Every page is engineered for speed, accessibility and search visibility - not just a pretty mockup handed over as static HTML. You get a living, editable site your team can actually run.",
    icon: "globe",
    deliverables: [
      "Brand-aligned UI design in Figma",
      "Responsive build (mobile, tablet, desktop)",
      "CMS so your team edits content without a developer",
      "Technical SEO, sitemap, schema markup",
      "Analytics and conversion tracking",
      "Core Web Vitals tuned to green",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Sanity CMS", "Vercel"],
    timeline: "3 - 6 weeks",
    outcomes: [
      { label: "Load time", value: "< 1.2s" },
      { label: "Lighthouse", value: "95+" },
      { label: "Mobile-first", value: "100%" },
    ],
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    sanskrit: "Nirmana",
    short:
      "Dashboards, portals, SaaS products and internal tools built to scale with your business.",
    description:
      "When a website is not enough, we build the product. Authentication, roles and permissions, payments, real-time data, admin panels - architected properly from day one so it does not collapse at your first thousand users.",
    icon: "layers",
    deliverables: [
      "Product architecture and data modelling",
      "Secure auth, roles and permissions",
      "Payments and subscription billing",
      "Admin dashboard and reporting",
      "REST / tRPC / GraphQL APIs",
      "Automated tests and CI/CD pipeline",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe", "Redis"],
    timeline: "6 - 14 weeks",
    outcomes: [
      { label: "Uptime target", value: "99.9%" },
      { label: "Test coverage", value: "80%+" },
      { label: "Type-safe", value: "End to end" },
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    sanskrit: "Gati",
    short:
      "iOS and Android apps from a single codebase - native feel, half the cost of two teams.",
    description:
      "Cross-platform apps with React Native and Expo, or fully native when the product demands it. Push notifications, offline mode, biometrics, in-app purchases, and a clean path through both app stores - we handle the submission too.",
    icon: "smartphone",
    deliverables: [
      "iOS + Android from one codebase",
      "Offline-first data sync",
      "Push notifications and deep links",
      "In-app purchases / subscriptions",
      "App Store and Play Store submission",
      "Crash reporting and release monitoring",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Supabase", "Firebase"],
    timeline: "8 - 16 weeks",
    outcomes: [
      { label: "Platforms", value: "iOS + Android" },
      { label: "Cold start", value: "< 2s" },
      { label: "Store approval", value: "Handled" },
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI / UX Design",
    sanskrit: "Darshana",
    short:
      "Research, wireframes, design systems and prototypes that make products feel effortless.",
    description:
      "Design is how it works, not only how it looks. We map user journeys, remove friction, and hand you a documented design system that keeps every future screen consistent - whether we build it or your team does.",
    icon: "palette",
    deliverables: [
      "User research and journey mapping",
      "Wireframes and clickable prototypes",
      "Complete design system in Figma",
      "Accessibility audit (WCAG 2.2 AA)",
      "Design tokens handed to code",
      "Usability testing round",
    ],
    stack: ["Figma", "Framer", "Design Tokens", "Storybook"],
    timeline: "2 - 5 weeks",
    outcomes: [
      { label: "Accessibility", value: "WCAG AA" },
      { label: "Handoff", value: "Dev-ready" },
      { label: "Prototype", value: "Clickable" },
    ],
  },
  {
    slug: "ecommerce-solutions",
    title: "E-Commerce Solutions",
    sanskrit: "Vanijya",
    short:
      "Storefronts that sell - fast checkout, clean catalogue, payments that just work.",
    description:
      "Headless Shopify or custom commerce, built around your catalogue and margins. We obsess over the checkout funnel, because a one second delay and a confusing payment step are what quietly cost you the sale.",
    icon: "shopping",
    deliverables: [
      "Storefront design and build",
      "Product catalogue and inventory sync",
      "Razorpay / Stripe / UPI checkout",
      "Abandoned cart recovery",
      "Order, shipping and returns flow",
      "Sales analytics dashboard",
    ],
    stack: ["Shopify Hydrogen", "Next.js Commerce", "Razorpay", "Stripe"],
    timeline: "4 - 10 weeks",
    outcomes: [
      { label: "Checkout steps", value: "2" },
      { label: "Payment modes", value: "UPI + Cards" },
      { label: "Conversion focus", value: "Funnel tuned" },
    ],
  },
  {
    slug: "ai-ad-creative",
    title: "AI Ad Creative",
    sanskrit: "Prachara",
    short:
      "Performance ad creative at volume - dozens of on-brand variants for testing, not one precious hero asset.",
    description:
      "Paid social rewards volume and iteration, which is exactly where traditional creative production stalls. We build you a repeatable pipeline: brand-locked templates, AI-generated variants across headline, hook and visual, then a review step where a human approves everything before it ships. You get enough creative to actually test, without a studio day for every idea.",
    icon: "megaphone",
    deliverables: [
      "Brand kit locked into every generation",
      "Static and motion variants for Meta, Google, LinkedIn",
      "Headline, hook and CTA variations for testing",
      "Human review and approval before anything runs",
      "Sized and exported for every placement",
      "Monthly refresh cycle to beat ad fatigue",
    ],
    stack: ["Adobe Firefly", "Midjourney", "Figma", "Meta Ads", "Google Ads"],
    timeline: "1 - 3 weeks",
    outcomes: [
      { label: "Variants / cycle", value: "30+" },
      { label: "Turnaround", value: "3 - 5 days" },
      { label: "Human reviewed", value: "100%" },
    ],
  },
  {
    slug: "ai-video-production",
    title: "AI Video Production",
    sanskrit: "Drishya",
    short:
      "Product explainers, ad cuts and social video - produced with AI tooling, finished by editors.",
    description:
      "Short-form video that used to need a crew, a studio and a fortnight. We script, generate and edit using AI video and voice tooling, then a human editor grades, cuts and finishes it so the result is something you would actually put your logo on. Best suited to explainers, product demos, social cutdowns and ad variants.",
    icon: "clapperboard",
    deliverables: [
      "Script and storyboard, written with you",
      "AI-generated footage, voiceover and subtitles",
      "Human edit, colour grade and sound pass",
      "Aspect variants: 16:9, 9:16, 1:1",
      "Licensed music and full commercial usage rights",
      "Source project files handed over",
    ],
    stack: ["Runway", "Veo", "ElevenLabs", "Premiere Pro", "After Effects"],
    timeline: "2 - 4 weeks",
    outcomes: [
      { label: "Typical length", value: "30 - 90s" },
      { label: "Aspect ratios", value: "3" },
      { label: "Revision rounds", value: "2" },
    ],
  },
  {
    slug: "maintenance-and-growth",
    title: "Maintenance & Growth",
    sanskrit: "Poshana",
    short:
      "We do not disappear at launch. Monitoring, updates, improvements - month after month.",
    description:
      "A product is a living thing. Our care plans cover security patches, uptime monitoring, performance budgets, backups, and a monthly block of improvement hours so your site keeps getting better instead of quietly rotting.",
    icon: "shield",
    deliverables: [
      "24/7 uptime and error monitoring",
      "Security patches and dependency updates",
      "Daily backups with tested restores",
      "Monthly performance and SEO report",
      "Dedicated improvement hours",
      "Priority support channel",
    ],
    stack: ["Sentry", "Vercel Analytics", "Better Stack", "GitHub Actions"],
    timeline: "Ongoing",
    outcomes: [
      { label: "Response time", value: "< 4 hrs" },
      { label: "Monitoring", value: "24/7" },
      { label: "Backups", value: "Daily" },
    ],
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
