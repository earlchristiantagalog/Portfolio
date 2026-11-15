"use client";

import Link from "next/link";
import { usePortfolio } from "./PortfolioContext";
import { SocialLinks } from "./ui/SocialLinks";

export default function Hero() {
  const { data } = usePortfolio();
  const { hero, social } = data;

  return (
    <section className="relative overflow-hidden px-5 pb-12 pt-32 sm:px-8 sm:pt-40 lg:px-10 lg:pt-48">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-14 lg:grid-cols-[1fr_0.55fr] lg:gap-16">
          <div className="relative z-10">
            <div className="label flex animate-fade-up flex-wrap items-center gap-3">
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              Independent portfolio <span className="text-primary">/</span> {data.content.role}
            </div>
            <h1 className="mt-8 animate-fade-up" style={{ animationDelay: "80ms" }}>
              <span className="label block">Hello, I&apos;m</span>
              <span className="hero-name mt-5 block text-foreground">{hero.name}<span className="text-primary">.</span></span>
            </h1>
            <p className="mt-8 max-w-xl animate-fade-up text-base leading-relaxed text-muted-foreground sm:text-lg" style={{ animationDelay: "160ms" }}>
              {hero.tagline}
            </p>
            <div className="mt-10 flex animate-fade-up flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
              <Link href="/projects" className="btn btn-primary clip-corner">
                Explore my work <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/contact" className="btn btn-ghost clip-corner">
                Get in touch <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="luxury-orbit relative flex min-h-[280px] items-center justify-center overflow-hidden sm:min-h-[360px]" aria-hidden="true">
            <div className="luxury-orbit-ring luxury-orbit-ring-outer" />
            <div className="luxury-orbit-ring luxury-orbit-ring-inner" />
            <div className="luxury-orbit-core" />
            <span className="absolute bottom-6 left-6 label-sm">A considered approach</span>
            <span className="absolute right-6 top-6 label-sm text-primary">01 / 04</span>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-card-border/70 pt-6 sm:mt-24">
          <div className="flex items-center gap-3">
            <span className={`h-2 w-2 rounded-full ${hero.availability ? "bg-primary" : "bg-muted-foreground"}`} aria-hidden="true" />
            <span className="label">{hero.availability ? "Available for work" : "Currently unavailable"}</span>
          </div>
          <SocialLinks social={social} />
        </div>
      </div>
    </section>
  );
}
