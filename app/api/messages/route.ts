import { NextResponse } from "next/server";
import { getPortfolio, saveMessage } from "@/server/portfolio/repository";
import { messageSchema } from "@/server/portfolio/schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json().catch(() => null);
    const result = messageSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }
    const portfolio = await getPortfolio();
    if (portfolio?.contact.acceptingMessages === false) {
      return NextResponse.json({ error: "Messages are currently closed" }, { status: 403 });
    }
    await saveMessage(result.data);
    return NextResponse.json({ success: true });
  } catch {
    console.error("Unable to save contact message");
    return NextResponse.json({ error: "Unable to send message" }, { status: 500 });
  }
}
