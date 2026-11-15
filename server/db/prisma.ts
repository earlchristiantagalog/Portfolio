import "server-only";
import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as typeof globalThis & { portfolioPrisma?: PrismaClient };

export function getPrisma() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("MySQL is not configured");
  if (!url.startsWith("mysql://")) throw new Error("MySQL URI is invalid");
  if (!globalForPrisma.portfolioPrisma) {
    globalForPrisma.portfolioPrisma = new PrismaClient({ datasources: { db: { url } } });
  }
  return globalForPrisma.portfolioPrisma;
}
