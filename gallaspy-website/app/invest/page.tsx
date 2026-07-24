import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Investment Opportunity | The Gallaspy Golf & Country Club",
  description:
    "Explore the investment opportunity behind The Gallaspy Golf & Country Club, a proposed private golf and lifestyle destination near Metro Atlanta.",
};

const projectFacts = [
  {
    value: "585.6",
    label: "Proposed Acres",
  },
  {
    value: "$330M–$380M",
    label: "Estimated Development",
  },
  {
    value: "8–10 Years",
    label: "Development Horizon",
  },
  {
    value: "Metro Atlanta",
    label: "Strategic Market",
  },
];

const investmentReasons = [
  {
    number: "01",
    title: "Strategic Location",
    description:
      "Positioned near Metro Atlanta in Covington, Georgia, the proposed development is designed to serve a growing regional market of families, executives, business leaders, and golf enthusiasts.",
  },
  {
    number: "02",
    title: "Diversified Revenue",
    description:
      "The vision extends beyond golf through membership, hospitality, residential development, dining, wellness, events, lodging, and vineyard experiences.",
  },
  {
    number: "03",
    title: "Phased Development",
    description:
      "A carefully structured development strategy is intended to align infrastructure, amenities, capital requirements, and market demand over multiple phases.",
  },
  {
    number: "04",
    title: "Long-Term Asset Value",
    description:
      "The combination of land, golf, hospitality, residential offerings, and private-club programming is designed to create a distinctive destination with enduring value.",
  },
];

const revenueStreams = [
  "Membership initiation fees and annual dues",
  "Championship golf and practice facilities",
  "Luxury residential homesites and communities",
  "Mercury Street Restaurant and private dining",
  "Member lodging and destination hospitality",
  "Wellness, spa, fitness, tennis, and pickleball",
  "Vineyard, winery, weddings, and private events",
  "Corporate partnerships and branded experiences",
];

const phases = [
  {
    phase: "Phase I",
    title: "Land, Planning & Infrastructure",
    description:
      "Site control, due diligence, entitlement, engineering, master planning, utilities, access, and foundational infrastructure.",
  },
  {
    phase: "Phase II",
    title: "Championship Golf",
    description:
      "Development of the 18-hole course, practice range, short-game complex, maintenance operations, and supporting golf infrastructure.",
  },
  {
    phase: "Phase III",
    title: "Clubhouse & Hospitality",
    description:
      "Grand clubhouse, Mercury Street Restaurant, member lounges, locker rooms, event spaces, terraces, and arrival experience.",
  },
  {
    phase: "Phase IV",
    title: "Lifestyle Amenities",
    description:
      "Wellness, spa, swimming, tennis, pickleball, member lodging, vineyard programming, and expanded hospitality experiences.",
  },
  {
    phase: "Phase V",
    title: "Residential & Future Growth",
    description:
      "Luxury homesites, residential neighborhoods, additional amenities, strategic partnerships, and long-term destination expansion.",
  },
];

