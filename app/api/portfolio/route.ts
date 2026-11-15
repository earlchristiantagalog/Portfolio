import { NextResponse } from "next/server";
import { getPortfolio } from "@/server/portfolio/repository";

export const runtime = "nodejs";

export async function GET() {
  try {
    return NextResponse.json({ data: await getPortfolio() }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    console.error("Unable to load portfolio data");
    return NextResponse.json({ error: "Unable to load portfolio" }, { status: 500 });
  }
}
