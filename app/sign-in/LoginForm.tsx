"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const result = await response.json();
        setError(result.error || "Unable to sign in.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-5">
      <div>
        <label htmlFor="username" className="label mb-2 block">Username</label>
        <input id="username" className="field" autoComplete="username" required maxLength={200}
          value={username} onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div>
        <label htmlFor="password" className="label mb-2 block">Password</label>
        <input id="password" className="field" type="password" autoComplete="current-password" required maxLength={1024}
          value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
      <button disabled={loading} className="btn btn-primary w-full disabled:opacity-60" type="submit">
        {loading ? "Signing in…" : "Sign in"} <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
