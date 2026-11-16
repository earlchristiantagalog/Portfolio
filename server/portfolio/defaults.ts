import 'server-only';
import type { PortfolioData } from '@/app/data/portfolio-data';

export const defaultData: PortfolioData = {
  content: {
    role: "Full-stack developer",
    aboutIntro: "A quick overview of who I am, what I build, and the academic route I'm currently on.",
    principles: ["Clarity over cleverness.", "Design systems, not one-off screens.", "Ship, measure, refine."],
    graduationYear: "2028",
    expertiseHeading: "Thoughtful work, built to last.",
    expertiseDescription: "Four connected layers — from interface to infrastructure — that I use to turn ideas into working products.",
    expertise: [
      { title: "Frontend", subtitle: "Interface systems", description: "Accessible, responsive interfaces assembled from composable components and a strict design system.", stack: ["React", "Next.js", "TypeScript", "Tailwind"] },
      { title: "Backend", subtitle: "Service layer", description: "Typed APIs, authentication flows and server logic built to stay predictable under real traffic.", stack: ["Node.js", "Python", "PHP", "REST"] },
      { title: "Database", subtitle: "Data architecture", description: "Relational and document stores modelled for clarity, with serverless drivers where they fit.", stack: ["PostgreSQL", "MongoDB", "Neon", "SQL"] },
      { title: "Tooling", subtitle: "Workflow", description: "Version control, design hand-off and deployment pipelines that keep the feedback loop short.", stack: ["Git", "VS Code", "Figma", "Vercel"] },
    ],
    overviewHeading: "A little about the work.",
    overviewDescription: "A live readout of the projects, tools and academic milestones behind the interface.",
    featuredHeading: "Recent builds",
    featuredDescription: "A short excerpt from the project archive. Each build ships with its own notes, stack and links.",
    ctaHeading: "Let's build something meaningful.",
    ctaDescription: "Have a project in mind, a question, or just want to compare notes on the stack? The channel is open.",
    footerDescription: "Designing and building modern web experiences with clean code, deliberate interfaces and a bias for shipping.",
    contactAvailability: "Currently open to new opportunities, collaborations and freelance work. Whether you have a project idea, a question or just want to connect, the channel is open.",
  },
  hero: {
    name: "John Doe",
    title: "JD",
    tagline:
      "A passionate Full-Stack Developer crafting modern web experiences with clean code and thoughtful design.",
    availability: true,
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
      logo: "/UC_logo.png",
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
        image: "",
        tags: ["HTML", "CSS", "JavaScript", "PHP"],
        github: "https://github.com",
        live: "https://vercel.com",
        category: "School Projects",
        finished: true,
      },
      {
        id: "2",
        title: "Library Management App",
        description:
          "System for tracking books, borrowing, and returns with a simple dashboard.",
        image: "",
        tags: ["React", "Node.js", "MongoDB"],
        github: "https://github.com",
        live: "https://vercel.com",
        category: "School Projects",
        finished: true,
      },
      {
        id: "3",
        title: "Class Attendance Tracker",
        description:
          "Attendance monitoring tool with CSV export and summary reports.",
        image: "",
        tags: ["Next.js", "TypeScript", "Tailwind"],
        github: "https://github.com",
        live: "https://vercel.com",
        category: "School Projects",
        finished: true,
      },
      {
        id: "4",
        title: "E-Commerce Platform",
        description:
          "A full-stack e-commerce solution with cart, checkout, and payment integration.",
        image: "",
        tags: ["Next.js", "Stripe", "PostgreSQL"],
        github: "https://github.com",
        live: "https://vercel.com",
        category: "Personal Projects",
        finished: true,
      },
      {
        id: "5",
        title: "Weather Dashboard",
        description:
          "Beautiful weather app with 7-day forecasts, interactive maps, and alerts.",
        image: "",
        tags: ["TypeScript", "OpenWeather API", "Chart.js"],
        github: "https://github.com",
        live: "https://vercel.com",
        category: "Personal Projects",
        finished: true,
      },
      {
        id: "6",
        title: "Portfolio CMS",
        description:
          "Headless CMS for managing portfolio content with an intuitive admin panel.",
        image: "",
        tags: ["Next.js", "Sanity", "Vercel"],
        github: "https://github.com",
        live: "https://vercel.com",
        category: "Personal Projects",
        finished: true,
      },
    ],
  },
  contact: {
    heading: "Get In Touch",
    subtitle: "Have a project in mind or just want to chat? Feel free to reach out!",
    acceptingMessages: true,
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
