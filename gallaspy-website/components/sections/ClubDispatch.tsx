"use client";

import { FormEvent, useState } from "react";

export default function ClubDispatch() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/dispatch/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Unable to join The Club Dispatch.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "Welcome to The Club Dispatch.");

      if (!data.alreadySubscribed) {
        setFirstName("");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMessage("Unable to join The Club Dispatch. Please try again.");
    }
  }

  return (
    <section className="bg-[#0C352D] px-5 py-16 text-white sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1120px]">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
          <div>
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-[#D7B56D]" />

              <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#D7B56D]">
                The Club Dispatch
              </p>
            </div>

            <h2 className="mt-7 max-w-3xl font-serif text-[3rem] font-light leading-[0.98] sm:text-5xl lg:text-6xl">
              Stay close to
              <span className="block text-[#D7B56D]">what happens next.</span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              Rounds. Competition. Gatherings. Club news. The Dispatch keeps
              you connected to the next opportunity to play, participate, or
              follow the story of The Gallaspy.
            </p>
          </div>

          <div className="border-l border-white/15 pl-0 lg:pl-10">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
              Inside The Dispatch
            </p>

            <div className="mt-5 border-t border-white/15">
              {[
                "Upcoming Gallaspy Rounds",
                "Invitational News",
                "Mercury Match Updates",
                "Club Gatherings",
                "Apparel & Announcements",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 border-b border-white/15 py-3.5"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[#D7B56D]" />

                  <span className="text-xs uppercase tracking-[0.13em] text-white/65">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="dispatch-first-name"
                    className="sr-only"
                  >
                    First name
                  </label>

                  <input
                    id="dispatch-first-name"
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder="First name"
                    autoComplete="given-name"
                    required
                    disabled={status === "loading"}
                    className="min-h-[50px] w-full border border-white/20 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/35 transition focus:border-[#D7B56D] disabled:opacity-60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dispatch-email"
                    className="sr-only"
                  >
                    Email address
                  </label>

                  <input
                    id="dispatch-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email address"
                    autoComplete="email"
                    required
                    disabled={status === "loading"}
                    className="min-h-[50px] w-full border border-white/20 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/35 transition focus:border-[#D7B56D] disabled:opacity-60"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex min-h-[50px] w-full items-center justify-center bg-[#D7B56D] px-7 text-[9px] font-bold uppercase tracking-[0.21em] text-[#10263F] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading"
                  ? "Joining The Dispatch..."
                  : "Receive The Dispatch →"}
              </button>

              {message && (
                <p
                  aria-live="polite"
                  className={`text-[11px] leading-5 ${
                    status === "error"
                      ? "text-[#FFD0D0]"
                      : "text-[#D7B56D]"
                  }`}
                >
                  {message}
                </p>
              )}

              <p className="text-[10px] leading-5 text-white/35">
                Club updates only. Your information stays with The Gallaspy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
