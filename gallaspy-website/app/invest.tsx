import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const investmentStats = [
  {
    value: "$330M–$380M",
    label: "Estimated Development Budget",
  },
  {
    value: "300+",
    label: "Planned Acres",
  },
  {
    value: "300+",
    label: "Expected Jobs Created",
  },
  {
    value: "5 Phases",
    label: "Development Program",
  },
];

const investmentHighlights = [
  {
    title: "Championship Golf",
    description:
      "An 18-hole championship course supported by practice facilities, short-game areas, and premium golf operations.",
  },
  {
    title: "Luxury Hospitality",
    description:
      "A grand clubhouse, Mercury Street Restaurant, member lodging, villas, private events, and concierge-level experiences.",
  },
  {
    title: "Wellness & Recreation",
    description:
      "A wellness campus, resort-style pools, fitness, spa, tennis, pickleball, and year-round recreation.",
  },
  {
    title: "Residential & Real Estate",
    description:
      "Luxury residential development, private villas, future timeshare opportunities, and long-term land value.",
  },
];

const investmentThesis = [
  {
    title: "Diversified Revenue",
    description:
      "Membership, golf operations, dining, lodging, wellness, events, real estate, winery activity, corporate retreats, tournaments, and merchandise create multiple complementary revenue streams.",
  },
  {
    title: "Phased Capital Deployment",
    description:
      "The project is planned across five development phases so capital can be aligned with construction milestones, demand, financing, and operational readiness.",
  },
  {
    title: "Long-Term Asset Value",
    description:
      "The combination of land ownership, hospitality, residential development, and private-club operations is designed to support lasting appreciation and recurring income.",
  },
  {
    title: "Regional Economic Impact",
    description:
      "The completed destination is expected to create more than 300 jobs across golf, hospitality, dining, wellness, events, maintenance, administration, and grounds operations.",
  },
];

const budgetCategories = [
  ["Land & Due Diligence", "$2.5M–$5.5M"],
  ["Infrastructure & Utilities", "$34M"],
  ["Championship Golf Course", "$34M"],
  ["Clubhouse & Resort", "$35M"],
  ["Wellness Campus", "$19.5M"],
  ["Sports Complex", "$5.8M"],
  ["Winery", "$19M"],
  ["Hospitality — Lodges & Villas", "$34M"],
  ["Residential Development", "$20.5M"],
  ["Timeshare Development", "$33M"],
  ["Operations & Equipment", "$21M"],
  ["Professional Fees", "$5.3M"],
  ["Licensing & Insurance", "$5M"],
  ["Working Capital", "$21.5M"],
  ["Contingency", "$35M–$45M"],
];

const developmentPhases = [
  {
    number: "01",
    title: "Land, Planning & Infrastructure",
    description:
      "Land control, due diligence, entitlement, site preparation, roads, utilities, drainage, and core infrastructure.",
  },
  {
    number: "02",
    title: "Championship Golf",
    description:
      "Construction of the golf course, practice facilities, short-game complex, putting areas, and golf operations.",
  },
  {
    number: "03",
    title: "Clubhouse & Dining",
    description:
      "Development of the grand clubhouse, Mercury Street Restaurant, member lounges, event spaces, and resort hospitality.",
  },
  {
    number: "04",
    title: "Wellness, Lodging & Recreation",
    description:
      "Wellness campus, spa, resort pools, tennis, pickleball, member lodging, villas, and recreation facilities.",
  },
  {
    number: "05",
    title: "Residential, Winery & Expansion",
    description:
      "Residential development, future timeshare opportunities, winery, event destinations, and additional campus expansion.",
  },
];

