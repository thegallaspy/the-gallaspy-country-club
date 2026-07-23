import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClubNavigation } from "@/components/ClubNavigation";

export const metadata: Metadata = {
  title: "Racquet Club | The Gallaspy Golf & Country Club",
  description:
    "Discover tennis, pickleball, professional instruction, junior development, leagues, tournaments, and social play at The Gallaspy Racquet Club.",
};

const racquetExperiences = [
  {
    number: "01",
    title: "Championship Tennis",
    description:
      "Beautifully designed courts for competitive play, private matches, instruction, club championships, and member tournaments.",
  },
  {
    number: "02",
    title: "Pickleball",
    description:
      "Dedicated courts for fast-paced social play, organized leagues, beginner clinics, and competitive events.",
  },
  {
    number: "03",
    title: "Professional Instruction",
    description:
      "Private lessons, small-group coaching, match strategy, stroke development, and personalized improvement plans.",
  },
  {
    number: "04",
    title: "Junior Development",
    description:
      "Age-appropriate programming that introduces young players to fundamentals, confidence, sportsmanship, and competition.",
  },
  {
    number: "05",
    title: "Member Leagues",
    description:
      "Organized league play for multiple skill levels, including singles, doubles, mixed doubles, and seasonal formats.",
  },
  {
    number: "06",
    title: "Club Tournaments",
    description:
      "Signature tournaments, championships, ladders, round robins, and special events throughout the year.",
  },
  {
    number: "07",
    title: "Social Play",
    description:
      "Casual mixers, themed events, evening play, family programming, and welcoming opportunities to meet fellow members.",
  },
  {
    number: "08",
    title: "Racquet Lounge",
    description:
      "A comfortable member setting for refreshments, post-match conversation, equipment support, and social gatherings.",
  },
];

const programPrinciples = [
  {
    title: "Inclusive",
    description:
      "Programming for beginners, experienced players, families, juniors, and competitive athletes.",
  },
  {
    title: "Social",
    description:
      "A club culture designed to make meeting partners, joining leagues, and participating in events easy.",
  },
  {
    title: "Progressive",
    description:
      "Instruction and programming that help members build confidence, improve technique, and stay engaged.",
  },
  {
    title: "Competitive",
    description:
      "Structured opportunities for league play, tournaments, championships, and high-level development.",
  },
];

const programs = [
  {
    title: "Private Lessons",
    description:
      "One-on-one coaching tailored to technical improvement, match strategy, movement, and individual goals.",
  },
  {
    title: "Group Clinics",
    description:
      "Skill-based sessions for different levels, from introductory fundamentals to advanced doubles strategy.",
  },
  {
    title: "Junior Academy",
    description:
      "A structured pathway for young players to learn, develop, compete, and build a lifelong love for racquet sports.",
  },
  {
    title: "Adult Leagues",
    description:
      "Organized singles, doubles, and mixed leagues that create consistent play and friendly competition.",
  },
  {
    title: "Cardio Racquet",
    description:
      "High-energy sessions combining movement, drills, music, and point play for a social fitness experience.",
  },
  {
    title: "Tournament Preparation",
    description:
      "Focused coaching for members preparing for club championships, league competition, and regional events.",
  },
];

const socialCalendar = [
  "Opening Day Exhibition",
  "Member-Guest Tournament",
  "Friday Night Pickleball",
  "Mixed Doubles Socials",
  "Junior Family Days",
  "Club Championships",
];

