import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import MembershipConsent from "./MembershipConsent";

export const metadata = {
  title: "Membership Checkout | The Gallaspy Golf Club",
  description: "Review Standard Membership enrollment terms.",
};

export const dynamic = "force-dynamic";

export default async function MembershipCheckoutPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/my-gallaspy?next=/membership/checkout");
  }

  return (
    <main className="min-h-screen bg-white px-6 py-20 text-[#10263F]">
      <div className="mx-auto max-w-2xl">
        <Link href="/membership" className="text-sm underline">
          Back to Membership
        </Link>

        <p className="mt-10 text-sm uppercase tracking-widest text-[#426B55]">
          The Gallaspy Golf Club
        </p>

        <h1 className="mt-4 text-4xl font-semibold">
          Standard Membership
        </h1>

        <p className="mt-6 text-3xl font-semibold">
          $100.00 / month
        </p>

        <section className="mt-10 space-y-5 rounded-2xl border border-[#DCE4E9] p-6">
          <h2 className="text-xl font-semibold">
            Membership Billing Terms
          </h2>

          <p>
            Standard Membership costs $100.00 USD per month.
            Membership renews automatically each month until canceled.
          </p>

          <p>
            Your first payment must be successfully verified before
            your official membership becomes active.
          </p>

          <p>
            You may cancel future renewals. Your membership benefits
            remain available through your verified paid-through date,
            unless membership is suspended under club rules.
          </p>

          <p>
            Golf course green fees and other separately priced
            activities are not included in monthly dues.
          </p>

          <p>
            By enrolling, you will authorize recurring monthly
            charges of $100.00 USD to your selected payment method.
          </p>
        </section>

        <MembershipConsent />

        <p className="mt-8 rounded-xl bg-[#F1F5F7] p-5 text-sm">
          Secure enrollment is being prepared.
          No payment information is collected on this page yet.
        </p>
      </div>
    </main>
  );
}
