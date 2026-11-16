import "server-only";
import { z } from "zod";

const text = z.string().max(10000);
const shortText = z.string().max(2048);
const list = z.array(shortText).max(100);

export const portfolioSchema = z.object({
  content: z.object({
    role: shortText, aboutIntro: text, principles: z.array(text).max(100),
    graduationYear: shortText, expertiseHeading: shortText, expertiseDescription: text,
    expertise: z.array(z.object({ title: shortText, subtitle: shortText, description: text, stack: list }).strict()).max(20),
    overviewHeading: shortText, overviewDescription: text,
    featuredHeading: shortText, featuredDescription: text,
    ctaHeading: shortText, ctaDescription: text,
    footerDescription: text, contactAvailability: text,
  }).strict(),
  hero: z.object({ name: shortText, title: shortText, tagline: text, availability: z.boolean() }).strict(),
  about: z.object({
    bio: z.array(text).max(100),
    skills: list,
    education: z.object({ school: shortText, degree: shortText, status: shortText, description: text, logo: shortText }).strict(),
  }).strict(),
  projects: z.object({
    heading: shortText,
    subtitle: text,
    categories: list,
    items: z.array(z.object({
      id: shortText,
      title: shortText,
      description: text,
      image: shortText,
      tags: list,
      github: shortText,
      live: shortText,
      category: z.enum(["School Projects", "Personal Projects"]),
      finished: z.boolean(),
    }).strict()).max(200),
  }).strict(),
  contact: z.object({ heading: shortText, subtitle: text, acceptingMessages: z.boolean().default(true) }).strict(),
  social: z.object({ github: shortText, linkedin: shortText, email: shortText }).strict(),
  meta: z.object({ title: shortText, description: text }).strict(),
}).strict();

export const messageSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  subject: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(1).max(10000),
}).strict();
