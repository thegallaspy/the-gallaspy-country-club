import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClubNavigation } from "@/components/ClubNavigation";

export const metadata: Metadata = {
  title: "Wellness & Spa | The Gallaspy Golf & Country Club",
  description:
    "Discover the wellness center, luxury spa, fitness facilities, recovery experiences, resort pool, and personalized programming at The Gallaspy Golf & Country Club.",
};

const wellnessExperiences = [
  {
    number: "01",
    title: "Fitness & Performance",
    description:
      "A refined training environment designed for strength, mobility, cardiovascular health, golf performance, and long-term wellness.",
  },
  {
    number: "02",
    title: "Luxury Spa",
    description:
      "A calming destination for massage, skincare, body treatments, restorative rituals, and personalized wellness experiences.",
  },
  {
    number: "03",
    title: "Recovery Lounge",
    description:
      "A dedicated place for guided recovery, stretching, compression therapy, mobility work, and post-activity restoration.",
  },
  {
    number: "04",
    title: "Sauna & Steam",
    description:
      "Private heat and steam experiences designed to support relaxation, circulation, recovery, and overall well-being.",
  },
  {
    number: "05",
    title: "Cold Plunge",
    description:
      "A modern recovery experience for members seeking contrast therapy, post-training restoration, and renewed energy.",
  },
  {
    number: "06",
    title: "Movement Studios",
    description:
      "Flexible spaces for yoga, Pilates, meditation, mobility classes, small-group training, and mindfulness programming.",
  },
  {
    number: "07",
    title: "Resort Pool",
    description:
      "A sophisticated outdoor setting for swimming, relaxation, family enjoyment, poolside dining, and seasonal social events.",
  },
  {
    number: "08",
    title: "Treatment Suites",
    description:
      "Private, tranquil rooms for massage, facials, body treatments, wellness consultations, and personalized services.",
  },
];

const wellnessPrinciples = [
  {
    title: "Personal",
    description:
      "Programs and services designed around each member’s goals, routines, performance needs, and stage of life.",
  },
  {
    title: "Restorative",
    description:
      "Spaces and experiences that support recovery, stress reduction, balance, and renewed energy.",
  },
  {
    title: "Active",
    description:
      "Fitness, movement, golf performance, racquet conditioning, and everyday activity brought together in one destination.",
  },
  {
    title: "Sustainable",
    description:
      "A long-term approach to health focused on consistency, prevention, mobility, and lasting quality of life.",
  },
];

const programs = [
  {
    title: "Personal Training",
    description:
      "One-on-one coaching built around strength, mobility, conditioning, confidence, and sustainable progress.",
  },
  {
    title: "Golf Performance",
    description:
      "Mobility, stability, rotational strength, recovery, and movement programs developed specifically for golfers.",
  },
  {
    title: "Group Fitness",
    description:
      "A curated schedule of strength, conditioning, low-impact, mobility, and social fitness experiences.",
  },
  {
    title: "Yoga & Pilates",
    description:
      "Mindful movement classes supporting flexibility, posture, balance, breathing, and total-body control.",
  },
  {
    title: "Recovery Services",
    description:
      "Guided stretching, compression therapy, recovery planning, and restorative services after golf, tennis, or training.",
  },
  {
    title: "Wellness Consultations",
    description:
      "Personalized planning that helps members align movement, recovery, stress management, and lifestyle goals.",
  },
];

const poolExperiences = [
  "Resort-style swimming pool",
  "Dedicated relaxation areas",
  "Poolside food and beverage",
  "Family swim programming",
  "Private cabanas",
  "Seasonal social events",
];

