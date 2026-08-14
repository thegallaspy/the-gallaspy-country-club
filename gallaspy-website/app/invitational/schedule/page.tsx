import Link from "next/link";

const scheduleItems = [
  {
    time: "9:00 AM",
    title: "Player Arrival & Registration",
    description:
      "Check-in, player gifting, practice access, sponsor activations, and pre-round hospitality.",
  },
  {
    time: "10:15 AM",
    title: "Player Welcome",
    description:
      "Opening remarks, tournament instructions, contest information, and final announcements.",
  },
  {
    time: "11:00 AM",
    title: "Shotgun Start",
    description:
      "The inaugural Gallaspy Invitational begins with the full field starting across the course.",
  },
  {
    time: "During Play",
    title: "On-Course Competitions",
    description:
      "Team competition, closest-to-the-pin, longest drive, hole-in-one opportunities, and sponsor activations.",
  },
  {
    time: "After Play",
    title: "Scoring & Hospitality",
    description:
      "Scorecard collection, player hospitality, networking, and preparation for the awards presentation.",
  },
  {
    time: "Closing",
    title: "Awards Presentation",
    description:
      "Recognition of the winning team, contest winners, sponsors, partners, and the inaugural field.",
  },
];

export default function InvitationalSchedulePage() {
  return (
    <main className="min-h-screen bg-[#F5F0E6] text-[#10263F]">
      {/* HERO */}
      <section className="bg-[#10263F] px-6 pb-20 pt-32 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/invitational"
            className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60 transition hover:text-[#FFD76A]"
          >
            ← Back to Invitational
          </Link>

          <p className="mt-12 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A]">
            Tournament Day
          </p>

          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            2027 Invitational
            <span className="block text-[#FFD76A]">Schedule</span>
          </h1>

          <div className="mt-8 h-px w-20 bg-[#B89146]" />

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/70">
            A full day of golf, hospitality, competition, and celebration
            designed around the inaugural Gallaspy Invitational experience.
          </p>
        </div>
      </section>

      {/* DAY OVERVIEW */}
      <section className="border-b border-[#10263F]/10 bg-white px-6 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 md:grid-cols-4">
          <div className="border-b border-r border-[#10263F]/10 px-4 py-8 md:border-b-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Start
            </p>
            <p className="mt-2 font-serif text-xl">11:00 AM</p>
          </div>

          <div className="border-b border-[#10263F]/10 px-4 py-8 md:border-b-0 md:border-r">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Format
            </p>
            <p className="mt-2 font-serif text-xl">4-Person Scramble</p>
          </div>

          <div className="border-r border-[#10263F]/10 px-4 py-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Field
            </p>
            <p className="mt-2 font-serif text-xl">100 Players</p>
          </div>

          <div className="px-4 py-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Venue
            </p>
            <p className="mt-2 font-serif text-xl">To Be Announced</p>
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
                Tournament Timeline
              </p>

              <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
                From arrival to the final award.
              </h2>

              <p className="mt-6 text-sm leading-7 text-[#10263F]/65">
                This is the current working schedule for the inaugural event.
                Final timing may be adjusted based on the host course,
                registration logistics, food service, and tournament operations.
              </p>
            </div>

            <div className="border-t border-[#10263F]/15">
              {scheduleItems.map((item, index) => (
                <article
                  key={`${item.time}-${item.title}`}
                  className="grid gap-4 border-b border-[#10263F]/15 py-7 sm:grid-cols-[130px_1fr]"
                >
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
                      {item.time}
                    </p>

                    <p className="mt-2 font-serif text-lg text-[#10263F]/35">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl">{item.title}</h3>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#10263F]/62">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NOTICE */}
      <section className="bg-[#EFE7D8] px-6 py-16 text-center sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
            Schedule Notice
          </p>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
            Final times will be confirmed with the host venue.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#10263F]/62">
            The schedule shown is a working tournament-day framework and may be
            revised as venue operations, food service, player registration, and
            event logistics are finalized.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#10263F] px-6 py-20 text-center text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
            2027 Gallaspy Invitational
          </p>

          <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
            Join the inaugural field.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/62">
            Player registration information will be released as tournament
            planning and the host-course agreement are finalized.
          </p>

          <Link
            href="/invitational/register"
            className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#B89146] px-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-[#10263F]"
          >
            Join the Priority List
          </Link>
        </div>
      </section>
    </main>
  );
}