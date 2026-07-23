import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import CareerApplicationForm from "@/components/CareerApplicationForm";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join The Gallaspy Future Talent Network and express interest in future opportunities across golf, hospitality, wellness, dining, events, operations, and member services.",
};

const careerAreas = [
  {
    number: "01",
    title: "Golf Operations",
    description:
      "Future opportunities may include golf professionals, caddies, starters, outside services, instruction, tournament support, and pro shop operations.",
  },
  {
    number: "02",
    title: "Hospitality & Dining",
    description:
      "Culinary, restaurant, banquet, beverage, concierge, lodging, housekeeping, and guest-experience roles.",
  },
  {
    number: "03",
    title: "Wellness & Racquet",
    description:
      "Fitness, spa, recovery, pool, tennis, pickleball, instruction, programming, and recreation positions.",
  },
  {
    number: "04",
    title: "Events & Celebrations",
    description:
      "Planning, production, weddings, corporate retreats, private events, tournaments, and venue operations.",
  },
  {
    number: "05",
    title: "Grounds & Facilities",
    description:
      "Agronomy, turf care, landscaping, maintenance, engineering, sustainability, and facility management.",
  },
  {
    number: "06",
    title: "Administration & Member Services",
    description:
      "Membership, communications, finance, human resources, security, technology, and administrative support.",
  },
];

const values = [
  {
    title: "Service With Purpose",
    description:
      "Every role contributes to creating a welcoming, thoughtful, and memorable member experience.",
  },
  {
    title: "Excellence in the Details",
    description:
      "We believe luxury is expressed through consistency, professionalism, preparation, and care.",
  },
  {
    title: "Tradition for Generations",
    description:
      "The team will help establish the standards, culture, and traditions that define the club for decades.",
  },
];

export default function CareersPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      <section className="relative flex min-h-[72vh] items-center overflow-hidden px-5 pt-[82px] sm:px-8">
        <Image
          src="/images/clubhouse.png"
          alt="Future clubhouse and hospitality experience at The Gallaspy"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#10263F]/68" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/95 via-[#10263F]/70 to-[#10263F]/28" />

        <div className="relative z-10 mx-auto w-full max-w-[1060px] py-20 text-white sm:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              Future Opportunities
            </p>

            <h1 className="mt-5 font-serif text-[3rem] font-light leading-[0.98] text-white sm:text-6xl lg:text-[5rem]">
              Careers at
              <span className="block text-[#FFD76A]">The Gallaspy</span>
            </h1>

            <div className="mt-6 h-px w-16 bg-[#B89146]" />

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              Help shape the culture, service, and traditions of a future private
              golf and lifestyle destination in Metro Atlanta.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#application"
                className="inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Join the Talent Network
              </Link>

              <Link
                href="#career-areas"
                className="inline-flex min-h-[45px] items-center justify-center rounded-full border border-white/60 bg-white/[0.05] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
              >
                Explore Career Areas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Build the Standard
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              A Team Behind
              <span className="block">Every Experience</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />
          </div>

          <div className="border-l border-[#B89146]/35 pl-6 sm:pl-8">
            <p className="text-base leading-8 text-[#1E3557]">
              The Gallaspy Golf &amp; Country Club is currently in the planning
              and development stage. As the project progresses, we expect to
              create opportunities across golf, hospitality, wellness, dining,
              events, grounds management, administration, and member services.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              We are not yet accepting applications for active positions.
              Professionals may submit their information to join our Future
              Talent Network and receive consideration as formal opportunities
              are announced.
            </p>
          </div>
        </div>
      </section>

      <section
        id="career-areas"
        className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 lg:py-20"
      >
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Career Areas
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Opportunities Across the Club
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#1E3557]/80">
              Future hiring needs will evolve alongside the project&apos;s
              development, construction, pre-opening, and operating phases.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {careerAreas.map((area) => (
              <article
                key={area.title}
                className="rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89146]">
                  {area.number}
                </p>

                <h3 className="mt-5 font-serif text-2xl font-light text-[#10263F]">
                  {area.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#B89146]" />

                <p className="mt-4 text-sm leading-7 text-[#1E3557]/80">
                  {area.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#10263F] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Our Culture
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              The Values Behind the Experience
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-[18px] border border-white/12 bg-white/[0.05] p-7"
              >
                <h3 className="font-serif text-2xl font-light text-white">
                  {value.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#B89146]" />

                <p className="mt-4 text-sm leading-7 text-white/72">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="application"
        className="scroll-mt-24 bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20"
      >
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Future Talent Network
            </p>

            <h2 className="mt-4 font-serif text-[2.5rem] font-light text-[#10263F] sm:text-5xl">
              Share Your Professional Interest
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#1E3557]/70">
              Submit your professional information for future consideration.
              This is an expression of interest and not an application for a
              currently open position.
            </p>
          </div>

          <CareerApplicationForm />
        </div>
      </section>

      <section className="bg-[#EEE8DC] px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#B89146]">
            Important Information
          </p>

          <p className="mt-4 text-xs leading-6 text-[#1E3557]/70">
            The Gallaspy Golf &amp; Country Club is currently in development.
            Submission of this form does not create an employment relationship,
            guarantee an interview, or represent an offer of employment. Formal
            positions, qualifications, compensation, and hiring timelines will
            be announced separately as the project advances.
          </p>
        </div>
      </section>
    </main>
  );
}