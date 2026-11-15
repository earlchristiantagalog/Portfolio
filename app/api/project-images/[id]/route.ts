import { getPrisma } from "@/server/db/prisma";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[a-z0-9]{20,32}$/.test(id)) return new Response(null, { status: 404 });
  try {
    const image = await getPrisma().projectImage.findUnique({ where: { id } });
    if (!image) return new Response(null, { status: 404 });
    return new Response(new Uint8Array(image.data), {
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
