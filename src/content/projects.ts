/**
 * Case studies.
 *
 * This file once held eight illustrative samples written to demonstrate the
 * layout, with invented client names, invented outcomes and invented metrics.
 * They were removed before the repository was made public: presented on a live
 * site or read out of a public repo, they would have read as real client work.
 *
 * It currently holds one entry, and that entry is an in-house build rather than
 * client work - see `internal` below for how it is labelled. There are still no
 * client case studies here.
 *
 * To publish client work, add entries below - with the client's written
 * permission and numbers you can substantiate. Everything else wires itself up:
 * the /work listing, the /work/[slug] detail page, the homepage section and
 * sitemap.xml all read from this array, and the homepage and listing sections
 * hide themselves while it is empty.
 */
export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  challenge: string;
  approach: string;
  result: string;
  services: string[];
  stack: string[];
  /**
   * Optional link to the running product. Renders a "View live site" button on
   * the case study when set, and nothing at all when omitted - not every piece
   * of work stays online, and a dead link is worse than no link.
   */
  liveUrl?: string;
  /**
   * Substantiated outcome figures. May be left empty: the metrics band and the
   * card's figure grid both hide themselves rather than render blank boxes, so
   * a case study can be published before the numbers are measured. Do not fill
   * this with estimates to make the layout look complete.
   */
  metrics: { label: string; value: string }[];
  /**
   * Marks a project we built for ourselves rather than for a client.
   *
   * An in-house build sitting unlabelled among client case studies implies a
   * client engagement that never happened, so it is labelled on both the card
   * and the detail page, and the sidebar reads "Built by" instead of "Client".
   * The three body sections are also retitled: a self-initiated product has no
   * client brief, so "The challenge / Our approach / The result" would be the
   * wrong frame for it.
   */
  internal?: boolean;
  /** Hex colour used for the card wash and metric figures, e.g. "#34BBB6". */
  accent: string;
  /** Featured projects appear in the homepage "Selected work" section. */
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "gst-ledger-invoice-suite",
    title: "GST Ledger & Invoice Suite",
    client: "Adiyogi Tech Ventures",
    category: "Web application",
    year: "2026",
    internal: true,
    summary:
      "A GST ledger and invoicing tool we built to learn the domain properly. It is a working prototype, and we run our own invoicing through it.",
    challenge:
      "Reading how GST invoicing is supposed to work is not the same as implementing it. We wanted the whole workflow in our hands - how a ledger actually balances, where the awkward cases in tax handling sit, what the existing tools make harder than it needs to be. The fastest way to learn that was to build one and then be the person who has to use it every month.",
    approach:
      "Built on Google AI Studio as a single web application covering the ledger and invoice generation. The scope was deliberately narrow: the parts we needed to understand, built properly, rather than a long feature list built shallowly. Using it ourselves kept the feedback loop short - anything awkward surfaced within a week rather than in a support ticket.",
    result:
      "A working prototype we use for our own invoicing. It is not a product, and it is not sold or supported. It is here because it is honest evidence of how we approach an unfamiliar domain: build the smallest real thing, live with it, and learn what the documentation does not tell you.",
    services: ["Web Application Development"],
    stack: ["Google AI Studio"],
    liveUrl: "https://adiyogitechventures-gst.ai.studio/",
    metrics: [],
    accent: "#59d7cd",
    featured: false,
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const featuredProjects = projects.filter((p) => p.featured);
