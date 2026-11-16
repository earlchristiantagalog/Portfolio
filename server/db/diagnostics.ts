import "server-only";
import { Prisma } from "@/generated/prisma";

/**
 * Return fixed diagnostic labels only: driver error messages can contain
 * connection details and must never be sent to logs or API responses.
 */
export function databaseErrorCategory(error: unknown): string {
  if (error instanceof Error && error.message === "PostgreSQL is not configured") {
    return "DATABASE_URL_MISSING";
  }
  if (error instanceof Error && error.message === "PostgreSQL URI is invalid") return "DATABASE_URL_INVALID";
  if (error instanceof Prisma.PrismaClientInitializationError) return "POSTGRES_CONNECTION_OR_CONFIGURATION_ERROR";
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P1000") return "POSTGRES_AUTH_FAILED";
    if (error.code === "P1001" || error.code === "P1002") return "POSTGRES_SERVER_UNREACHABLE";
    if (error.code === "P2021") return "POSTGRES_TABLE_MISSING";
    return "POSTGRES_DATABASE_ERROR";
  }
  return "POSTGRES_OR_SERVER_ERROR";
}
