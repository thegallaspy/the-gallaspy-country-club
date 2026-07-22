import Image from "next/image";
import Link from "next/link";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const visionPillars = [
  {
    number: "01",
    eyebrow: "Championship Golf",
    title: "18 Holes",
    description:
      "A tournament-caliber private golf experience shaped around the natural character of the property.",
  },
  {
    number: "02",
    eyebrow: "Private Club Living",
    title: "250–400 Homes",
    description:
      "A future gated residential community envisioned for estate homes, villas, and family cottages.",
  },
  {
    number: "03",
    eyebrow: "Luxury Lifestyle",
    title: "12 Destinations",
    description:
      "Dining, lodging, vineyards, events, wellness, recreation, and gathering places across the property.",
  },
  {
    number: "04",
    eyebrow: "Built for Generations",
    title: "8–10 Years",
    description:
      "A phased development vision designed to create lasting value and a multigenerational club legacy.",
  },
];

const quickFacts = [
  {
    value: 585.6,
    decimals: 1,
    suffix: "",
    label: "Planned Acres",
  },
  {
    value: 18,
    decimals: 0,
    suffix: "",
    label: "Championship Holes",
  },
  {
    value: 12,
    decimals: 0,
    suffix: "",
    label: "Signature Destinations",
  },
  {
    value: 400,
    decimals: 0,
    suffix: "+",
    label: "Potential Residences",
  },
  {
    value: 10,
    decimals: 0,
    suffix: " Years",
    label: "Long-Term Vision",
  },
];

