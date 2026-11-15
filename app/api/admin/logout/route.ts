import { NextResponse } from "next/server";
import { isSameOrigin, revokeAdminSession, SESSION_COOKIE } from "@/server/auth/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    await revokeAdminSession();
  } catch {
    return NextResponse.json({ error: "Unable to sign out. Please try again." }, { status: 503 });
  }
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
  return response;
}
