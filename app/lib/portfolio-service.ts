"use client";

import type { PortfolioData } from "@/app/data/portfolio-data";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export async function loadPortfolioData(): Promise<PortfolioData | null> {
  try {
    const res = await fetch(`${API_BASE}/api/portfolio`, {
      cache: "no-store",
      credentials: "include",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.data as PortfolioData) ?? null;
  } catch {
    return null;
  }
}

export async function savePortfolioData(
  data: PortfolioData,
  sessionToken: string | null
): Promise<boolean> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (sessionToken) headers["Authorization"] = `Bearer ${sessionToken}`;

    const res = await fetch(`${API_BASE}/api/admin/portfolio`, {
      method: "PUT",
      headers,
      credentials: "include",
      body: JSON.stringify(data),
    });
    return res.ok;
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
    const res = await fetch(`${API_BASE}/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}
