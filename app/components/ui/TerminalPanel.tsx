import type { ReactNode } from "react";

export function TerminalPanel({
  name,
  role,
  skills,
  available,
}: {
  name: string;
  role: string;
  skills: string[];
  available: boolean;
}) {
  const stack = skills.slice(0, 6);

  return (
    <div className="hud clip-corner w-full max-w-md">
      <div className="flex items-center justify-between border-b border-card-border px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/70" />
          <span className="h-2 w-2 rounded-full bg-amber-400/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
        </div>
        <span className="label-sm text-muted-foreground">operator.sh</span>
        <span className="label-sm text-primary/70">bash</span>
      </div>

      <div className="space-y-3 px-4 py-5 font-mono text-xs leading-relaxed sm:text-[0.8rem]">
        <Line command="whoami" value={name} delay={120} />
        <Line command="cat role.txt" value={role} delay={260} />
        <Line command="ls ./stack" value={stack.join("  ")} delay={400} accent />
        <div className="flex flex-wrap items-center gap-2 pt-1 animate-fade-in" style={{ animationDelay: "560ms" }}>
          <span className="text-primary">$</span>
          <span className="text-muted-foreground">status --check</span>
          <span className={`flex items-center gap-2 ${available ? "text-emerald-500 dark:text-emerald-400" : "text-red-500"}`}>
            <span className="status-ring" />
            {available ? "ONLINE" : "OFFLINE"}
          </span>
          <span className="inline-block h-3.5 w-1.5 animate-blink bg-primary align-middle" />
        </div>
      </div>
    </div>
  );
}

function Line({
  command,
  value,
  delay,
  accent = false,
}: {
  command: string;
  value: ReactNode;
  delay: number;
  accent?: boolean;
}) {
  return (
    <div className="animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex gap-2">
        <span className="text-primary">$</span>
        <span className="text-muted-foreground">{command}</span>
      </div>
      <div className={`mt-0.5 break-words pl-4 ${accent ? "text-primary/90" : "text-foreground/85"}`}>
        {value}
      </div>
    </div>
  );
}
