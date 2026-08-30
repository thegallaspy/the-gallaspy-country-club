"use client";

import Link from "next/link";
import {
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import InvitationalNav from "@/components/invitational/InvitationalNav";

const PLAYER_PRICE = 200;

type SquareTokenResult = {
  status: string;
  token?: string;
  errors?: Array<{
    code?: string;
    detail?: string;
    message?: string;
  }>;
};

type SquareCard = {
  attach: (selector: string) => Promise<void>;
  tokenize: (details: {
    amount: string;
    currencyCode: string;
    intent: "CHARGE";
    customerInitiated: boolean;
    sellerKeyedIn: boolean;
    billingContact: {
      givenName: string;
      familyName: string;
      email: string;
      phone?: string;
      city?: string;
      state?: string;
      countryCode: string;
    };
  }) => Promise<SquareTokenResult>;
  destroy?: () => Promise<boolean>;
};

type SquarePayments = {
  card: () => Promise<SquareCard>;
};

declare global {
  interface Window {
    Square?: {
      payments: (
        applicationId: string,
        locationId: string
      ) => any;
    };
  }
}

export default function InvitationalCheckoutPage() {
  const [registrationType, setRegistrationType] =
    useState("Individual Player");

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedRefund, setAcceptedRefund] = useState(false);
  const [acceptedWaiver, setAcceptedWaiver] = useState(false);
  const [acceptedRules, setAcceptedRules] = useState(false);
  const [mediaConsent, setMediaConsent] = useState(false);

  const [squareReady, setSquareReady] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [paymentId, setPaymentId] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");

  const squareCardRef = useRef<SquareCard | null>(null);
  const squareInitializingRef = useRef(false);

  const quantity = 1;

  const total = quantity * PLAYER_PRICE;

  const requiredPoliciesAccepted =
    acceptedTerms &&
    acceptedRefund &&
    acceptedWaiver &&
    acceptedRules;

  useEffect(() => {
    let cancelled = false;

    async function initializeSquare() {
      if (
        squareInitializingRef.current ||
        squareCardRef.current
      ) {
        return;
      }

      const applicationId =
        process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;

      const locationId =
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

      if (!applicationId || !locationId) {
        setPaymentError(
          "Square payment configuration is incomplete."
        );
        return;
      }

      squareInitializingRef.current = true;

      try {
        let attempts = 0;

        while (!window.Square && attempts < 40) {
          await new Promise((resolve) =>
            setTimeout(resolve, 250)
          );
          attempts += 1;
        }

        if (!window.Square) {
          throw new Error(
            "Square payment services could not be loaded."
          );
        }

        const payments = window.Square.payments(
          applicationId,
          locationId
        );

        const card = await payments.card();

        if (cancelled) {
          if (card.destroy) {
            await card.destroy();
          }
          return;
        }

        await card.attach("#square-card-container");

        squareCardRef.current = card;
        setSquareReady(true);
        setPaymentError("");
      } catch (error) {
        console.error("Square initialization error:", error);

        if (!cancelled) {
          setPaymentError(
            error instanceof Error
              ? error.message
              : "Unable to initialize Square payments."
          );
        }
      } finally {
        squareInitializingRef.current = false;
      }
    }

    initializeSquare();

    return () => {
      cancelled = true;

      const card = squareCardRef.current;

      if (card?.destroy) {
        card.destroy().catch(() => undefined);
      }

      squareCardRef.current = null;
    };
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (paymentProcessing || paymentSuccess) {
      return;
    }

    setPaymentError("");

    if (!requiredPoliciesAccepted) {
      setPaymentError(
        "Please accept all required tournament policies before continuing."
      );
      return;
    }

    if (!squareReady || !squareCardRef.current) {
      setPaymentError(
        "The secure payment form is not ready yet."
      );
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const firstName = String(
      formData.get("firstName") || ""
    ).trim();

    const lastName = String(
      formData.get("lastName") || ""
    ).trim();

    const email = String(
      formData.get("email") || ""
    ).trim();

    const phone = String(
      formData.get("phone") || ""
    ).trim();

    const city = String(
      formData.get("city") || ""
    ).trim();

    const state = String(
      formData.get("state") || ""
    ).trim();

    const shirtSize = String(
      formData.get("shirtSize") || ""
    ).trim();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !city ||
      !state ||
      !shirtSize
    ) {
      setPaymentError(
        "Please complete all required player information."
      );
      return;
    }

    try {
      const verificationDetails = {
        amount: total.toFixed(2),
        currencyCode: "USD",
        intent: "CHARGE" as const,
        customerInitiated: true,
        sellerKeyedIn: false,
        billingContact: {
          givenName: firstName,
          familyName: lastName,
          email,
          phone,
          city,
          state,
          countryCode: "US",
        },
      };

      const tokenResult =
        await squareCardRef.current.tokenize(
          verificationDetails
        );

      if (
        tokenResult.status !== "OK" ||
        !tokenResult.token
      ) {
        const tokenError =
          tokenResult.errors
            ?.map(
              (error) =>
                error.detail ||
                error.message ||
                error.code
            )
            .filter(Boolean)
            .join(", ") ||
          "Card tokenization was unsuccessful.";

        throw new Error(tokenError);
      }

      const response = await fetch(
        "/api/invitational/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sourceId: tokenResult.token,

            quantity,
            registrationType,

            firstName,
            lastName,
            email,
            phone,
            city,
            state,
            shirtSize,

            acceptedTerms,
            acceptedRefund,
            acceptedWaiver,
            acceptedRules,
            mediaConsent,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (result.paymentSucceeded) {
          throw new Error(
            `${result.error} Payment reference: ${
              result.paymentId || "Unavailable"
            }`
          );
        }

        throw new Error(
          result.error ||
            "Square was unable to process the payment."
        );
      }

      setRegistrationNumber(
        result.registrationNumber || ""
      );

      setPaymentId(result.paymentId || "");

      setReceiptUrl(result.receiptUrl || "");

      setPaymentSuccess(true);
    } catch (error) {
      console.error("Payment error:", error);

      setPaymentError(
        error instanceof Error
          ? error.message
          : "Unable to process payment. Please try again."
      );
    } finally {
      setPaymentProcessing(false);
    }
  }

  if (paymentSuccess) {
    return (
      <main className="min-h-screen bg-[#F5F0E6] text-[#10263F]">
        <InvitationalNav />

        <section className="bg-[#10263F] px-6 pb-20 pt-32 text-white sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1000px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A]">
              2027 Gallaspy Invitational
            </p>

            <h1 className="mt-5 font-serif text-5xl sm:text-6xl">
              Registration
              <span className="block text-[#FFD76A]">
                Confirmed
              </span>
            </h1>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[760px] rounded-[24px] border border-[#10263F]/10 bg-white p-8 text-center sm:p-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34]">
              Payment & Registration Complete
            </p>

            <h2 className="mt-5 font-serif text-4xl">
              You&apos;re registered for the 2027
              Gallaspy Invitational.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#10263F]/60">
              Your payment was successfully processed and
              your tournament registration has been recorded.
              Keep the confirmation information below for
              your records.
            </p>

            {registrationNumber && (
              <div className="mt-8 rounded-xl bg-[#F5F0E6] px-5 py-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
                  Gallaspy Registration Number
                </p>

                <p className="mt-2 font-serif text-3xl">
                  {registrationNumber}
                </p>
              </div>
            )}

            {paymentId && (
              <div className="mt-4 rounded-xl border border-[#10263F]/10 px-5 py-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
                  Square Payment Reference
                </p>

                <p className="mt-2 break-all text-xs text-[#10263F]/60">
                  {paymentId}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              {receiptUrl && (
                <a
                  href={receiptUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#10263F]/20 px-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#10263F] transition hover:border-[#B89146] hover:text-[#B89146]"
                >
                  View Square Receipt
                </a>
              )}

              <Link
                href="/invitational"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#10263F] px-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#B89146]"
              >
                Return to Invitational
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F0E6] text-[#10263F]">
      <InvitationalNav />

      <section className="bg-[#10263F] px-6 pb-20 pt-32 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/invitational"
            className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60 transition hover:text-[#FFD76A]"
          >
            ← Back to Invitational
          </Link>

          <p className="mt-12 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A]">
            2027 Gallaspy Invitational
          </p>

          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            Player
            <span className="block text-[#FFD76A]">
              Registration
            </span>
          </h1>

          <div className="mt-8 h-px w-20 bg-[#B89146]" />

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/70">
            Complete your player information, review the
            tournament policies, and securely register for
            the inaugural Gallaspy Invitational.
          </p>
        </div>
      </section>

      <section className="border-b border-[#10263F]/10 bg-white px-6 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8B6A34]">
              Registration Status
            </p>

            <p className="mt-1 font-serif text-xl">
              Paid Registration
            </p>
          </div>

          <span className="inline-flex w-fit rounded-full bg-[#F5F0E6] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
            Registration Open
          </span>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <form
          onSubmit={handleSubmit}
          className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="space-y-8">
            <Panel>
              <SectionHeading
                eyebrow="Step 01"
                title="Select Registration"
                description="Choose the number of players included with this registration."
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <RegistrationOption
                  title="Individual Player"
                  players="1 Player"
                  price={formatCurrency(PLAYER_PRICE)}
                  selected={
                    registrationType ===
                    "Individual Player"
                  }
                  onClick={() =>
                    setRegistrationType(
                      "Individual Player"
                    )
                  }
                />

                <div className="border border-[#10263F]/15 bg-white p-6">
                  <p className="text-[8px] font-black uppercase tracking-[0.24em] text-[#8B6A34]">
                    Individual Entry
                  </p>
                  <p className="mt-3 text-xl font-black uppercase tracking-[-0.03em] text-[#10263F]">
                    One Player
                  </p>
                  <p className="mt-2 text-sm text-[#33475B]/70">
                    18-hole individual stroke play · Gross & Net competition
                  </p>
                  <p className="mt-5 text-lg font-black text-[#10263F]">
                    {formatCurrency(PLAYER_PRICE)}
                  </p>
                </div>
                </div>
              </Panel>

            <Panel>
              <SectionHeading
                eyebrow="Step 02"
                title="Player Information"
                description="Enter the information for the golfer competing in the 2027 Gallaspy Invitational."
              />

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field
                  label="First Name"
                  name="firstName"
                  required
                />

                <Field
                  label="Last Name"
                  name="lastName"
                  required
                />
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
                <Field
                  label="City"
                  name="city"
                  required
                />

                <Field
                  label="State"
                  name="state"
                  required
                />
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <SelectField
                  label="Polo Size"
                  name="shirtSize"
                  required
                />


              </div>
            </Panel>



            <Panel>
              <SectionHeading
                eyebrow="Step 03"
                title="Tournament Agreements"
                description="Review and accept the required policies before payment."
              />

              <div className="mt-8 space-y-5">
                <Agreement
                  checked={acceptedTerms}
                  onChange={setAcceptedTerms}
                >
                  I have read and agree to the{" "}
                  <PolicyLink href="/invitational/terms">
                    Participant Terms & Conditions
                  </PolicyLink>
                  .
                </Agreement>

                <Agreement
                  checked={acceptedRefund}
                  onChange={setAcceptedRefund}
                >
                  I have read and agree to the{" "}
                  <PolicyLink href="/invitational/refund-policy">
                    Refund & Cancellation Policy
                  </PolicyLink>
                  , including the April 22, 2027
                  refund deadline.
                </Agreement>

                <Agreement
                  checked={acceptedWaiver}
                  onChange={setAcceptedWaiver}
                >
                  I have read and voluntarily agree to the{" "}
                  <PolicyLink href="/invitational/waiver">
                    Liability Waiver & Assumption of Risk
                  </PolicyLink>
                  .
                </Agreement>

                <Agreement
                  checked={acceptedRules}
                  onChange={setAcceptedRules}
                >
                  I have read and agree to comply with the{" "}
                  <PolicyLink href="/invitational/rules">
                    Official Tournament Rules
                  </PolicyLink>
                  .
                </Agreement>

                <div className="border-t border-[#10263F]/10 pt-5">
                  <Agreement
                    checked={mediaConsent}
                    onChange={setMediaConsent}
                    optional
                  >
                    I authorize The Gallaspy Development
                    Group, LLC to use photographs or video
                    of me from the event for reasonable
                    promotional and archival purposes.
                  </Agreement>
                </div>
              </div>
            </Panel>

            <Panel>
              <SectionHeading
                eyebrow="Step 04"
                title="Secure Payment"
                description="Enter your card information below to complete registration."
              />

              <div className="mt-8 rounded-[18px] border border-[#10263F]/10 bg-[#F9F7F2] p-5">
                <div
                  id="square-card-container"
                  className="min-h-[90px]"
                />
              </div>

              {!squareReady &&
                !paymentError && (
                  <p className="mt-4 text-xs text-[#10263F]/50">
                    Loading secure Square payment form...
                  </p>
                )}

              <p className="mt-4 text-[11px] leading-6 text-[#10263F]/50">
                Payments are securely processed by Square.
              </p>
            </Panel>

            {paymentError && (
              <div className="rounded-[18px] border border-red-200 bg-red-50 px-5 py-4">
                <p className="text-sm leading-6 text-red-700">
                  {paymentError}
                </p>
              </div>
            )}
          </div>

          <div>
            <div className="sticky top-28 rounded-[22px] bg-[#10263F] p-7 text-white sm:p-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#FFD76A]">
                Registration Summary
              </p>

              <h2 className="mt-4 font-serif text-3xl">
                2027 Gallaspy Invitational
              </h2>

              <div className="mt-8 space-y-5 border-y border-white/10 py-7">
                <SummaryRow
                  label="Registration"
                  value={registrationType}
                />

                <SummaryRow
                  label="Players"
                  value={`${quantity} ${
                    quantity === 1
                      ? "Player"
                      : "Players"
                  }`}
                />

                <SummaryRow
                  label="Price Per Player"
                  value={formatCurrency(
                    PLAYER_PRICE
                  )}
                />
              </div>

              <div className="mt-7 flex items-end justify-between gap-6">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/45">
                    Registration Total
                  </p>

                  <p className="mt-2 font-serif text-4xl">
                    {formatCurrency(total)}
                  </p>
                </div>

                <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                  USD
                </span>
              </div>

              <button
                type="submit"
                disabled={
                  !squareReady ||
                  !requiredPoliciesAccepted ||
                  paymentProcessing
                }
                className="mt-8 inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-[#FFD76A] px-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#10263F] transition hover:bg-white disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/40"
              >
                {paymentProcessing
                  ? "Processing..."
                  : `Pay ${formatCurrency(total)}`}
              </button>

              {!requiredPoliciesAccepted && (
                <p className="mt-4 text-center text-[10px] leading-5 text-white/45">
                  Accept all required tournament policies
                  before checkout.
                </p>
              )}

              <div className="mt-8 border-t border-white/10 pt-6">
                <PolicySummaryLink
                  href="/invitational/prizes"
                  label="The Golden Falcon"
                />

                <PolicySummaryLink
                  href="/invitational/refund-policy"
                  label="Refund Policy"
                />

                <PolicySummaryLink
                  href="/invitational/rules"
                  label="Tournament Rules"
                />
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

function Panel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="rounded-[22px] border border-[#10263F]/10 bg-white p-7 sm:p-9">
      {children}
    </div>
  );
}

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString()}`;
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <>
      <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8B6A34]">
        {eyebrow}
      </p>

      <h2 className="mt-4 font-serif text-3xl">
        {title}
      </h2>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#10263F]/60">
        {description}
      </p>
    </>
  );
}

function RegistrationOption({
  title,
  players,
  price,
  selected,
  onClick,
}: {
  title: string;
  players: string;
  price: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[18px] border p-5 text-left transition ${
        selected
          ? "border-[#B89146] bg-[#F5F0E6]"
          : "border-[#10263F]/10 bg-[#F9F7F2] hover:border-[#B89146]"
      }`}
    >
      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
        {players}
      </p>

      <h3 className="mt-3 font-serif text-xl">
        {title}
      </h3>

      <p className="mt-5 font-serif text-3xl">
        {price}
      </p>

      {selected && (
        <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
          Selected
        </p>
      )}
    </button>
  );
}

function Agreement({
  checked,
  onChange,
  children,
  optional = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        className="mt-1 h-4 w-4 accent-[#10263F]"
      />

      <span className="text-sm leading-7 text-[#10263F]/65">
        {children}

        {optional && (
          <span className="ml-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8B6A34]">
            Optional
          </span>
        )}
      </span>
    </label>
  );
}

function PolicyLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="font-semibold text-[#8B6A34] underline underline-offset-4"
    >
      {children}
    </Link>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-5">
      <span className="text-xs text-white/45">
        {label}
      </span>

      <span className="text-right text-sm text-white">
        {value}
      </span>
    </div>
  );
}

function PolicySummaryLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between border-b border-white/10 py-4 text-xs text-white/65 transition last:border-b-0 hover:text-[#FFD76A]"
    >
      <span>{label}</span>
      <span>→</span>
    </Link>
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

function SelectField({
  label,
  name,
  required = false,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]"
      >
        {label}
        {required ? " *" : ""}
      </label>

      <select
        id={name}
        name={name}
        required={required}
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
  );
}
