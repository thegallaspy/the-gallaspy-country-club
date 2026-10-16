"use client";

import { useState } from "react";
import SquareMembershipCard from "./SquareMembershipCard";

export default function MembershipConsent() {
  const [agreed, setAgreed] = useState(false);

  return (
    <section className="mt-8 space-y-5">
      <SquareMembershipCard />
      <label className="flex items-start gap-3 text-sm leading-6">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          className="mt-1 h-4 w-4"
        />
        <span>
          I authorize The Gallaspy Golf Club to charge my selected
          payment method $100.00 USD each month until I cancel.
          I understand that green fees are separate and that
          cancellation stops future renewals.
        </span>
      </label>

      <button
        type="button"
        disabled
        className="w-full rounded-xl bg-[#10263F] px-6 py-4
                   font-semibold text-white opacity-50
                   disabled:cursor-not-allowed"
      >
        Secure Enrollment Coming Soon
      </button>

      <p className="text-sm text-[#526174]">
        {agreed
          ? "Recurring-payment consent selected. Enrollment is not yet available."
          : "Recurring-payment consent is required before enrollment."}
      </p>
    </section>
  );
}
