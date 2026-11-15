import { redirect } from "next/navigation";
import { getAdminAccess } from "@/server/auth/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const access = await getAdminAccess();
  if (!access.allowed) {
    if (access.status === 503) return <main className="p-10">Admin access is temporarily unavailable.</main>;
    redirect("/sign-in");
  }
  return <>{children}</>;
}
