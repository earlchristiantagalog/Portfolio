"use client";

import Link from "next/link";
import { usePortfolio } from "./PortfolioContext";

export default function Hero() {
  const { data } = usePortfolio();
  const { hero, social } = data;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-24 pt-24 sm:px-6 sm:pb-20 lg:px-8">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] animate-float animate-morph rounded-full bg-gradient-to-br from-primary/15 to-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] animate-float rounded-full bg-gradient-to-br from-accent/10 to-accent/5 blur-3xl" style={{ animationDelay: "-4s" }} />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,black_60%,transparent_100%)]" />

      {/* Radial spotlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            {/* Availability badge */}
            <div className={`mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border px-4 py-1.5 text-sm ${
              hero.availability
                ? "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400"
                : "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400"
            }`}>
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                  hero.availability ? "bg-green-400" : "bg-red-400"
                }`} />
                <span className={`relative inline-flex h-2 w-2 rounded-full ${
                  hero.availability ? "bg-green-500" : "bg-red-500"
                }`} />
              </span>
              {hero.availability ? "Available for work" : "Not available"}
            </div>

            {/* Heading */}
            <h1 className="mb-6 animate-fade-up text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl" style={{ animationDelay: "0.1s" }}>
              <span className="block text-muted-foreground/80">Hi, I&apos;m</span>
              <span className="mt-1 block bg-gradient-to-r from-primary via-primary-light to-accent bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
                {hero.name}
              </span>
            </h1>

            {/* Tagline */}
            <p className="mb-10 max-w-lg animate-fade-up text-lg leading-relaxed text-muted-foreground sm:text-xl lg:max-w-xl" style={{ animationDelay: "0.2s" }}>
              {hero.tagline}
            </p>

            {/* CTAs */}
            <div className="flex animate-fade-up flex-col items-center gap-4 sm:flex-row lg:items-start" style={{ animationDelay: "0.3s" }}>
              <Link
                href="/projects"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative">View My Work</span>
                <svg className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-2xl border border-card-border bg-card/80 px-8 py-3.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
              >
                Get In Touch
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>

            {/* Social links */}
            <div className="mt-12 flex animate-fade-up flex-col items-center gap-4 sm:flex-row lg:items-start" style={{ animationDelay: "0.4s" }}>
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                Find me on
              </span>
              <div className="hidden h-px w-full max-w-24 bg-card-border sm:block sm:flex-1" />
              <div className="flex gap-3">
                <a href={social.github} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl border border-card-border bg-card/80 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:text-primary hover:shadow-lg hover:shadow-primary/10" aria-label="GitHub">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl border border-card-border bg-card/80 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:text-primary hover:shadow-lg hover:shadow-primary/10" aria-label="LinkedIn">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href={`mailto:${social.email}`} className="flex h-10 w-10 items-center justify-center rounded-xl border border-card-border bg-card/80 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:text-primary hover:shadow-lg hover:shadow-primary/10" aria-label="Email">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Realistic University ID Card with Lanyard */}
          <div className="hidden animate-fade-up lg:flex lg:justify-center" style={{ animationDelay: "0.3s" }}>
            <div className="relative flex flex-col items-center">
              {/* Anchor point */}
              <div className="relative z-20 h-2 w-2 rounded-full bg-gray-400 shadow-md dark:bg-gray-500" />
              
              {/* Lanyard + ID Card Swinging Assembly */}
              <div className="origin-top animate-swing" style={{ transformOrigin: "center top" }}>
                {/* Lanyard Straps */}
                <div className="relative z-10 -mb-2 flex flex-col items-center">
                  <svg className="h-24 w-44" viewBox="0 0 176 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Left strap - main */}
                    <path d="M44 0 L44 64" stroke="url(#strapLeft)" strokeWidth="10" strokeLinecap="butt" fill="none" />
                    {/* Left strap - highlight */}
                    <path d="M44 0 L44 64" stroke="url(#strapHighlight)" strokeWidth="3" strokeLinecap="butt" fill="none" opacity="0.4" />
                    {/* Right strap - main */}
                    <path d="M132 0 L132 64" stroke="url(#strapRight)" strokeWidth="10" strokeLinecap="butt" fill="none" />
                    {/* Right strap - highlight */}
                    <path d="M132 0 L132 64" stroke="url(#strapHighlight)" strokeWidth="3" strokeLinecap="butt" fill="none" opacity="0.4" />
                    
                    {/* Left strap bend to clip */}
                    <path d="M44 64 Q44 76 56 76 L72 76" stroke="#1d4ed8" strokeWidth="10" strokeLinecap="butt" fill="none" />
                    {/* Right strap bend to clip */}
                    <path d="M132 64 Q132 76 120 76 L104 76" stroke="#1d4ed8" strokeWidth="10" strokeLinecap="butt" fill="none" />
                    
                    {/* Clip body - metal */}
                    <rect x="72" y="70" width="32" height="20" rx="3" fill="url(#clipMetal)" stroke="#71717a" strokeWidth="1.5" />
                    {/* Clip inner */}
                    <rect x="78" y="76" width="20" height="8" rx="2" fill="#52525b" />
                    {/* Clip shine */}
                    <rect x="74" y="72" width="28" height="3" rx="1" fill="url(#clipShine)" opacity="0.6" />
                    {/* Clip hook */}
                    <path d="M84 90 L84 96 Q84 98 86 98 L90 98 Q92 98 92 96 L92 90" fill="#71717a" stroke="#52525b" strokeWidth="1" />
                    
                    <defs>
                      <linearGradient id="strapLeft" x1="44" y1="0" x2="44" y2="64" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#1e40af" />
                        <stop offset="0.3" stopColor="#2563eb" />
                        <stop offset="0.7" stopColor="#1d4ed8" />
                        <stop offset="1" stopColor="#1e40af" />
                      </linearGradient>
                      <linearGradient id="strapRight" x1="132" y1="0" x2="132" y2="64" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#1e40af" />
                        <stop offset="0.3" stopColor="#2563eb" />
                        <stop offset="0.7" stopColor="#1d4ed8" />
                        <stop offset="1" stopColor="#1e40af" />
                      </linearGradient>
                      <linearGradient id="strapHighlight" x1="44" y1="0" x2="44" y2="64" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#60a5fa" />
                        <stop offset="0.5" stopColor="#93c5fd" />
                        <stop offset="1" stopColor="#60a5fa" />
                      </linearGradient>
                      <linearGradient id="clipMetal" x1="72" y1="70" x2="72" y2="90" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#a1a1aa" />
                        <stop offset="0.3" stopColor="#d4d4d8" />
                        <stop offset="0.6" stopColor="#a1a1aa" />
                        <stop offset="1" stopColor="#71717a" />
                      </linearGradient>
                      <linearGradient id="clipShine" x1="74" y1="72" x2="74" y2="75" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#fafafa" />
                        <stop offset="1" stopColor="#d4d4d8" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* ID Card */}
                <div className="relative mx-auto w-[280px] overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-2xl shadow-black/30 dark:border-gray-700 dark:bg-gray-100">
                  {/* Blue Header */}
                  <div className="bg-primary px-4 py-2 text-center">
                    <p className="text-[11px] font-extrabold uppercase tracking-wide text-white">Full-Stack Developer</p>
                    <p className="text-[8px] text-white/80">Remote &bull; Freelance &bull; Open Source</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    {/* Photo + ID Number Row */}
                    <div className="mb-3 flex items-start gap-4">
                      {/* Photo */}
                      <div className="flex h-[100px] w-[80px] flex-shrink-0 items-center justify-center rounded border-2 border-primary/30 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-200 dark:to-slate-300">
                        <span className="text-3xl font-bold text-primary">{hero.name.charAt(0)}</span>
                      </div>
                      {/* ID Number */}
                      <div className="flex-1">
                        <div className="rounded border-2 border-primary/20 bg-slate-50 px-3 py-2 text-center dark:bg-slate-200">
                          <p className="text-xl font-bold tracking-wider text-primary">DEV-8008</p>
                        </div>
                        <p className="mt-0.5 text-center text-[8px] font-semibold uppercase tracking-widest text-muted-foreground">ID NO.</p>
                      </div>
                    </div>

                    {/* Name Field */}
                    <div className="mb-3">
                      <div className="border-b-2 border-primary/30 pb-1 pt-1">
                        <p className="text-sm font-bold text-foreground">{hero.name}</p>
                      </div>
                      <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-widest text-muted-foreground">NAME</p>
                    </div>

                    {/* Signature Field */}
                    <div className="mb-3">
                      <div className="border-b border-gray-300 pb-4 pt-1">
                        <p className="text-xs italic text-gray-400">{'{signature}'}</p>
                      </div>
                      <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-widest text-muted-foreground">SIGNATURE</p>
                    </div>
                  </div>

                  {/* Yellow Footer - Course/Specialization */}
                  <div className="bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-center dark:from-amber-500 dark:to-amber-600">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-black/80">Full-Stack Development</p>
                    <p className="text-[8px] font-medium uppercase text-black/60">Web &bull; Mobile &bull; Cloud</p>
                  </div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -right-8 top-12 h-16 w-16 rounded-full border border-primary/20 bg-primary/5" />
              <div className="absolute -bottom-4 -left-8 h-12 w-12 rounded-full border border-accent/20 bg-accent/5" />
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
