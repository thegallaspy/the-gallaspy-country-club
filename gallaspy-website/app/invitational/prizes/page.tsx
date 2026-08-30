import type { Metadata } from "next";
import Link from "next/link";
import InvitationalNav from "@/components/invitational/InvitationalNav";

export const metadata: Metadata = {
  title: "The Golden Falcon | The Gallaspy Invitational",
  description:
    "The Golden Falcon is the championship trophy of The Gallaspy Invitational, awarded to the golfer who records the lowest gross score.",
};

export default function InvitationalPrizesPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E6] text-[#10263F]">
      <InvitationalNav />

      {/* HERO */}
      <section className="bg-[#10263F] px-6 pb-24 pt-32 text-white sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1100px]">
          <Link
            href="/invitational"
            className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60 transition hover:text-[#FFD76A]"
          >
            ← Back to Invitational
          </Link>

          <p className="mt-14 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A]">
            The Gallaspy Invitational
          </p>

          <h1 className="mt-5 max-w-4xl font-serif text-6xl leading-[0.94] sm:text-7xl lg:text-8xl">
            The Golden
            <span className="block text-[#FFD76A]">Falcon.</span>
          </h1>

          <div className="mt-9 h-px w-20 bg-[#B89146]" />

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            The championship trophy of The Gallaspy Invitational.
            Earned by the golfer who finishes with the lowest
            gross score over 18 holes.
          </p>
        </div>
      </section>

      {/* CHAMPIONSHIP STANDARD */}
      <section className="border-b border-[#10263F]/10 bg-white px-6 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1100px] md:grid-cols-3">
          <Stat
            label="Championship"
            value="Individual Stroke Play"
          />

          <Stat
            label="Deciding Score"
            value="Lowest Gross"
          />

          <Stat
            label="Championship Trophy"
            value="The Golden Falcon"
            last
          />
        </div>
      </section>

      {/* THE HONOR */}
      <section className="px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1100px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
              The Championship Honor
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              One champion.
              <span className="block text-[#8B6A34]">
                One Golden Falcon.
              </span>
            </h2>
          </div>

          <div>
            <p className="font-serif text-2xl leading-relaxed text-[#10263F] sm:text-3xl">
              The Gallaspy Invitational Champion is the golfer who
              records the lowest actual gross score over 18 holes.
            </p>

            <div className="mt-8 h-px w-16 bg-[#B89146]" />

            <p className="mt-8 text-sm leading-8 text-[#10263F]/65">
              The champion earns The Golden Falcon and takes their
              place in the permanent competitive history of The Gallaspy
              Invitational. Beginning with the inaugural championship in
              2027, each winner becomes part of a record intended to grow
              with the tournament for generations.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT IS WON */}
      <section className="bg-[#10263F] px-6 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
            How It Is Won
          </p>

          <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
            The score decides everything.
          </h2>

          <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-3">
            <HonorStep
              number="01"
              title="18 Holes"
              text="Every player completes the championship in individual stroke play."
            />

            <HonorStep
              number="02"
              title="Lowest Gross"
              text="Actual strokes determine the Invitational Champion. No handicap adjustment is applied to the championship-winning gross score."
            />

            <HonorStep
              number="03"
              title="The Golden Falcon"
              text="The golfer with the lowest verified gross score is recognized as The Gallaspy Invitational Champion."
            />
          </div>
        </div>
      </section>

      {/* TIE */}
      <section className="px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-12 border-y border-[#10263F]/15 py-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34]">
                If 18 Holes Are Not Enough
              </p>

              <h2 className="mt-4 font-serif text-4xl">
                Sudden death.
              </h2>
            </div>

            <p className="text-sm leading-8 text-[#10263F]/65">
              If two or more golfers are tied for the lowest gross
              score after 18 holes, the Gross Championship will be
              decided by a sudden-death playoff under the procedures
              established by the Tournament Committee. The championship
              is not complete until one golfer has earned The Golden Falcon.
            </p>
          </div>
        </div>
      </section>

      {/* NET COMPETITION */}
      <section className="border-y border-[#10263F]/10 bg-white px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34]">
              Net Competition
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              A second competitive leaderboard.
            </h2>
          </div>

          <div>
            <p className="text-sm leading-8 text-[#10263F]/65">
              Players with a verified GHIN or other handicap recognized
              by the Tournament Committee will also be scored in the
              Net Championship. Net standings are maintained separately
              from the Gross Championship.
            </p>

            <p className="mt-5 text-sm leading-8 text-[#10263F]/65">
              Final handicap procedures, eligibility requirements and
              applicable tournament adjustments will be governed by the
              Official Tournament Rules.
            </p>
          </div>
        </div>
      </section>

      {/* OTHER COMPETITION */}
      <section className="px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1100px]">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34]">
              Beyond the Championship
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Competition across the course.
            </h2>

            <p className="mt-6 text-sm leading-8 text-[#10263F]/65">
              Supplemental on-course competitions, including
              Closest-to-the-Pin and the Hole-in-One Challenge, may
              accompany the championship. Final contest details,
              eligibility requirements and sponsor activations will be
              announced as the Invitational approaches.
            </p>
          </div>
        </div>
      </section>

      {/* CHAMPIONSHIP RECORD */}
      <section className="bg-[#10263F] px-6 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A]">
            Beginning June 21, 2027
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            The first name has yet to be written.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/60">
            The inaugural Gallaspy Invitational will establish the
            first champion in tournament history and the first golfer
            to earn The Golden Falcon.
          </p>

          <Link
            href="/invitational/register"
            className="mt-9 inline-flex min-h-[54px] items-center justify-center rounded-full bg-[#FFD76A] px-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#10263F] transition hover:bg-white"
          >
            Player Registration
          </Link>
        </div>
      </section>

      {/* RELATED */}
      <section className="px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8B6A34]">
            Championship Information
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <PolicyLink
              href="/invitational/rules"
              title="Official Tournament Rules"
            />

            <PolicyLink
              href="/invitational/schedule"
              title="Tournament Schedule"
            />

            <PolicyLink
              href="/invitational/faq"
              title="Invitational FAQ"
            />

            <PolicyLink
              href="/invitational/terms"
              title="Participant Terms"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({
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
      className={`px-5 py-8 ${
        last ? "" : "border-b border-[#10263F]/10 md:border-b-0 md:border-r"
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

function HonorStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#10263F] p-7 sm:p-9">
      <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#FFD76A]">
        {number}
      </p>

      <h3 className="mt-5 font-serif text-2xl">
        {title}
      </h3>

      <p className="mt-4 text-sm leading-7 text-white/55">
        {text}
      </p>
    </div>
  );
}

function PolicyLink({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between border border-[#10263F]/10 bg-white px-6 py-5 transition hover:border-[#B89146]"
    >
      <span className="font-serif text-lg">
        {title}
      </span>

      <span className="text-[#8B6A34] transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