export default function InvestmentPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#163A2F]">
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex min-h-[78vh] items-center justify-center overflow-hidden bg-cover bg-center px-5 pt-28 sm:px-8 lg:px-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,32,27,0.62), rgba(10,32,27,0.82)), url('/images/arrival.png')",
        }}
      >
        <div className="mx-auto w-full max-w-5xl py-24 text-center text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#FFD76A] sm:text-sm">
            Investment Opportunity
          </p>

          <h1 className="mt-6 font-serif text-5xl font-light leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Building a Landmark
            <span className="block">Destination in Georgia</span>
          </h1>

          <div className="mx-auto mt-8 h-px w-24 bg-[#D4AF37]" />

          <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/84 sm:text-lg">
            A phased private golf and lifestyle destination combining
            championship golf, hospitality, wellness, residential development,
            recreation, and long-term real-estate value.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#budget"
              className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#B89146] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#163A2F]"
            >
              Review the Budget
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/70 bg-white/10 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#FFD76A] hover:bg-[#FFD76A] hover:text-[#163A2F]"
            >
              Request Information
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {investmentStats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-[#163A2F]/10 bg-white p-7 text-center shadow-[0_14px_40px_rgba(22,58,47,0.08)] sm:p-8"
            >
              <p className="font-serif text-4xl font-light leading-none sm:text-5xl">
                {stat.value}
              </p>

              <div className="mx-auto mt-5 h-px w-12 bg-[#B89146]" />

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#7B642F]">
                {stat.label}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Project Overview */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#B89146]">
              Project at a Glance
            </p>

            <h2 className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
              A Multi-Dimensional Destination Investment
            </h2>

            <div className="mx-auto mt-7 h-px w-20 bg-[#B89146]" />

            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-[#4B5752] sm:text-lg">
              The Gallaspy Golf &amp; Country Club is envisioned as one of the
              Southeast&apos;s premier private golf and lifestyle destinations,
              bringing together championship golf, luxury hospitality,
              wellness, residential living, dining, recreation, and destination
              experiences within one master-planned community.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {investmentHighlights.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#163A2F]/10 bg-white p-7 shadow-[0_12px_35px_rgba(22,58,47,0.07)] sm:p-9"
              >
                <h3 className="font-serif text-3xl font-light">
                  {item.title}
                </h3>

                <div className="mt-5 h-px w-14 bg-[#B89146]" />

                <p className="mt-5 text-sm leading-7 text-[#4B5752] sm:text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Thesis */}
      <section className="bg-[#163A2F] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#FFD76A]">
              Investment Thesis
            </p>

            <h2 className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
              Designed for Long-Term Value Creation
            </h2>

            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/74 sm:text-lg">
              The project is structured around disciplined phased development,
              diversified operating income, real-estate appreciation, and a
              premium member experience capable of supporting long-term asset
              value.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {investmentThesis.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/15 bg-white/[0.07] p-7 backdrop-blur-sm sm:p-9"
              >
                <h3 className="font-serif text-3xl font-light">
                  {item.title}
                </h3>

                <div className="mt-5 h-px w-14 bg-[#D4AF37]" />

                <p className="mt-5 text-sm leading-7 text-white/75 sm:text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Budget */}
      <section
        id="budget"
        className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#B89146]">
              Estimated Development Budget
            </p>

            <h2 className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
              Phase I Through Full Build-Out
            </h2>

            <div className="mx-auto mt-7 h-px w-20 bg-[#B89146]" />

            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-[#4B5752] sm:text-lg">
              Preliminary planning estimates based on the current development
              program. Final allocations will be refined through engineering,
              design development, due diligence, market validation, and
              competitive construction pricing.
            </p>
          </div>

          <div className="mt-14 overflow-hidden rounded-[26px] border border-[#163A2F]/10 shadow-[0_20px_60px_rgba(22,58,47,0.1)]">
            <div className="grid grid-cols-[1fr_auto] gap-5 bg-[#163A2F] px-6 py-5 text-white sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em]">
                Category
              </p>

              <p className="text-right text-xs font-semibold uppercase tracking-[0.25em]">
                Estimated Cost
              </p>
            </div>

            <div className="divide-y divide-[#163A2F]/10 bg-[#F7F4EE]">
              {budgetCategories.map(([category, cost]) => (
                <div
                  key={category}
                  className="grid grid-cols-[1fr_auto] items-center gap-5 px-6 py-5 sm:px-8"
                >
                  <p className="text-sm font-medium leading-6 text-[#263D35] sm:text-base">
                    {category}
                  </p>

                  <p className="whitespace-nowrap text-right font-serif text-xl sm:text-2xl">
                    {cost}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 bg-[#102F27] px-6 py-7 text-white sm:grid-cols-[1fr_auto] sm:items-center sm:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FFD76A]">
                  Estimated Total Investment
                </p>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
                  In line with comparable luxury destination golf communities
                  combining hospitality, residential development, and resort
                  amenities.
                </p>
              </div>

              <p className="font-serif text-4xl font-light sm:text-5xl">
                $330M–$380M
              </p>
            </div>
          </div>

          <p className="mx-auto mt-7 max-w-4xl text-center text-xs leading-6 text-[#65716C] sm:text-sm">
            These figures are preliminary planning estimates and do not
            constitute an offer to sell securities, a financing commitment, or
            a guarantee of final development costs or financial performance.
          </p>
        </div>
      </section>

      {/* Phasing */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#B89146]">
              Development Strategy
            </p>

            <h2 className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
              A Disciplined Five-Phase Build-Out
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {developmentPhases.map((phase) => (
              <article
                key={phase.number}
                className="rounded-2xl border border-[#163A2F]/10 bg-white p-7 shadow-[0_12px_35px_rgba(22,58,47,0.07)]"
              >
                <p className="font-serif text-4xl text-[#B89146]">
                  {phase.number}
                </p>

                <h3 className="mt-5 font-serif text-2xl font-light leading-tight">
                  {phase.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#4B5752]">
                  {phase.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#163A2F] px-5 py-20 text-center text-white sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#FFD76A]">
            Invitation to Partner
          </p>

          <h2 className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
            Join Us in Building a Landmark Destination
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/74 sm:text-lg">
            We welcome conversations with qualified investors, financial
            institutions, lending organizations, and strategic partners
            interested in participating in the development of The Gallaspy Golf
            &amp; Country Club.
          </p>

          <Link
            href="/contact"
            className="mt-10 inline-flex items-center justify-center rounded-full border border-[#FFD76A] bg-[#B89146] px-9 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#163A2F]"
          >
            Request Investment Information
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
