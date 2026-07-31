export interface HeroData {
  name: string;
  title: string;
  tagline: string;
  availability: string;
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

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  projects: ProjectsData;
  contact: ContactData;
  social: SocialData;
  meta: MetaData;
}

export const defaultData: PortfolioData = {
  hero: {
    name: "John Doe",
    title: "JD",
    tagline:
      "A passionate Full-Stack Developer crafting modern web experiences with clean code and thoughtful design.",
    availability: "Available for work",
  },
  about: {
    bio: [
      "I'm a first-year college student pursuing a Bachelor of Science in Information Technology at the University of Cebu. I have a strong passion for web development and enjoy learning new technologies to build modern, user-friendly applications.",
      "Outside of coding, I enjoy exploring new tools, collaborating with fellow developers, and continuously improving my skills to grow in the tech industry.",
    ],
    skills: [
      "JavaScript",
      "HTML/CSS",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "Tailwind CSS",
      "Git",
    ],
    education: {
      school: "University of Cebu",
      degree: "Bachelor of Science in Information Technology",
      status: "First Year Student",
      description:
        "Currently learning the fundamentals of IT, programming, and web development. Eager to apply classroom knowledge to real-world projects.",
      logo: "/uc-logo-bg-160x83.c24343b851e5b064daf9.png",
    },
  },
  projects: {
    heading: "Projects",
    subtitle: "Here are some of the projects I've worked on",
    categories: ["All", "School Projects", "Personal Projects"],
    items: [
      {
        id: "1",
        title: "Student Enrollment System",
        description:
          "A web-based enrollment system for managing student registration and records.",
        image: "/file.svg",
        tags: ["HTML", "CSS", "JavaScript", "PHP"],
        github: "https://github.com",
        live: "https://vercel.com",
        category: "School Projects",
      },
      {
        id: "2",
        title: "Library Management App",
        description:
          "System for tracking books, borrowing, and returns with a simple dashboard.",
        image: "/globe.svg",
        tags: ["React", "Node.js", "MongoDB"],
        github: "https://github.com",
        live: "https://vercel.com",
        category: "School Projects",
      },
      {
        id: "3",
        title: "Class Attendance Tracker",
        description:
          "Attendance monitoring tool with CSV export and summary reports.",
        image: "/window.svg",
        tags: ["Next.js", "TypeScript", "Tailwind"],
        github: "https://github.com",
        live: "https://vercel.com",
        category: "School Projects",
      },
      {
        id: "4",
        title: "E-Commerce Platform",
        description:
          "A full-stack e-commerce solution with cart, checkout, and payment integration.",
        image: "/file.svg",
        tags: ["Next.js", "Stripe", "PostgreSQL"],
        github: "https://github.com",
        live: "https://vercel.com",
        category: "Personal Projects",
      },
      {
        id: "5",
        title: "Weather Dashboard",
        description:
          "Beautiful weather app with 7-day forecasts, interactive maps, and alerts.",
        image: "/window.svg",
        tags: ["TypeScript", "OpenWeather API", "Chart.js"],
        github: "https://github.com",
        live: "https://vercel.com",
        category: "Personal Projects",
      },
      {
        id: "6",
        title: "Portfolio CMS",
        description:
          "Headless CMS for managing portfolio content with an intuitive admin panel.",
        image: "/next.svg",
        tags: ["Next.js", "Sanity", "Vercel"],
        github: "https://github.com",
        live: "https://vercel.com",
        category: "Personal Projects",
      },
    ],
  },
  contact: {
    heading: "Get In Touch",
    subtitle: "Have a project in mind or just want to chat? Feel free to reach out!",
  },
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "john@example.com",
  },
  meta: {
    title: "John Doe | Full-Stack Developer",
    description:
      "Professional portfolio of John Doe — Full-Stack Developer specializing in modern web experiences.",
  },
};
