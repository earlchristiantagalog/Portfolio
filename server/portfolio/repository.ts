import "server-only";
import type { PortfolioData } from "@/app/data/portfolio-data";
import { getDatabase } from "@/server/db/mongodb";
import { defaultData } from "@/server/portfolio/defaults";

export async function getPortfolio(): Promise<PortfolioData | null> {
  const db = await getDatabase();
  const document = await db.collection<{ _id: string; data: PortfolioData }>("portfolio")
    .findOne({ _id: "main" }, { projection: { _id: 0, data: 1 } });
  if (!document?.data) return null;
  return {
    ...document.data,
    content: { ...defaultData.content, ...document.data.content },
  };
}

export async function savePortfolio(data: PortfolioData) {
  const db = await getDatabase();
  await db.collection<{ _id: string; data: PortfolioData; updatedAt: Date }>("portfolio").updateOne(
    { _id: "main" },
    { $set: { data, updatedAt: new Date() } },
    { upsert: true },
  );
}

export async function savePortfolioSection<K extends keyof PortfolioData>(
  key: K,
  value: PortfolioData[K],
) {
  const db = await getDatabase();
  const collection = db.collection<{ _id: string; data: PortfolioData; updatedAt: Date }>("portfolio");
  await collection.updateOne(
    { _id: "main" },
    { $setOnInsert: { data: defaultData, updatedAt: new Date() } },
    { upsert: true },
  );
  await collection.updateOne(
    { _id: "main" },
    { $set: { [`data.${key}`]: value, updatedAt: new Date() } },
  );
}

export async function saveMessage(message: { name: string; email: string; subject: string; message: string }) {
  const db = await getDatabase();
  await db.collection("messages").insertOne({ ...message, createdAt: new Date() });
}
