"use client";

import { useRef, useState } from "react";
import SquareMembershipCard from "./SquareMembershipCard";
import type { MembershipCardHandle } from "./SquareMembershipCard";

type Props = { sandboxEnrollmentEnabled: boolean };

export default function MembershipConsent({ sandboxEnrollmentEnabled }: Props) {
  const [agreed, setAgreed] = useState(false);
  const [fullName, setFullName] = useState("");
  const [testing, setTesting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState("");
  const submissionStarted = useRef(false);
  const cardHandleRef = useRef<MembershipCardHandle>(null);

  const hasFullName = fullName.trim().split(/\s+/).filter(Boolean).length >= 2;
  const canSubmit = sandboxEnrollmentEnabled && agreed && hasFullName &&
    !testing && !submitting && !submitted && !submissionStarted.current;

  async function testCard() {
    if (!agreed || testing || submitting || submitted) return;
    setTesting(true);
    try {
      await cardHandleRef.current?.testTokenization();
    } finally {
      setTesting(false);
    }
  }

  async function startSandboxEnrollment() {
    // An in-flight Square subscription creation must never be replayed from UI.
    if (!canSubmit || submissionStarted.current) return;
    setSubmitting(true);
    setNotice("Preparing your Square Sandbox enrollment...");

    let token: string;
    try {
      if (!cardHandleRef.current) throw new Error("Card form unavailable");
      token = await cardHandleRef.current.tokenizeForEnrollment();
    } catch {
      setNotice("Sandbox card validation failed. No enrollment request was sent; check the card and try again.");
      setSubmitting(false);
      return;
    }

    // Lock after preparing the token and BEFORE the network request. A timeout
    // does not mean Square did not create a subscription.
    submissionStarted.current = true;
    setNotice("Submitting a simulated $100/month Square Sandbox subscription. Please wait...");

    try {
      const response = await fetch("/api/membership/enrollment", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: fullName.trim(), consent: true, cardToken: token }),
      });
      // Never print card tokens or responses to the console.
      if (!response.ok) {
        setNotice("Enrollment could not be confirmed. Do NOT resubmit. Contact Gallaspy support so we can check Square and your account.");
        return;
      }
      const result: unknown = await response.json();
      if (typeof result !== "object" || result === null ||
          !("success" in result) || result.success !== true ||
          !("status" in result) || result.status !== "awaiting_verified_payment" ||
          !("membership_active" in result) || result.membership_active !== false) {
        setNotice("Enrollment status could not be confirmed. Do NOT resubmit. Contact Gallaspy support.");
        return;
      }
      setSubmitted(true);
      setNotice("Square Sandbox subscription created. Official membership is NOT active; activation requires a separately verified $100 payment. This is a test, not a real charge.");
    } catch {
      // The server may have created a subscription even when the response is lost.
      setNotice("The enrollment request's outcome is unknown. Do NOT try again or refresh to repeat it. Contact Gallaspy support to reconcile the Square Sandbox subscription.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-8 space-y-5">
      <SquareMembershipCard cardHandleRef={cardHandleRef} />
      <div className="space-y-2">
        <label htmlFor="standard-member-name" className="block text-sm font-semibold">
          First and Last Name
        </label>
        <input
          id="standard-member-name"
          type="text"
          autoComplete="name"
          maxLength={180}
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          disabled={submitting || submissionStarted.current}
          placeholder="First and last name"
          className="w-full rounded-xl border border-[#BBC8D2] px-4 py-3 text-[#10263F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426B55] disabled:opacity-50"
        />
      </div>
      <label className="flex items-start gap-3 text-sm leading-6">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          disabled={submitting || submissionStarted.current}
          className="mt-1 h-4 w-4"
        />
        <span>
          I authorize The Gallaspy Golf Club to charge my selected
          payment method $100.00 USD each month until I cancel.
          I understand that green fees are separate and that
          cancellation stops future renewals. In Square Sandbox,
          charges are simulated and do not use real funds.
        </span>
      </label>
      <button
        type="button"
        onClick={testCard}
        disabled={!agreed || testing || submitting || submitted || submissionStarted.current}
        className="w-full rounded-xl border border-[#10263F] px-6 py-4 font-semibold text-[#10263F] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {testing ? "Validating Sandbox Card..." : "Test Secure Card"}
      </button>
      <button
        type="button"
        onClick={startSandboxEnrollment}
        disabled={!canSubmit}
        className="w-full rounded-xl bg-[#10263F] px-6 py-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426B55]"
      >
        {submitting ? "Processing Sandbox Enrollment..." :
          sandboxEnrollmentEnabled ? "Start Sandbox Membership Test — $100/month" : "Secure Enrollment Coming Soon"}
      </button>
      <p aria-live="polite" role="status" className="text-sm text-[#526174]">
        {notice || (sandboxEnrollmentEnabled
          ? agreed ? "This is an enabled Square Sandbox test. A simulated subscription may begin when you submit." : "Recurring-payment consent is required before enrollment."
          : "Enrollment remains disabled. No subscription will be created.")}
      </p>
    </section>
  );
}
