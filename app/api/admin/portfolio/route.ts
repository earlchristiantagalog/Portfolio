import { NextResponse } from "next/server";
import { getAdminAccess, isSameOrigin } from "@/server/auth/admin";
import { savePortfolio, savePortfolioSection } from "@/server/portfolio/repository";
import { portfolioSchema } from "@/server/portfolio/schema";
import type { PortfolioData } from "@/app/data/portfolio-data";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const access = await getAdminAccess();
  if (!access.allowed) return NextResponse.json({ error: "Access denied" }, { status: access.status });

  try {
    const body: unknown = await request.json().catch(() => null);
    if (!body || typeof body !== "object" || !("section" in body) || !("value" in body) ||
        typeof body.section !== "string" || !Object.hasOwn(portfolioSchema.shape, body.section)) {
      return NextResponse.json({ error: "Invalid portfolio section" }, { status: 400 });
    }
    const section = body.section as keyof PortfolioData;
    const result = portfolioSchema.shape[section].safeParse(body.value);
    if (!result.success) return NextResponse.json({ error: "Invalid section data" }, { status: 400 });
    await savePortfolioSection(section, result.data);
    return NextResponse.json({ success: true });
  } catch {
    console.error("Unable to save portfolio section");
    return NextResponse.json({ error: "Unable to save portfolio section" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const access = await getAdminAccess();
  if (!access.allowed) {
    return NextResponse.json({ error: "Access denied" }, { status: access.status });
  }

  try {
    const body: unknown = await request.json().catch(() => null);
    const result = portfolioSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid portfolio data" }, { status: 400 });
    }
    await savePortfolio(result.data);
    return NextResponse.json({ success: true });
  } catch {
    console.error("Unable to save portfolio data");
    return NextResponse.json({ error: "Unable to save portfolio" }, { status: 500 });
  }
}
