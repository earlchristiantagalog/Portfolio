"use client";

import Link from "next/link";
import { usePortfolio } from "./PortfolioContext";

export default function Hero() {
  const { data } = usePortfolio();
  const { hero, social } = data;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20 sm:px-6 lg:px-8">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] animate-float rounded-full bg-gradient-to-br from-primary/15 to-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] animate-float rounded-full bg-gradient-to-br from-accent/10 to-accent/5 blur-3xl" style={{ animationDelay: "-4s" }} />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,black_60%,transparent_100%)]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            {/* Availability badge */}
            <div className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 text-sm text-green-600 dark:text-green-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              {hero.availability}
            </div>

            {/* Heading */}
            <h1 className="mb-4 animate-fade-up text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl" style={{ animationDelay: "0.1s" }}>
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
                {hero.name}
              </span>
            </h1>

            {/* Tagline */}
            <p className="mb-8 animate-fade-up text-lg leading-relaxed text-muted-foreground sm:text-xl" style={{ animationDelay: "0.2s" }}>
              {hero.tagline}
            </p>

            {/* CTAs */}
            <div className="flex animate-fade-up flex-col items-center gap-4 sm:flex-row lg:items-start" style={{ animationDelay: "0.3s" }}>
              <Link
                href="/projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative">View My Work</span>
                <svg className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-xl border border-card-border bg-card px-7 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                Get In Touch
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>

            {/* Social links */}
            <div className="mt-10 flex animate-fade-up items-center gap-4 lg:items-start" style={{ animationDelay: "0.4s" }}>
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                Find me on
              </span>
              <div className="h-px flex-1 bg-card-border" />
              <div className="flex gap-2">
                <a href={social.github} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-card-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md" aria-label="GitHub">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-card-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md" aria-label="LinkedIn">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href={`mailto:${social.email}`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-card-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md" aria-label="Email">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Visual / Avatar placeholder */}
          <div className="hidden animate-fade-up lg:flex lg:justify-center" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <div className="flex h-80 w-80 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 shadow-2xl shadow-primary/10 ring-1 ring-white/10">
                <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.12),transparent_70%)]" />
                <div className="relative flex h-64 w-64 items-center justify-center rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/20 text-3xl">
                      {hero.name.charAt(0)}
                    </div>
                    <p className="text-sm font-medium text-foreground">{hero.name}</p>
                    <p className="text-xs text-muted-foreground">Full-Stack Developer</p>
                  </div>
                </div>
              </div>
              {/* Floating dots */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full border border-primary/20 bg-primary/5" />
              <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full border border-accent/20 bg-accent/5" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Scroll</span>
          <div className="h-8 w-5 rounded-full border-2 border-muted-foreground/20 p-1">
            <div className="mx-auto h-2 w-1 animate-bounce rounded-full bg-muted-foreground/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
