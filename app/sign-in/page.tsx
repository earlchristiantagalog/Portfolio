import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminAccess } from "@/server/auth/admin";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Admin sign in", description: "Private portfolio administration." };

export default async function SignInPage() {
  const access = await getAdminAccess();
  if (access.allowed) redirect("/admin");

  return (
    <main id="main" className="flex min-h-dvh items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="label inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
          <span aria-hidden="true">←</span> Back to portfolio
        </Link>
        <div className="hud mt-8 p-7 sm:p-10">
          <p className="label text-primary">Private access / 01</p>
          <h1 className="page-title mt-5 text-foreground">Welcome back<span className="text-primary">.</span></h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Sign in to manage your portfolio.
          </p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
