import Link from "next/link";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const investmentPoints = [
  {
    title: "Diversified Revenue",
    description:
      "Membership, golf, dining, lodging, events, wellness, winery operations, and residential development.",
  },
  {
    title: "Phased Capital Strategy",
    description:
      "A five-phase development approach designed to align infrastructure, amenities, and capital deployment.",
  },
  {
    title: "Long-Term Asset Value",
    description:
      "A large-scale private-club destination supported by hospitality, residential, and underlying land value.",
  },
  {
    title: "Regional Opportunity",
    description:
      "A strategically positioned destination near Metro Atlanta in the growing Covington and Newton County market.",
  },
];

export default function InvestmentPreview() {
  return (
    <section
      id="investment-preview"
      className="relative overflow-hidden bg-[#10263F] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      {/* Background details */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,215,106,0.12),transparent_38%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(22,58,47,0.55),transparent_42%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          {/* Main content */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#FFD76A] sm:text-xs">
              Investment Opportunity
            </p>

            <h2 className="mt-4 max-w-2xl font-serif text-[2.5rem] font-light leading-[1.06] sm:text-5xl lg:text-[3.65rem]">
              A Landmark Destination
              <span className="block">Built for Long-Term Value</span>
            </h2>

            <div className="mt-6 h-px w-16 bg-[#B89146]" />

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
              The Gallaspy Golf &amp; Country Club is being envisioned as a
              multidimensional private golf, hospitality, residential, and
              lifestyle destination supported by diversified revenue,
              strategic phasing, and long-term real-estate value.
            </p>

            {/* Investment points */}
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {investmentPoints.map((point, index) => (
                <article
                  key={point.title}
                  className="group rounded-[18px] border border-white/12 bg-white/[0.045] px-5 py-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#FFD76A]/45 hover:bg-white/[0.075]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#FFD76A]">
                      0{index + 1}
                    </p>

                    <span className="h-px w-9 bg-[#B89146]/70 transition-all duration-300 group-hover:w-12" />
                  </div>

                  <h3 className="mt-4 font-serif text-[1.55rem] font-light leading-tight text-white">
                    {point.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/65">
                    {point.description}
                  </p>
                </article>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/investment"
                className="group inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#B89146] px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_14px_35px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-[#FFD76A] hover:text-[#10263F]"
              >
                Explore Investment

                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/contact"
                className="group inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/35 bg-white/[0.035] px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#FFD76A] hover:text-[#FFD76A]"
              >
                Request Information

                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Statistics panel */}
          <div className="relative overflow-hidden rounded-[24px] border border-white/14 bg-[#163A2F]/68 p-5 shadow-[0_26px_70px_rgba(0,0,0,0.2)] backdrop-blur-md sm:p-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,106,0.1),transparent_36%)]" />

            <div className="relative z-10">
              <div className="border-b border-white/12 pb-6">
                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
                  Project Overview
                </p>

                <h3 className="mt-3 font-serif text-3xl font-light leading-tight text-white sm:text-[2.25rem]">
                  Development at a Glance
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-white/62">
                  Selected preliminary figures illustrating the scale and
                  long-term vision of the proposed development.
                </p>
              </div>

              <div className="grid grid-cols-2">
                <Metric
                  value={
                    <span className="text-[1.75rem] sm:text-[2.25rem]">
                      $330M–$380M
                    </span>
                  }
                  label="Estimated Development"
                  borderRight
                  borderBottom
                />

                <Metric
                  value={
                    <AnimatedCounter
                      end={585.6}
                      decimals={1}
                    />
                  }
                  label="Planned Acres"
                  borderBottom
                />

                <Metric
                  value={
                    <AnimatedCounter
                      end={300}
                      suffix="+"
                    />
                  }
                  label="Projected Jobs"
                  borderRight
                />

                <Metric
                  value={<AnimatedCounter end={5} />}
                  label="Development Phases"
                />
              </div>

              {/* Capital approach */}
              <div className="mt-6 rounded-[16px] border border-[#FFD76A]/20 bg-[#10263F]/42 px-5 py-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#FFD76A]">
                  Strategic Capital Approach
                </p>

                <p className="mt-3 text-sm leading-6 text-white/68">
                  The proposed capital structure may include founder
                  contribution, private equity, debt financing, membership
                  pre-sales, strategic partnerships, and phased capital calls.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Investor distinction */}
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[20px] border border-white/12 bg-white/[0.045] px-6 py-7">
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#FFD76A]">
              For Future Members
            </p>

            <h3 className="mt-3 font-serif text-2xl font-light text-white">
              Discover the Club Experience
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/65">
              Explore the golf, dining, wellness, hospitality, and recreation
              envisioned for future members and their families.
            </p>

            <Link
              href="/membership"
              className="mt-5 inline-flex items-center border-b border-[#FFD76A] pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:text-[#FFD76A]"
            >
              Membership Interest
              <span className="ml-2">→</span>
            </Link>
          </div>

          <div className="rounded-[20px] border border-[#FFD76A]/24 bg-[#B89146]/10 px-6 py-7">
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#FFD76A]">
              For Investors &amp; Partners
            </p>

            <h3 className="mt-3 font-serif text-2xl font-light text-white">
              Review the Development Opportunity
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/65">
              Learn more about the development vision, investment structure,
              phased execution strategy, projected value, and partnership
              opportunities.
            </p>

            <Link
              href="/investment"
              className="mt-5 inline-flex items-center border-b border-[#FFD76A] pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:text-[#FFD76A]"
            >
              Investor Overview
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mx-auto mt-7 max-w-4xl text-center text-[10px] leading-5 text-white/42">
          All development costs, acreage, employment estimates, capital
          structures, schedules, returns, and project details are preliminary,
          conceptual, and subject to due diligence, financing, approvals,
          market conditions, and future development decisions. Nothing on this
          website constitutes an offer to sell or a solicitation to purchase
          securities.
        </p>
      </div>
    </section>
  );
}

type MetricProps = {
  value: React.ReactNode;
  label: string;
  borderRight?: boolean;
  borderBottom?: boolean;
};

function Metric({
  value,
  label,
  borderRight = false,
  borderBottom = false,
}: MetricProps) {
  return (
    <div
      className={`px-3 py-7 text-center sm:px-5 sm:py-9 ${
        borderRight ? "border-r border-white/12" : ""
      } ${borderBottom ? "border-b border-white/12" : ""}`}
    >
      <p className="font-serif text-[2rem] font-light leading-none text-white sm:text-[2.6rem]">
        {value}
      </p>

      <div className="mx-auto mt-4 h-px w-9 bg-[#B89146]" />

      <p className="mt-4 text-[8px] font-semibold uppercase leading-4 tracking-[0.18em] text-white/52 sm:text-[9px]">
        {label}
      </p>
    </div>
  );
}