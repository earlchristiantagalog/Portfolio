import { NextResponse } from "next/server";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

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

export async function POST() {
  if (!endpoint || !projectId || !apiKey) {
    return NextResponse.json(
      { success: false, error: "Set APPWRITE_API_KEY in .env" },
      { status: 500 }
    );
  }
  if (!DATABASE_ID || !COLLECTION_ID) {
    return NextResponse.json(
      { success: false, error: "Missing DATABASE_ID or COLLECTION_ID in .env" },
      { status: 500 }
    );
  }

  try {
    // Create database (ignore 409 if already exists)
    try { await api(`/databases`, { method: "POST", body: JSON.stringify({ databaseId: DATABASE_ID, name: "Portfolio Database" }) }); }
    catch (e: any) { if (e.status !== 409) throw e; }

    // Create collection
    try { await api(`/databases/${DATABASE_ID}/collections`, { method: "POST", body: JSON.stringify({ collectionId: COLLECTION_ID, name: "Portfolio Data", permissions: ["create(\"any\")", "read(\"any\")", "update(\"any\")", "delete(\"any\")"] }) }); }
    catch (e: any) { if (e.status !== 409) throw e; }

    // Create "data" string attribute
    try { await api(`/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/attributes/string`, { method: "POST", body: JSON.stringify({ key: "data", size: 65536, required: false }) }); }
    catch (e: any) { if (e.status !== 409) throw e; }

    // Seed document with default data
    const { defaultData } = await import("@/app/data/portfolio-data");
    try { await api(`/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents`, { method: "POST", body: JSON.stringify({ documentId: "portfolio-data", data: { data: JSON.stringify(defaultData) }, permissions: ["read(\"any\")", "update(\"any\")", "delete(\"any\")"] }) }); }
    catch (e: any) { if (e.status !== 409) throw e; }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || "Unknown error" }, { status: 500 });
  }
}
