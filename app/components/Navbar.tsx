"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { usePortfolio } from "./PortfolioContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const { data } = usePortfolio();

  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Close the mobile menu when the route changes, without a setState-in-effect.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-card-border/80 bg-background/80 shadow-[0_18px_60px_-40px_rgb(var(--primary)/0.6)] backdrop-blur-xl"
            : "border-b border-transparent bg-background/40 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <span className="clip-corner-sm relative flex h-9 w-9 shrink-0 items-center justify-center border border-primary/40 bg-primary/10 font-mono text-[11px] font-bold tracking-tight text-primary transition-colors group-hover:bg-primary/20">
              {data.hero.title}
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground">
                {data.hero.name}
              </span>
              <span className="label-sm truncate text-muted-foreground">
                Creative portfolio
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="mr-1.5 text-[9px] text-primary/50">
                    0{index + 1}
                  </span>
                  {link.label}
                  <span
                    className={`absolute inset-x-3 -bottom-px h-px origin-left bg-primary transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <Link
              href="/contact"
              className="btn btn-primary clip-corner-sm hidden px-5 py-3 lg:inline-flex"
            >
              Contact
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              className="clip-corner-sm flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-card-border bg-card/50 text-foreground lg:hidden"
            >
              <span
                className={`h-px w-4 bg-current transition-transform duration-300 ${isOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-4 bg-current transition-transform duration-300 ${isOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Scroll progress */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-card-border/30" aria-hidden="true">
          <div
            className="h-full origin-left bg-gradient-to-r from-primary via-primary-light to-accent"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 lg:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        } transition-opacity duration-300`}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
        <div className="grid-plane absolute inset-0 opacity-40" aria-hidden="true" />

        <div className="relative flex h-full flex-col overflow-y-auto px-6 pb-8 pt-28">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary/50" />
            <span className="label text-primary">Navigation</span>
          </div>

          <nav
            className="mt-5 flex flex-col border-y border-card-border/60"
            aria-label="Mobile"
          >
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className="flex items-center justify-between border-b border-card-border/40 py-5 last:border-b-0"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="label-sm text-primary/60">0{index + 1}</span>
                    <span
                      className={`text-3xl font-semibold tracking-tight ${
                        isActive ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </span>
                  </span>
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
                  </svg>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-5 pt-8">
            <div className="flex items-center justify-between">
              <span className="label">Theme</span>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="label">Email</span>
              <a
                href={`mailto:${data.social.email}`}
                className="mono truncate py-1.5 text-[11px] text-muted-foreground transition-colors hover:text-primary"
              >
                {data.social.email}
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span className="label">Status</span>
              <span className="label-sm flex items-center gap-2 text-emerald-500">
                <span className="status-ring" aria-hidden="true" />
                {data.hero.availability ? "Available" : "Unavailable"}
              </span>
            </div>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="link-arrow block border-t border-card-border/50 pt-4 text-primary"
            >
              Admin access
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
