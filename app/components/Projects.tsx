"use client";

import { useState } from "react";
import { usePortfolio } from "./PortfolioContext";
import { ProjectVisual } from "./ui/ProjectVisual";
import { Reveal } from "./effects/Reveal";

export default function Projects() {
  const { data } = usePortfolio();
  const { projects } = data;
  const [selected, setSelected] = useState(projects.categories[0]);

  const active = projects.categories.includes(selected)
    ? selected
    : projects.categories[0];

  const filtered =
    active === "All"
      ? projects.items
      : projects.items.filter((project) => project.category === active);

  const countFor = (category: string) =>
    category === "All"
      ? projects.items.length
      : projects.items.filter((project) => project.category === category).length;

  const shipped = projects.items.filter((project) => project.finished).length;

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:px-10 lg:pt-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-8 border-b border-card-border/60 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="label text-primary">Archive / 02</span>
              <span className="h-px w-8 bg-primary/50" aria-hidden="true" />
              <span className="label">Project index</span>
            </div>

            <h1 className="page-title mt-6 text-foreground">
              {projects.heading}
              <span className="text-primary">.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {projects.subtitle}
            </p>
          </div>

          <div className="grid w-full max-w-sm grid-cols-3 divide-x divide-card-border/70 border border-card-border/70 bg-card/40">
            {[
              { key: "Total", value: String(projects.items.length).padStart(2, "0") },
              { key: "Shipped", value: String(shipped).padStart(2, "0") },
              { key: "Tracks", value: String(Math.max(projects.categories.length - 1, 0)).padStart(2, "0") },
            ].map((stat) => (
              <div key={stat.key} className="px-4 py-3">
                <p className="label-sm">{stat.key}</p>
                <p className="mono mt-1 text-xl font-semibold text-foreground">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1"
            role="group"
            aria-label="Filter projects by category"
          >
            {projects.categories.map((category) => {
              const isActive = active === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelected(category)}
                  aria-pressed={isActive}
                  className={`clip-corner-sm flex shrink-0 items-center gap-2 border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all ${
                    isActive
                      ? "border-primary/60 bg-gradient-to-r from-primary to-accent text-on-primary shadow-[0_10px_30px_-16px_rgb(var(--primary)/0.9)]"
                      : "border-card-border bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {category}
                  <span
                    className={`text-[9px] ${isActive ? "opacity-70" : "text-primary/60"}`}
                  >
                    [{String(countFor(category)).padStart(2, "0")}]
                  </span>
                </button>
              );
            })}
          </div>

          <p className="label-sm flex items-center gap-2 text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-primary" aria-hidden="true" />
            Showing {String(filtered.length).padStart(2, "0")} of{" "}
            {String(projects.items.length).padStart(2, "0")}
          </p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="hud mt-8 flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
            <span className="label text-primary">No signal</span>
            <p className="text-sm text-muted-foreground">
              No projects in this category yet. Check the full archive instead.
            </p>
            <button
              type="button"
              onClick={() => setSelected("All")}
              className="btn btn-ghost clip-corner-sm mt-2 px-4 py-2.5"
            >
              Reset filter
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project, index) => (
              <Reveal key={project.id} delay={index * 70}>
                <article className="hud hud-hover group flex h-full flex-col overflow-hidden">
                  <ProjectVisual
                    src={project.image}
                    title={project.title}
                    index={index}
                  />

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="label-sm text-primary/70">
                        {project.category === "School Projects"
                          ? "Academic"
                          : "Personal"}
                      </span>
                      <span
                        className={`label-sm flex items-center gap-1.5 ${
                          project.finished
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        <span className="h-1 w-1 rounded-full bg-current" aria-hidden="true" />
                        {project.finished ? "Shipped" : "W.I.P"}
                      </span>
                    </div>

                    <h2 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-foreground">
                      {project.title}
                    </h2>

                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-card-border/70 pt-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-arrow text-muted-foreground hover:text-primary"
                      >
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Source
                      </a>

                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-arrow text-primary"
                      >
                        Live
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