export default function RacquetPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      <ClubNavigation />

      {/* Hero */}
      <section className="relative flex min-h-[82vh] items-center overflow-hidden px-5 sm:px-8">
        <Image
          src="/images/racquet.png"
          alt="Tennis and pickleball at The Gallaspy Golf and Country Club"
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
              <span className="text-[#FFD76A]">Racquet</span>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              The Racquet Club
            </p>

            <h1 className="mt-5 font-serif text-[3rem] font-light leading-[0.98] text-white sm:text-6xl lg:text-[5rem]">
              Play With Purpose
              <span className="block text-[#FFD76A]">Connect Through Sport</span>
            </h1>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              The Gallaspy Racquet Club is envisioned as a vibrant destination
              for tennis, pickleball, instruction, competition, and social
              connection—welcoming players of every age and skill level.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#racquet-vision"
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Discover the Racquet Club
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

      {/* Vision */}
      <section
        id="racquet-vision"
        className="scroll-mt-40 bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24"
      >
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Racquet Vision
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Competition, Community,
              <span className="block">and Everyday Play</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              The Racquet Club will bring together the energy of competition
              and the ease of social recreation.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              Members will be able to enjoy tennis and pickleball through
              private play, lessons, leagues, tournaments, junior programming,
              and organized social events.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              The goal is to create a welcoming culture where experienced
              players can compete at a high level while new players feel
              comfortable learning, participating, and becoming part of the
              community.
            </p>
          </div>

          <div className="relative min-h-[460px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/racquet.png"
              alt="The Gallaspy Racquet Club experience"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/72 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
                Active Club Life
              </p>
              <p className="mt-3 max-w-lg font-serif text-2xl font-light">
                A place to improve, compete, socialize, and stay connected
                through sport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Racquet Experiences
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Designed for Every Player
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#1E3557]/80">
              The program is being designed to support competitive athletes,
              social players, beginners, juniors, families, and lifelong
              enthusiasts.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {racquetExperiences.map((experience) => (
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
              src="/images/racquet.png"
              alt="Members playing racquet sports at The Gallaspy"
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
                “Racquet sports create the perfect balance of competition,
                wellness, friendship, and fun.”
              </blockquote>

              <div className="mt-7 h-px w-14 bg-[#B89146]" />

              <p className="mt-6 text-sm leading-7 text-white/75">
                The Racquet Club will be one of the most social and active
                areas of the property—creating frequent opportunities for
                members to gather, play, improve, and build relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Philosophy */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="relative min-h-[440px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/tennis.png"
              alt="Tennis courts at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/65 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
                A Complete Racquet Program
              </p>

              <p className="mt-3 max-w-lg font-serif text-2xl font-light">
                Welcoming enough for beginners and strong enough for serious
                competition.
              </p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Program Philosophy
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Inclusive, Social,
              <span className="block">and Competitive</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              The racquet program will be built around access, progression, and
              a strong sense of community.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {programPrinciples.map((principle) => (
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

      {/* Programming */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
                Instruction & Programming
              </p>

              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
                A Path for Every
                <span className="block">Level of Play</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#1E3557]/75">
              Professional instruction, structured leagues, junior development,
              and social programming will help members stay active and engaged.
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

      {/* Social Calendar */}
      <section className="bg-[#163A2F] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Racquet Social Calendar
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              Competition That
              <span className="block">Builds Community</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-white/88">
              A full calendar of events will give members regular opportunities
              to compete, connect, and enjoy the racquet community.
            </p>

            <p className="mt-5 text-sm leading-7 text-white/72">
              Signature tournaments, weekly socials, family programs, and
              member-guest experiences will help make the Racquet Club one of
              the most dynamic areas of the property.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {socialCalendar.map((event) => (
                <div
                  key={event}
                  className="rounded-[14px] border border-white/15 bg-white/[0.06] px-4 py-4"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                    {event}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[440px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/pickleball.png"
              alt="Pickleball and social play at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/55 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Wellness Connection */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] overflow-hidden rounded-[22px] bg-[#1E3557] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[360px] lg:min-h-[500px]">
            <Image
              src="/images/wellness.png"
              alt="Wellness and racquet connection at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1E3557]/30" />
          </div>

          <div className="flex items-center px-7 py-12 text-white sm:px-10 lg:px-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
                Performance & Recovery
              </p>

              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
                Connected to
                <span className="block">Wellness & Fitness</span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-white/75">
                Racquet programming will work alongside the Wellness Center to
                support conditioning, mobility, injury prevention, recovery,
                and long-term performance.
              </p>

              <Link
                href="/club/wellness"
                className="mt-8 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Explore Wellness
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
                Beyond the Courts
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
                title: "Vineyard & Winery",
                label: "Next Experience",
                href: "/club/vineyard",
              },
              {
                title: "Wellness & Spa",
                label: "Recovery",
                href: "/club/wellness",
              },
              {
                title: "Private Events",
                label: "Gather",
                href: "/club/events",
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
          src="/images/racquet.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-[#10263F]/86" />

        <div className="relative z-10 mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
            The Gallaspy Racquet Club
          </p>

          <h2 className="mt-5 font-serif text-[2.6rem] font-light leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Find Your Game
            <span className="block text-[#FFD76A]">Find Your Community</span>
          </h2>

          <div className="mx-auto mt-7 h-px w-16 bg-[#B89146]" />

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Become part of the founding generation and help shape a racquet
            culture built around competition, wellness, friendship, and
            memorable club traditions.
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
