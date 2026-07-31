import { NextResponse } from "next/server";
import { getAppwriteAdmin } from "@/app/lib/appwrite-admin";
import { readAll, writeAll } from "@/app/lib/appwrite-data";

export async function GET() {
  const db = getAppwriteAdmin();
  if (!db) {
    return NextResponse.json({ data: null });
  }
  const data = await readAll(db);
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const db = getAppwriteAdmin();
  if (!db) {
    return NextResponse.json({ success: false, error: "Appwrite not configured" }, { status: 500 });
  }

  try {
    const body = await request.json();
    await writeAll(db, body);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
