import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClubNavigation } from "@/components/ClubNavigation";

export const metadata: Metadata = {
  title: "Championship Golf | The Gallaspy Golf & Country Club",
  description:
    "Discover the championship golf vision, practice facilities, member programs, and course philosophy of The Gallaspy Golf & Country Club.",
};

const courseHighlights = [
  {
    number: "01",
    title: "18 Championship Holes",
    description:
      "A full-scale championship course envisioned around strategic architecture, natural beauty, memorable holes, and exceptional playing conditions.",
  },
  {
    number: "02",
    title: "Multiple Tee Options",
    description:
      "A range of thoughtfully positioned tees designed to provide an enjoyable and challenging experience for golfers of every ability.",
  },
  {
    number: "03",
    title: "Practice Range",
    description:
      "An expansive practice range designed for warmups, professional instruction, club fitting, player development, and daily improvement.",
  },
  {
    number: "04",
    title: "Short-Game Complex",
    description:
      "Dedicated areas for bunker play, pitching, chipping, recovery shots, and the scoring skills that define complete golfers.",
  },
  {
    number: "05",
    title: "Putting Course",
    description:
      "A distinctive putting experience created for practice, friendly competition, family enjoyment, and relaxed member gatherings.",
  },
  {
    number: "06",
    title: "Walking & Cart Friendly",
    description:
      "A routing intended to support both traditional walking golf and a comfortable cart experience across the property.",
  },
];

const golfPrograms = [
  {
    title: "Member Tournaments",
    description:
      "A year-round calendar of club championships, invitationals, team events, match play, and social competition.",
  },
  {
    title: "Professional Instruction",
    description:
      "Private lessons, clinics, player assessments, practice planning, and individualized development from experienced golf professionals.",
  },
  {
    title: "Junior Golf",
    description:
      "Age-appropriate instruction, camps, competitions, mentorship, and family-focused programming designed to grow the game.",
  },
  {
    title: "Women’s Golf",
    description:
      "Instruction, leagues, tournaments, social events, and welcoming opportunities for players across every experience level.",
  },
  {
    title: "Men’s Golf",
    description:
      "Competitive and social programming including leagues, member events, club championships, and signature tournaments.",
  },
  {
    title: "Family Golf",
    description:
      "Approachable formats, family tee times, clinics, putting events, and shared experiences designed for multiple generations.",
  },
];

const designPrinciples = [
  {
    number: "01",
    title: "Strategic",
    description:
      "Each hole should reward thoughtful decision-making, precise positioning, and confident execution rather than relying only on distance.",
  },
  {
    number: "02",
    title: "Playable",
    description:
      "The course should remain enjoyable for beginners, families, accomplished players, and championship-level competitors.",
  },
  {
    number: "03",
    title: "Natural",
    description:
      "The routing should respond to the land, preserve important natural features, and create a strong sense of place.",
  },
  {
    number: "04",
    title: "Memorable",
    description:
      "Every round should include distinctive views, strategic moments, compelling green complexes, and unforgettable finishing holes.",
  },
];

