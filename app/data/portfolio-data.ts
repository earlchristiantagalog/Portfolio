export interface HeroData {
  name: string;
  title: string;
  tagline: string;
  availability: boolean;
}

export interface Education {
  school: string;
  degree: string;
  status: string;
  description: string;
  logo: string;
}

export interface AboutData {
  bio: string[];
  skills: string[];
  education: Education;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  live: string;
  category: "School Projects" | "Personal Projects";
  finished: boolean;
}

export interface ProjectsData {
  heading: string;
  subtitle: string;
  categories: string[];
  items: Project[];
}

export interface ContactData {
  heading: string;
  subtitle: string;
  acceptingMessages: boolean;
}

export interface SocialData {
  github: string;
  linkedin: string;
  email: string;
}

export interface MetaData {
  title: string;
  description: string;
}

export interface SiteContent {
  role: string;
  aboutIntro: string;
  principles: string[];
  graduationYear: string;
  expertiseHeading: string;
  expertiseDescription: string;
  expertise: { title: string; subtitle: string; description: string; stack: string[] }[];
  overviewHeading: string;
  overviewDescription: string;
  featuredHeading: string;
  featuredDescription: string;
  ctaHeading: string;
  ctaDescription: string;
  footerDescription: string;
  contactAvailability: string;
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  projects: ProjectsData;
  contact: ContactData;
  social: SocialData;
  meta: MetaData;
  content: SiteContent;
}
