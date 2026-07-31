import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Admin",
  description: "Sign in to manage your portfolio.",
};

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-muted via-background to-background" />
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="w-full max-w-md animate-fade-up">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="mb-3 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Admin Access
          </span>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage your portfolio content.
          </p>
        </div>

        <div className="rounded-2xl border border-card-border bg-card p-6 shadow-xl shadow-black/5">
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "w-full rounded-xl border-0 bg-transparent shadow-none",
                header: "hidden",
                dividerRow: "hidden",
                formFieldLabel: "text-sm font-medium text-foreground",
                formFieldInput:
                  "w-full rounded-xl border border-card-border bg-background px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                formButtonPrimary:
                  "group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark disabled:opacity-50",
                footerActionLink: "text-sm font-medium text-primary hover:text-primary-light",
                footerActionText: "text-sm text-muted-foreground",
                alternativeMethodsBlockButton:
                  "rounded-xl border border-card-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted",
                identityPreview: "rounded-xl border border-card-border bg-background",
                alert: "rounded-xl border border-red-500/20 bg-red-500/10 text-sm text-red-600 dark:text-red-400",
              },
            }}
            fallbackRedirectUrl="/admin"
          />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Protected area. Authorized personnel only.
        </p>
      </div>
    </div>
  );
}
