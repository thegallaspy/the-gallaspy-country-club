"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const developmentHighlights = [
  {
    eyebrow: "18 Holes",
    title: "Championship Golf",
    description:
      "A thoughtfully designed private golf experience integrated into the natural landscape.",
  },
  {
    eyebrow: "12 Destinations",
    title: "Signature Amenities",
    description:
      "Dining, wellness, lodging, recreation, vineyards, events, and gathering places.",
  },
  {
    eyebrow: "One Legacy",
    title: "Designed for Generations",
    description:
      "A private-club community created around family tradition and enduring value.",
  },
];

const destinations = [
  {
    number: 1,
    name: "Main Entrance & Security",
    category: "Arrival Experience",
    description:
      "A distinguished entrance monument and staffed security gate designed to establish privacy, hospitality, and a memorable sense of arrival.",
    details: [
      "Private entry monument",
      "Staffed security gate",
      "Controlled member and guest access",
    ],
    link: "/master-plan",
  },
  {
    number: 2,
    name: "Gallaspy Boulevard",
    category: "Signature Drive",
    description:
      "A landscaped, tree-lined boulevard guiding members and guests from the entrance toward the central clubhouse district.",
    details: [
      "Tree-lined arrival sequence",
      "Landscape and water features",
      "Direct clubhouse connection",
    ],
    link: "/master-plan",
  },
  {
    number: 3,
    name: "Mercury Street Restaurant",
    category: "Dining",
    description:
      "A chef-driven dining destination envisioned for refined meals, private gatherings, outdoor dining, and exceptional club hospitality.",
    details: [
      "Chef-driven restaurant",
      "Private dining rooms",
      "Outdoor terrace seating",
    ],
    link: "/club#restaurants",
  },
  {
    number: 4,
    name: "Vineyard",
    category: "Wine & Agriculture",
    description:
      "An estate vineyard designed to support tastings, seasonal dinners, private events, and a distinctive member wine program.",
    details: [
      "Estate vineyard",
      "Private wine tastings",
      "Seasonal member experiences",
    ],
    link: "/club#vineyard",
  },
  {
    number: 5,
    name: "Event Pavilion",
    category: "Celebrations & Gatherings",
    description:
      "A flexible event destination for weddings, member celebrations, corporate retreats, galas, and community traditions.",
    details: [
      "Weddings and celebrations",
      "Corporate retreats",
      "Indoor and outdoor events",
    ],
    link: "/club#events",
  },
  {
    number: 6,
    name: "Clubhouse",
    category: "The Social Heart",
    description:
      "The central gathering place of The Gallaspy, bringing together dining, member lounges, locker rooms, hospitality, events, and club traditions.",
    details: [
      "Member lounges",
      "Locker rooms and golf services",
      "Ballroom and terraces",
    ],
    link: "/club",
  },
  {
    number: 7,
    name: "Wellness Spa & Pool",
    category: "Wellness",
    description:
      "A restorative wellness district envisioned for fitness, spa treatments, recovery, resort-style pools, and year-round recreation.",
    details: [
      "Full-service spa",
      "Fitness and recovery",
      "Resort-style pools",
    ],
    link: "/club#wellness",
  },
  {
    number: 8,
    name: "Tennis Center",
    category: "Racquet Sports",
    description:
      "A dedicated racquet-sports center offering tennis, pickleball, instruction, member competition, and social programming.",
    details: [
      "Tennis courts",
      "Pickleball courts",
      "Clinics and tournaments",
    ],
    link: "/club#tennis",
  },
  {
    number: 9,
    name: "Member Lodging",
    category: "Private Hospitality",
    description:
      "Private suites, cottages, and member accommodations designed for weekend stays, family visits, tournaments, and special occasions.",
    details: [
      "Member suites",
      "Private cottages",
      "Concierge hospitality",
    ],
    link: "/club",
  },
  {
    number: 10,
    name: "Championship Golf Course",
    category: "Golf",
    description:
      "An 18-hole championship course shaped around the natural terrain, supported by practice facilities and a complete golf-development program.",
    details: [
      "18 championship holes",
      "Practice range",
      "Short-game and putting facilities",
    ],
    link: "/club#golf",
  },
  {
    number: 11,
    name: "Residential Community",
    category: "Private Club Living",
    description:
      "A gated residential enclave envisioned for luxury estate homes, villas, cottages, and multigenerational club living.",
    details: [
      "Luxury estate homes",
      "Villas and cottages",
      "Gated residential setting",
    ],
    link: "/master-plan",
  },
  {
    number: 12,
    name: "Maintenance & Grounds",
    category: "Club Operations",
    description:
      "A dedicated operations complex supporting golf-course conditioning, landscape care, equipment storage, sustainability, and property maintenance.",
    details: [
      "Turf-care operations",
      "Equipment and storage",
      "Landscape and facility maintenance",
    ],
    link: "/master-plan",
  },
];

