import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Master Plan | The Gallaspy Golf & Country Club",
  description:
    "Explore the proposed 585.6-acre master plan for The Gallaspy Golf & Country Club in Covington, Georgia.",
};

const planItems = [
  {
    number: "01",
    title: "Main Entrance & Security",
    description:
      "A formal entry monument and staffed security gate establishing privacy, elegance, and a strong first impression.",
  },
  {
    number: "02",
    title: "Gallaspy Boulevard",
    description:
      "A signature tree-lined arrival drive designed as a memorable procession into the heart of the club.",
  },
  {
    number: "03",
    title: "Mercury Street Restaurant",
    description:
      "The club’s signature dining destination featuring chef-driven menus, private dining, terraces, and a curated wine program.",
  },
  {
    number: "04",
    title: "Vineyard",
    description:
      "An estate vineyard supporting tastings, seasonal programming, member dinners, and future wine production.",
  },
  {
    number: "05",
    title: "Event Pavilion",
    description:
      "An elegant venue for weddings, galas, corporate retreats, charity events, and private celebrations.",
  },
  {
    number: "06",
    title: "Grand Clubhouse",
    description:
      "The social centerpiece of the property with lounges, locker rooms, dining, ballroom space, terraces, and member services.",
  },
  {
    number: "07",
    title: "Wellness Spa & Pool",
    description:
      "A private wellness destination with spa treatments, fitness, recovery, aquatics, and resort-style recreation.",
  },
  {
    number: "08",
    title: "Tennis Center",
    description:
      "A dedicated racquet campus with tennis, pickleball, clinics, league play, and member programming.",
  },
  {
    number: "09",
    title: "Member Lodging",
    description:
      "Luxury suites and cottages designed for weekend stays, family visits, executive retreats, and special events.",
  },
  {
    number: "10",
    title: "Championship Golf Course",
    description:
      "An 18-hole championship course with practice facilities, short-game areas, putting grounds, and tournament capability.",
  },
  {
    number: "11",
    title: "Residential Community",
    description:
      "A gated enclave planned for luxury estate homes, villas, and family cottages integrated into the club landscape.",
  },
  {
    number: "12",
    title: "Maintenance & Grounds",
    description:
      "The operational center for agronomy, turf care, equipment, landscaping, irrigation, and property maintenance.",
  },
];

const phases = [
  {
    phase: "Phase I",
    title: "Land, Planning & Infrastructure",
    description:
      "Site control, planning, engineering, approvals, roads, utilities, and essential infrastructure.",
  },
  {
    phase: "Phase II",
    title: "Championship Golf",
    description:
      "Development of the 18-hole course, practice facilities, short-game complex, and golf operations.",
  },
  {
    phase: "Phase III",
    title: "Clubhouse & Dining",
    description:
      "Construction of the grand clubhouse, Mercury Street Restaurant, member spaces, terraces, and event facilities.",
  },
  {
    phase: "Phase IV",
    title: "Wellness, Lodging & Recreation",
    description:
      "Wellness center, spa, pools, racquet sports, member lodging, and family recreation.",
  },
  {
    phase: "Phase V",
    title: "Vineyard, Events & Expansion",
    description:
      "Vineyard and winery experiences, Event Pavilion, residential growth, and future expansion.",
  },
];

const arrivalSteps = [
  "Stone Entrance Monument",
  "Guard House",
  "Tree-Lined Boulevard",
  "Water Feature",
  "Arrival Roundabout",
  "Clubhouse Court",
  "Valet Arrival",
];

