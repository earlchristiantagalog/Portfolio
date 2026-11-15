import type { ReactNode } from "react";

export function SectionHeading({
  index,
  label,
  title,
  description,
  align = "left",
  className = "",
}: {
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : ""} ${className}`}>
      <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <span className="label text-primary">{index}</span>
        <span className="h-px w-8 bg-primary/50" />
        <span className="label">{label}</span>
      </div>

      <h2 className="section-title mt-5 text-balance text-foreground">{title}</h2>

      {description ? (
        <p className={`mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base ${centered ? "mx-auto" : "max-w-xl"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