export default function DevelopmentPlan() {
  const [activeDestination, setActiveDestination] = useState(0);

  const selectedDestination = destinations[activeDestination];

  const showPrevious = () => {
    setActiveDestination((current) =>
      current === 0 ? destinations.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveDestination((current) =>
      current === destinations.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <section className="overflow-hidden bg-[#F7F4EE] px-5 py-14 text-[#1E3557] sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto w-full max-w-[1120px]">
        {/* Section introduction */}
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#B89146] sm:text-[11px]">
            Interactive Master Plan
          </p>

          <h2 className="mt-4 font-serif text-[2.2rem] font-normal leading-[1.08] text-[#10263F] sm:text-[2.7rem] lg:text-[3.35rem]">
            Explore the Proposed
            <span className="block">Development</span>
          </h2>

          <div className="mx-auto mt-5 h-px w-14 bg-[#B89146]" />

          <p className="mx-auto mt-5 max-w-[690px] text-sm leading-7 text-[#1E3557] sm:text-[15px]">
            Select one of the twelve proposed destinations to learn how each
            area contributes to the complete Gallaspy Golf &amp; Country Club
            experience.
          </p>
        </div>

        {/* Development highlights */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {developmentHighlights.map((item) => (
            <article
              key={item.title}
              className="rounded-[18px] border border-[#1E3557]/10 bg-white px-6 py-6 text-center shadow-[0_12px_35px_rgba(16,38,63,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(16,38,63,0.09)]"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B89146]">
                {item.eyebrow}
              </p>

              <h3 className="mt-3 font-serif text-[1.65rem] font-normal leading-tight text-[#10263F]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#1E3557]/80">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {/* Interactive plan */}
        <div className="mt-8 overflow-hidden rounded-[22px] border border-[#1E3557]/10 bg-white shadow-[0_22px_60px_rgba(16,38,63,0.13)]">
          <div className="grid lg:grid-cols-[1.45fr_0.75fr]">
            {/* Image */}
            <div className="relative min-h-[360px] overflow-hidden bg-[#EDE8DE] sm:min-h-[500px] lg:min-h-[620px]">
              <Image
                src="/images/numbercallout.png"
                alt="Proposed master plan for The Gallaspy Golf and Country Club"
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 68vw"
                className="object-contain p-2 transition duration-700 sm:p-4"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10263F]/25 via-transparent to-transparent" />

              {/* Active destination badge */}
              <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-full border border-white/40 bg-[#10263F]/92 py-2 pl-2 pr-5 text-white shadow-lg backdrop-blur sm:left-6 sm:top-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFD76A] text-xs font-bold text-[#10263F]">
                  {selectedDestination.number}
                </span>

                <span className="truncate text-[10px] font-bold uppercase tracking-[0.18em]">
                  {selectedDestination.name}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-[#10263F]/80 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur sm:bottom-6 sm:left-6">
                Select a destination below
              </div>
            </div>

            {/* Information panel */}
            <aside
              key={selectedDestination.number}
              className="flex min-h-[420px] flex-col justify-between bg-[#10263F] px-6 py-8 text-white sm:px-9 sm:py-10 lg:min-h-[620px]"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFD76A]">
                      Destination {selectedDestination.number} of{" "}
                      {destinations.length}
                    </p>

                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">
                      {selectedDestination.category}
                    </p>
                  </div>

                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#B89146] bg-[#F7F4EE] font-serif text-xl text-[#10263F]">
                    {selectedDestination.number}
                  </span>
                </div>

                <h3 className="mt-7 font-serif text-[2.15rem] font-normal leading-[1.05] text-white sm:text-[2.55rem]">
                  {selectedDestination.name}
                </h3>

                <div className="mt-6 h-px w-14 bg-[#B89146]" />

                <p className="mt-6 text-sm leading-7 text-white/78 sm:text-[15px]">
                  {selectedDestination.description}
                </p>

                <div className="mt-7 space-y-3">
                  {selectedDestination.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFD76A]" />

                      <p className="text-sm text-white/85">{detail}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href={selectedDestination.link}
                  className="mt-8 inline-flex min-h-[43px] items-center justify-center rounded-full border border-[#B89146] px-6 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#B89146]"
                >
                  Explore This Area
                </Link>
              </div>

              {/* Previous and next controls */}
              <div className="mt-10 flex items-center justify-between border-t border-white/15 pt-6">
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="View previous destination"
                  className="inline-flex min-h-[42px] items-center rounded-full border border-white/20 px-4 text-[9px] font-bold uppercase tracking-[0.18em] text-white transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
                >
                  ← Previous
                </button>

                <div className="flex gap-1.5">
                  {destinations.map((destination, index) => (
                    <button
                      key={destination.number}
                      type="button"
                      onClick={() => setActiveDestination(index)}
                      aria-label={`View ${destination.name}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === activeDestination
                          ? "w-6 bg-[#FFD76A]"
                          : "w-1.5 bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={showNext}
                  aria-label="View next destination"
                  className="inline-flex min-h-[42px] items-center rounded-full border border-white/20 px-4 text-[9px] font-bold uppercase tracking-[0.18em] text-white transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
                >
                  Next →
                </button>
              </div>
            </aside>
          </div>
        </div>

        {/* Mobile destination selector */}
        <div className="-mx-5 mt-6 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:hidden">
          <div className="flex w-max gap-3">
            {destinations.map((destination, index) => (
              <button
                key={destination.number}
                type="button"
                onClick={() => setActiveDestination(index)}
                aria-pressed={index === activeDestination}
                className={`flex min-h-[48px] items-center gap-3 rounded-full border px-3 pr-5 transition duration-300 ${
                  index === activeDestination
                    ? "border-[#B89146] bg-[#10263F] text-white shadow-md"
                    : "border-[#1E3557]/15 bg-white text-[#10263F]"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    index === activeDestination
                      ? "bg-[#FFD76A] text-[#10263F]"
                      : "bg-[#F7F4EE] text-[#10263F]"
                  }`}
                >
                  {destination.number}
                </span>

                <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.13em]">
                  {destination.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop destination legend */}
        <div className="mt-6 hidden overflow-hidden rounded-[20px] border border-[#B89146]/35 bg-[#163A2F] text-white shadow-[0_18px_45px_rgba(16,38,63,0.12)] lg:block">
          <div className="flex items-end justify-between gap-8 border-b border-white/15 px-8 py-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
                Proposed Destinations
              </p>

              <h3 className="mt-2 font-serif text-[2rem] font-normal text-white">
                Select an Area to Explore
              </h3>
            </div>

            <p className="max-w-[430px] text-right text-sm leading-6 text-white/70">
              Each number corresponds with the proposed master-plan rendering.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-px bg-white/10">
            {destinations.map((destination, index) => (
              <button
                key={destination.number}
                type="button"
                onClick={() => setActiveDestination(index)}
                aria-pressed={index === activeDestination}
                className={`group flex min-h-[86px] items-center gap-4 px-6 py-4 text-left transition duration-300 ${
                  index === activeDestination
                    ? "bg-[#B89146]"
                    : "bg-[#163A2F] hover:bg-white/[0.07]"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold transition ${
                    index === activeDestination
                      ? "border-white bg-white text-[#10263F]"
                      : "border-[#B89146] bg-[#F7F4EE] text-[#10263F]"
                  }`}
                >
                  {destination.number}
                </span>

                <span className="text-sm font-medium leading-5 text-white">
                  {destination.name}
                </span>
              </button>
            ))}
          </div>

          <div className="border-t border-white/15 bg-[#10263F] px-8 py-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
              Championship Golf · Hospitality · Wellness · Residential ·
              Recreation
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mx-auto mt-6 max-w-[850px] text-center text-[11px] leading-5 text-[#1E3557]/60">
          The master plan and amenity descriptions are conceptual and remain
          subject to land acquisition, planning, engineering, governmental
          approvals, financing, architectural design, and future development
          decisions.
        </p>

        {/* Full master plan button */}
        <div className="mt-9 flex justify-center">
          <Link
            href="/master-plan"
            className="inline-flex min-w-[215px] items-center justify-center rounded-full border border-[#B89146] bg-[#B89146] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#10263F]"
          >
            View Full Master Plan
          </Link>
        </div>
      </div>
    </section>
  );
}