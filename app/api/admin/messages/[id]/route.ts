import { NextResponse } from "next/server";
import { getAdminAccess, isSameOrigin } from "@/server/auth/admin";
import { getPrisma } from "@/server/db/prisma";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store" };
type Context = { params: Promise<{ id: string }> };

async function authorize(request: Request, context: Context) {
  if (!isSameOrigin(request)) return { response: NextResponse.json({ error: "Forbidden" }, { status: 403, headers }) };
  const access = await getAdminAccess();
  if (!access.allowed) return { response: NextResponse.json({ error: "Access denied" }, { status: access.status, headers }) };
  const { id } = await context.params;
  if (!id || id.length > 191) return { response: NextResponse.json({ error: "Invalid message" }, { status: 400, headers }) };
  return { id };
}

export async function PATCH(request: Request, context: Context) {
  const result = await authorize(request, context);
  if (result.response) return result.response;
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || !("resolved" in body) || typeof body.resolved !== "boolean") {
    return NextResponse.json({ error: "Invalid status" }, { status: 400, headers });
  }
  try {
    const updated = await getPrisma().message.updateMany({
      where: { id: result.id },
      data: { resolved: body.resolved },
    });
    if (!updated.count) return NextResponse.json({ error: "Message not found" }, { status: 404, headers });
    return NextResponse.json({ success: true }, { headers });
  } catch {
    console.error("Unable to update message status");
    return NextResponse.json({ error: "Unable to update message" }, { status: 500, headers });
  }
}

export async function DELETE(request: Request, context: Context) {
  const result = await authorize(request, context);
  if (result.response) return result.response;
  try {
    const deleted = await getPrisma().message.deleteMany({ where: { id: result.id } });
    if (!deleted.count) return NextResponse.json({ error: "Message not found" }, { status: 404, headers });
    return NextResponse.json({ success: true }, { headers });
  } catch {
    console.error("Unable to delete message");
    return NextResponse.json({ error: "Unable to delete message" }, { status: 500, headers });
  }
}
