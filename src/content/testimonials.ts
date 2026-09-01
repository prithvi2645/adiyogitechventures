/**
 * Client testimonials.
 *
 * Deliberately empty. This file previously held sample quotes written for
 * layout purposes, attributed to "Sample Name" at invented companies. They were
 * removed before the repository was made public.
 *
 * Add only real, attributable quotes you have written permission to publish.
 * The homepage section hides itself while this array is empty.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Shown in the avatar circle, e.g. "KW". */
  initials: string;
  /** Stars rendered, 1-5. */
  rating: number;
};

export const testimonials: Testimonial[] = [];