export default function MasterPlanPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      {/* Hero */}
      <section className="relative flex min-h-[72vh] items-center overflow-hidden px-5 pt-[72px] sm:px-8">
        <Image
          src="/images/masterplan-render.png"
          alt="Proposed master plan for The Gallaspy Golf and Country Club"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#10263F]/68" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/92 via-[#10263F]/62 to-[#10263F]/25" />

        <div className="relative z-10 mx-auto w-full max-w-[1060px] py-20 text-white sm:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              The Master Plan
            </p>

            <h1 className="mt-5 font-serif text-[2.8rem] font-light leading-[1.02] text-white sm:text-6xl lg:text-[4.7rem]">
              585.6 Acres
              <span className="block">of Possibility</span>
            </h1>

            <div className="mt-6 h-px w-16 bg-[#B89146]" />

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              The proposed master plan brings championship golf, hospitality,
              wellness, recreation, residential living, and future growth
              together within one private destination in Covington, Georgia.
            </p>

            <a
              href="#site-plan"
              className="mt-8 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#B89146] bg-[#B89146] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-[#FFD76A] hover:text-[#10263F]"
            >
              Explore the Plan
            </a>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Development Overview
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              One Complete
              <span className="block">Private Destination</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />
          </div>

          <div className="border-l border-[#B89146]/35 pl-6 sm:pl-8">
            <p className="text-base leading-8 text-[#1E3557]">
              The Gallaspy is being planned as a fully integrated golf and
              lifestyle community rather than a collection of disconnected
              amenities.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              Every major component is positioned to support member experience,
              operational efficiency, privacy, long-term value, and future
              expansion.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 grid w-full max-w-[1060px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["585.6", "Total Acres"],
            ["18", "Championship Holes"],
            ["5", "Development Phases"],
            ["300+", "Projected Jobs"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-[18px] border border-[#1E3557]/10 bg-white p-6 text-center"
            >
              <p className="font-serif text-4xl font-light text-[#10263F]">
                {value}
              </p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B89146]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Site plan */}
      <section
        id="site-plan"
        className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 lg:py-20"
      >
        <div className="mx-auto w-full max-w-[1180px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Proposed Site Plan
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              A Vision Designed Around the Land
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#1E3557]/80">
              The numbered plan identifies the major destinations envisioned
              across the property.
            </p>
          </div>

          <div className="relative mt-10 min-h-[420px] overflow-hidden rounded-[22px] border border-[#1E3557]/10 bg-[#F7F4EE] sm:min-h-[580px] lg:min-h-[720px]">
            <Image
              src="/images/numbercallout.png"
              alt="Numbered proposed master plan for The Gallaspy"
              fill
              sizes="100vw"
              className="object-contain p-3 sm:p-5"
            />
          </div>

          <p className="mt-4 text-center text-xs leading-6 text-[#1E3557]/60">
            Conceptual rendering for planning and vision purposes. Final design
            is subject to architecture, engineering, approvals, and development
            review.
          </p>
        </div>
      </section>

      {/* Legend */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Master Plan Legend
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Twelve Signature Destinations
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {planItems.map((item) => (
              <article
                key={item.number}
                className="grid gap-5 rounded-[18px] border border-[#1E3557]/10 bg-white p-6 sm:grid-cols-[54px_1fr]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#10263F] text-sm font-bold text-white">
                  {item.number}
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-light text-[#10263F]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#1E3557]/78">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Arrival */}
      <section className="bg-[#1E3557] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative min-h-[440px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/arrival.png"
              alt="Arrival experience at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              The Arrival Sequence
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              First Impressions
              <span className="block">Define Exceptional Clubs</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-sm leading-7 text-white/75">
              The arrival experience is designed as a deliberate progression
              from the public road to the private heart of the club.
            </p>

            <div className="mt-8 space-y-3">
              {arrivalSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-4 rounded-[14px] border border-white/15 bg-white/[0.05] px-4 py-4"
                >
                  <span className="text-[10px] font-bold tracking-[0.18em] text-[#FFD76A]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-medium text-white">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Residential */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Residential Community
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Private Living
              <span className="block">Within the Club</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              The residential vision includes a gated collection of luxury
              estate homes, villas, and family cottages connected to the club
              lifestyle.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              The community is envisioned to balance privacy, landscape,
              architectural quality, and convenient access to golf, dining,
              wellness, and recreation.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "250–400 Estate Lots",
                "Villas & Cottages",
                "Private Courtyards",
                "Gated Residential Enclave",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[14px] border border-[#1E3557]/10 bg-[#F7F4EE] px-4 py-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#10263F]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[440px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/lodging.png"
              alt="Residential and lodging vision at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Phases */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Development Timeline
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Built Across
              <span className="block">Five Thoughtful Phases</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              The development is planned over approximately eight to ten years,
              allowing each phase to support the next.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {phases.map((item, index) => (
              <article
                key={item.phase}
                className="grid gap-5 rounded-[18px] border border-[#1E3557]/10 bg-white p-6 md:grid-cols-[120px_1fr] sm:p-7"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#B89146]">
                    {item.phase}
                  </p>

                  <p className="mt-2 font-serif text-3xl font-light text-[#10263F]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-light text-[#10263F]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#1E3557]/80">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Dual CTA */}
      <section className="bg-[#163A2F] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] gap-5 md:grid-cols-2">
          <div className="rounded-[20px] border border-white/15 bg-white/[0.06] p-7 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
              Membership
            </p>

            <h2 className="mt-4 font-serif text-3xl font-light text-white sm:text-4xl">
              Join the Founding Generation
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/72">
              Register interest in future membership opportunities and project
              updates.
            </p>

            <Link
              href="/membership#membership-interest"
              className="mt-6 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Membership Interest
            </Link>
          </div>

          <div className="rounded-[20px] border border-white/15 bg-white/[0.06] p-7 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
              Investment
            </p>

            <h2 className="mt-4 font-serif text-3xl font-light text-white sm:text-4xl">
              Explore the Development Opportunity
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/72">
              Learn more about the phased development strategy, scale, and
              long-term vision.
            </p>

            <Link
              href="/invest"
              className="mt-6 inline-flex min-h-[45px] items-center justify-center rounded-full border border-white/35 px-6 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              View Investment Page
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}