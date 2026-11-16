import { NextResponse } from "next/server";
import { getAdminAccess } from "@/server/auth/admin";
import { getPrisma } from "@/server/db/prisma";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const access = await getAdminAccess();
  if (!access.allowed) {
    return NextResponse.json({ error: "Access denied" }, {
      status: access.status,
      headers: { "Cache-Control": "private, no-store" },
    });
  }

  const rawPage = new URL(request.url).searchParams.get("page") ?? "1";
  if (!/^[1-9]\d{0,3}$/.test(rawPage)) {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  }
  const page = Number(rawPage);
  const pageSize = 20;

  try {
    const messages = await getPrisma().message.findMany({
      select: { id: true, name: true, email: true, subject: true, message: true, createdAt: true, resolved: true },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize + 1,
    });
    return NextResponse.json({
      messages: messages.slice(0, pageSize),
      hasMore: messages.length > pageSize,
    }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    console.error("Unable to load admin messages");
    return NextResponse.json({ error: "Unable to load messages" }, {
      status: 500,
      headers: { "Cache-Control": "private, no-store" },
    });
  }
}
