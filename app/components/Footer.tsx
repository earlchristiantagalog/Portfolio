"use client";

import Link from "next/link";
import { usePortfolio } from "./PortfolioContext";
import { SocialLinks } from "./ui/SocialLinks";
import { LocalClock } from "./ui/LocalClock";

export default function Footer() {
  const { data } = usePortfolio();
  const { social, hero } = data;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-card-border/70 bg-muted/20">
      <div className="grid-plane absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="clip-corner-sm flex h-10 w-10 shrink-0 items-center justify-center border border-primary/40 bg-primary/10 font-mono text-[11px] font-bold text-primary">
                {hero.title}
              </span>
              <div className="min-w-0">
                <p className="truncate font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground">
                  {hero.name}
                </p>
                <p className="label-sm mt-1">{data.content.role}</p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {data.content.footerDescription}
            </p>

            <SocialLinks social={social} className="mt-6" />
          </div>

          <nav aria-label="Footer">
            <h3 className="label text-primary">Index</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Projects", href: "/projects" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span className="h-px w-3 bg-card-border transition-all group-hover:w-5 group-hover:bg-primary" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="label text-primary">System</h3>
            <dl className="mt-4 space-y-2.5 font-mono text-[11px]">
              <div className="flex items-center justify-between gap-3 border-b border-card-border/50 pb-2">
                <dt className="text-muted-foreground">Status</dt>
                <dd className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <span className="status-ring" aria-hidden="true" />
                  Online
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-card-border/50 pb-2">
                <dt className="text-muted-foreground">Local time</dt>
                <dd className="text-foreground/80">
                  <LocalClock />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-card-border/50 pb-2">
                <dt className="text-muted-foreground">Build</dt>
                <dd className="text-foreground/80">v2.0 / 2026</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Stack</dt>
                <dd className="text-foreground/80">Next.js 16</dd>
              </div>
            </dl>
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none relative mt-12 select-none overflow-hidden">
          <p className="whitespace-nowrap text-center font-bold leading-none tracking-tighter text-foreground/[0.045] text-[clamp(2.5rem,11vw,8rem)]">
            {hero.name.toUpperCase()}
          </p>
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-card-border/60 pt-5 sm:flex-row">
          <p className="label-sm text-muted-foreground">
            © {year} {hero.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/admin"
              className="label-sm py-1 transition-colors hover:text-primary"
            >
              Admin
            </Link>
            <a
              href="#main"
              className="label-sm inline-flex items-center gap-1.5 py-1 transition-colors hover:text-primary"
            >
              Back to top
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
