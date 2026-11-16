import { NextResponse } from "next/server";
import { isSameOrigin, loginAdmin, SESSION_COOKIE, SESSION_SECONDS } from "@/server/auth/admin";
import { databaseErrorCategory } from "@/server/db/diagnostics";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body.username !== "string" || typeof body.password !== "string" ||
      body.username.length > 200 || body.password.length > 1024) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }
  try {
    const result = await loginAdmin(body.username, body.password);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.limited ? "Too many attempts. Try again later." : "Invalid credentials." },
        { status: result.limited ? 429 : 401 },
      );
    }
    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, result.token, {
      httpOnly: true, secure: process.env.NODE_ENV === "production",
      sameSite: "strict", path: "/", maxAge: SESSION_SECONDS,
    });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    let category = databaseErrorCategory(error);
    if (error instanceof Error && error.message === "Admin credentials are not configured") category = "ADMIN_ENV_MISSING";
    if (error instanceof Error && error.message === "Admin password hash is invalid") category = "ADMIN_HASH_INVALID";
    console.error("Admin login unavailable:", category);
    return NextResponse.json({ error: "Login is temporarily unavailable." }, { status: 503 });
  }
}
