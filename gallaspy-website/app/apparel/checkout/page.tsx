"use client";

import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const PRODUCT_PRICES = {
  polo: 70,
  hat: 45,
} as const;

type ProductType = keyof typeof PRODUCT_PRICES;
type DesignType = "Script" | "Crest";
type ColorType = "Navy" | "White" | "Forest Green";

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
      ) => SquarePayments;
    };
  }
}

export default function ApparelCheckoutPage() {
  const [productType, setProductType] =
    useState<ProductType>("polo");

  const [color, setColor] =
    useState<ColorType>("Navy");

  const [design, setDesign] =
    useState<DesignType>("Script");

  const [size, setSize] = useState("M");

  const [quantity, setQuantity] = useState(1);

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  const [squareReady, setSquareReady] =
    useState(false);

  const [paymentProcessing, setPaymentProcessing] =
    useState(false);

  const [paymentError, setPaymentError] =
    useState("");

  const [paymentSuccess, setPaymentSuccess] =
    useState(false);

  const [paymentId, setPaymentId] = useState("");
  const [orderReference, setOrderReference] =
    useState("");
  const [receiptUrl, setReceiptUrl] =
    useState("");

  const squareCardRef =
    useRef<SquareCard | null>(null);

  const squareInitializingRef = useRef(false);

  /*
   * ---------------------------------------------------------
   * LOAD PRODUCT FROM URL
   *
   * This lets a product card eventually send customers to:
   *
   * /apparel/checkout?product=polo&color=Navy&design=Script&size=M
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const params =
      new URLSearchParams(window.location.search);

    const product =
      params.get("product")?.toLowerCase();

    const selectedColor = params.get("color");
    const selectedDesign = params.get("design");
    const selectedSize = params.get("size");

    if (product === "polo" || product === "hat") {
      setProductType(product);
    }

    if (
      selectedColor === "Navy" ||
      selectedColor === "White" ||
      selectedColor === "Forest Green"
    ) {
      setColor(selectedColor);
    }

    if (
      selectedDesign === "Script" ||
      selectedDesign === "Crest"
    ) {
      setDesign(selectedDesign);
    }

    if (
      selectedSize === "S" ||
      selectedSize === "M" ||
      selectedSize === "L" ||
      selectedSize === "XL"
    ) {
      setSize(selectedSize);
    }
  }, []);

  /*
   * ---------------------------------------------------------
   * ORDER TOTAL
   * ---------------------------------------------------------
   */

  const unitPrice =
    PRODUCT_PRICES[productType];

  const subtotal = useMemo(
    () => unitPrice * quantity,
    [unitPrice, quantity]
  );

  const shipping = 0;
  const tax = 0;

  const total =
    subtotal + shipping + tax;

  /*
   * ---------------------------------------------------------
   * INITIALIZE SQUARE
   * ---------------------------------------------------------
   */

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
        process.env
          .NEXT_PUBLIC_SQUARE_APPLICATION_ID;

      const locationId =
        process.env
          .NEXT_PUBLIC_SQUARE_LOCATION_ID;

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

        const payments =
          window.Square.payments(
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

        await card.attach(
          "#apparel-square-card-container"
        );

        squareCardRef.current = card;

        setSquareReady(true);
        setPaymentError("");
      } catch (error) {
        console.error(
          "Square apparel initialization error:",
          error
        );

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
        card.destroy().catch(
          () => undefined
        );
      }

      squareCardRef.current = null;
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * CHECKOUT
   * ---------------------------------------------------------
   */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      paymentProcessing ||
      paymentSuccess
    ) {
      return;
    }

    setPaymentError("");

    if (!acceptedTerms) {
      setPaymentError(
        "Please accept the apparel purchase terms before continuing."
      );

      return;
    }

    if (
      !squareReady ||
      !squareCardRef.current
    ) {
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

    const shippingAddress1 = String(
      formData.get("shippingAddress1") || ""
    ).trim();

    const shippingAddress2 = String(
      formData.get("shippingAddress2") || ""
    ).trim();

    const shippingCity = String(
      formData.get("shippingCity") || ""
    ).trim();

    const shippingState = String(
      formData.get("shippingState") || ""
    ).trim();

    const shippingPostalCode = String(
      formData.get("shippingPostalCode") || ""
    ).trim();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone
    ) {
      setPaymentError(
        "Please complete your contact information."
      );

      return;
    }

    if (
      !shippingAddress1 ||
      !shippingCity ||
      !shippingState ||
      !shippingPostalCode
    ) {
      setPaymentError(
        "Please complete your shipping address."
      );

      return;
    }

    setPaymentProcessing(true);

    try {
      /*
       * Square uses this amount for card
       * verification/tokenization.
       *
       * The API route independently recalculates
       * the real amount before charging.
       */

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
          city: shippingCity,
          state: shippingState,
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

      /*
       * -------------------------------------------------------
       * SERVER PAYMENT
       * -------------------------------------------------------
       */

      const response = await fetch(
        "/api/apparel/payment",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            sourceId: tokenResult.token,

            productType,

            color,

            design,

            size:
              productType === "polo"
                ? size
                : "",

            quantity,

            firstName,
            lastName,
            email,
            phone,

            shippingAddress1,
            shippingAddress2,
            shippingCity,
            shippingState,
            shippingPostalCode,

            acceptedTerms,
          }),
        }
      );

      const result = await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        /*
         * Payment was charged by Square but
         * Supabase failed.
         *
         * DO NOT tell the customer to retry.
         */

        if (result.paymentSucceeded) {
          setPaymentId(
            result.paymentId || ""
          );

          setReceiptUrl(
            result.receiptUrl || ""
          );

          throw new Error(
            `${result.error} Your Square payment reference is ${
              result.paymentId ||
              "unavailable"
            }. Do not submit another payment.`
          );
        }

        throw new Error(
          result.error ||
            "Square was unable to process the payment."
        );
      }

      setOrderReference(
        result.orderReference || ""
      );

      setPaymentId(
        result.paymentId || ""
      );

      setReceiptUrl(
        result.receiptUrl || ""
      );

      setPaymentSuccess(true);
    } catch (error) {
      console.error(
        "Apparel checkout error:",
        error
      );

      setPaymentError(
        error instanceof Error
          ? error.message
          : "Unable to process your order."
      );
    } finally {
      setPaymentProcessing(false);
    }
  }

  /*
   * ---------------------------------------------------------
   * SUCCESS SCREEN
   * ---------------------------------------------------------
   */

  if (paymentSuccess) {
    return (
      <main className="min-h-screen bg-[#F7F4EE] px-5 pb-20 pt-32 text-[#10263F] sm:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[26px] border border-[#10263F]/10 bg-white p-8 text-center shadow-[0_20px_60px_rgba(16,38,63,0.08)] sm:p-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B89146]">
              The Gallaspy Collection
            </p>

            <h1 className="mt-5 font-serif text-4xl font-light sm:text-5xl">
              Order
              <span className="block text-[#B89146]">
                Confirmed
              </span>
            </h1>

            <div className="mx-auto mt-7 h-px w-16 bg-[#B89146]" />

            <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#52605A] sm:text-base">
              Your payment was successfully
              processed and your Gallaspy apparel
              order has been recorded.
            </p>

            {orderReference && (
              <div className="mt-8 rounded-[16px] bg-[#F7F4EE] px-5 py-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
                  Gallaspy Order Number
                </p>

                <p className="mt-2 break-all font-serif text-2xl">
                  {orderReference}
                </p>
              </div>
            )}

            {paymentId && (
              <div className="mt-4 rounded-[16px] border border-[#10263F]/10 px-5 py-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
                  Square Payment Reference
                </p>

                <p className="mt-2 break-all text-xs text-[#52605A]">
                  {paymentId}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              {receiptUrl && (
                <a
                  href={receiptUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-[#10263F]/20 px-7 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:border-[#B89146] hover:text-[#B89146]"
                >
                  View Square Receipt
                </a>
              )}

              <Link
                href="/apparel/gallaspy"
                className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#10263F] px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#B89146]"
              >
                Return to Collection
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /*
   * ---------------------------------------------------------
   * CHECKOUT PAGE
   * ---------------------------------------------------------
   */

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#10263F]">
      {/* HEADER */}
      <section className="bg-[#10263F] px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/apparel/gallaspy"
            className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/60 transition hover:text-[#FFD76A]"
          >
            ← Back to The Gallaspy Collection
          </Link>

          <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#FFD76A]">
            Secure Checkout
          </p>

          <h1 className="mt-5 font-serif text-5xl font-light sm:text-6xl">
            Complete Your
            <span className="block text-[#FFD76A]">
              Gallaspy Order
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Review your apparel selection,
            provide shipping information, and
            securely complete your payment through
            Square.
          </p>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-24"
      >
        {/* LEFT */}
        <div className="space-y-7">
          {/* PRODUCT */}
          <Panel>
            <SectionHeading
              eyebrow="Step 01"
              title="Your Selection"
              description="Confirm the product, color, design, size, and quantity."
            />

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <SelectField
                label="Product"
                value={productType}
                onChange={(value) => {
                  if (
                    value === "polo" ||
                    value === "hat"
                  ) {
                    setProductType(value);
                  }
                }}
                options={[
                  {
                    value: "polo",
                    label:
                      "Performance Polo — $70",
                  },
                  {
                    value: "hat",
                    label: "Club Hat — $45",
                  },
                ]}
              />

              <SelectField
                label="Color"
                value={color}
                onChange={(value) =>
                  setColor(value as ColorType)
                }
                options={[
                  {
                    value: "Navy",
                    label: "Navy",
                  },
                  {
                    value: "White",
                    label: "White",
                  },
                  {
                    value: "Forest Green",
                    label: "Forest Green",
                  },
                ]}
              />

              <SelectField
                label="Design"
                value={design}
                onChange={(value) =>
                  setDesign(
                    value as DesignType
                  )
                }
                options={[
                  {
                    value: "Script",
                    label: "Script",
                  },
                  {
                    value: "Crest",
                    label: "Crest",
                  },
                ]}
              />

              {productType === "polo" && (
                <SelectField
                  label="Size"
                  value={size}
                  onChange={setSize}
                  options={[
                    {
                      value: "S",
                      label: "Small",
                    },
                    {
                      value: "M",
                      label: "Medium",
                    },
                    {
                      value: "L",
                      label: "Large",
                    },
                    {
                      value: "XL",
                      label: "XL",
                    },
                  ]}
                />
              )}

              <SelectField
                label="Quantity"
                value={String(quantity)}
                onChange={(value) =>
                  setQuantity(Number(value))
                }
                options={Array.from(
                  { length: 10 },
                  (_, index) => ({
                    value: String(index + 1),
                    label: String(index + 1),
                  })
                )}
              />
            </div>
          </Panel>

          {/* CUSTOMER */}
          <Panel>
            <SectionHeading
              eyebrow="Step 02"
              title="Contact Information"
              description="Enter the contact information associated with your order."
            />

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <InputField
                name="firstName"
                label="First Name"
                required
              />

              <InputField
                name="lastName"
                label="Last Name"
                required
              />

              <InputField
                name="email"
                label="Email"
                type="email"
                required
              />

              <InputField
                name="phone"
                label="Phone"
                type="tel"
                required
              />
            </div>
          </Panel>

          {/* SHIPPING */}
          <Panel>
            <SectionHeading
              eyebrow="Step 03"
              title="Shipping Information"
              description="Tell us where your Gallaspy apparel should be delivered."
            />

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <InputField
                  name="shippingAddress1"
                  label="Street Address"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <InputField
                  name="shippingAddress2"
                  label="Apartment, Suite, etc."
                />
              </div>

              <InputField
                name="shippingCity"
                label="City"
                required
              />

              <InputField
                name="shippingState"
                label="State"
                required
              />

              <InputField
                name="shippingPostalCode"
                label="ZIP Code"
                required
              />
            </div>
          </Panel>

          {/* PAYMENT */}
          <Panel>
            <SectionHeading
              eyebrow="Step 04"
              title="Secure Payment"
              description="Card information is securely processed by Square."
            />

            <div className="mt-8">
              <div
                id="apparel-square-card-container"
                className="min-h-[90px] rounded-[14px] border border-[#10263F]/15 bg-white p-4"
              />

              {!squareReady &&
                !paymentError && (
                  <p className="mt-3 text-xs text-[#52605A]">
                    Loading secure payment form...
                  </p>
                )}
            </div>
          </Panel>
        </div>

        {/* RIGHT */}
        <div>
          <div className="sticky top-28 rounded-[24px] bg-[#10263F] p-7 text-white shadow-[0_20px_60px_rgba(16,38,63,0.16)] sm:p-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
              Order Summary
            </p>

            <h2 className="mt-4 font-serif text-3xl font-light">
              The Gallaspy Collection
            </h2>

            <div className="mt-7 space-y-4 border-y border-white/12 py-6 text-sm">
              <SummaryRow
                label="Product"
                value={
                  productType === "polo"
                    ? "Performance Polo"
                    : "Club Hat"
                }
              />

              <SummaryRow
                label="Color"
                value={color}
              />

              <SummaryRow
                label="Design"
                value={design}
              />

              {productType === "polo" && (
                <SummaryRow
                  label="Size"
                  value={size}
                />
              )}

              <SummaryRow
                label="Quantity"
                value={String(quantity)}
              />
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <SummaryRow
                label="Unit Price"
                value={formatCurrency(
                  unitPrice
                )}
              />

              <SummaryRow
                label="Subtotal"
                value={formatCurrency(
                  subtotal
                )}
              />

              <SummaryRow
                label="Shipping"
                value={formatCurrency(
                  shipping
                )}
              />

              <SummaryRow
                label="Tax"
                value={formatCurrency(tax)}
              />
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-6">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
                Total
              </span>

              <span className="font-serif text-3xl text-[#FFD76A]">
                {formatCurrency(total)}
              </span>
            </div>

            <label className="mt-7 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) =>
                  setAcceptedTerms(
                    event.target.checked
                  )
                }
                className="mt-1 h-4 w-4 accent-[#B89146]"
              />

              <span className="text-xs leading-6 text-white/65">
                I confirm that my product,
                color, design, size, quantity,
                contact information, and shipping
                information are correct and agree
                to the apparel purchase terms.
              </span>
            </label>

            {paymentError && (
              <div className="mt-6 rounded-[14px] border border-red-300/25 bg-red-950/30 px-4 py-4 text-sm leading-6 text-red-100">
                {paymentError}
              </div>
            )}

            <button
              type="submit"
              disabled={
                paymentProcessing ||
                paymentSuccess ||
                !squareReady
              }
              className="mt-7 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {paymentProcessing
                ? "Processing Payment..."
                : `Pay ${formatCurrency(
                    total
                  )}`}
            </button>

            <p className="mt-4 text-center text-[10px] leading-5 text-white/45">
              Secure payment processing provided
              by Square.
            </p>
          </div>
        </div>
      </form>
    </main>
  );
}

/*
 * -----------------------------------------------------------
 * COMPONENTS
 * -----------------------------------------------------------
 */

function Panel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[22px] border border-[#10263F]/10 bg-white p-6 shadow-[0_14px_45px_rgba(16,38,63,0.05)] sm:p-8">
      {children}
    </section>
  );
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
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#B89146]">
        {eyebrow}
      </p>

      <h2 className="mt-3 font-serif text-3xl font-light">
        {title}
      </h2>

      <p className="mt-3 max-w-xl text-sm leading-7 text-[#52605A]">
        {description}
      </p>
    </div>
  );
}

function InputField({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#10263F]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-[12px] border border-[#10263F]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#10263F] outline-none transition focus:border-[#B89146] focus:bg-white"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
  }>;
}) {
  return (
    <div>
      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#10263F]">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-[12px] border border-[#10263F]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#10263F] outline-none transition focus:border-[#B89146] focus:bg-white"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
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
    <div className="flex items-start justify-between gap-6">
      <span className="text-white/55">
        {label}
      </span>

      <span className="text-right font-medium text-white">
        {value}
      </span>
    </div>
  );
}

function formatCurrency(
  value: number
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}