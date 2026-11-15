import "server-only";
import type { PortfolioData } from "@/app/data/portfolio-data";
import { Prisma } from "@/generated/prisma";
import { getPrisma } from "@/server/db/prisma";
import { defaultData } from "@/server/portfolio/defaults";

export async function getPortfolio(): Promise<PortfolioData | null> {
  const document = await getPrisma().portfolio.findUnique({ where: { id: "main" } });
  if (!document?.data) return null;
  const data = document.data as unknown as PortfolioData;
  return {
    ...data,
    content: { ...defaultData.content, ...data.content },
  };
}

export async function savePortfolio(data: PortfolioData) {
  const value = data as unknown as Prisma.InputJsonValue;
  await getPrisma().portfolio.upsert({
    where: { id: "main" },
    create: { id: "main", data: value, updatedAt: new Date() },
    update: { data: value, updatedAt: new Date() },
  });
}

export async function savePortfolioSection<K extends keyof PortfolioData>(
  key: K,
  value: PortfolioData[K],
) {
  const prisma = getPrisma();
  // Initialize once, then update only the selected JSON section atomically.
  await prisma.portfolio.upsert({
    where: { id: "main" },
    create: { id: "main", data: defaultData as unknown as Prisma.InputJsonValue, updatedAt: new Date() },
    update: {},
  });
  const path = `$.${key}`;
  const json = JSON.stringify(value);
  const updated = await prisma.$executeRaw`
    UPDATE portfolio
    SET data = JSON_SET(data, ${path}, JSON_EXTRACT(${json}, '$')), updatedAt = ${new Date()}
    WHERE id = 'main'
  `;
  if (updated !== 1) throw new Error("Unable to update portfolio");
}

export async function saveMessage(message: { name: string; email: string; subject: string; message: string }) {
  await getPrisma().message.create({ data: { ...message, createdAt: new Date() } });
}
