"use client";

import Image from "next/image";
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
    <main className="min-h-screen bg-[#8C1D2C] text-white">
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">

        <section className="relative flex min-h-[58vh] overflow-hidden bg-[#8C1D2C] px-6 pb-14 pt-32 sm:px-10 lg:min-h-screen lg:items-center lg:px-16 xl:px-24">
          <div className="absolute left-0 top-0 h-[5px] w-full bg-[#0A2F29]" />

          <div className="absolute -right-20 top-28 h-[340px] w-[340px] rounded-full border border-white/[0.05]" />
          <div className="absolute right-8 top-56 h-[180px] w-[180px] rounded-full border border-white/[0.05]" />

          <div className="relative z-10 max-w-[700px]">
            <Image
              src="/logos/falcon-society-logo.png"
              alt="Falcon Society"
              width={130}
              height={130}
              priority
              className="mb-10 h-auto w-[96px] object-contain sm:w-[112px]"
            />

            <div className="mb-6 flex items-center gap-4">
              <div className="h-[2px] w-10 bg-[#0A2F29]" />
              <p className="text-[9px] font-black uppercase tracking-[0.38em] text-white/70">
                The Founding 100
              </p>
            </div>

            <h1 className="font-serif text-[58px] font-light leading-[0.88] tracking-[-0.045em] text-white sm:text-[76px] lg:text-[92px] xl:text-[104px]">
              Falcon
              <span className="block">
                Society.
              </span>
            </h1>

            <div className="mt-10 border-t border-white/15 pt-6">
              <p className="text-[9px] font-black uppercase tracking-[0.32em] text-white/55">
                Founding Members · Private Access
              </p>
            </div>
          </div>
        </section>

        <section className="relative flex min-h-[42vh] items-center bg-[#10263F] px-5 py-14 sm:px-10 lg:min-h-screen lg:px-14 xl:px-20">
          <div className="absolute left-0 top-0 hidden h-full w-px bg-white/10 lg:block" />

          <div className="mx-auto w-full max-w-[520px]">
            <p className="text-[9px] font-black uppercase tracking-[0.34em] text-white/55">
              Members Room
            </p>

            <h2 className="mt-5 font-serif text-4xl font-light leading-[0.95] tracking-[-0.035em] text-white sm:text-5xl">
              Private
              <span className="block text-white">
                Entrance.
              </span>
            </h2>

            <div className="mt-6 h-[3px] w-12 bg-[#0A2F29]" />

            <form onSubmit={handleSubmit} className="mt-10">
              <label
                htmlFor="password"
                className="text-[9px] font-black uppercase tracking-[0.25em] text-white/55"
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
                className="mt-3 min-h-[58px] w-full border border-white/20 bg-white/[0.04] px-4 text-base text-white outline-none transition focus:border-[#8C1D2C]"
                required
              />

              {error && (
                <p className="mt-5 text-sm text-white/80">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 inline-flex min-h-[56px] w-full items-center justify-center bg-white px-6 text-[9px] font-black uppercase tracking-[0.24em] text-[#10263F] transition hover:bg-[#0A2F29] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Entering..." : "Enter Members Room"}
              </button>
            </form>

            <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-6">
              <span className="h-2 w-2 bg-[#8C1D2C]" />
              <span className="h-2 w-2 bg-[#0A2F29]" />
              <span className="h-2 w-2 bg-white" />
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
