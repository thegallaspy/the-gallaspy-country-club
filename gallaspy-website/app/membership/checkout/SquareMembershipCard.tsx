"use client";

import { useEffect, useImperativeHandle, useRef, useState } from "react";
import type { Ref } from "react";

type SquareTokenizeResult = {
  status: string;
  token?: string;
  errors?: Array<{
    code?: string;
    message?: string;
  }>;
};

type SquareCard = {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<SquareTokenizeResult>;
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

export type MembershipCardHandle = {
  testTokenization: () => Promise<boolean>;
  tokenizeForEnrollment: () => Promise<string>;
};

export default function SquareMembershipCard({
  cardHandleRef,
}: {
  cardHandleRef: Ref<MembershipCardHandle>;
}) {
  const cardRef = useRef<SquareCard | null>(null);
  const [status, setStatus] = useState("Loading secure card form...");

  const [testing, setTesting] = useState(false);

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

  useImperativeHandle(cardHandleRef, () => ({
    async tokenizeForEnrollment() {
      if (testing || !cardRef.current) {
        throw new Error("Secure card form is not ready.");
      }

      if (process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT !== "sandbox") {
        throw new Error("Enrollment is restricted to Square Sandbox.");
      }

      setStatus("Preparing secure Sandbox payment method...");

      try {
        const result = await cardRef.current.tokenize();

        if (result.status !== "OK" || !result.token) {
          throw new Error("Card validation failed. Check the card details.");
        }

        setStatus("Secure payment method prepared.");
        return result.token;
      } catch (error) {
        setStatus("Unable to prepare secure payment method.");
        throw error;
      }
    },

    async testTokenization() {
      if (testing || !cardRef.current) {
        setStatus("Secure card form is not ready.");
        return false;
      }

      if (process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT !== "sandbox") {
        setStatus("Sandbox testing only.");
        return false;
      }

      setTesting(true);
      setStatus("Validating Sandbox card...");

      try {
        const result = await cardRef.current.tokenize();

        if (result.status === "OK" && result.token) {
          setStatus("Sandbox card validated. No payment was made.");
          return true;
        }

        setStatus("Card validation failed. Check the test card details.");
        return false;
      } catch {
        setStatus("Unable to validate the Sandbox card.");
        return false;
      } finally {
        setTesting(false);
      }
    },
  }));

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
        Square Sandbox only. Testing a card does not charge it. Submitting an enabled Sandbox enrollment saves a test card and may create a simulated recurring $100 charge; no real money is charged.
      </p>
    </div>
  );
}
