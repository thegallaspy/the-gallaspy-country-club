import Image from "next/image";
import Link from "next/link";
import InvitationalNav from "@/components/invitational/InvitationalNav";

export const metadata = {
  title: "Register | The Gallaspy Invitational",
  description:
    "Register for the 2027 Gallaspy Invitational.",
};

export default function InvitationalRegisterPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E6] text-[#10263F]">
      <InvitationalNav />

      {/* HERO */}
      <section className="bg-[#10263F] px-6 pb-20 pt-32 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/invitational"
            className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60 transition hover:text-[#FFD76A]"
          >
            ← Back to Invitational
          </Link>

          <div className="mt-10">
            <Image
              src="/logos/gallaspy-invitational.png"
              alt="The Gallaspy Invitational"
              width={300}
              height={300}
              priority
              className="h-auto w-[150px] sm:w-[180px] lg:w-[205px]"
            />
          </div>

          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A]">
            Player Registration
          </p>

          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            2027 Gallaspy
            <span className="block text-[#FFD76A]">
              Invitational
            </span>
          </h1>

          <div className="mt-8 h-px w-20 bg-[#B89146]" />

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/70">
            Secure your position in the inaugural field of
            The Gallaspy Invitational.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/invitational/checkout"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-[#FFD76A] px-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#10263F] transition hover:bg-white"
            >
              Register Now
            </Link>

            <Link
              href="/invitational/rules"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-white/25 px-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              Tournament Rules
            </Link>
          </div>
        </div>
      </section>

      {/* EVENT SNAPSHOT */}
      <section className="border-b border-[#10263F]/10 bg-white px-6 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 md:grid-cols-4">
          <Snapshot
            label="Format"
            value="Individual Stroke Play"
          />

          <Snapshot
            label="Field"
            value="72 Players"
          />

          <Snapshot
            label="Championships"
            value="Gross & Net"
          />

          <Snapshot
            label="Start"
            value="10:00 AM"
            last
          />
        </div>
      </section>

      {/* REGISTRATION */}
      <section className="px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34]">
              Player Registration
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Be there when the tradition begins.
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#10263F]/65">
              The Invitational uses individual player registration.
              Each golfer completes a separate entry so scoring,
              handicap eligibility, waivers, apparel sizing, and payment
              records remain tied to that individual player.
            </p>

            <div className="mt-8 border-l-2 border-[#B89146] pl-5">
              <p className="text-sm leading-7 text-[#10263F]/60">
                All paid registrations are subject to the
                tournament Participant Terms, Refund &
                Cancellation Policy, Liability Waiver, and
                Official Tournament Rules.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] bg-[#10263F] p-7 text-white sm:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#FFD76A]">
              Individual Entry
            </p>

            <h3 className="mt-4 font-serif text-3xl sm:text-4xl">
              One golfer. One championship entry.
            </h3>

            <div className="mt-8 border-y border-white/10 py-7">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#FFD76A]">
                    Registration
                  </p>
                  <p className="mt-2 font-serif text-2xl">
                    Individual Player
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    One player per registration.
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#FFD76A]">
                    Competition
                  </p>
                  <p className="mt-2 font-serif text-2xl">
                    Gross &amp; Net
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    Handicap verification is required for Net eligibility.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 border-l-2 border-[#FFD76A] pl-5">
              <p className="text-sm leading-7 text-white/65">
                Every player competes in the Gross Championship. Players
                with a verified GHIN or other tournament-recognized handicap
                are also eligible for the separate Net Championship.
              </p>
            </div>

            <Link
              href="/invitational/checkout"
              className="mt-8 inline-flex min-h-[56px] w-full items-center justify-center rounded-full bg-[#FFD76A] px-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#10263F] transition hover:bg-white"
            >
              Continue to Registration
            </Link>

            <p className="mt-5 text-center text-[10px] leading-5 text-white/45">
              Secure payment processing provided by Square.
            </p>
          </div>
        </div>
      </section>

      {/* REFUND */}
      <section className="border-y border-[#10263F]/10 bg-white px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34]">
                Registration Protection
              </p>

              <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">
                Full refunds through April 22, 2027.
              </h2>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-[#10263F]/60">
                Beginning April 23, 2027, player registration
                fees become non-refundable. Eligible player
                substitutions may be permitted under the
                published policy.
              </p>
            </div>

            <Link
              href="/invitational/refund-policy"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#10263F]/20 px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#10263F] transition hover:border-[#B89146] hover:text-[#B89146]"
            >
              Read Refund Policy
            </Link>
          </div>
        </div>
      </section>

      {/* POLICIES */}
      <section className="px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34]">
              Tournament Policies
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Review before you register.
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#10263F]/60">
              All required policies are presented again during
              checkout and must be affirmatively accepted before
              payment can be completed.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <PolicyCard
              number="01"
              title="Participant Terms"
              href="/invitational/terms"
            />

            <PolicyCard
              number="02"
              title="Refund & Cancellation"
              href="/invitational/refund-policy"
            />

            <PolicyCard
              number="03"
              title="Liability Waiver"
              href="/invitational/waiver"
            />

            <PolicyCard
              number="04"
              title="Tournament Rules"
              href="/invitational/rules"
            />

            <PolicyCard
              number="05"
              title="Prizes & Awards"
              href="/invitational/prizes"
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#10263F] px-6 py-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1000px] text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
            The Inaugural Field
          </p>

          <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl">
            Your place in the first Gallaspy Invitational
            starts here.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/65">
            Complete your registration and payment to secure
            your position in the 2027 field.
          </p>

          <Link
            href="/invitational/checkout"
            className="mt-9 inline-flex min-h-[56px] items-center justify-center rounded-full bg-[#FFD76A] px-9 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#10263F] transition hover:bg-white"
          >
            Register Now
          </Link>
        </div>
      </section>
    </main>
  );
}

function Snapshot({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`border-b border-[#10263F]/10 px-4 py-7 md:border-b-0 ${
        last
          ? ""
          : "border-r border-[#10263F]/10"
      }`}
    >
      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
        {label}
      </p>

      <p className="mt-2 font-serif text-xl">
        {value}
      </p>
    </div>
  );
}

function PriceRow({
  title,
  players,
  price,
}: {
  title: string;
  players: string;
  price: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-5">
      <div>
        <p className="font-serif text-xl">
          {title}
        </p>

        <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40">
          {players}
        </p>
      </div>

      <p className="font-serif text-2xl text-[#FFD76A]">
        {price}
      </p>
    </div>
  );
}

function PolicyCard({
  number,
  title,
  href,
}: {
  number: string;
  title: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-[20px] border border-[#10263F]/10 bg-white p-6 transition hover:border-[#B89146]"
    >
      <div className="flex items-start justify-between">
        <span className="text-[10px] font-semibold tracking-[0.2em] text-[#B89146]">
          {number}
        </span>

        <span className="text-[#B89146] transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>

      <h3 className="mt-6 font-serif text-2xl">
        {title}
      </h3>
    </Link>
  );
}