export default function GolfPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      <ClubNavigation />

      {/* Hero */}
      <section className="relative flex min-h-[82vh] items-center overflow-hidden px-5 sm:px-8">
        <Image
          src="/images/golf.png"
          alt="Championship golf at The Gallaspy Golf and Country Club"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#10263F]/62" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/95 via-[#10263F]/64 to-[#10263F]/20" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#10263F]/45 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1060px] py-24 text-white">
          <div className="max-w-3xl">
            <div className="mb-7 flex flex-wrap items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/65">
              <Link
                href="/"
                className="transition hover:text-[#FFD76A]"
              >
                Home
              </Link>

              <span>/</span>

              <Link
                href="/club"
                className="transition hover:text-[#FFD76A]"
              >
                The Club
              </Link>

              <span>/</span>

              <span className="text-[#FFD76A]">Golf</span>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              Championship Golf
            </p>

            <h1 className="mt-5 font-serif text-[3rem] font-light leading-[0.98] text-white sm:text-6xl lg:text-[5rem]">
              Designed for
              <span className="block text-[#FFD76A]">
                Exceptional Play
              </span>
            </h1>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              At the heart of The Gallaspy is an 18-hole championship golf
              course envisioned to combine strategic design, natural beauty,
              exceptional conditioning, and a member experience worthy of
              becoming a lasting Southern golf tradition.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#course"
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Discover the Course
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

      {/* Course Vision */}
      <section
        id="course"
        className="scroll-mt-40 bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24"
      >
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Course
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              A Course Worth
              <span className="block">Remembering</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              The Gallaspy Championship Course is being envisioned as the
              defining feature of the club and the foundation of the complete
              member experience.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              The goal is to create a course that challenges accomplished
              players while remaining enjoyable, inviting, and playable for
              members of every skill level.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              Strategic fairways, varied teeing grounds, thoughtful green
              complexes, natural landscape features, and memorable finishing
              holes will work together to create a course members will look
              forward to playing throughout their lives.
            </p>
          </div>

          <div className="relative min-h-[450px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/masterplan-render.png"
              alt="Proposed championship golf course master plan"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/70 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
                The Golf Vision
              </p>

              <p className="mt-3 font-serif text-2xl font-light">
                Championship golf shaped by the natural character of the land.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Course Highlights
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Everything the Game Deserves
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#1E3557]/80">
              Every golf component is being considered as part of one complete
              player-development and member experience.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courseHighlights.map((highlight) => (
              <article
                key={highlight.number}
                className="group rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-6 transition hover:-translate-y-1 hover:border-[#B89146]/40 hover:shadow-lg sm:p-7"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89146]">
                  {highlight.number}
                </p>

                <h3 className="mt-5 font-serif text-2xl font-light text-[#10263F]">
                  {highlight.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#B89146] transition-all group-hover:w-16" />

                <p className="mt-4 text-sm leading-7 text-[#1E3557]/80">
                  {highlight.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Statement */}
      <section className="bg-[#10263F] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] overflow-hidden rounded-[22px] border border-white/10 lg:grid-cols-2">
          <div className="relative min-h-[380px] lg:min-h-[560px]">
            <Image
              src="/images/golf.png"
              alt="Private championship golf experience"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/30 to-transparent" />
          </div>

          <div className="flex items-center px-7 py-12 sm:px-10 lg:px-14">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
                The Golf Experience
              </p>

              <blockquote className="mt-6 font-serif text-[2rem] font-light leading-[1.2] text-white sm:text-[2.7rem]">
                “A great course should reveal something new every time it is
                played.”
              </blockquote>

              <div className="mt-7 h-px w-14 bg-[#B89146]" />

              <p className="mt-6 text-sm leading-7 text-white/75">
                The Gallaspy is being planned around a course that can become
                familiar without ever becoming ordinary—one where changing
                conditions, strategic choices, and member traditions make every
                round meaningful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Facilities */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative min-h-[420px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/arrival.png"
              alt="Golf practice and player development facilities"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/65 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
                Practice & Player Development
              </p>

              <p className="mt-3 font-serif text-2xl font-light">
                A place to prepare, improve, compete, and enjoy the game.
              </p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Practice Facilities
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Built for Daily
              <span className="block">Improvement</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              The practice experience will be designed as far more than a place
              to warm up before a round.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              Members will have access to dedicated facilities for full-swing
              development, wedge play, bunker practice, putting, instruction,
              club fitting, and organized player-development programs.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Expansive Driving Range",
                "Target Greens",
                "Short-Game Areas",
                "Practice Bunkers",
                "Putting Greens",
                "Professional Instruction",
              ].map((feature) => (
                <div
                  key={feature}
                  className="rounded-[14px] border border-[#1E3557]/10 bg-white px-4 py-4"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#10263F]">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Golf Programs */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
                Member Golf
              </p>

              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
                A Tradition of
                <span className="block">Competition & Connection</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#1E3557]/75">
              Programming will be created for accomplished competitors,
              developing players, juniors, families, and members who simply
              enjoy the social traditions of golf.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {golfPrograms.map((program, index) => (
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

      {/* Design Philosophy */}
      <section className="bg-[#163A2F] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Course Philosophy
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              Designed With Purpose
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/75">
              The course vision is guided by four principles intended to create
              a golf experience that remains compelling for generations.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {designPrinciples.map((principle) => (
              <article
                key={principle.number}
                className="rounded-[18px] border border-white/15 bg-white/[0.06] p-6"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FFD76A]">
                  {principle.number}
                </p>

                <h3 className="mt-5 font-serif text-2xl font-light text-white">
                  {principle.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#B89146]" />

                <p className="mt-4 text-sm leading-7 text-white/75">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Master Plan Link */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] overflow-hidden rounded-[22px] bg-[#1E3557] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[360px] lg:min-h-[500px]">
            <Image
              src="/images/masterplan-render.png"
              alt="The Gallaspy championship golf course within the master plan"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1E3557]/25" />
          </div>

          <div className="flex items-center px-7 py-12 text-white sm:px-10 lg:px-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
                The Complete Vision
              </p>

              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
                Golf at the Heart
                <span className="block">of the Master Plan</span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-white/75">
                Explore how the championship course connects with the
                clubhouse, practice facilities, wellness district, member
                lodging, vineyard, and residential community.
              </p>

              <Link
                href="/master-plan"
                className="mt-8 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Explore the Master Plan
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
                Beyond the Course
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
                title: "The Grand Clubhouse",
                label: "Next Experience",
                href: "/club/clubhouse",
              },
              {
                title: "Mercury Street Restaurant",
                label: "Dining",
                href: "/club/restaurant",
              },
              {
                title: "Wellness & Spa",
                label: "Wellness",
                href: "/club/wellness",
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
          src="/images/golf.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-[#10263F]/84" />

        <div className="relative z-10 mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
            Championship Golf at The Gallaspy
          </p>

          <h2 className="mt-5 font-serif text-[2.6rem] font-light leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            The Game
            <span className="block text-[#FFD76A]">Begins Here</span>
          </h2>

          <div className="mx-auto mt-7 h-px w-16 bg-[#B89146]" />

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Become part of the founding generation and help begin the golf
            traditions that will define The Gallaspy for decades to come.
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