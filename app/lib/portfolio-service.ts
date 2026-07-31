"use client";

import { getAppwriteClient } from "./appwrite";
import { defaultData, type PortfolioData } from "@/app/data/portfolio-data";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
const DOCUMENT_ID = "portfolio-data";

export async function loadPortfolioData(): Promise<PortfolioData | null> {
  const appwrite = getAppwriteClient();
  if (!appwrite || !DATABASE_ID || !COLLECTION_ID) return null;

  try {
    const doc = await appwrite.databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      DOCUMENT_ID
    );
    const raw = (doc as any).data;
    if (typeof raw === "string") {
      return JSON.parse(raw) as PortfolioData;
    }
    return raw as PortfolioData;
  } catch {
    return null;
  }
}

export async function savePortfolioData(
  data: PortfolioData
): Promise<boolean> {
  const appwrite = getAppwriteClient();
  if (!appwrite || !DATABASE_ID || !COLLECTION_ID) return false;

  const payload = { data: JSON.stringify(data) };

  try {
    await appwrite.databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      DOCUMENT_ID,
      payload as any
    );
    return true;
  } catch {
    // Document doesn't exist — create it
    try {
      await appwrite.databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        DOCUMENT_ID,
        payload as any
      );
      return true;
    } catch {
      return false;
    }
  }
}