export default function InvestPage() {
  return (
    <main className="overflow-hidden bg-[#F7F4EC] text-[#10263F]">
      {/* Hero */}
      <section className="relative flex min-h-[760px] items-center overflow-hidden bg-[#071625] pt-[78px]">
        <Image
          src="/images/masterplan-render.png"
          alt="Proposed master plan for The Gallaspy Golf and Country Club"
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071625] via-[#071625]/97 to-[#071625]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071625] via-transparent to-[#071625]/30" />

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 py-24 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.42em] text-[#D9B45B]">
              A Landmark Development Opportunity
            </p>

            <h1 className="font-serif text-5xl font-medium leading-[0.98] text-[#F8F6F2] drop-shadow-[0_3px_12px_rgba(0,0,0,0.75)] sm:text-6xl md:text-7xl lg:text-[92px]">
              Invest in a
              <span className="block text-[#D9B45B]">Legacy in the Making</span>
            </h1>

            <p className="mt-8 max-w-3xl text-base leading-8 text-[#F2F2F2] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-lg">
              The Gallaspy Golf & Country Club is envisioned as a premier
              private golf and lifestyle destination where championship golf,
              luxury hospitality, wellness, residential living, and enduring
              tradition come together near Metro Atlanta.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#B89146] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#D9B45B]"
              >
                Request Investment Information
              </Link>

              <Link
                href="/master-plan"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:border-[#D9B45B] hover:bg-white/10 hover:text-[#D9B45B]"
              >
                Explore the Master Plan
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#D9B45B]/70 to-transparent" />
      </section>

      {/* Project facts */}
      <section className="relative z-20 mx-auto -mt-12 w-[calc(100%-2rem)] max-w-[1320px] rounded-2xl border border-[#B89146]/20 bg-white shadow-2xl shadow-[#10263F]/10 sm:w-[calc(100%-4rem)]">
        <div className="grid grid-cols-1 divide-y divide-[#10263F]/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {projectFacts.map((fact) => (
            <div key={fact.label} className="px-6 py-9 text-center">
              <p className="font-serif text-3xl text-[#10263F] lg:text-4xl">
                {fact.value}
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B89146]">
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Executive overview */}
      <section className="px-6 py-28 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B89146]">
              Executive Overview
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              More Than a Golf Club
            </h2>
          </div>

          <div className="space-y-6 text-base leading-8 text-[#10263F]/75 sm:text-lg">
            <p>
              The Gallaspy Golf & Country Club is being planned as a
              destination-scale private club and lifestyle community in
              Covington, Georgia. The proposed vision brings together an
              18-hole championship golf course, luxury clubhouse, fine dining,
              wellness, racquet sports, lodging, vineyard experiences, event
              venues, and residential development.
            </p>

            <p>
              The project is intended to be developed through a disciplined,
              phased approach that supports responsible capital deployment,
              diversified revenue generation, long-term land value, and the
              creation of a recognizable legacy brand.
            </p>
          </div>
        </div>
      </section>

      {/* Why invest */}
      <section className="bg-[#10263F] px-6 py-28 text-white sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1320px]">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D9B45B]">
              The Investment Case
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Why The Gallaspy
            </h2>

            <p className="mt-6 text-base leading-8 text-white/70 sm:text-lg">
              The proposed development is designed around four principles that
              support its long-term positioning and investment potential.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
            {investmentReasons.map((reason) => (
              <article
                key={reason.number}
                className="bg-[#10263F] p-8 transition duration-300 hover:bg-[#142F4D] sm:p-10 lg:p-12"
              >
                <p className="font-serif text-4xl text-[#D9B45B]">
                  {reason.number}
                </p>

                <h3 className="mt-8 font-serif text-2xl sm:text-3xl">
                  {reason.title}
                </h3>

                <p className="mt-4 leading-7 text-white/65">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue streams */}
      <section className="px-6 py-28 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[540px] overflow-hidden rounded-2xl">
            <Image
              src="/images/clubhouse.png"
              alt="Proposed clubhouse at The Gallaspy Golf and Country Club"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#071625]/80 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 p-8 text-white sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D9B45B]">
                Diversified Destination
              </p>

              <p className="mt-3 max-w-md font-serif text-3xl leading-tight">
                Multiple experiences. Multiple revenue opportunities.
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B89146]">
              Revenue Model
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Designed Beyond Membership Dues
            </h2>

            <p className="mt-6 text-base leading-8 text-[#10263F]/70">
              The proposed business model is designed to combine recurring
              membership revenue with hospitality, real estate, wellness,
              dining, events, lodging, and destination experiences.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {revenueStreams.map((stream) => (
                <div
                  key={stream}
                  className="flex items-start gap-3 border-b border-[#10263F]/10 pb-4"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89146]" />
                  <p className="text-sm leading-6 text-[#10263F]/75">
                    {stream}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Development plan */}
      <section className="bg-[#EDE7DA] px-6 py-28 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1320px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B89146]">
              Development Strategy
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              A Phased Path to Completion
            </h2>

            <p className="mt-6 text-base leading-8 text-[#10263F]/70">
              The proposed sequence is intended to support thoughtful growth,
              construction coordination, capital discipline, and long-term
              market development.
            </p>
          </div>

          <div className="mt-16 space-y-5">
            {phases.map((item) => (
              <article
                key={item.phase}
                className="grid gap-5 rounded-2xl border border-[#10263F]/10 bg-[#F7F4EC] p-7 shadow-sm sm:p-9 md:grid-cols-[150px_1fr]"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B89146]">
                    {item.phase}
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-[#10263F] sm:text-3xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-4xl leading-7 text-[#10263F]/70">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Investment structure */}
      <section className="px-6 py-28 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid overflow-hidden rounded-3xl bg-[#10263F] lg:grid-cols-2">
            <div className="p-8 text-white sm:p-12 lg:p-16">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D9B45B]">
                Proposed Capital Framework
              </p>

              <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
                Investment Structure
              </h2>

              <p className="mt-6 leading-8 text-white/70">
                The final capital structure will be developed with qualified
                legal, financial, tax, development, and investment advisers.
                The current concept anticipates a combination of founder
                capital, private equity, strategic partnerships, development
                financing, and project-level debt.
              </p>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {[
                  "Founder contribution",
                  "Private equity participation",
                  "Strategic development partners",
                  "Construction and project debt",
                  "Phased capital deployment",
                  "Defined investor reporting",
                ].map((item) => (
                  <div
                    key={item}
                    className="border-l border-[#D9B45B] pl-4 text-sm leading-6 text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[480px]">
              <Image
                src="/images/golf.png"
                alt="Championship golf vision for The Gallaspy"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute inset-0 bg-[#10263F]/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Risk management */}
      <section className="border-y border-[#10263F]/10 bg-white px-6 py-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B89146]">
                Responsible Development
              </p>

              <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
                Risk Management Principles
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Phased Execution",
                  text: "Development sequencing is intended to align major capital commitments with planning milestones and market readiness.",
                },
                {
                  title: "Construction Contingencies",
                  text: "Project budgets should include disciplined contingencies, professional oversight, and clearly defined approval processes.",
                },
                {
                  title: "Diversified Revenue",
                  text: "Multiple business lines are intended to reduce reliance on a single source of revenue.",
                },
                {
                  title: "Membership Pre-Interest",
                  text: "Early initiatives such as the Founding 250 can help demonstrate market interest before full development.",
                },
                {
                  title: "Long-Term Land Value",
                  text: "The land and master-planned components are intended to support value creation over an extended development horizon.",
                },
                {
                  title: "Professional Governance",
                  text: "Experienced advisers, consultants, operators, and development partners will be essential to responsible execution.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-[#10263F]/10 bg-[#F7F4EC] p-7"
                >
                  <h3 className="font-serif text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#10263F]/65">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#071625] px-6 py-28 text-center text-white sm:px-8 lg:px-12 lg:py-36">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#B89146]/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#D9B45B]">
            Invitation to Partner
          </p>

          <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl lg:text-7xl">
            Help Build a Landmark Destination
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
            We welcome conversations with qualified investors, lenders,
            development partners, operators, advisers, and strategic
            organizations interested in helping bring The Gallaspy vision to
            life.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#B89146] px-9 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#D9B45B]"
            >
              Request Investment Information
            </Link>

            <Link
              href="/founders-letter"
              className="inline-flex items-center justify-center rounded-full border border-white/35 px-9 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:border-[#D9B45B] hover:text-[#D9B45B]"
            >
              Read the Founder’s Letter
            </Link>
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-xs leading-6 text-white/40">
            This website is provided for general informational purposes only
            and does not constitute an offer to sell or a solicitation to buy
            securities. Any investment opportunity would be offered only
            through appropriate legal documentation and to eligible parties.
          </p>
        </div>
      </section>
    </main>
  );
}