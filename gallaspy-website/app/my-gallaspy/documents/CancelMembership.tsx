"use client";

import { useRef, useState } from "react";

export default function CancelMembership() {
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);
  const [finished, setFinished] = useState(false);
  const [notice, setNotice] = useState("");
  const inFlight = useRef(false);

  async function cancel() {
    if (inFlight.current || finished) return;

    inFlight.current = true;
    setPending(true);

    try {
      const response = await fetch("/api/membership/cancel", {
        method: "POST",
        credentials: "same-origin",
      });

      const result = await response.json();

      if (!response.ok ||
          result.success !== true ||
          result.cancellation_scheduled !== true) {
        throw new Error("Cancellation not confirmed");
      }

      setFinished(true);
      setNotice("Future renewals have been scheduled to stop. Your verified paid-period benefits remain available until their eligible period ends.");

    } catch {
      setFinished(true);
      setNotice("Cancellation could not be confirmed. Contact info@thegallaspy.com to verify your billing status.");
    } finally {
      setPending(false);
      setConfirming(false);
      inFlight.current = false;
    }
  }

  return (
    <section className="space-y-4 rounded-xl border p-6">
      <h2 className="text-xl font-semibold">Manage Membership Billing</h2>

      <p className="text-sm leading-6">
        Cancel future automatic renewals of your Standard Membership.
        Cancellation does not automatically issue a refund.
      </p>

      {!finished && !confirming && (
        <button type="button"
          onClick={() => setConfirming(true)}
          className="font-semibold underline">
          Cancel future renewals
        </button>
      )}

      {confirming && !finished && (
        <div className="space-y-4">
          <p>Are you sure you want to stop future membership renewals?</p>

          <button type="button" disabled={pending}
            onClick={cancel}
            className="rounded-xl bg-[#10263F] px-5 py-3 text-white">
            {pending ? "Confirming..." : "Confirm cancellation"}
          </button>

          <button type="button" disabled={pending}
            onClick={() => setConfirming(false)}
            className="ml-4 underline">
            Keep membership
          </button>
        </div>
      )}

      <p role="status" aria-live="polite">{notice}</p>
    </section>
  );
}
