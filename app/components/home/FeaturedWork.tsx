"use client";

import Link from "next/link";
import { usePortfolio } from "../PortfolioContext";
import { Reveal } from "../effects/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectVisual } from "../ui/ProjectVisual";

export function FeaturedWork() {
  const { data } = usePortfolio();
  const featured = data.projects.items.slice(0, 3);

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="04"
            label="Selected work"
            title={data.content.featuredHeading}
            description={data.content.featuredDescription}
          />

          <Reveal delay={120} className="shrink-0">
            <Link href="/projects" className="link-arrow text-primary">
              Open archive
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {featured.map((project, index) => (
            <Reveal key={project.id} delay={index * 90}>
              <article className="hud hud-hover group flex h-full flex-col overflow-hidden">
                <ProjectVisual
                  src={project.image}
                  title={project.title}
                  index={index}
                />

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="label-sm text-primary/70">
                      {project.category === "School Projects" ? "Academic" : "Personal"}
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

                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                    <Link href="/projects" className="transition-colors hover:text-primary">
                      {project.title}
                    </Link>
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
