import "server-only";
import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { getPrisma } from "@/server/db/prisma";

const scrypt = promisify(scryptCallback);
export const SESSION_COOKIE = "portfolio_admin_session";
export const SESSION_SECONDS = 8 * 60 * 60;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function digest(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !!origin && origin === new URL(request.url).origin;
}

export async function getAdminAccess() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return { allowed: false, status: 401 } as const;
  try {
    const session = await getPrisma().adminSession.findFirst({
      where: { tokenHash: digest(token), expiresAt: { gt: new Date() } },
    });
    return session ? { allowed: true, status: 200 } as const : { allowed: false, status: 401 } as const;
  } catch {
    return { allowed: false, status: 503 } as const;
  }
}

export async function loginAdmin(username: string, password: string) {
  const configuredUser = process.env.ADMIN_USERNAME;
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!configuredUser || !hash) throw new Error("Admin credentials are not configured");
  const [algorithm, salt, expectedHex] = hash.split(":");
  if (algorithm !== "scrypt" || !/^[a-f0-9]{32}$/.test(salt ?? "") || !/^[a-f0-9]{128}$/.test(expectedHex ?? "")) {
    throw new Error("Admin password hash is invalid");
  }

  const db = getPrisma();
  const now = new Date();
  const expiresTime = new Date(now.getTime() + WINDOW_MS);
  await db.$executeRaw`
    INSERT INTO admin_login_limits (id, attempts, expiresAt)
    VALUES ('admin', 1, ${expiresTime})
    ON DUPLICATE KEY UPDATE
      attempts = IF(expiresAt <= ${now}, 1, attempts + 1),
      expiresAt = IF(expiresAt <= ${now}, ${expiresTime}, expiresAt)
  `;
  const counter = await db.adminLoginLimit.findUnique({ where: { id: "admin" } });
  if (!counter || counter.attempts > MAX_ATTEMPTS) return { ok: false, limited: true } as const;

  const actual = await scrypt(password, salt, 64) as Buffer;
  const expected = Buffer.from(expectedHex, "hex");
  const valid = timingSafeEqual(actual, expected) && username === configuredUser;
  if (!valid) return { ok: false, limited: false } as const;

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000);
  await db.adminSession.deleteMany({ where: { expiresAt: { lte: now } } });
  await db.adminSession.create({ data: { tokenHash: digest(token), expiresAt } });
  await db.adminLoginLimit.deleteMany({ where: { id: "admin" } });
  return { ok: true, token, expiresAt } as const;
}

export async function revokeAdminSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (token && /^[a-f0-9]{64}$/.test(token)) {
    await getPrisma().adminSession.deleteMany({ where: { tokenHash: digest(token) } });
  }
}
