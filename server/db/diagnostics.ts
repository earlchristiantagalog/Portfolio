import "server-only";
import { MongoParseError, MongoServerError, MongoServerSelectionError } from "mongodb";

/**
 * Return fixed diagnostic labels only: driver error messages can contain
 * connection details and must never be sent to logs or API responses.
 */
export function databaseErrorCategory(error: unknown): string {
  if (error instanceof Error && error.message === "MongoDB is not configured") {
    return "MONGODB_ENV_MISSING";
  }
  if (error instanceof MongoParseError) return "MONGODB_URI_INVALID";
  if (error instanceof MongoServerSelectionError) return "MONGODB_SERVER_UNREACHABLE";
  if (error instanceof MongoServerError) {
    if (error.code === 18 || error.code === 8000) return "MONGODB_AUTH_FAILED";
    if (error.code === 13) return "MONGODB_PERMISSION_DENIED";
    return "MONGODB_SERVER_ERROR";
  }
  if (error && typeof error === "object" && "code" in error) {
    const code = error.code;
    if (code === "ENOTFOUND" || code === "ENODATA" || code === "EREFUSED" || code === "ETIMEOUT") {
      return "MONGODB_DNS_ERROR";
    }
  }
  return "MONGODB_OR_SERVER_ERROR";
}
