"use client";

import type { PortfolioData } from "@/app/data/portfolio-data";

export async function loadPortfolioData(): Promise<PortfolioData | null> {
  try {
    const res = await fetch("/api/portfolio", { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.data as PortfolioData) ?? null;
  } catch {
    return null;
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<boolean> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const res = await fetch("/api/admin/portfolio", {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function savePortfolioSection<K extends keyof PortfolioData>(
  section: K,
  value: PortfolioData[K],
): Promise<boolean> {
  try {
    const response = await fetch("/api/admin/portfolio", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, value }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<boolean> {
  try {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}
