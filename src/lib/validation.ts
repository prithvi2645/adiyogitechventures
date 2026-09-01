import { z } from "zod";

export const budgetOptions = [
  "Under INR 1 Lakh",
  "INR 1 - 3 Lakh",
  "INR 3 - 8 Lakh",
  "INR 8 Lakh +",
  "Not sure yet",
] as const;

export const timelineOptions = [
  "ASAP",
  "1 - 2 months",
  "3 - 6 months",
  "Just exploring",
] as const;

export const serviceOptions = [
  "Website Design & Development",
  "Web Application Development",
  "Mobile App Development",
  "UI / UX Design",
  "E-Commerce Solutions",
  "Maintenance & Growth",
  "Something else",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "That name is a little too long"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("That does not look like a valid email"),
  phone: z
    .string()
    .trim()
    .max(24, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  service: z.enum(serviceOptions, {
    errorMap: () => ({ message: "Please choose a service" }),
  }),
  budget: z.enum(budgetOptions).optional().or(z.literal("")),
  timeline: z.enum(timelineOptions).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more - at least 10 characters")
    .max(4000, "Please keep it under 4000 characters"),
  // Honeypot: real users never fill this hidden field.
  website: z.string().max(0, "Submission rejected").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof ContactInput, string>>;
};
