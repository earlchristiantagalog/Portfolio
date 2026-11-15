import { ObjectId, Binary } from "mongodb";
import { getDatabase } from "@/server/db/mongodb";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[a-f0-9]{24}$/.test(id)) return new Response(null, { status: 404 });
  try {
    const db = await getDatabase();
    const image = await db.collection<{ data: Binary; contentType: string }>("project_images")
      .findOne({ _id: new ObjectId(id) });
    if (!image) return new Response(null, { status: 404 });
    const bytes = image.data instanceof Binary ? image.data.buffer : image.data;
    return new Response(new Uint8Array(bytes as Uint8Array), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    console.error("Unable to load project image");
    return new Response(null, { status: 500 });
  }
}
