"use client";

import { usePortfolio } from "../PortfolioContext";
import { Counter } from "../effects/Counter";
import { Reveal } from "../effects/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function TelemetrySection() {
  const { data } = usePortfolio();

  const stats = [
    {
      value: String(data.projects.items.length).padStart(2, "0"),
      label: "Projects logged",
      note: "School + personal",
    },
    {
      value: String(data.about.skills.length).padStart(2, "0"),
      label: "Technologies",
      note: "Active stack",
    },
    {
      value: data.content.graduationYear,
      label: "Expected graduation",
      note: data.about.education.school,
    },
  ].filter((stat) => stat.value);

  return (
    <section className="border-y border-card-border/60 bg-muted/20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
        <Reveal>
          <SectionHeading
            index="03"
            label="At a glance"
            title={data.content.overviewHeading}
            description={data.content.overviewDescription}
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100}>
              <div className="hud h-full p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="label-sm text-primary/70">
                    {`T-${String(index + 1).padStart(2, "0")}`}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-primary/70" aria-hidden="true" />
                </div>
                <p className="mono mt-8 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  {/^\d/.test(stat.value) ? <Counter value={stat.value} /> : stat.value}
                </p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wider text-foreground/80">
                  {stat.label}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  {stat.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
