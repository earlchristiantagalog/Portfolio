"use client";

import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();
  const [loadingClerkSession, setLoadingClerkSession] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setLoadingClerkSession(false);
    }
  }, [isLoaded]);

  if (loadingClerkSession || !isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm">Loading admin session...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    // Clerk's middleware should have redirected them already, but as a fallback
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-red-600 dark:text-red-400">
          <h3 className="mb-2 text-lg font-semibold">Not Authenticated</h3>
          <p className="text-sm">You need to be signed in to access the admin panel.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
