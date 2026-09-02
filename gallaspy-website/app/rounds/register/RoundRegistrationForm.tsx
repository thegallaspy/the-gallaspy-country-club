"use client";

import { FormEvent, useMemo, useState } from "react";

type RoundOption = {
  id: string;
  name: string;
  dateLabel: string;
};

type Props = {
  rounds: RoundOption[];
  initialRoundId?: string;
};

export default function RoundRegistrationForm({
  rounds,
  initialRoundId,
}: Props) {
  const validInitialRound = useMemo(
    () =>
      initialRoundId &&
      rounds.some((round) => round.id === initialRoundId)
        ? initialRoundId
        : rounds[0]?.id ?? "",
    [initialRoundId, rounds],
  );

  const [eventId, setEventId] = useState(validInitialRound);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [ghinNumber, setGhinNumber] = useState("");
  const [handicapIndex, setHandicapIndex] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const selectedRound = rounds.find(
    (round) => round.id === eventId,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/rounds/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          firstName,
          lastName,
          email,
          phone,
          city,
          state,
          ghinNumber,
          handicapIndex,
          notes,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.error ||
            "Unable to submit your registration. Please try again.",
        );
        setSubmitting(false);
        return;
      }

      setSuccess(true);
    } catch (submissionError) {
      console.error(submissionError);

      setError(
        "Unable to submit your registration. Please try again.",
      );
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="border-t-4 border-[#FFD76A] bg-white p-7 sm:p-10">
        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#8B6A34]">
          Registration Received
        </p>

        <h2 className="mt-5 text-[2.3rem] font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#10263F] sm:text-[3rem]">
          You&apos;re On
          <span className="block text-[#0C352D]">
            The List.
          </span>
        </h2>

        <p className="mt-6 max-w-xl text-sm leading-7 text-[#10263F]/65">
          Your registration for{" "}
          <strong>{selectedRound?.name}</strong>{" "}
          has been received. A confirmation has been sent to{" "}
          <strong>{email}</strong>.
        </p>

        <div className="mt-7 border-l-2 border-[#B89146] bg-[#F4F0E7] p-5">
          <p className="text-[8px] font-black uppercase tracking-[0.24em] text-[#8B6A34]">
            Green Fee
          </p>

          <p className="mt-3 text-sm leading-7 text-[#10263F]/65">
            Each golfer is responsible for their own green fee.
            Course, tee-time and payment details will be communicated
            as Round details are finalized.
          </p>
        </div>

        <a
          href="/rounds"
          className="mt-8 inline-flex min-h-[48px] items-center justify-center bg-[#10263F] px-6 text-[8px] font-black uppercase tracking-[0.22em] text-white transition hover:bg-[#0C352D]"
        >
          Back To Gallaspy Rounds →
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-8 lg:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="eventId"
            className="text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F]"
          >
            Select Your Round *
          </label>

          <select
            id="eventId"
            value={eventId}
            onChange={(event) => setEventId(event.target.value)}
            required
            className="mt-3 min-h-[52px] w-full border border-[#10263F]/20 bg-[#F4F0E7] px-4 text-sm text-[#10263F] outline-none focus:border-[#0C352D]"
          >
            {rounds.map((round) => (
              <option key={round.id} value={round.id}>
                {round.dateLabel} — {round.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="firstName"
            className="text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F]"
          >
            First Name *
          </label>

          <input
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
            autoComplete="given-name"
            className="mt-3 min-h-[52px] w-full border border-[#10263F]/20 px-4 text-sm outline-none focus:border-[#0C352D]"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F]"
          >
            Last Name *
          </label>

          <input
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
            autoComplete="family-name"
            className="mt-3 min-h-[52px] w-full border border-[#10263F]/20 px-4 text-sm outline-none focus:border-[#0C352D]"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F]"
          >
            Email *
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            className="mt-3 min-h-[52px] w-full border border-[#10263F]/20 px-4 text-sm outline-none focus:border-[#0C352D]"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F]"
          >
            Phone *
          </label>

          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
            autoComplete="tel"
            className="mt-3 min-h-[52px] w-full border border-[#10263F]/20 px-4 text-sm outline-none focus:border-[#0C352D]"
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F]"
          >
            City
          </label>

          <input
            id="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            autoComplete="address-level2"
            className="mt-3 min-h-[52px] w-full border border-[#10263F]/20 px-4 text-sm outline-none focus:border-[#0C352D]"
          />
        </div>

        <div>
          <label
            htmlFor="state"
            className="text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F]"
          >
            State
          </label>

          <input
            id="state"
            value={state}
            onChange={(event) => setState(event.target.value)}
            autoComplete="address-level1"
            className="mt-3 min-h-[52px] w-full border border-[#10263F]/20 px-4 text-sm outline-none focus:border-[#0C352D]"
          />
        </div>

        <div>
          <label
            htmlFor="ghinNumber"
            className="text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F]"
          >
            GHIN Number
          </label>

          <input
            id="ghinNumber"
            value={ghinNumber}
            onChange={(event) => setGhinNumber(event.target.value)}
            className="mt-3 min-h-[52px] w-full border border-[#10263F]/20 px-4 text-sm outline-none focus:border-[#0C352D]"
          />
        </div>

        <div>
          <label
            htmlFor="handicapIndex"
            className="text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F]"
          >
            Handicap Index
          </label>

          <input
            id="handicapIndex"
            value={handicapIndex}
            onChange={(event) => setHandicapIndex(event.target.value)}
            placeholder="Optional"
            className="mt-3 min-h-[52px] w-full border border-[#10263F]/20 px-4 text-sm outline-none focus:border-[#0C352D]"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="notes"
            className="text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F]"
          >
            Notes
          </label>

          <textarea
            id="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={4}
            placeholder="Anything we should know?"
            className="mt-3 w-full border border-[#10263F]/20 px-4 py-4 text-sm outline-none focus:border-[#0C352D]"
          />
        </div>
      </div>

      <div className="mt-8 border-l-2 border-[#B89146] bg-[#F4F0E7] p-5">
        <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#8B6A34]">
          Green Fees
        </p>

        <p className="mt-3 text-sm leading-6 text-[#10263F]/65">
          Registration reserves your place on the Gallaspy Round list.
          Each golfer is responsible for their own green fee. Course,
          tee-time and payment details will be communicated separately.
        </p>
      </div>

      {error && (
        <div className="mt-6 border-l-2 border-red-700 bg-red-50 p-4 text-sm leading-6 text-red-800">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || rounds.length === 0}
        className="mt-8 inline-flex min-h-[52px] w-full items-center justify-center bg-[#0C352D] px-7 text-[8px] font-black uppercase tracking-[0.24em] text-white transition hover:bg-[#10263F] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {submitting ? "Submitting..." : "Register For Round →"}
      </button>
    </form>
  );
}
