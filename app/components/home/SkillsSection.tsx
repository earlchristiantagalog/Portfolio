"use client";

import { usePortfolio } from "../PortfolioContext";
import { Reveal } from "../effects/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function SkillsSection() {
  const { data: { content } } = usePortfolio();
  return (
    <section id="expertise" className="relative px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="02" label="Expertise" title={content.expertiseHeading} description={content.expertiseDescription} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {content.expertise.map((module, index) => (
            <Reveal key={index} delay={index * 80}>
              <article className="hud hud-hover group relative h-full p-6 sm:p-7">
                <span className="label-sm text-primary/70">{String(index + 1).padStart(2, "0")} / Expertise</span>
                <h3 className="mt-8 text-xl font-semibold tracking-tight text-foreground">{module.title}</h3>
                <p className="label-sm mt-1">{module.subtitle}</p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{module.description}</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {module.stack.map((tech, i) => <span key={i} className="tag">{tech}</span>)}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
