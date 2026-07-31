"use client";

import type { PortfolioData } from "@/app/data/portfolio-data";

export async function loadPortfolioData(): Promise<PortfolioData | null> {
  try {
    const res = await fetch("/api/data", { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.data as PortfolioData) ?? null;
  } catch {
    return null;
  }
}

export async function savePortfolioData(
  data: PortfolioData
): Promise<boolean> {
  try {
    const res = await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}
