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
  metrics: { label: string; value: string }[];
  /** Hex colour used for the card wash and metric figures, e.g. "#34BBB6". */
  accent: string;
  /** Featured projects appear in the homepage "Selected work" section. */
  featured: boolean;
};

export const projects: Project[] = [];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const featuredProjects = projects.filter((p) => p.featured);