export default function Vision() {
  return (
    <section
      id="vision"
      className="scroll-mt-24 overflow-hidden bg-[#F7F4EE] text-[#10263F]"
    >
      {/* Editorial introduction */}
      <div className="px-5 pb-14 pt-20 sm:px-8 sm:pb-16 sm:pt-24 lg:px-10 lg:pb-20 lg:pt-32">
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-20">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#B89146]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#9A793A]">
                Our Vision
              </p>
            </div>

            <h2 className="mt-7 max-w-xl font-serif text-[2.8rem] font-light leading-[0.98] tracking-[-0.025em] text-[#10263F] sm:text-[4rem] lg:text-[5rem]">
              A Vision Designed
              <span className="block italic text-[#B89146]">
                for Generations
              </span>
            </h2>
          </div>

          <div className="lg:border-l lg:border-[#10263F]/12 lg:pl-12">
            <p className="max-w-2xl text-base leading-8 text-[#4E5E66] sm:text-lg sm:leading-9">
              The Gallaspy Golf &amp; Country Club is envisioned as one of
              Georgia&apos;s premier private golf and lifestyle destinations,
              bringing together championship golf, hospitality, wellness,
              recreation, vineyards, and future residential living.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                href="/why-the-gallaspy"
                className="group inline-flex min-h-[50px] items-center justify-center bg-[#10263F] px-7 text-[9px] font-bold uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-[#1E3557]"
              >
                Discover Our Story
                <span className="ml-4 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#10263F]/45">
                Covington, Georgia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Master plan feature */}
      <div className="px-5 sm:px-8 lg:px-10">
        <div className="relative mx-auto min-h-[620px] w-full max-w-[1380px] overflow-hidden rounded-[24px] shadow-[0_35px_90px_rgba(16,38,63,0.2)] sm:min-h-[700px] lg:min-h-[780px] lg:rounded-[30px]">
          <Image
            src="/images/masterplan-render.png"
            alt="Proposed master plan for The Gallaspy Golf and Country Club"
            fill
            sizes="(max-width: 768px) 100vw, 1380px"
            className="object-cover object-center transition-transform duration-[1800ms] hover:scale-[1.025]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#071827]/95 via-[#10263F]/48 to-[#10263F]/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/85 via-transparent to-[#071827]/18" />

          <div className="relative z-10 flex min-h-[620px] items-end px-5 py-6 sm:min-h-[700px] sm:px-8 sm:py-8 lg:min-h-[780px] lg:items-center lg:px-14 lg:py-14">
            <div className="w-full max-w-[520px] overflow-hidden rounded-[24px] border border-white/15 bg-[#10263F]/82 text-white shadow-[0_28px_75px_rgba(0,0,0,0.3)] backdrop-blur-xl">
              <div className="border-b border-white/10 px-6 py-6 sm:px-8 sm:py-7">
                <div className="flex items-center justify-between gap-5">
                  <p className="text-[9px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
                    The Gallaspy
                  </p>

                  <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/45">
                    Proposed Master Plan
                  </p>
                </div>

                <h3 className="mt-5 font-serif text-[2.6rem] font-light leading-[0.98] tracking-[-0.02em] sm:text-[3.6rem]">
                  A Landmark
                  <span className="block italic text-[#FFD76A]">
                    Private-Club Vision
                  </span>
                </h3>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/72 sm:text-[15px]">
                  A proposed 585.6-acre golf, hospitality, wellness,
                  residential, and lifestyle destination near Metro Atlanta.
                </p>
              </div>

              <div className="grid grid-cols-2">
                <div className="border-b border-r border-white/10 px-6 py-6 sm:px-8">
                  <p className="font-serif text-3xl font-light sm:text-4xl">
                    <AnimatedCounter end={585.6} decimals={1} />
                  </p>

                  <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.22em] text-[#FFD76A]">
                    Acres
                  </p>
                </div>

                <div className="border-b border-white/10 px-6 py-6 sm:px-8">
                  <p className="font-serif text-3xl font-light sm:text-4xl">
                    <AnimatedCounter end={18} />
                  </p>

                  <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.22em] text-[#FFD76A]">
                    Golf Holes
                  </p>
                </div>

                <div className="border-r border-white/10 px-6 py-6 sm:px-8">
                  <p className="font-serif text-3xl font-light sm:text-4xl">
                    <AnimatedCounter end={12} />
                  </p>

                  <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.22em] text-[#FFD76A]">
                    Destinations
                  </p>
                </div>

                <div className="px-6 py-6 sm:px-8">
                  <p className="font-serif text-3xl font-light sm:text-4xl">
                    <AnimatedCounter end={400} suffix="+" />
                  </p>

                  <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.22em] text-[#FFD76A]">
                    Potential Homes
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 px-6 py-6 sm:px-8">
                <Link
                  href="/master-plan"
                  className="group flex min-h-[48px] w-full items-center justify-between border border-[#FFD76A]/70 px-5 text-[9px] font-bold uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-[#FFD76A] hover:text-[#10263F]"
                >
                  Explore the Master Plan
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 hidden items-center gap-3 text-white/55 lg:flex">
            <span className="h-px w-10 bg-[#FFD76A]/70" />

            <p className="text-[8px] font-bold uppercase tracking-[0.26em]">
              Conceptual Rendering
            </p>
          </div>
        </div>
      </div>

      {/* Vision pillars */}
      <div className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="flex flex-col gap-5 border-b border-[#10263F]/12 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#9A793A]">
                The Foundation
              </p>

              <h3 className="mt-3 font-serif text-4xl font-light leading-tight text-[#10263F] sm:text-5xl">
                Four Pillars of the Vision
              </h3>
            </div>

            <p className="max-w-lg text-sm leading-7 text-[#53616A]">
              Each part of the destination is designed to complement the
              others, creating a complete private-club experience.
            </p>
          </div>

          <div className="grid border-b border-[#10263F]/12 md:grid-cols-2 lg:grid-cols-4">
            {visionPillars.map((item, index) => (
              <article
                key={item.eyebrow}
                className={`group relative px-1 py-9 sm:px-7 lg:min-h-[360px] lg:py-10 ${
                  index !== visionPillars.length - 1
                    ? "border-b border-[#10263F]/12 lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#9A793A]">
                    {item.eyebrow}
                  </p>

                  <span className="font-serif text-2xl font-light text-[#10263F]/18 transition duration-300 group-hover:text-[#B89146]">
                    {item.number}
                  </span>
                </div>

                <h4 className="mt-9 font-serif text-[2rem] font-light leading-tight text-[#10263F]">
                  {item.title}
                </h4>

                <div className="mt-5 h-px w-10 bg-[#B89146] transition-all duration-300 group-hover:w-16" />

                <p className="mt-6 text-sm leading-7 text-[#59666D]">
                  {item.description}
                </p>

                <div className="mt-8 h-px w-full origin-left scale-x-0 bg-[#B89146]/70 transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Quick facts */}
      <div className="bg-[#10263F] px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="mb-10 text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              Project at a Glance
            </p>

            <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
              A Destination of Exceptional Scale
            </h3>
          </div>

          <div className="grid grid-cols-2 border-y border-white/12 sm:grid-cols-3 lg:grid-cols-5">
            {quickFacts.map((fact, index) => (
              <div
                key={fact.label}
                className={`px-3 py-8 text-center sm:px-5 lg:py-10 ${
                  index !== quickFacts.length - 1
                    ? "border-b border-white/10 lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >
                <p className="font-serif text-[2.25rem] font-light leading-none text-white sm:text-[2.8rem]">
                  <AnimatedCounter
                    end={fact.value}
                    decimals={fact.decimals}
                    suffix={fact.suffix}
                  />
                </p>

                <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.22em] text-[#FFD76A]">
                  {fact.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-[10px] leading-5 text-white/45">
            Acreage, residential counts, amenities, and development timing are
            conceptual and remain subject to planning, approvals, financing,
            and future development decisions.
          </p>
        </div>
      </div>
    </section>
  );
}