import { NextResponse } from "next/server";
import { getPortfolio } from "@/server/portfolio/repository";
import { databaseErrorCategory } from "@/server/db/diagnostics";

export const runtime = "nodejs";

export async function GET() {
  try {
    return NextResponse.json({ data: await getPortfolio() }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Unable to load portfolio data:", databaseErrorCategory(error));
    return NextResponse.json({ error: "Unable to load portfolio" }, { status: 500 });
  }
}
