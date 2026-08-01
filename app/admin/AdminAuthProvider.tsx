"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { adminLogin } from "@/app/lib/portfolio-service";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [loadingBackendAuth, setLoadingBackendAuth] = useState(true);
  const [backendAuthError, setBackendAuthError] = useState<string | null>(null);

  useEffect(() => {
    async function authenticateBackend() {
      if (!isLoaded) return; // Wait for Clerk to load

      const storedToken = localStorage.getItem("admin_token");
      if (isSignedIn) {
        // If signed in via Clerk, but no backend token or it's old, try to get one
        if (!storedToken) {
          setLoadingBackendAuth(true);
          setBackendAuthError(null);
          try {
            // Use a placeholder username/password for now, as Clerk doesn't expose credentials directly
            // In a real app, you'd use a more secure method (e.g., Clerk webhook to generate backend JWT)
            const result = await adminLogin(user?.primaryEmailAddress?.emailAddress || "admin", "changeme123"); // Placeholder for now
            if (result?.token) {
              localStorage.setItem("admin_token", result.token);
            } else {
              setBackendAuthError("Failed to authenticate with backend");
            }
          } catch (err: any) {
            console.error("Backend authentication error:", err);
            setBackendAuthError(err?.message || "Backend authentication failed");
          } finally {
            setLoadingBackendAuth(false);
          }
        } else {
          // Already have a token, assume it's valid for now
          setLoadingBackendAuth(false);
        }
      } else {
        // Not signed in via Clerk, clear backend token
        localStorage.removeItem("admin_token");
        setLoadingBackendAuth(false);
      }
    }

    authenticateBackend();
  }, [isLoaded, isSignedIn, user]);

  if (loadingBackendAuth || !isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm">Authenticating admin...</p>
        </div>
      </div>
    );
  }

  if (backendAuthError) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-red-600 dark:text-red-400">
          <h3 className="mb-2 text-lg font-semibold">Authentication Error</h3>
          <p className="text-sm">{backendAuthError}</p>
          <p className="mt-4 text-xs">Please ensure your backend is running and the admin user is created.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
