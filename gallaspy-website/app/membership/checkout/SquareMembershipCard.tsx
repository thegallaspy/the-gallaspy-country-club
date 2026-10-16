"use client";

import { useEffect, useRef, useState } from "react";

type SquareCard = {
  attach: (selector: string) => Promise<void>;
  destroy?: () => Promise<void>;
};

type SquareWindow = Window & {
  Square?: {
    payments: (
      applicationId: string,
      locationId: string
    ) => {
      card: () => Promise<SquareCard>;
    };
  };
};

export default function SquareMembershipCard() {
  const cardRef = useRef<SquareCard | null>(null);
  const [status, setStatus] = useState("Loading secure card form...");

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    let retry: ReturnType<typeof setTimeout> | undefined;

    async function initialize() {
      const applicationId =
        process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
      const locationId =
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

      if (
        process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT !== "sandbox"
      ) {
        setStatus("Card enrollment is available in sandbox only.");
        return;
      }

      if (!applicationId || !locationId) {
        setStatus("Square sandbox configuration is missing.");
        return;
      }

      const square = (window as SquareWindow).Square;

      if (!square) {
        if (++attempts < 30) {
          retry = setTimeout(initialize, 250);
        } else {
          setStatus("Secure card form could not be loaded.");
        }
        return;
      }

      try {
        const card = await square.payments(
          applicationId,
          locationId
        ).card();

        if (cancelled) {
          await card.destroy?.();
          return;
        }

        await card.attach("#membership-card-container");

        if (cancelled) {
          await card.destroy?.();
          return;
        }

        cardRef.current = card;
        setStatus("Secure sandbox card form ready.");
      } catch {
        if (!cancelled) {
          setStatus("Unable to initialize secure card form.");
        }
      }
    }

    void initialize();

    return () => {
      cancelled = true;
      if (retry) clearTimeout(retry);
      const card = cardRef.current;
      cardRef.current = null;
      if (card) void card.destroy?.();
    };
  }, []);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Payment Method</h2>
      <div
        id="membership-card-container"
        className="min-h-24 rounded-xl border border-[#DCE4E9] p-4"
      />
      <p role="status" className="text-sm text-[#526174]">
        {status}
      </p>
      <p className="text-xs text-[#526174]">
        Sandbox testing only. No card will be saved or charged.
      </p>
    </div>
  );
}
