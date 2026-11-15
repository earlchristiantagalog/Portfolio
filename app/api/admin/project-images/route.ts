import { NextResponse } from "next/server";
import sharp from "sharp";
import { getAdminAccess, isSameOrigin } from "@/server/auth/admin";
import { getDatabase } from "@/server/db/mongodb";

export const runtime = "nodejs";
const MAX_BYTES = 3 * 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const access = await getAdminAccess();
  if (!access.allowed) return NextResponse.json({ error: "Access denied" }, { status: access.status });
  const type = request.headers.get("content-type")?.split(";")[0] ?? "";
  if (!allowedTypes.has(type)) return NextResponse.json({ error: "Choose a JPEG, PNG, or WebP image." }, { status: 415 });
  if (Number(request.headers.get("content-length")) > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be 3 MB or smaller." }, { status: 413 });
  }
  if (!request.body) return NextResponse.json({ error: "Image is required." }, { status: 400 });

  try {
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BYTES) {
        await reader.cancel();
        return NextResponse.json({ error: "Image must be 3 MB or smaller." }, { status: 413 });
      }
      chunks.push(value);
    }
    const input = Buffer.concat(chunks);
    const processor = sharp(input, { limitInputPixels: 40_000_000, failOn: "error" });
    const metadata = await processor.metadata();
    const expected = { "image/jpeg": "jpeg", "image/png": "png", "image/webp": "webp" }[type];
    if (metadata.format !== expected || (metadata.pages ?? 1) > 1) {
      return NextResponse.json({ error: "Invalid or unsupported image." }, { status: 400 });
    }
    const data = await processor.rotate().resize({ width: 2000, height: 1200, fit: "inside", withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
    const db = await getDatabase();
    const result = await db.collection("project_images").insertOne({
      data, contentType: "image/webp", createdAt: new Date(),
    });
    return NextResponse.json({ url: `/api/project-images/${result.insertedId.toHexString()}` });
  } catch (error) {
    if (error instanceof Error && /input|image|pixel|format|corrupt|unsupported/i.test(error.message)) {
      return NextResponse.json({ error: "Invalid or unsupported image." }, { status: 400 });
    }
    console.error("Unable to upload project image");
    return NextResponse.json({ error: "Unable to upload image. Please try again." }, { status: 500 });
  }
}
