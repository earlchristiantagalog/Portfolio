"use client";

import { useState } from "react";
import Image from "next/image";

const categories = ["All", "School Projects", "Personal Projects"] as const;
type Category = (typeof categories)[number];

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  live: string;
  category: Exclude<Category, "All">;
}

const projects: Project[] = [
  {
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
    title: "Portfolio CMS",
    description:
      "Headless CMS for managing portfolio content with an intuitive admin panel.",
    image: "/next.svg",
    tags: ["Next.js", "Sanity", "Vercel"],
    github: "https://github.com",
    live: "https://vercel.com",
    category: "Personal Projects",
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<Category>("All");

  const filtered =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <section
      id="projects"
      className="bg-gray-50 px-4 py-24 dark:bg-gray-900 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Projects
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-gray-500 dark:text-gray-400">
          Here are some of the projects I&apos;ve worked on
        </p>

        {/* Tabs */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`rounded-lg px-5 py-2 text-sm font-medium transition-all ${
                  activeTab === cat
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <div
              key={project.title}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={56}
                  height={56}
                  className="opacity-50 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    {project.category === "School Projects" ? "School" : "Personal"}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {project.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 border-t border-gray-100 pt-4 dark:border-gray-700">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Live
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
