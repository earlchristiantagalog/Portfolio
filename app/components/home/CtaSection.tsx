"use client";

import Link from "next/link";
import { Reveal } from "../effects/Reveal";
import { usePortfolio } from "../PortfolioContext";

export function CtaSection() {
  const { data } = usePortfolio();
  return (
    <section className="relative px-4 pb-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="hud clip-corner relative overflow-hidden px-6 py-16 text-center sm:px-12 sm:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[90px]" />
              <div className="holo-ring absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-orbit opacity-60" />
              <div className="holo-ring absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 animate-orbit-reverse opacity-40" />
              <div className="grid-dense absolute inset-0 opacity-30" />
            </div>

            <span className="label flex items-center justify-center gap-2 text-primary">
              <span className="status-ring" aria-hidden="true" />
              Let&apos;s connect
            </span>

            <h2 className="page-title mt-6 text-foreground">
              {data.content.ctaHeading}
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {data.content.ctaDescription}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="btn btn-primary clip-corner">
                Start a project
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/about" className="btn btn-ghost clip-corner">
                Read dossier
              </Link>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
