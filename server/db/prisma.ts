import "server-only";
import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as typeof globalThis & { portfolioPrisma?: PrismaClient };

export function getPrisma() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("PostgreSQL is not configured");
  if (!/^postgres(?:ql)?:\/\//.test(url)) throw new Error("PostgreSQL URI is invalid");
  if (!globalForPrisma.portfolioPrisma) {
    globalForPrisma.portfolioPrisma = new PrismaClient({ datasources: { db: { url } } });
  }
  return globalForPrisma.portfolioPrisma;
}
