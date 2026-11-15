export function TechTicker({ items }: { items: string[] }) {
  const entries = items.length > 0 ? items : ["Next.js", "React", "TypeScript"];

  return (
    <div className="marquee-pause relative overflow-hidden border-y border-card-border/70 bg-card/25 py-3.5 backdrop-blur-sm">
      <div className="marquee">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {entries.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center">
                <span className="label px-6 text-foreground/70">{item}</span>
                <span className="text-[7px] text-primary/60">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
