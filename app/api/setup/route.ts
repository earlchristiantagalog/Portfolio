import { NextResponse } from "next/server";
import { getAppwriteAdmin } from "@/app/lib/appwrite-admin";
import { writeAll, DATABASE_ID } from "@/app/lib/appwrite-data";
import { defaultData } from "@/app/data/portfolio-data";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

async function api(path: string, options: RequestInit = {}) {
  const res = await fetch(`${endpoint}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Appwrite-Project": projectId!,
      "X-Appwrite-Key": apiKey!,
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json();
    throw { status: res.status, message: body?.message || res.statusText };
  }
  return res.json();
}

type Attr = { key: string; type: "string" | "integer"; size?: number };

interface CollectionSpec {
  id: string;
  name: string;
  attributes: Attr[];
}

const COLLECTIONS: CollectionSpec[] = [
  {
    id: "hero",
    name: "Hero",
    attributes: [
      { key: "name", type: "string", size: 255 },
      { key: "title", type: "string", size: 255 },
      { key: "tagline", type: "string", size: 65536 },
      { key: "availability", type: "string", size: 255 },
    ],
  },
  {
    id: "about_bio",
    name: "About Bio",
    attributes: [
      { key: "paragraph", type: "string", size: 65536 },
      { key: "position", type: "integer" },
    ],
  },
  {
    id: "skills",
    name: "Skills",
    attributes: [
      { key: "skill", type: "string", size: 255 },
      { key: "position", type: "integer" },
    ],
  },
  {
    id: "education",
    name: "Education",
    attributes: [
      { key: "school", type: "string", size: 255 },
      { key: "degree", type: "string", size: 255 },
      { key: "status", type: "string", size: 255 },
      { key: "description", type: "string", size: 65536 },
      { key: "logo", type: "string", size: 255 },
    ],
  },
  {
    id: "projects",
    name: "Projects",
    attributes: [
      { key: "title", type: "string", size: 255 },
      { key: "description", type: "string", size: 65536 },
      { key: "image", type: "string", size: 255 },
      { key: "category", type: "string", size: 255 },
      { key: "github", type: "string", size: 255 },
      { key: "live", type: "string", size: 255 },
      { key: "position", type: "integer" },
    ],
  },
  {
    id: "project_tags",
    name: "Project Tags",
    attributes: [
      { key: "project_id", type: "string", size: 255 },
      { key: "tag", type: "string", size: 255 },
    ],
  },
  {
    id: "projects_config",
    name: "Projects Config",
    attributes: [
      { key: "heading", type: "string", size: 255 },
      { key: "subtitle", type: "string", size: 65536 },
    ],
  },
  {
    id: "contact",
    name: "Contact",
    attributes: [
      { key: "heading", type: "string", size: 255 },
      { key: "subtitle", type: "string", size: 65536 },
    ],
  },
  {
    id: "social",
    name: "Social",
    attributes: [
      { key: "github", type: "string", size: 255 },
      { key: "linkedin", type: "string", size: 255 },
      { key: "email", type: "string", size: 255 },
    ],
  },
  {
    id: "meta",
    name: "Meta",
    attributes: [
      { key: "title", type: "string", size: 255 },
      { key: "description", type: "string", size: 65536 },
    ],
  },
];

async function createCollectionAndAttributes(spec: CollectionSpec) {
  try {
    await api(`/databases/${DATABASE_ID}/collections`, {
      method: "POST",
      body: JSON.stringify({
        collectionId: spec.id,
        name: spec.name,
        permissions: ["read(\"any\")", "create(\"any\")", "update(\"any\")", "delete(\"any\")"],
      }),
    });
  } catch (e: any) {
    if (e.status !== 409) throw e;
  }

  // Wait for collection to be ready
  let ready = false;
  for (let i = 0; i < 10 && !ready; i++) {
    try {
      const res = await api(`/databases/${DATABASE_ID}/collections/${spec.id}`);
      ready = (res as any).$createdAt !== undefined;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  await new Promise((r) => setTimeout(r, 500));

  for (const attr of spec.attributes) {
    try {
      if (attr.type === "string") {
        await api(`/databases/${DATABASE_ID}/collections/${spec.id}/attributes/string`, {
          method: "POST",
          body: JSON.stringify({ key: attr.key, size: attr.size ?? 255, required: false }),
        });
      } else {
        await api(`/databases/${DATABASE_ID}/collections/${spec.id}/attributes/integer`, {
          method: "POST",
          body: JSON.stringify({ key: attr.key, required: false }),
        });
      }
      // Wait for attribute creation to finish
      await new Promise((r) => setTimeout(r, 400));
    } catch (e: any) {
      if (e.status !== 409) throw e;
    }
  }
}

export async function POST() {
  if (!endpoint || !projectId || !apiKey) {
    return NextResponse.json(
      { success: false, error: "Set APPWRITE_API_KEY in .env" },
      { status: 500 }
    );
  }
  if (!DATABASE_ID) {
    return NextResponse.json(
      { success: false, error: "Missing DATABASE_ID in .env" },
      { status: 500 }
    );
  }

  try {
    // Create database
    try {
      await api(`/databases`, {
        method: "POST",
        body: JSON.stringify({ databaseId: DATABASE_ID, name: "Portfolio Database" }),
      });
    } catch (e: any) {
      if (e.status !== 409) throw e;
    }

    // Create collections + attributes
    for (const spec of COLLECTIONS) {
      await createCollectionAndAttributes(spec);
    }

    // Seed with default data
    const db = getAppwriteAdmin();
    if (!db) {
      return NextResponse.json({ success: false, error: "Admin client unavailable" }, { status: 500 });
    }
    await writeAll(db, defaultData);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