export default function WellnessPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      <ClubNavigation />

      {/* Hero */}
      <section className="relative flex min-h-[82vh] items-center overflow-hidden px-5 sm:px-8">
        <Image
          src="/images/wellness.png"
          alt="Wellness and spa experience at The Gallaspy Golf and Country Club"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#10263F]/58" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/95 via-[#10263F]/68 to-[#10263F]/18" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#10263F]/50 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1060px] py-24 text-white">
          <div className="max-w-3xl">
            <div className="mb-7 flex flex-wrap items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/65">
              <Link href="/" className="transition hover:text-[#FFD76A]">
                Home
              </Link>
              <span>/</span>
              <Link href="/club" className="transition hover:text-[#FFD76A]">
                The Club
              </Link>
              <span>/</span>
              <span className="text-[#FFD76A]">Wellness</span>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              Wellness & Spa
            </p>

            <h1 className="mt-5 font-serif text-[3rem] font-light leading-[0.98] text-white sm:text-6xl lg:text-[5rem]">
              Restore Your Body
              <span className="block text-[#FFD76A]">Renew Your Life</span>
            </h1>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              The Gallaspy Wellness Center is envisioned as a complete
              destination for fitness, recovery, restoration, and everyday
              well-being—designed to help members feel stronger, move better,
              and live fully.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#wellness-vision"
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Discover Wellness
              </Link>

              <Link
                href="/membership"
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/55 bg-white/[0.05] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
              >
                Explore Membership
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Vision */}
      <section
        id="wellness-vision"
        className="scroll-mt-40 bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24"
      >
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Wellness Vision
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Wellness as a
              <span className="block">Way of Life</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              Wellness at The Gallaspy is being planned as an essential part of
              the member experience, not an occasional amenity.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              The center will bring together fitness, spa, recovery, movement,
              mindfulness, and poolside relaxation within one thoughtfully
              designed environment.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              Whether preparing for a round, recovering after tennis, meeting a
              trainer, enjoying a treatment, or spending a quiet afternoon by
              the pool, members will have access to experiences that support
              both performance and balance.
            </p>
          </div>

          <div className="relative min-h-[460px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/wellness.png"
              alt="Luxury wellness and spa facilities at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/72 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
                Total Well-Being
              </p>
              <p className="mt-3 max-w-lg font-serif text-2xl font-light">
                A complete member destination for strength, recovery, balance,
                and renewal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Experiences */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Wellness Experiences
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Everything You Need to Feel Your Best
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#1E3557]/80">
              Every space is being designed to support a different dimension of
              member health, performance, restoration, and relaxation.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {wellnessExperiences.map((experience) => (
              <article
                key={experience.number}
                className="group rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-6 transition hover:-translate-y-1 hover:border-[#B89146]/45 hover:shadow-lg"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89146]">
                  {experience.number}
                </p>

                <h3 className="mt-5 font-serif text-2xl font-light text-[#10263F]">
                  {experience.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#B89146] transition-all group-hover:w-16" />

                <p className="mt-4 text-sm leading-7 text-[#1E3557]/80">
                  {experience.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Feature */}
      <section className="bg-[#10263F] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] overflow-hidden rounded-[22px] border border-white/10 lg:grid-cols-2">
          <div className="relative min-h-[420px] lg:min-h-[600px]">
            <Image
              src="/images/wellness.png"
              alt="Restorative wellness experience at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/35 to-transparent" />
          </div>

          <div className="flex items-center px-7 py-12 sm:px-10 lg:px-14">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
                The Member Experience
              </p>

              <blockquote className="mt-6 font-serif text-[2rem] font-light leading-[1.2] text-white sm:text-[2.7rem]">
                “True luxury is having the time, space, and support to take care
                of yourself.”
              </blockquote>

              <div className="mt-7 h-px w-14 bg-[#B89146]" />

              <p className="mt-6 text-sm leading-7 text-white/75">
                The Wellness Center will give members a place to move with
                purpose, recover intelligently, slow down, and return to the
                rest of club life feeling renewed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Philosophy */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="relative min-h-[440px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/pool.png"
              alt="Resort pool and wellness setting at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/65 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
                Mind, Body & Lifestyle
              </p>

              <p className="mt-3 max-w-lg font-serif text-2xl font-light">
                Wellness designed to support active days, quiet moments, and a
                healthier life.
              </p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Wellness Philosophy
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Personal, Restorative,
              <span className="block">and Sustainable</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              The wellness program will focus on helping members build routines
              that support both immediate results and long-term quality of life.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {wellnessPrinciples.map((principle) => (
                <div
                  key={principle.title}
                  className="rounded-[14px] border border-[#1E3557]/10 bg-white p-5"
                >
                  <h3 className="font-serif text-xl font-light text-[#10263F]">
                    {principle.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#1E3557]/75">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
                Wellness Programming
              </p>

              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
                Support for Every
                <span className="block">Wellness Goal</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#1E3557]/75">
              Members will have access to expert guidance, small-group
              experiences, and personalized programs across fitness, movement,
              recovery, and lifestyle wellness.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <article
                key={program.title}
                className="rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-7"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89146]">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-5 font-serif text-2xl font-light text-[#10263F]">
                  {program.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#B89146]" />

                <p className="mt-4 text-sm leading-7 text-[#1E3557]/80">
                  {program.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Resort Pool */}
      <section className="bg-[#163A2F] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Resort Pool
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              Relaxation,
              <span className="block">Recreation & Connection</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-white/88">
              The resort pool will extend the wellness experience outdoors,
              offering a destination for swimming, family time, relaxation, and
              warm-weather social life.
            </p>

            <p className="mt-5 text-sm leading-7 text-white/72">
              Comfortable seating, shaded areas, poolside hospitality, and
              thoughtfully designed gathering spaces will allow the pool to
              serve both active and relaxed member experiences.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {poolExperiences.map((experience) => (
                <div
                  key={experience}
                  className="rounded-[14px] border border-white/15 bg-white/[0.06] px-4 py-4"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                    {experience}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[440px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/pool.png"
              alt="Resort-style pool at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/55 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Racquet Connection */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] overflow-hidden rounded-[22px] bg-[#1E3557] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[360px] lg:min-h-[500px]">
            <Image
              src="/images/racquet.png"
              alt="Racquet sports and wellness at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1E3557]/30" />
          </div>

          <div className="flex items-center px-7 py-12 text-white sm:px-10 lg:px-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
                Active Lifestyle
              </p>

              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
                Connected to
                <span className="block">Racquet & Recreation</span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-white/75">
                The Wellness Center will work in harmony with tennis,
                pickleball, golf, and recreation—supporting performance,
                conditioning, recovery, and an active member lifestyle.
              </p>

              <Link
                href="/club/racquet"
                className="mt-8 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Explore Racquet Sports
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Exploring */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
                Continue Exploring
              </p>

              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
                Beyond Wellness
              </h2>
            </div>

            <Link
              href="/club"
              className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#10263F] transition hover:text-[#B89146]"
            >
              View All Experiences →
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Racquet Sports",
                label: "Next Experience",
                href: "/club/racquet",
              },
              {
                title: "Member Lodging",
                label: "Stay",
                href: "/club/lodging",
              },
              {
                title: "Mercury Street Restaurant",
                label: "Dining",
                href: "/club/restaurant",
              },
            ].map((experience) => (
              <Link
                key={experience.href}
                href={experience.href}
                className="group rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-7 transition hover:-translate-y-1 hover:border-[#B89146]/45 hover:shadow-lg"
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#B89146]">
                  {experience.label}
                </p>

                <div className="mt-5 flex items-end justify-between gap-4">
                  <h3 className="font-serif text-2xl font-light text-[#10263F]">
                    {experience.title}
                  </h3>

                  <span className="text-xl text-[#B89146] transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#10263F] px-5 py-20 text-white sm:px-8 lg:py-28">
        <Image
          src="/images/wellness.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-[#10263F]/86" />

        <div className="relative z-10 mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
            Wellness at The Gallaspy
          </p>

          <h2 className="mt-5 font-serif text-[2.6rem] font-light leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Feel Stronger
            <span className="block text-[#FFD76A]">Live Better</span>
          </h2>

          <div className="mx-auto mt-7 h-px w-16 bg-[#B89146]" />

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Become part of the founding generation and help shape a wellness
            experience designed around health, balance, performance, and a
            better way of living.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/founding-250#registration"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Join the Founding 250
            </Link>

            <Link
              href="/membership"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/45 px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              View Membership
            </Link>

            <Link
              href="/club"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/45 px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              Explore the Club
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}