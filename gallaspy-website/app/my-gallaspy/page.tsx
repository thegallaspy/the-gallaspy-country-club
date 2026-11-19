"use client";

import Image from "next/image";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { myGallaspyDestination } from "@/lib/my-gallaspy-destination";
import { createClient } from "@/lib/supabase/client";

export default function MyGallaspyPage() {
  return (
    <Suspense fallback={<p role="status">Loading My Gallaspy…</p>}>
      <MyGallaspyAccess />
    </Suspense>
  );
}

function MyGallaspyAccess() {
  const searchParams = useSearchParams();
  const next = myGallaspyDestination(searchParams.get("next"), "/my-gallaspy/home");
  const [creating, setCreating] = useState(searchParams.get("mode") === "create");

  const [email, setEmail] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    await sendCode(email.trim().toLowerCase());
  }

  async function sendCode(address: string) {
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const origin = window.location.origin;

      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: address,
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
          shouldCreateUser: creating,
        },
      });

      if (signInError) {
        console.error("My Gallaspy sign-in error:", signInError);
        setError(signInError.message);
        setLoading(false);
        return;
      }

      setPendingEmail(address);
      setCode("");
      setMessage("Enter the six-digit code sent to your email.");
      setLoading(false);
    } catch (submitError) {
      console.error("My Gallaspy sign-in error:", submitError);

      const message =
        submitError instanceof Error
          ? submitError.message
          : "Unable to send your verification code. Please try again.";

      setError(message);
      setLoading(false);
    }
  }

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!pendingEmail || loading) return;

    if (!/^[0-9]{6}$/.test(code.trim())) {
      setError("Enter the complete six-digit code.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("Verifying your code...");

    try {
      const supabase = createClient();
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: pendingEmail,
        token: code.trim(),
        type: "email",
      });

      if (verifyError) throw verifyError;

      window.location.assign(next);
    } catch {
      setError("Code invalid or expired. Check your email and try again.");
      setMessage("");
      setLoading(false);
    }
  }

  return (
    <main className="g-my-access relative min-h-screen overflow-hidden bg-[#082F29] text-white">
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
            src="/logos/official/falcon-G.png"
            alt="The Gallaspy Falcon"
            width={82}
            height={82}
            priority
            className="h-auto w-[64px] object-contain sm:w-[76px]"
          />
        </header>

        {/* MAIN EXPERIENCE */}
        <div className="grid flex-1 items-center gap-14 py-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-24 lg:py-12">

          <section className="order-2 max-w-[760px] lg:order-none">
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
            <div className="w-full max-w-[500px] bg-white p-7 text-[#10263F] border border-white/20 sm:p-10 lg:p-11">

              <div className="flex items-center justify-between border-b border-[#10263F]/10 pb-6">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.3em] !text-[#9A7A3D]">
                    My Gallaspy Account
                  </p>

                  <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.035em] !text-[#10263F] sm:text-3xl">
                    {creating ? "Create your account" : "Sign in to My Gallaspy"}
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center border border-[#0A2F29]/15">
                  <span className="text-sm !text-[#0A2F29]">→</span>
                </div>
              </div>

              <div aria-label={pendingEmail ? "Step 2 of 2: verify email" : "Step 1 of 2: enter email"} className="mt-6 grid grid-cols-2 gap-2 text-xs font-semibold !text-[#10263F]">
                <span className="border-t-4 border-[#164B3A] pt-2">01 · Your email</span>
                <span className={`border-t-4 pt-2 ${pendingEmail ? "border-[#164B3A]" : "border-[#10263F]/15"}`}>02 · Verify</span>
              </div>
              <p className="mt-6 text-sm leading-7 !text-[#10263F]/60">
                {creating
                  ? "Create your My Gallaspy account at no cost. No paid club membership required."
                  : "Enter your account email and we’ll send you a verification code."}
              </p>

              {!pendingEmail ? (
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
                  <p role="alert" className="mt-5 text-sm !text-[#8E2633]">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 inline-flex min-h-[58px] w-full items-center justify-between bg-[#10263F] px-6 text-[9px] font-black uppercase tracking-[0.24em] !text-white transition hover:bg-[#0A2F29] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>
                    {loading ? "Sending..." : "Send Verification Code"}
                  </span>

                  <span aria-hidden="true" className="text-base !text-[#C7A55B]">
                    →
                  </span>
                </button>
              </form>
              ) : (
              <form onSubmit={handleVerify} className="mt-8">
                <label
                  htmlFor="verification-code"
                  className="text-[8px] font-black uppercase tracking-[0.26em] !text-[#10263F]/55"
                >
                  Six-Digit Verification Code
                </label>
                <input
                  id="verification-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  value={code}
                  onChange={(event) =>
                    setCode(event.target.value.replace(/[^0-9]/g, "").slice(0, 6))
                  }
                  required
                  className="mt-3 min-h-[58px] w-full border border-[#10263F]/20 bg-white px-4 text-center text-2xl tracking-[0.35em] !text-[#10263F]"
                />
                <p className="mt-3 text-sm !text-[#10263F]/60">
                  Code sent to {pendingEmail}
                </p>
                {message && <p role="status" className="mt-4 text-sm !text-[#10263F]">{message}</p>}
                {error && <p role="alert" className="mt-4 text-sm !text-[#8E2633]">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 min-h-[58px] w-full bg-[#10263F] px-6 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {loading ? "Verifying..." : "Verify & Sign In"}
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setPendingEmail("");
                    setCode("");
                    setMessage("");
                    setError("");
                  }}
                  className="mt-4 text-sm underline !text-[#10263F]"
                >
                  Change Email
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => void sendCode(pendingEmail)}
                  className="ml-5 mt-4 text-sm underline !text-[#10263F]"
                >
                  Resend code
                </button>
              </form>
              )}

              {!pendingEmail && (
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setCreating(!creating);
                    setError("");
                    setMessage("");
                  }}
                  className="mt-6 min-h-11 text-sm underline !text-[#10263F]"
                >
                  {creating ? "Already have an account? Sign in" : "New to My Gallaspy? Create an account"}
                </button>
              )}
            </div>
          </section>
        </div>

        {/* FOOT */}
        <footer className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[8px] font-black uppercase tracking-[0.28em] text-white/30">
            My Gallaspy · Digital Clubhouse
          </p>

          <p className="text-[8px] font-black uppercase tracking-[0.28em] text-[#C7A55B]/65">
            Georgia · Est. 2026
          </p>
        </footer>
      </div>
    </main>
  );
}
