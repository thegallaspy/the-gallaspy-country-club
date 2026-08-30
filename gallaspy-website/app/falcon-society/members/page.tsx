"use client";

import { FormEvent, useState } from "react";

export default function FalconSocietyMembersLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/falcon-society/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || "Unable to enter the Members Room.");
        setLoading(false);
        return;
      }

      window.location.href = "/falcon-society/members/home";
    } catch {
      setError("Unable to enter the Members Room.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#10263F] px-5 py-24 text-white sm:px-8">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-[720px] items-center justify-center">
        <section className="w-full border border-white/15 bg-white/[0.03] px-6 py-12 sm:px-10 sm:py-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#D7B56D]">
            The Founding 100
          </p>

          <h1 className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl">
            Falcon Society
            <span className="block text-[#D7B56D]">Members Room.</span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
            Private access for confirmed Falcon Society members.
          </p>

          <form onSubmit={handleSubmit} className="mt-10">
            <label
              htmlFor="password"
              className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/55"
            >
              Member Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-3 min-h-[52px] w-full border border-white/20 bg-white/[0.04] px-4 text-base text-white outline-none transition focus:border-[#D7B56D]"
              required
            />

            {error && (
              <p className="mt-4 text-sm text-[#F2A6A6]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex min-h-[50px] w-full items-center justify-center bg-[#8C1D2C] px-6 text-[10px] font-bold uppercase tracking-[0.24em] text-white transition hover:bg-[#A32436] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Entering..." : "Enter Members Room"}
            </button>
          </form>

          <p className="mt-8 text-xs leading-6 text-white/35">
            Access is reserved for confirmed Falcon Society members.
          </p>
        </section>
      </div>
    </main>
  );
}
