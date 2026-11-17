"use client";

import { useRef, useState } from "react";
import SquareMembershipCard from "./SquareMembershipCard";
import type { MembershipCardHandle } from "./SquareMembershipCard";

import {
  getStandardMembershipQuote,
  type StandardMembershipPlan,
} from "@/lib/membership/standard-plan-policy";

import {
  MEMBERSHIP_DOCUMENTS,
  MEMBERSHIP_DOCUMENTS_APPROVED,
} from "@/lib/membership/membership-document-registry";

type Props = {
  enrollmentEnabled: boolean;
  productionEnrollment: boolean;
  initialPlan: StandardMembershipPlan;
  verifiedEmail: string;
};

const money = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);

const documents = [
  ["membership-agreement.md", "Membership Agreement"],
  ["club-rules.md", "Club Rules and Regulations"],
  ["activity-waiver.md", "Activity Risk Acknowledgment"],
  ["billing-disclosure.md", "Recurring Billing Disclosure"],
  ["electronic-consent.md", "Electronic Signature Consent"],
] as const;

export default function MembershipConsent({
  enrollmentEnabled,
  productionEnrollment,
  initialPlan,
  verifiedEmail,
}: Props) {
  const [plan, setPlan] =
    useState<StandardMembershipPlan>(initialPlan);

  const [fullName, setFullName] = useState("");
  const [signature, setSignature] = useState("");

  const [legalAccepted, setLegalAccepted] = useState(false);
  const [riskAccepted, setRiskAccepted] = useState(false);
  const [electronicAccepted, setElectronicAccepted] = useState(false);
  const [billingAccepted, setBillingAccepted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState("");

  const submissionStarted = useRef(false);
  const inFlight = useRef(false);
  const cardHandleRef = useRef<MembershipCardHandle>(null);

  const quote = getStandardMembershipQuote(plan);

  const enabled =
    enrollmentEnabled &&
    MEMBERSHIP_DOCUMENTS_APPROVED;

  const locked =
    submitting || submitted || submissionStarted.current;

  const normalize = (value: string) =>
    value.trim().replace(/\s+/g, " ").toLowerCase();

  const validSignature =
    normalize(fullName).split(" ").length >= 2 &&
    normalize(signature) === normalize(fullName);

  const canSubmit =
    enabled &&
    !locked &&
    validSignature &&
    legalAccepted &&
    riskAccepted &&
    electronicAccepted &&
    billingAccepted;

  function selectPlan(next: StandardMembershipPlan) {
    if (locked) return;

    setPlan(next);

    // Consent must be provided again when pricing changes.
    setLegalAccepted(false);
    setRiskAccepted(false);
    setElectronicAccepted(false);
    setBillingAccepted(false);
    setSignature("");
  }

  async function submitEnrollment() {
    if (!canSubmit || inFlight.current) return;

    inFlight.current = true;
    setSubmitting(true);

    let token: string;

    try {
      if (!cardHandleRef.current) {
        throw new Error("Secure card form unavailable");
      }

      token =
        await cardHandleRef.current.tokenizeForEnrollment(fullName, verifiedEmail);

    } catch {
      setNotice(
        "Card verification failed. No enrollment request was sent."
      );
      setSubmitting(false);
      inFlight.current = false;
      return;
    }

    submissionStarted.current = true;

    setNotice(
      "Submitting your membership enrollment. Please wait."
    );

    try {
      const response = await fetch(
        "/api/membership/enrollment",
        {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan,
            fullName: fullName.trim(),
            signedFullName: signature.trim(),
            signedMembershipPlan: plan,

            initiationFeeCents: quote.initiationFeeCents,
            initialPaymentCents: quote.initialPaymentCents,
            renewalAmountCents: quote.renewalAmountCents,
            renewalInterval: quote.renewalInterval,

            legalTermsAccepted: legalAccepted,
            activityRiskAcknowledged: riskAccepted,
            electronicSignatureConsent: electronicAccepted,
            consent: billingAccepted,

            membershipAgreementVersion:
              MEMBERSHIP_DOCUMENTS["membership-agreement.md"].version,

            clubRulesVersion:
              MEMBERSHIP_DOCUMENTS["club-rules.md"].version,

            activityWaiverVersion:
              MEMBERSHIP_DOCUMENTS["activity-waiver.md"].version,

            billingDisclosureVersion:
              MEMBERSHIP_DOCUMENTS["billing-disclosure.md"].version,

            electronicConsentVersion:
              MEMBERSHIP_DOCUMENTS["electronic-consent.md"].version,

            cardToken: token,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Enrollment not confirmed");
      }

      const result = await response.json();

      if (
        result.success !== true ||
        result.status !== "awaiting_verified_payment" ||
        result.membership_active !== false
      ) {
        throw new Error("Unexpected enrollment result");
      }

      setSubmitted(true);
      setNotice(
        productionEnrollment
          ? "Enrollment received. Your membership will activate once all required payments are verified."
          : "Enrollment received. Membership remains pending until all required payments are independently verified. This is a Sandbox test."
      );

    } catch {
      setNotice(
        "Enrollment could not be confirmed. Do not submit again. Contact Gallaspy support to reconcile your payment status."
      );
    } finally {
      setSubmitting(false);
      inFlight.current = false;
    }
  }

  return (
    <section
      id="membership-enrollment"
      className="mt-12 space-y-8 rounded-2xl border border-[#D7E1E7] p-6 sm:p-8"
    >
      <header>
        <p className="text-xs font-bold uppercase tracking-widest text-[#164B3A]">
          The Gallaspy Golf Club
        </p>

        <h2 className="mt-3 text-3xl font-semibold">
          Standard Membership Enrollment
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#526174]">
          Select your preferred membership plan.
          Club membership is separate from your Gallaspy app account.
        </p>
      </header>

      <fieldset disabled={locked} className="space-y-4">
        <legend className="font-semibold">
          Select membership plan
        </legend>

        {(["monthly", "annual"] as const).map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#D7E1E7] p-4"
          >
            <input
              type="radio"
              name="membership-plan"
              checked={plan === option}
              onChange={() => selectPlan(option)}
            />

            <span className="font-semibold">
              {option === "monthly"
                ? "Monthly — $100/month"
                : "Annual — $1,000/year"}
            </span>
          </label>
        ))}
      </fieldset>

      <dl className="space-y-4 rounded-xl bg-[#F8FAFB] p-5 text-sm">
        <div className="flex justify-between">
          <dt>Initiation fee</dt>
          <dd>
            {plan === "annual"
              ? "Waived"
              : money(quote.initiationFeeCents)}
          </dd>
        </div>

        <div className="flex justify-between">
          <dt>First-period dues</dt>
          <dd>{money(quote.renewalAmountCents)}</dd>
        </div>

        <div className="flex justify-between border-t pt-4 font-bold">
          <dt>Initial payment total</dt>
          <dd>{money(quote.initialPaymentCents)}</dd>
        </div>

        <div className="flex justify-between">
          <dt>Automatic renewal</dt>
          <dd>
            {money(quote.renewalAmountCents)}
            {plan === "annual" ? " / year" : " / month"}
          </dd>
        </div>
      </dl>

      <p className="text-sm leading-6 text-[#526174]">
        Green fees and separately priced activities are not included.
        Cancellation stops future renewals at the end of the paid period.
      </p>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">
          Membership Documents
        </h3>

        {!MEMBERSHIP_DOCUMENTS_APPROVED ? (
          <p role="status" className="text-sm text-[#526174]">
            Draft documents are awaiting legal approval.
            They are available for review only and cannot be signed.
          </p>
        ) : null}

        {documents.map(([key, title]) => (
          <details
            key={key}
            className="rounded-xl border border-[#D7E1E7] p-4"
          >
            <summary className="cursor-pointer font-semibold">
              {title}
            </summary>

            <p className="mt-3 text-xs text-[#526174]">
              Version: {MEMBERSHIP_DOCUMENTS[key].version}
            </p>

            <div className="mt-4 whitespace-pre-wrap text-sm leading-7">
              {MEMBERSHIP_DOCUMENTS[key].content}
            </div>
          </details>
        ))}
      </div>

      <fieldset
        disabled={!enabled || locked}
        className="space-y-5 disabled:opacity-60"
      >
        <legend className="text-xl font-semibold">
          Electronic Signature and Authorization
        </legend>

        <label className="block text-sm font-semibold">
          Full legal name

          <input
            type="text"
            autoComplete="name"
            maxLength={180}
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value);
              setSignature("");
              setLegalAccepted(false);
              setRiskAccepted(false);
              setElectronicAccepted(false);
              setBillingAccepted(false);
            }}
            className="mt-2 w-full rounded-xl border border-[#BBC8D2] p-3"
          />
        </label>

        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={legalAccepted}
            onChange={e => setLegalAccepted(e.target.checked)}
          />
          I accept the Membership Agreement and Club Rules.
        </label>

        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={riskAccepted}
            onChange={e => setRiskAccepted(e.target.checked)}
          />
          I acknowledge the activity risks and applicable waiver.
        </label>

        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={electronicAccepted}
            onChange={e => setElectronicAccepted(e.target.checked)}
          />
          I consent to electronic signatures and electronic records.
        </label>

        <label className="block text-sm font-semibold">
          Electronic signature

          <input
            type="text"
            maxLength={180}
            value={signature}
            onChange={e => setSignature(e.target.value)}
            placeholder="Type your full legal name"
            className="mt-2 w-full rounded-xl border border-[#BBC8D2] p-3"
          />
        </label>

        <label className="flex items-start gap-3 text-sm leading-6">
          <input
            type="checkbox"
            checked={billingAccepted}
            onChange={e => setBillingAccepted(e.target.checked)}
          />

          <span>
            I authorize an initial payment totaling
            {" "}{money(quote.initialPaymentCents)} USD,
            followed by automatic payments of
            {" "}{money(quote.renewalAmountCents)}
            {plan === "annual" ? " each year" : " each month"}
            until canceled under the membership terms.
          </span>
        </label>
      </fieldset>

      {enabled && !submitted ? (
        <SquareMembershipCard cardHandleRef={cardHandleRef} />
      ) : null}

      <button
        type="button"
        disabled={!canSubmit}
        onClick={submitEnrollment}
        className="w-full rounded-xl bg-[#10263F] px-6 py-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting
          ? "Verifying Enrollment..."
          : enabled
            ? (productionEnrollment
              ? "CONFIRM MEMBERSHIP & AUTHORIZE PAYMENT"
              : "SUBMIT SANDBOX ENROLLMENT")
            : "ENROLLMENT COMING SOON"}
      </button>

      <p role="status" aria-live="polite"
        className="text-sm leading-6 text-[#526174]">
        {notice || (
          enabled
            ? (productionEnrollment
                ? "Submitting authorizes your initial payment and recurring membership dues."
                : "Square Sandbox test. No real funds are collected.")
            : "Enrollment is not available yet. No payment will be collected."
        )}
      </p>
    </section>
  );
}
