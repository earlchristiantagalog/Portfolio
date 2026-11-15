"use client";

import Image from "next/image";
import { useState } from "react";

const washes = [
  "from-primary/25 via-primary/5 to-transparent",
  "from-accent/25 via-accent/5 to-transparent",
  "from-primary/15 via-accent/15 to-transparent",
];

export function ProjectVisual({
  src,
  title,
  index,
}: {
  src: string;
  title: string;
  index: number;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const wash = washes[index % washes.length];

  return (
    <div className="relative h-48 overflow-hidden border-b border-card-border bg-muted/30">
      <div className={`absolute inset-0 bg-gradient-to-br ${wash}`} />
      <div className="grid-dense absolute inset-0 opacity-50" />

      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />
      <div className="holo-ring absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 animate-orbit" />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/70 shadow-[0_0_18px_rgb(var(--primary)/0.8)]" />

      <div className="absolute inset-0 flex items-center justify-center">
        {failedSrc === src || !src ? (
          <span className="mono text-2xl font-semibold tracking-[0.3em] text-foreground/35">
            {title
              .split(" ")
              .slice(0, 2)
              .map((word) => word.charAt(0))
              .join("")}
          </span>
        ) : (
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            unoptimized
            onError={() => setFailedSrc(src)}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>

      <span className={`ghost-num pointer-events-none absolute -bottom-8 right-2 text-[7.5rem] ${src && failedSrc !== src ? "opacity-0" : ""}`}>
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className={`label-sm absolute left-4 top-4 ${src && failedSrc !== src ? "bg-background/70 px-2 py-1 text-foreground" : "text-foreground/60"}`}>
        {`PRJ-${String(index + 1).padStart(2, "0")}`}
      </span>

      <div className="scan-sweep" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card/80 to-transparent" />
    </div>
  );
}
