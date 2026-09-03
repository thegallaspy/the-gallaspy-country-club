"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function MyGallaspyPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const origin = window.location.origin;

      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=/my-gallaspy/home`,
          shouldCreateUser: true,
        },
      });

      if (signInError) {
        console.error("My Gallaspy sign-in error:", signInError);
        setError("Unable to send your sign-in link. Please try again.");
        setLoading(false);
        return;
      }

      setMessage("Your secure sign-in link is on its way. Check your email.");
      setLoading(false);
    } catch (submitError) {
      console.error("My Gallaspy sign-in error:", submitError);
      setError("Unable to send your sign-in link. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#082F29] text-white">
      {/* SUBTLE BACKGROUND DETAIL */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-0 h-full w-px bg-white/[0.035]" />
        <div className="absolute right-[8%] top-0 h-full w-px bg-white/[0.035]" />
        <div className="absolute left-0 top-[38%] h-px w-full bg-white/[0.035]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-6 pb-14 pt-32 sm:px-10 lg:px-16 lg:pb-16 lg:pt-36">

        {/* IDENTITY */}
        <header className="flex items-start justify-between border-b border-white/10 pb-8">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.38em] text-[#C7A55B]">
              The Digital Clubhouse
            </p>

            <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-white/35">
              The Gallaspy Golf Club
            </p>
          </div>

          <Image
            src="/logos/falcon.png"
            alt="The Gallaspy Falcon"
            width={82}
            height={82}
            priority
            className="h-auto w-[64px] object-contain sm:w-[76px]"
          />
        </header>

        {/* MAIN EXPERIENCE */}
        <div className="grid flex-1 items-center gap-14 py-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-24 lg:py-12">

          <section className="max-w-[760px]">
            <p className="text-[10px] font-black uppercase tracking-[0.38em] text-[#C7A55B]">
              My Gallaspy
            </p>

            <h1 className="mt-7 text-[58px] font-black uppercase leading-[0.82] tracking-[-0.065em] text-[#F5F0E6] sm:text-[78px] lg:text-[94px] xl:text-[108px]">
              Your Game.
              <span className="block">Your History.</span>
              <span className="block text-white/40">Your Club.</span>
            </h1>

            <p className="mt-8 max-w-[570px] text-sm leading-7 text-white/55 sm:text-base">
              One private place for your Gallaspy rounds, registrations,
              Passport, results, achievements and the history you build
              with the club.
            </p>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6">
              {["Rounds", "Passport", "Results", "Achievements"].map((item) => (
                <span
                  key={item}
                  className="text-[8px] font-black uppercase tracking-[0.27em] text-white/35"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* ACCESS CARD */}
          <section className="lg:flex lg:justify-end">
            <div className="w-full max-w-[500px] bg-[#F5F0E6] p-7 text-[#10263F] shadow-[0_30px_90px_rgba(0,0,0,0.22)] sm:p-10 lg:p-11">

              <div className="flex items-center justify-between border-b border-[#10263F]/10 pb-6">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.3em] !text-[#9A7A3D]">
                    Private Access
                  </p>

                  <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.035em] !text-[#10263F] sm:text-3xl">
                    Enter My Gallaspy
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center border border-[#0A2F29]/15">
                  <span className="text-sm !text-[#0A2F29]">→</span>
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 !text-[#10263F]/60">
                Sign in with the email connected to your Gallaspy
                participation. No password required.
              </p>

              <form onSubmit={handleSubmit} className="mt-8">
                <label
                  htmlFor="email"
                  className="text-[8px] font-black uppercase tracking-[0.26em] !text-[#10263F]/55"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  className="mt-3 min-h-[58px] w-full border border-[#10263F]/20 bg-white px-4 text-base !text-[#10263F] outline-none transition placeholder:!text-[#10263F]/25 focus:border-[#0A2F29]"
                />

                {message && (
                  <div className="mt-5 border-l-2 border-[#C7A55B] bg-[#0A2F29]/5 px-4 py-3">
                    <p className="text-sm leading-6 !text-[#10263F]/75">
                      {message}
                    </p>
                  </div>
                )}

                {error && (
                  <p className="mt-5 text-sm !text-[#8E2633]">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 inline-flex min-h-[58px] w-full items-center justify-between bg-[#10263F] px-6 text-[9px] font-black uppercase tracking-[0.24em] !text-white transition hover:bg-[#0A2F29] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>
                    {loading ? "Sending..." : "Send Secure Sign-In Link"}
                  </span>

                  <span aria-hidden="true" className="text-base !text-[#C7A55B]">
                    →
                  </span>
                </button>
              </form>

              <p className="mt-6 text-[10px] leading-5 !text-[#10263F]/40">
                Secure access for registered players, active participants and members.
              </p>
            </div>
          </section>
        </div>

        {/* FOOT */}
        <footer className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[8px] font-black uppercase tracking-[0.28em] text-white/30">
            My Gallaspy · Private Player Portal
          </p>

          <p className="text-[8px] font-black uppercase tracking-[0.28em] text-[#C7A55B]/65">
            Georgia · Est. 2026
          </p>
        </footer>
      </div>
    </main>
  );
}
