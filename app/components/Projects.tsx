"use client";

import { useState } from "react";
import Image from "next/image";
import { usePortfolio } from "./PortfolioContext";

export default function Projects() {
  const { data } = usePortfolio();
  const { projects } = data;
  const [activeTab, setActiveTab] = useState(projects.categories[0]);

  const filtered =
    activeTab === "All"
      ? projects.items
      : projects.items.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="relative bg-muted/50 px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Portfolio
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {projects.heading}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {projects.subtitle}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex w-full max-w-full justify-start overflow-x-auto rounded-xl border border-card-border bg-card p-1 shadow-sm sm:w-auto sm:justify-center">
            {projects.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`whitespace-nowrap rounded-lg px-5 py-2 text-sm font-medium transition-all ${
                  activeTab === cat
                    ? "bg-primary text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl border border-card-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image area */}
              <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-accent/5">
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <Image
                  src={project.image}
                  alt={project.title}
                  width={56}
                  height={56}
                  className="opacity-40 transition-all duration-500 group-hover:scale-110 group-hover:opacity-60"
                />
                {/* Hover overlay links */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="translate-y-4 rounded-xl bg-card/90 p-3 text-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-primary hover:text-white group-hover:translate-y-0"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="translate-y-4 rounded-xl bg-card/90 p-3 text-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-primary hover:text-white group-hover:translate-y-0"
                    style={{ transitionDelay: "0.05s" }}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h3 className="min-w-0 truncate text-lg font-bold text-foreground">
                    {project.title}
                  </h3>
                  <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {project.category === "School Projects" ? "School" : "Personal"}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
