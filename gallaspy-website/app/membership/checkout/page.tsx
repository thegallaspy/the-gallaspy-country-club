import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Join The Gallaspy | Standard Membership",
  description:
    "Explore monthly and annual Standard Membership options at The Gallaspy Golf Club.",
};

const benefits = [
  "Monthly organized Gallaspy Rounds",
  "Monthly Gallaspy Range Nights",
  "Weekly Practice Round opportunities",
  "Golf Partners and member community",
  "Eligibility for official club competitions",
  "Selected priority event registration",
  "Gallaspy Rewards and Club Points",
  "Member Benefits Wallet",
  "Up to 25% off select Gallaspy apparel",
  "Digital membership identification",
];

export default async function MembershipCheckoutPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || !user.email_confirmed_at) {
    redirect("/my-gallaspy?next=/membership/checkout");
  }

  return (
    <main className="min-h-screen bg-white px-5 py-12 text-[#10263F] sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/membership"
          className="inline-block text-sm font-semibold text-[#164B3A] underline underline-offset-4"
        >
          ← Back to Membership
        </Link>

        <header className="mb-10 mt-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#164B3A]">
            The Gallaspy Golf Club
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Your Club. Your Membership.
          </h1>

          <p className="mt-5 text-base leading-7 text-[#47596A]">
            Golf is better together. Choose the membership
            payment option that fits you and experience
            everything The Gallaspy is building today.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="flex flex-col rounded-3xl border-2 border-[#D7E1E7] bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-bold uppercase tracking-widest text-[#164B3A]">
              Monthly Membership
            </p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-5xl font-bold tracking-tight">
                $100
              </span>
              <span className="font-medium text-[#526174]">
                / month
              </span>
            </div>

            <p className="mt-5 text-sm text-[#526174]">
              $250 one-time initiation fee for new monthly enrollment.
            </p>

            <div className="my-7 h-px bg-[#D7E1E7]" />

            <dl className="space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt>First month dues</dt>
                <dd className="font-bold">$100</dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt>One-time initiation</dt>
                <dd className="font-bold">$250</dd>
              </div>

              <div className="flex justify-between gap-4 border-t border-[#D7E1E7] pt-4">
                <dt className="font-bold">
                  Required initial payment
                </dt>
                <dd className="font-bold">$350</dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt>Subsequent monthly renewal</dt>
                <dd className="font-bold">$100</dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt>First-year total</dt>
                <dd className="font-bold">$1,450</dd>
              </div>
            </dl>

            <p className="mt-7 text-sm leading-6 text-[#526174]">
              Includes all Standard Membership privileges.
              Monthly dues renew automatically until canceled
              under the applicable membership terms.
            </p>

            <div className="mt-auto pt-7">
              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-xl bg-[#10263F] px-5 py-4 font-bold text-white opacity-65"
              >
                BECOME A MEMBER
              </button>
            </div>
          </section>

          <section className="relative flex flex-col rounded-3xl border-2 border-[#164B3A] bg-white p-6 shadow-md sm:p-8">
            <div className="absolute -top-4 right-5 rounded-full bg-[#164B3A] px-5 py-2 text-xs font-bold tracking-wider text-white">
              BEST VALUE
            </div>

            <p className="text-sm font-bold uppercase tracking-widest text-[#164B3A]">
              Annual Membership
            </p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-5xl font-bold tracking-tight">
                $1,000
              </span>
              <span className="font-medium text-[#526174]">
                / year
              </span>
            </div>

            <p className="mt-5 text-sm font-semibold text-[#164B3A]">
              Initiation fee waived.
            </p>

            <div className="my-7 h-px bg-[#D7E1E7]" />

            <dl className="space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt>Annual membership dues</dt>
                <dd className="font-bold">$1,000</dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt>Initiation fee</dt>
                <dd className="font-bold text-[#164B3A]">
                  WAIVED
                </dd>
              </div>

              <div className="flex justify-between gap-4 border-t border-[#D7E1E7] pt-4">
                <dt className="font-bold">
                  Required initial payment
                </dt>
                <dd className="font-bold">$1,000</dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt>Annual renewal</dt>
                <dd className="font-bold">$1,000</dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt>First-year savings</dt>
                <dd className="font-bold text-[#164B3A]">
                  $450
                </dd>
              </div>
            </dl>

            <p className="mt-7 text-sm leading-6 text-[#526174]">
              All the same Standard Membership benefits,
              with one annual payment and automatic annual
              renewal under the applicable membership terms.
            </p>

            <div className="mt-auto pt-7">
              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-xl bg-[#164B3A] px-5 py-4 font-bold text-white opacity-65"
              >
                JOIN ANNUALLY
              </button>
            </div>
          </section>
        </div>

        <p
          role="status"
          className="mt-6 rounded-xl border border-[#D7E1E7] bg-[#F1F5F7] p-5 text-sm leading-6 text-[#334B5B]"
        >
          Secure enrollment for the new monthly and annual
          plans is being integrated with Square. Both purchase
          buttons remain disabled until the required payment
          verification safeguards are tested. No payment is
          being collected on this page.
        </p>

        <section className="mt-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#164B3A]">
            One Club. The Same Privileges.
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Included With Standard Membership
          </h2>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-3 rounded-xl border border-[#E0E7EA] p-4"
              >
                <span
                  aria-hidden="true"
                  className="font-bold text-[#164B3A]"
                >
                  ✓
                </span>
                <span className="text-sm font-medium">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl bg-[#10263F] p-6 text-white sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8D3C6]">
            The Gallaspy Legacy
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Experience the Club Today.
            <span className="block">
              Help Build Its Future.
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#E0EAF0]">
            Our long-term vision is to establish a permanent
            Gallaspy Golf &amp; Country Club. Membership
            supports today's club experiences and our
            broader development ambitions. A permanent
            facility and its completion date are not guaranteed.
          </p>
        </section>

        <footer className="mt-10 space-y-4 text-sm leading-6 text-[#526174]">
          <p>
            Membership dues do not include golf course green
            fees, range-ball charges, or separately priced
            event-entry fees.
          </p>

          <p>
            A 12-month initial commitment is proposed but
            is not presently enforced by this checkout.
            Applicable cancellation and renewal terms will
            be disclosed before payment authorization.
            Rejoining initiation-fee treatment requires
            an approved policy.
          </p>

          <p>
            An official USGA/GSGA GHIN handicap is a
            planned future benefit and is not currently
            represented as included.
          </p>

          <p>
            Standard Membership is operated by
            The Gallaspy Development Group, LLC.
          </p>
        </footer>
      </div>
    </main>
  );
}
