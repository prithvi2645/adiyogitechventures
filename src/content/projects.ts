/**
 * Case studies.
 *
 * Deliberately empty. This file previously held eight illustrative samples
 * written to demonstrate the layout, with invented client names, invented
 * outcomes and invented metrics. They were removed before the repository was
 * made public: presented on a live site or read out of a public repo, they
 * would have read as real client work.
 *
 * To publish real work, add entries below - with the client's written
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

export const projects: Project[] = [];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const featuredProjects = projects.filter((p) => p.featured);
