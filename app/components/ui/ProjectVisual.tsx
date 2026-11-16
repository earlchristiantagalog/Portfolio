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
  const showImage = Boolean(src) && failedSrc !== src;

  return (
    <div className="relative aspect-video w-full overflow-hidden border-b border-card-border bg-muted">
      {showImage ? (
        <Image
          src={src}
          alt={`${title} project preview`}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          unoptimized
          onError={() => setFailedSrc(src)}
          className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
        />
      ) : (
        <>
          <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br ${wash}`} />
          <div aria-hidden="true" className="grid-dense absolute inset-0 opacity-50" />
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />
          <div aria-hidden="true" className="holo-ring absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 animate-orbit" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="mono text-2xl font-semibold tracking-[0.3em] text-foreground/35">
              {title
                .split(" ")
                .slice(0, 2)
                .map((word) => word.charAt(0))
                .join("")}
            </span>
            {src && failedSrc === src && (
              <button type="button" onClick={() => setFailedSrc(null)} className="relative z-10 rounded border border-card-border bg-background/80 px-3 py-2 text-xs text-foreground hover:border-primary">
                Retry image
              </button>
            )}
          </div>
          <span aria-hidden="true" className="ghost-num pointer-events-none absolute -bottom-8 right-2 text-[7.5rem]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </>
      )}
      <span className={`label-sm absolute left-4 top-4 ${showImage ? "rounded bg-background/80 px-2 py-1 text-foreground" : "text-foreground/60"}`}>
        {`PRJ-${String(index + 1).padStart(2, "0")}`}
      </span>
    </div>
  );
}
