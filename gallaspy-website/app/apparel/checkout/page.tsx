"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type CartItem = {
  id: string;
  slug: string;
  name: string;
  color: string;
  price: string;
  image: string;
  size: string;
  quantity: number;
};

type SquareCard = {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<{
    status: string;
    token?: string;
    errors?: Array<{ message?: string }>;
  }>;
  destroy?: () => Promise<void>;
};

type SquarePayments = {
  card: () => Promise<SquareCard>;
};

type SquareSdk = {
  payments: (
    applicationId: string,
    locationId: string
  ) => SquarePayments;
};

declare global {
  interface Window {
    Square?: SquareSdk;
  }
}

function priceToNumber(price: string) {
  return Number(price.replace(/[^0-9.]/g, "")) || 0;
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function ApparelCheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [shippingAddress1, setShippingAddress1] = useState("");
  const [shippingAddress2, setShippingAddress2] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingPostalCode, setShippingPostalCode] = useState("");

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [cardReady, setCardReady] = useState(false);
  const [cardError, setCardError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");

  const cardRef = useRef<SquareCard | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("gallaspy-cart");
      const parsed = raw ? JSON.parse(raw) : [];

      const validItems = Array.isArray(parsed)
        ? parsed.filter(
            (item): item is CartItem =>
              item &&
              typeof item.id === "string" &&
              typeof item.slug === "string" &&
              typeof item.name === "string" &&
              typeof item.color === "string" &&
              typeof item.price === "string" &&
              typeof item.image === "string" &&
              typeof item.size === "string" &&
              typeof item.quantity === "number" &&
              item.quantity > 0
          )
        : [];

      setItems(validItems);
    } catch {
      setItems([]);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded || items.length === 0 || success) return;

    let cancelled = false;
    let attempts = 0;

    const initializeSquare = async () => {
      const applicationId =
        process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
      const locationId =
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

      if (!applicationId || !locationId) {
        setCardError("Square payment configuration is missing.");
        return;
      }

      if (!window.Square) {
        attempts += 1;

        if (attempts < 30) {
          setTimeout(initializeSquare, 250);
          return;
        }

        setCardError(
          "The secure payment form could not be loaded. Please refresh the page."
        );
        return;
      }

      try {
        if (cardRef.current) return;

        const payments = window.Square.payments(
          applicationId,
          locationId
        );

        const card = await payments.card();

        if (cancelled) {
          await card.destroy?.();
          return;
        }

        await card.attach("#card-container");

        cardRef.current = card;
        setCardReady(true);
        setCardError("");
      } catch (error) {
        console.error("Square initialization error:", error);
        setCardError(
          "The secure payment form could not be initialized."
        );
      }
    };

    initializeSquare();

    return () => {
      cancelled = true;
    };
  }, [loaded, items.length, success]);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + priceToNumber(item.price) * item.quantity,
        0
      ),
    [items]
  );

  const shipping = items.length > 0 ? 8.95 : 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setOrderMessage("");
    setCardError("");

    if (!items.length) {
      setOrderMessage("Your bag is empty.");
      return;
    }

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !shippingAddress1.trim() ||
      !shippingCity.trim() ||
      !shippingState.trim() ||
      !shippingPostalCode.trim()
    ) {
      setOrderMessage("Please complete all required information.");
      return;
    }

    if (!acceptedTerms) {
      setOrderMessage(
        "Please confirm the order information before continuing."
      );
      return;
    }

    if (!cardRef.current || !cardReady) {
      setOrderMessage("The secure payment form is not ready yet.");
      return;
    }

    setSubmitting(true);

    try {
      const tokenResult = await cardRef.current.tokenize();

      if (tokenResult.status !== "OK" || !tokenResult.token) {
        const message =
          tokenResult.errors?.[0]?.message ||
          "Please check your card information and try again.";

        setOrderMessage(message);
        setSubmitting(false);
        return;
      }

      const response = await fetch("/api/apparel/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceId: tokenResult.token,

          items: items.map((item) => ({
            slug: item.slug,
            size:
              item.size === "OneSize"
                ? "One Size"
                : item.size,
            quantity: item.quantity,
          })),

          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),

          shippingAddress1: shippingAddress1.trim(),
          shippingAddress2: shippingAddress2.trim(),
          shippingCity: shippingCity.trim(),
          shippingState: shippingState.trim(),
          shippingPostalCode: shippingPostalCode.trim(),

          acceptedTerms,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data?.paymentSucceeded === true) {
          setOrderMessage(
            data?.error ||
              "Your payment was completed, but there was a problem recording the order. Do not submit another payment."
          );
          setSubmitting(false);
          return;
        }

        setOrderMessage(
          data?.error ||
            "We could not complete the payment. Please try again."
        );
        setSubmitting(false);
        return;
      }

      localStorage.removeItem("gallaspy-cart");
      window.dispatchEvent(
        new Event("gallaspy-cart-updated")
      );

      setItems([]);
      setSuccess(true);
      setOrderMessage(
        "Your Gallaspy Apparel order has been received."
      );
    } catch (error) {
      console.error("Checkout error:", error);

      setOrderMessage(
        "Something went wrong while processing the order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#F3EFE6] px-5 pb-20 pt-32 text-[#10263F]">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.2em]">
            Loading checkout...
          </p>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#10263F] px-5 pb-20 pt-36 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
            Order Confirmed
          </p>

          <h1 className="mt-5 text-[3rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4.5rem]">
            Thank You
            <span className="block text-[#FFD76A]">
              For Your Order.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-white/65">
            {orderMessage}
          </p>

          <Link
            href="/apparel"
            className="mt-9 inline-flex min-h-[50px] items-center justify-center bg-[#FFD76A] px-7 text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F]"
          >
            Return To Apparel →
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#F3EFE6] px-5 pb-20 pt-36 text-[#10263F] sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#8B6A34]">
            Your Bag
          </p>

          <h1 className="mt-5 text-[3rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4.5rem]">
            Nothing To
            <span className="block text-[#B3262D]">
              Check Out Yet.
            </span>
          </h1>

          <Link
            href="/apparel"
            className="mt-9 inline-flex min-h-[50px] items-center justify-center bg-[#10263F] px-7 text-[8px] font-black uppercase tracking-[0.22em] text-white"
          >
            Shop Apparel →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F3EFE6] text-[#10263F]">
      <section className="bg-[#10263F] px-5 pb-10 pt-32 text-white sm:px-8 sm:pt-36 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-[#B3262D]" />

            <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
              The Gallaspy Apparel
            </p>
          </div>

          <h1 className="mt-5 text-[3.2rem] font-black uppercase leading-[0.86] tracking-[-0.06em] sm:text-[4.8rem]">
            Secure
            <span className="block text-[#FFD76A]">
              Checkout.
            </span>
          </h1>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1fr_390px] lg:px-10"
      >
        <div className="space-y-5">
          {/* ORDER ITEMS */}
          <section className="bg-white/55 p-6 sm:p-8">
            <div className="flex items-end justify-between border-b border-[#10263F]/12 pb-5">
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#8B6A34]">
                  Step 01
                </p>

                <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.04em]">
                  Your Bag
                </h2>
              </div>

              <Link
                href="/apparel/bag"
                className="text-[8px] font-black uppercase tracking-[0.2em] text-[#B3262D]"
              >
                Edit Bag →
              </Link>
            </div>

            <div className="divide-y divide-[#10263F]/12">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[82px_1fr_auto] gap-4 py-6 sm:grid-cols-[100px_1fr_auto]"
                >
                  <div className="relative aspect-square bg-[#F3EFE6]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="100px"
                      className="object-contain p-2"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-black uppercase tracking-[-0.02em]">
                      {item.name}
                    </p>

                    <p className="mt-2 text-xs text-[#10263F]/55">
                      {item.color} · {item.size}
                    </p>

                    <p className="mt-1 text-xs text-[#10263F]/55">
                      Qty {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-black">
                    {money(
                      priceToNumber(item.price) *
                        item.quantity
                    )}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section className="bg-white/55 p-6 sm:p-8">
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#8B6A34]">
              Step 02
            </p>

            <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.04em]">
              Contact Information
            </h2>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field
                label="First Name"
                value={firstName}
                onChange={setFirstName}
                autoComplete="given-name"
              />

              <Field
                label="Last Name"
                value={lastName}
                onChange={setLastName}
                autoComplete="family-name"
              />

              <Field
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                autoComplete="email"
              />

              <Field
                label="Phone"
                type="tel"
                value={phone}
                onChange={setPhone}
                autoComplete="tel"
              />
            </div>
          </section>

          {/* SHIPPING */}
          <section className="bg-white/55 p-6 sm:p-8">
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#8B6A34]">
              Step 03
            </p>

            <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.04em]">
              Shipping
            </h2>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field
                  label="Address"
                  value={shippingAddress1}
                  onChange={setShippingAddress1}
                  autoComplete="address-line1"
                />
              </div>

              <div className="sm:col-span-2">
                <Field
                  label="Apartment, Suite, Etc."
                  value={shippingAddress2}
                  onChange={setShippingAddress2}
                  required={false}
                  autoComplete="address-line2"
                />
              </div>

              <Field
                label="City"
                value={shippingCity}
                onChange={setShippingCity}
                autoComplete="address-level2"
              />

              <Field
                label="State"
                value={shippingState}
                onChange={setShippingState}
                autoComplete="address-level1"
              />

              <Field
                label="ZIP Code"
                value={shippingPostalCode}
                onChange={setShippingPostalCode}
                autoComplete="postal-code"
              />
            </div>
          </section>

          {/* PAYMENT */}
          <section className="bg-white/55 p-6 sm:p-8">
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#8B6A34]">
              Step 04
            </p>

            <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.04em]">
              Secure Payment
            </h2>

            <p className="mt-2 text-sm text-[#10263F]/55">
              Card information is securely processed by Square.
            </p>

            <div
              id="card-container"
              className="mt-7 min-h-[90px] border border-[#10263F]/15 bg-white p-4"
            />

            {!cardReady && !cardError && (
              <p className="mt-3 text-xs text-[#10263F]/45">
                Loading secure payment form...
              </p>
            )}

            {cardError && (
              <p className="mt-3 text-sm font-semibold text-[#B3262D]">
                {cardError}
              </p>
            )}
          </section>
        </div>

        {/* SUMMARY */}
        <aside className="h-fit bg-[#10263F] p-7 text-white lg:sticky lg:top-28">
          <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#FFD76A]">
            Order Summary
          </p>

          <h2 className="mt-3 text-3xl font-black uppercase leading-[0.95] tracking-[-0.04em]">
            The Gallaspy
            <span className="block">Apparel</span>
          </h2>

          <div className="mt-7 space-y-4 border-t border-white/15 pt-6 text-sm">
            <SummaryRow
              label="Items"
              value={String(
                items.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )
              )}
            />

            <SummaryRow
              label="Subtotal"
              value={money(subtotal)}
            />

            <SummaryRow
              label="Shipping"
              value={money(shipping)}
            />

            <SummaryRow label="Tax" value={money(tax)} />
          </div>

          <div className="mt-6 flex items-end justify-between border-t border-white/15 pt-6">
            <p className="text-[8px] font-black uppercase tracking-[0.26em] text-white/50">
              Total
            </p>

            <p className="text-3xl font-black text-[#FFD76A]">
              {money(total)}
            </p>
          </div>

          <label className="mt-7 flex cursor-pointer items-start gap-3 text-xs leading-5 text-white/55">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) =>
                setAcceptedTerms(event.target.checked)
              }
              className="mt-1 h-4 w-4"
            />

            <span>
              I confirm that the contact, shipping, and order
              information above is correct and authorize this
              apparel purchase.
            </span>
          </label>

          {orderMessage && (
            <p className="mt-5 text-sm leading-6 text-[#FFD76A]">
              {orderMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || !cardReady}
            className="mt-7 flex min-h-[54px] w-full items-center justify-center bg-[#FFD76A] px-6 text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45"
          >
            {submitting
              ? "Processing..."
              : `Pay ${money(total)} →`}
          </button>

          <p className="mt-4 text-center text-[9px] leading-5 text-white/35">
            Secure card processing powered by Square.
          </p>
        </aside>
      </form>

      <div className="grid grid-cols-4">
        <div className="h-[5px] bg-[#10263F]" />
        <div className="h-[5px] bg-[#B3262D]" />
        <div className="h-[5px] bg-[#FFD76A]" />
        <div className="h-[5px] bg-[#0C352D]" />
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = true,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-[8px] font-black uppercase tracking-[0.24em] text-[#10263F]/65">
        {label}
      </span>

      <input
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-13 w-full border border-[#10263F]/15 bg-transparent px-4 text-sm outline-none transition focus:border-[#B89146]"
      />
    </label>
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
    <div className="flex items-center justify-between gap-6">
      <span className="text-white/48">{label}</span>
      <span className="font-black">{value}</span>
    </div>
  );
}
