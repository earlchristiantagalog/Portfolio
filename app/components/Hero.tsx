"use client";

import { usePortfolio } from "./PortfolioContext";

export default function Hero() {
  const { data } = usePortfolio();
  const { hero, social } = data;

  return (
    <section className="flex min-h-screen items-center justify-center px-4 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
          <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
          {hero.availability}
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            {hero.name}
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-500 dark:text-gray-400 sm:text-xl">
          {hero.tagline}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-500/40"
          >
            View My Work
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:-translate-y-0.5 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-700"
          >
            Get In Touch
          </a>
        </div>

        <div className="mt-16 flex items-center justify-center gap-5">
          <a href={social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-white" aria-label="GitHub">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-white" aria-label="LinkedIn">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href={`mailto:${social.email}`} className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-white" aria-label="Email">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
