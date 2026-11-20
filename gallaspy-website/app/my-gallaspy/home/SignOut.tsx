"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignOut() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function signOut() {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const { error } = await createClient().auth.signOut({ scope: "local" });
      if (error) throw error;
      window.location.replace("/my-gallaspy");
    } catch {
      setError("Unable to sign out. Please try again.");
      setBusy(false);
    }
  }

  return <div><button type="button" onClick={signOut} disabled={busy} className="inline-flex min-h-11 items-center rounded-md border border-[#10263F]/25 px-5 py-2 text-sm font-bold text-[#10263F] disabled:opacity-60">{busy ? "Signing out…" : "Sign out"}</button>{error ? <p role="alert" className="mt-2 text-sm text-[#8E2633]">{error}</p> : null}</div>;
}
