import "server-only";
import { Prisma } from "@/generated/prisma";

/**
 * Return fixed diagnostic labels only: driver error messages can contain
 * connection details and must never be sent to logs or API responses.
 */
export function databaseErrorCategory(error: unknown): string {
  if (error instanceof Error && error.message === "MySQL is not configured") {
    return "DATABASE_URL_MISSING";
  }
  if (error instanceof Error && error.message === "MySQL URI is invalid") return "DATABASE_URL_INVALID";
  if (error instanceof Prisma.PrismaClientInitializationError) return "MYSQL_CONNECTION_OR_CONFIGURATION_ERROR";
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P1000") return "MYSQL_AUTH_FAILED";
    if (error.code === "P1001" || error.code === "P1002") return "MYSQL_SERVER_UNREACHABLE";
    if (error.code === "P2021") return "MYSQL_TABLE_MISSING";
    return "MYSQL_DATABASE_ERROR";
  }
  return "MYSQL_OR_SERVER_ERROR";
}
