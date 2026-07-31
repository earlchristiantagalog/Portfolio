"use client";

import Image from "next/image";
import { usePortfolio } from "./PortfolioContext";

export default function About() {
  const { data } = usePortfolio();
  const { about } = data;

  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 lg:px-8">
      {/* Section background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-72 w-72 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            About Me
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Know Me Better
          </h2>
          <p className="mt-3 text-muted-foreground">
            A quick overview of who I am, what I do, and my academic journey
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Bio & Skills */}
          <div className="space-y-8">
            {/* Bio */}
            <div className="space-y-4">
              {about.bio.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h3 className="mb-5 text-lg font-semibold text-foreground">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {about.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-xl border border-card-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Education Card */}
          <div className="flex items-start justify-center lg:justify-end">
            <div className="group w-full max-w-md">
              <div className="overflow-hidden rounded-2xl border border-card-border bg-card shadow-lg shadow-black/5 transition-all hover:shadow-xl">
                {/* Logo area */}
                <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_60%)]" />
                  <div className="relative flex items-center justify-center">
                    <Image
                      src={about.education.logo}
                      alt={`${about.education.school} Logo`}
                      width={120}
                      height={63}
                      unoptimized
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="text-lg font-bold text-foreground">
                        {about.education.school}
                      </h4>
                      <p className="mt-0.5 text-sm font-medium text-primary">
                        {about.education.degree}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {about.education.status}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {about.education.description}
                  </p>

                  {/* Timeline accent */}
                  <div className="mt-6 flex items-center gap-3 border-t border-card-border pt-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Expected Graduation: 2028
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
