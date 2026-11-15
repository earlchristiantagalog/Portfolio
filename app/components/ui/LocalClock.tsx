"use client";

import { useEffect, useState } from "react";

export function LocalClock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const frame = requestAnimationFrame(tick);
    const id = window.setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(id);
    };
  }, []);

  const time = now
    ? now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "--:--:--";

  const offset = now ? -now.getTimezoneOffset() / 60 : null;
  const zone =
    offset === null
      ? "GMT"
      : `GMT${offset >= 0 ? "+" : "−"}${Math.abs(offset)}`;

  return (
    <span className={className}>
      <span className="tabular-nums">{time}</span>
      <span className="ml-2 opacity-60">{zone}</span>
    </span>
  );
}
