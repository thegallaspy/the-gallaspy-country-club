import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story | The Gallaspy Golf Club",
  description:
    "The story behind The Gallaspy — a golf community establishing its traditions, relationships, and identity from the very beginning.",
};

const principles = [
  {
    number: "01",
    title: "Tradition",
    description:
      "Traditions become meaningful because people return to them year after year.",
  },
  {
    number: "02",
    title: "Family",
    description:
      "The Gallaspy is intended to become something families can experience, remember, and pass forward.",
  },
  {
    number: "03",
    title: "Excellence",
    description:
      "The standard matters from the first gathering onward, not only after a permanent home exists.",
  },
  {
    number: "04",
    title: "Hospitality",
    description:
      "How people are welcomed, treated, and remembered will always be part of the character of the club.",
  },
  {
    number: "05",
    title: "Stewardship",
    description:
      "What is eventually built should respect its setting and be worthy of the generations that follow.",
  },
  {
    number: "06",
    title: "Legacy",
    description:
      "The ambition is larger than a single season, event, property, or generation.",
  },
];

const traditions = [
  "Opening Drive",
  "Spring Opener",
  "The Gallaspy Invitational",
  "The Mercury Match",
  "Night at the Nest",
];

export default function WhyTheGallaspyPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#10263F]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#10263F] px-5 pb-20 pt-32 text-white sm:px-8 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-44">
        <div className="absolute left-0 top-0 h-full w-px bg-white/10" />
        <div className="absolute right-[12%] top-0 h-full w-px bg-white/[0.05]" />

        <div className="relative mx-auto max-w-[1120px]">
          <p className="text-[9px] font-bold uppercase tracking-[0.38em] text-[#D2AF66]">
            Our Story
          </p>

          <h1 className="mt-7 max-w-5xl font-serif text-[3.6rem] font-light leading-[0.92] sm:text-6xl lg:text-[5.8rem]">
            Every club has
            <span className="block text-[#D2AF66]">a first chapter.</span>
          </h1>

          <div className="mt-9 h-px w-16 bg-[#B89146]" />

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/75 sm:text-lg sm:leading-9">
            The Gallaspy is being established with the belief that the most
            enduring clubs are defined not only by where they play, but by the
            people, traditions, relationships, and memories that give the club
            its meaning.
          </p>

          <p className="mt-10 text-[9px] font-bold uppercase tracking-[0.3em] text-white/45">
            Georgia · Established 2026
          </p>
        </div>
      </section>

      {/* THE BEGINNING */}
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Chapter One
            </p>
            <div className="mt-5 h-px w-12 bg-[#B89146]" />
          </div>

          <div>
            <h2 className="max-w-4xl font-serif text-[2.8rem] font-light leading-[1.02] sm:text-5xl lg:text-[3.7rem]">
              The beginning came
              <span className="block text-[#8B6A34]">
                before the first tee.
              </span>
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[#33475B]/80">
              The Gallaspy began with an ambition to create a golf club capable
              of becoming part of people&apos;s lives — a place associated with
              friendships, competition, family, celebration, and traditions
              worth returning to.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[#33475B]/80">
              But a meaningful club should not have to wait for a building to
              begin becoming itself. Its standards can be established. Its
              people can meet. Its first rounds can be played. Its traditions
              can begin.
            </p>

            <p className="mt-8 max-w-xl font-serif text-2xl font-light leading-relaxed text-[#10263F]">
              So The Gallaspy began at the beginning.
            </p>
          </div>
        </div>
      </section>

      {/* THE NAME */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="max-w-3xl">
            <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Name
            </p>

            <h2 className="mt-6 font-serif text-[2.8rem] font-light leading-[1.02] sm:text-5xl lg:text-[3.7rem]">
              A name intended
              <span className="block text-[#8B6A34]">to outlast its founders.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-10 border-t border-[#10263F]/15 pt-10 lg:grid-cols-2 lg:gap-20">
            <p className="text-base leading-8 text-[#33475B]/80">
              Putting the Gallaspy name on the club means accepting a
              responsibility for what that name comes to represent. The goal is
              not simply recognition. It is to establish something worthy of
              carrying the name for generations.
            </p>

            <p className="text-base leading-8 text-[#33475B]/80">
              Years from now, the meaning of The Gallaspy should come from the
              people who participated, the competitions that were contested,
              the gatherings that became traditions, and the stories that were
              carried forward.
            </p>
          </div>
        </div>
      </section>

      {/* BEFORE THE PROPERTY */}
      <section className="bg-[#163A2F] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#D2AF66]">
              Starting Now
            </p>

            <h2 className="mt-6 max-w-3xl font-serif text-[2.8rem] font-light leading-[1.02] sm:text-5xl lg:text-[3.7rem]">
              The property will give
              <span className="block text-[#D2AF66]">the club a home.</span>
              It does not have to give
              <span className="block text-[#D2AF66]">the club its identity.</span>
            </h2>
          </div>

          <div className="lg:pt-20">
            <p className="text-base leading-8 text-white/75">
              No permanent Gallaspy property has been established. That is an
              important distinction, and one we intend to communicate clearly.
            </p>

            <p className="mt-5 text-base leading-8 text-white/75">
              The long-term ambition remains a permanent private golf and
              country club. The chapter before that home exists is not something
              to erase from the story. It is where the culture, relationships,
              standards, and traditions of The Gallaspy first take shape.
            </p>
          </div>
        </div>
      </section>

      {/* TRAVELING YEARS */}
      <section className="bg-[#F7F4EE] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
                2026 — 20XX
              </p>

              <p className="mt-5 font-serif text-2xl font-light text-[#8B6A34]">
                The Traveling Years
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[2.8rem] font-light leading-[1.02] sm:text-5xl lg:text-[3.7rem]">
                Different courses.
                <span className="block text-[#8B6A34]">
                  One developing history.
                </span>
              </h2>

              <p className="mt-8 max-w-2xl text-base leading-8 text-[#33475B]/80">
                Until The Gallaspy reaches its permanent home, part of its story
                will be written across golf courses throughout Georgia. These
                are The Traveling Years — the period when the community plays
                together, visits different courses, establishes annual
                traditions, and creates the earliest memories of the club.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#33475B]/80">
                One day, when there is a permanent first tee, these years should
                remain part of the history rather than disappear from it.
              </p>

              <Link
                href="/rounds"
                className="mt-8 inline-flex border-b border-[#B89146] pb-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#10263F] transition hover:text-[#8B6A34]"
              >
                The Gallaspy Rounds →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRADITIONS */}
      <section className="bg-[#10263F] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#D2AF66]">
                From the Beginning
              </p>

              <h2 className="mt-6 max-w-2xl font-serif text-[2.8rem] font-light leading-[1.02] sm:text-5xl">
                History does not have
                <span className="block text-[#D2AF66]">
                  to be inherited.
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/72">
                Every longstanding club tradition had a first year. The
                responsibility of this generation is to establish the ones
                future generations may inherit.
              </p>
            </div>

            <div className="border-t border-white/15">
              {traditions.map((tradition, index) => (
                <div
                  key={tradition}
                  className="grid grid-cols-[42px_1fr] items-center border-b border-white/15 py-5"
                >
                  <span className="text-[9px] font-bold tracking-[0.2em] text-[#D2AF66]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="font-serif text-xl font-light sm:text-2xl">
                    {tradition}
                  </span>
                </div>
              ))}

              <Link
                href="/traditions"
                className="mt-8 inline-flex border-b border-[#D2AF66] pb-2 text-[9px] font-bold uppercase tracking-[0.22em] text-white transition hover:text-[#D2AF66]"
              >
                Explore Club Traditions →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="max-w-3xl">
            <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              What Should Endure
            </p>

            <h2 className="mt-6 font-serif text-[2.8rem] font-light leading-[1.02] sm:text-5xl">
              The standards come
              <span className="block text-[#8B6A34]">before the address.</span>
            </h2>
          </div>

          <div className="mt-12 grid border-t border-[#10263F]/15 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="border-b border-[#10263F]/15 py-8 md:px-7 md:first:pl-0 lg:min-h-[230px]"
              >
                <p className="text-[9px] font-bold tracking-[0.22em] text-[#B89146]">
                  {principle.number}
                </p>

                <h3 className="mt-5 font-serif text-3xl font-light">
                  {principle.title}
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-7 text-[#33475B]/70">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PERMANENT HOME */}
      <section className="bg-[#F7F4EE] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Long View
            </p>
          </div>

          <div>
            <h2 className="max-w-4xl font-serif text-[2.8rem] font-light leading-[1.02] sm:text-5xl lg:text-[3.7rem]">
              Someday,
              <span className="block text-[#8B6A34]">
                a permanent first tee.
              </span>
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[#33475B]/80">
              The long-term vision is for The Gallaspy to establish a permanent
              private golf and country club in Georgia — a home worthy of the
              identity and traditions being created now.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[#33475B]/80">
              No property has been represented here as secured, and the final
              form of that future home will be shaped by the property,
              opportunities, partnerships, planning, and decisions still ahead.
            </p>

            <p className="mt-7 max-w-2xl font-serif text-2xl font-light leading-relaxed">
              When that day comes, the club should arrive with something a new
              building cannot manufacture:
              <span className="text-[#8B6A34]"> history.</span>
            </p>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-[#10263F] px-5 py-24 text-white sm:px-8 lg:py-32">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#D2AF66]">
            A Legacy in the Making
          </p>

          <h2 className="mt-7 font-serif text-[3rem] font-light leading-[0.98] sm:text-6xl lg:text-[4.5rem]">
            We are not looking back
            <span className="block text-[#D2AF66]">
              on the history yet.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/72">
            We are living through the part that will become it.
          </p>

          <div className="mx-auto mt-10 h-px w-16 bg-[#B89146]" />

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/journal"
              className="inline-flex min-h-[48px] items-center justify-center bg-[#D2AF66] px-8 text-[9px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:bg-white"
            >
              Follow The Story →
            </Link>

            <Link
              href="/start-here"
              className="inline-flex min-h-[48px] items-center justify-center border border-white/30 px-8 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition hover:border-[#D2AF66] hover:text-[#D2AF66]"
            >
              Start Here
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
