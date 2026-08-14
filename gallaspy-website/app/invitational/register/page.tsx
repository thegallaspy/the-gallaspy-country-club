"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import InvitationalNav from "@/components/invitational/InvitationalNav";

export default function InvitationalRegisterPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      city: formData.get("city"),
      state: formData.get("state"),
      playerInterest: formData.get("playerInterest"),
      teamName: formData.get("teamName"),
      shirtSize: formData.get("shirtSize"),
      sponsorInterest: formData.get("sponsorInterest"),
      notes: formData.get("notes"),
    };

    try {
      const response = await fetch("/api/invitational/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit registration.");
      }

      setSuccess(true);
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F0E6] text-[#10263F]">
      <InvitationalNav />

      {/* HERO */}
      <section className="bg-[#10263F] px-6 pb-20 pt-32 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/invitational"
            className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60 transition hover:text-[#FFD76A]"
          >
            ← Back to Invitational
          </Link>

          <div className="mt-10">
            <Image
              src="/logos/gallaspy-invitational.png"
              alt="The Gallaspy Invitational"
              width={300}
              height={300}
              priority
              className="h-auto w-[150px] sm:w-[180px] lg:w-[205px]"
            />
          </div>

          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A]">
            The First Annual
          </p>

          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            2027 Gallaspy
            <span className="block text-[#FFD76A]">Invitational</span>
          </h1>

          <div className="mt-8 h-px w-20 bg-[#B89146]" />

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/70">
            Join the priority list for player registration and be among the
            first to receive official tournament registration information.
          </p>
        </div>
      </section>

      {/* EVENT SNAPSHOT */}
      <section className="border-b border-[#10263F]/10 bg-white px-6 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 md:grid-cols-4">
          <div className="border-b border-r border-[#10263F]/10 px-4 py-7 md:border-b-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Format
            </p>
            <p className="mt-2 font-serif text-xl">4-Person Scramble</p>
          </div>

          <div className="border-b border-[#10263F]/10 px-4 py-7 md:border-b-0 md:border-r">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Field
            </p>
            <p className="mt-2 font-serif text-xl">100 Players</p>
          </div>

          <div className="border-r border-[#10263F]/10 px-4 py-7">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Prize Purse
            </p>
            <p className="mt-2 font-serif text-xl">$10,000</p>
          </div>

          <div className="px-4 py-7">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Start
            </p>
            <p className="mt-2 font-serif text-xl">11:00 AM</p>
          </div>
        </div>
      </section>

      {/* REGISTRATION */}
      <section className="px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34]">
              Player Interest
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Be there when the tradition begins.
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#10263F]/65">
              The inaugural field is planned for 100 players competing in a
              4-person scramble for a $10,000 prize purse. Submit your interest
              to receive registration announcements, finalized player pricing,
              host-course information, and tournament updates.
            </p>
          </div>

          <div className="rounded-[22px] border border-[#10263F]/10 bg-white p-7 sm:p-9">
            {success ? (
              <div className="py-14 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
                  Submission Received
                </p>

                <h3 className="mt-5 font-serif text-4xl">
                  You&apos;re on the priority list.
                </h3>

                <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#10263F]/65">
                  Thank you for your interest in the 2027 Gallaspy
                  Invitational. We&apos;ll use the information you submitted to
                  keep you informed as official registration details are
                  released.
                </p>

                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-8 inline-flex min-h-[50px] items-center justify-center rounded-full border border-[#10263F]/20 px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#10263F] transition hover:border-[#B89146] hover:text-[#B89146]"
                >
                  Submit Another Player
                </button>
              </div>
            ) : (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8B6A34]">
                  Registration Status
                </p>

                <h3 className="mt-4 font-serif text-3xl">
                  Priority Interest List
                </h3>

                <p className="mt-5 text-sm leading-7 text-[#10263F]/65">
                  Official paid registration has not opened yet. Joining the
                  interest list does not reserve a tournament position or
                  require payment.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-8">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8B6A34]">
                      Player Information
                    </p>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <Field label="First Name" name="firstName" required />
                      <Field label="Last Name" name="lastName" required />
                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Email Address"
                        name="email"
                        type="email"
                        required
                      />
                      <Field
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        required
                      />
                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <Field label="City" name="city" />
                      <Field label="State" name="state" />
                    </div>
                  </div>

                  <div className="border-t border-[#10263F]/10 pt-7">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8B6A34]">
                      Registration Interest
                    </p>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="playerInterest"
                          className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]"
                        >
                          How Would You Like to Register? *
                        </label>

                        <select
                          id="playerInterest"
                          name="playerInterest"
                          required
                          defaultValue=""
                          className="h-[50px] w-full rounded-xl border border-[#10263F]/15 bg-[#F9F7F2] px-4 text-sm outline-none transition focus:border-[#B89146]"
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          <option value="Individual Player">
                            Individual Player
                          </option>
                          <option value="2 Players">2 Players</option>
                          <option value="3 Players">3 Players</option>
                          <option value="Full 4-Person Team">
                            Full 4-Person Team
                          </option>
                        </select>
                      </div>

                      <Field
                        label="Team Name"
                        name="teamName"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div className="border-t border-[#10263F]/10 pt-7">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8B6A34]">
                      Player Shirt Size
                    </p>

                    <p className="mt-3 text-[11px] leading-6 text-[#10263F]/55">
                      Player polos are planned as part of the tournament
                      experience.
                    </p>

                    <div className="mt-5">
                      <label
                        htmlFor="shirtSize"
                        className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]"
                      >
                        Polo Size *
                      </label>

                      <select
                        id="shirtSize"
                        name="shirtSize"
                        required
                        defaultValue=""
                        className="h-[50px] w-full rounded-xl border border-[#10263F]/15 bg-[#F9F7F2] px-4 text-sm outline-none transition focus:border-[#B89146]"
                      >
                        <option value="" disabled>
                          Select size
                        </option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="XL">XL</option>
                        <option value="2XL">2XL</option>
                        <option value="3XL">3XL</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-[#10263F]/10 pt-7">
                    <label
                      htmlFor="sponsorInterest"
                      className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]"
                    >
                      Interested in Sponsorship?
                    </label>

                    <select
                      id="sponsorInterest"
                      name="sponsorInterest"
                      defaultValue="No"
                      className="h-[50px] w-full rounded-xl border border-[#10263F]/15 bg-[#F9F7F2] px-4 text-sm outline-none transition focus:border-[#B89146]"
                    >
                      <option value="No">No</option>
                      <option value="Yes">
                        Yes — Send Me Sponsorship Information
                      </option>
                      <option value="Maybe">
                        Possibly — I&apos;d Like to Learn More
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="notes"
                      className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]"
                    >
                      Team Information or Notes
                    </label>

                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      placeholder="Team member names, additional shirt sizes, questions, or other information..."
                      className="w-full rounded-xl border border-[#10263F]/15 bg-[#F9F7F2] px-4 py-3 text-sm outline-none transition focus:border-[#B89146]"
                    />
                  </div>

                  <div className="border-l-2 border-[#B89146] bg-[#F5F0E6] px-5 py-4">
                    <p className="text-[11px] leading-6 text-[#10263F]/60">
                      This form expresses player interest only. Your place in
                      the tournament is not confirmed until official
                      registration opens and payment is completed.
                    </p>
                  </div>

                  {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#10263F] px-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-[#B89146] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting
                      ? "Submitting..."
                      : "Join the Priority List"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
};

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]"
      >
        {label}
        {required ? " *" : ""}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-[50px] w-full rounded-xl border border-[#10263F]/15 bg-[#F9F7F2] px-4 text-sm outline-none transition focus:border-[#B89146]"
      />
    </div>
  );
}