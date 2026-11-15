"use client";

import { useState } from "react";
import Image from "next/image";
import { usePortfolio } from "./PortfolioContext";

export default function About() {
  const { data } = usePortfolio();
  const { about } = data;
  const [failedLogo, setFailedLogo] = useState<string | null>(null);

  const initials = about.education.school
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <section
      id="about"
      className="relative overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:px-10 lg:pt-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-8 border-b border-card-border/60 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="label text-primary">Dossier / 01</span>
              <span className="h-px w-8 bg-primary/50" aria-hidden="true" />
              <span className="label">Identity file</span>
            </div>

            <h1 className="page-title mt-6 text-foreground">
              About<span className="text-primary">.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {data.content.aboutIntro}
            </p>
          </div>

          <div className="hud w-full max-w-xs p-4">
            <dl className="space-y-2.5 font-mono text-[11px]">
              <div className="flex items-center justify-between gap-3 border-b border-card-border/50 pb-2">
                <dt className="text-muted-foreground">Status</dt>
                <dd className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <span className="status-ring" aria-hidden="true" />
                  {data.hero.availability ? "Available" : "Unavailable"}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-card-border/50 pb-2">
                <dt className="text-muted-foreground">Role</dt>
                <dd className="text-foreground/85">{data.content.role}</dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-card-border/50 pb-2">
                <dt className="text-muted-foreground">Year</dt>
                <dd className="text-foreground/85">{about.education.status}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Stack</dt>
                <dd className="text-foreground/85">{about.skills.length} tools</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Bio */}
          <div>
            <div className="flex items-center gap-3">
              <span className="label-sm text-primary/70">01 / Bio</span>
              <span className="h-px flex-1 bg-card-border/60" aria-hidden="true" />
            </div>

            <div className="mt-6 space-y-6 border-l border-primary/25 pl-5 sm:pl-7">
              {about.bio.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? "text-lg leading-relaxed text-foreground/90 sm:text-xl"
                      : "text-sm leading-relaxed text-muted-foreground sm:text-base"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="hud mt-10 p-5">
              <span className="label text-primary">Operating principles</span>
              <ul className="mt-4 space-y-3">
                {data.content.principles.map((principle, index) => (
                  <li key={principle} className="flex items-start gap-3">
                    <span className="label-sm mt-1 text-primary/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {principle}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3">
              <span className="label-sm text-primary/70">02 / Academic record</span>
              <span className="h-px flex-1 bg-card-border/60" aria-hidden="true" />
            </div>

            <div className="hud clip-corner mt-6 overflow-hidden">
              <div className="flex items-center justify-between gap-3 border-b border-card-border px-5 py-3">
                <span className="label text-primary">Institution</span>
                <span className="label-sm">{about.education.status}</span>
              </div>

              <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-card-border bg-primary/5 p-6 sm:h-48">
                <div className="grid-dense absolute inset-0 opacity-40" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" aria-hidden="true" />
                <div className="scanlines absolute inset-0 opacity-30" aria-hidden="true" />

                {failedLogo === about.education.logo || !about.education.logo ? (
                  <span className="relative font-mono text-3xl font-bold tracking-[0.2em] text-primary/70">
                    {initials}
                  </span>
                ) : (
                  <Image
                    src={about.education.logo}
                    alt={`${about.education.school} logo`}
                    fill
                    sizes="(min-width: 640px) 320px, 80vw"
                    unoptimized
                    onError={() => setFailedLogo(about.education.logo)}
                    className="object-contain p-4"
                  />
                )}

                <span className="label-sm absolute bottom-3 left-4 text-muted-foreground">
                  Seal / verified
                </span>
                <span className="label-sm absolute bottom-3 right-4 text-primary/60">
                  0x02
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  {about.education.school}
                </h2>
                <p className="mono mt-1.5 text-[10px] uppercase leading-relaxed tracking-[0.16em] text-primary/80">
                  {about.education.degree}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {about.education.description}
                </p>

                {data.content.graduationYear && <div className="mt-6 border-t border-card-border/70 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="label-sm text-muted-foreground">Now</span>
                    <span className="label-sm text-muted-foreground">Expected</span>
                  </div>

                  <div className="relative mt-3 h-px w-full bg-card-border">
                    <span className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-primary to-accent" />
                    <span className="absolute -top-1 left-0 h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgb(var(--primary)/0.8)]" />
                    <span className="absolute -top-1 left-2/3 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent)/0.8)]" />
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-xs text-foreground/85">
                      {about.education.status}
                    </span>
                    <span className="font-mono text-xs text-foreground/85">{data.content.graduationYear}</span>
                  </div>
                </div>}
              </div>
            </div>

            <p className="label-sm mt-3 text-muted-foreground">
              Record updated · {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* Stack matrix */}
        <div className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-card-border/60 pt-8">
            <div>
              <span className="label text-primary">03 / Stack matrix</span>
              <h2 className="section-title mt-3 text-foreground">
                Tools in rotation
              </h2>
            </div>
            <span className="label-sm text-muted-foreground">
              {String(about.skills.length).padStart(2, "0")} entries
            </span>
          </div>

          <ul className="mt-8 grid gap-px overflow-hidden border border-card-border/60 bg-card-border/50 sm:grid-cols-2 lg:grid-cols-4">
            {about.skills.map((skill, index) => (
              <li
                key={skill}
                className="group flex items-center justify-between gap-3 bg-background/85 px-5 py-4 transition-colors hover:bg-primary/5"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="label-sm shrink-0 text-primary/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate text-sm font-medium text-foreground">
                    {skill}
                  </span>
                </span>
                <span
                  className="h-1 w-1 shrink-0 rounded-full bg-primary/40 transition-transform duration-300 group-hover:scale-150"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
