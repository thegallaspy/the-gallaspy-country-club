import Link from "next/link";

const memberEvents = [
  {
    date: "September 26, 2026",
    title: "First Flight",
    type: "Tradition",
    detail: "The beginning of active Gallaspy club programming.",
  },
  {
    date: "October 2026",
    title: "Gallaspy Round",
    type: "Play",
    detail: "Host course and exact date to be announced.",
  },
  {
    date: "November 2026",
    title: "Gallaspy Round",
    type: "Play",
    detail: "Host course and exact date to be announced.",
  },
  {
    date: "March 2027",
    title: "Opening Drive",
    type: "Tradition",
    detail: "Exact date and event details to be announced.",
  },
  {
    date: "June 21, 2027",
    title: "1st Annual Gallaspy Invitational",
    type: "Competition",
    detail: "72-player individual stroke-play championship.",
  },
  {
    date: "September 2027",
    title: "The Mercury Match",
    type: "Competition",
    detail: "Crest vs Falcon. Exact date and host course to be announced.",
  },
  {
    date: "December 2027",
    title: "Night at the Nest",
    type: "Gather",
    detail: "The first Night at the Nest. Exact date to be announced.",
  },
];

export const metadata = {
  title: "Member Calendar | Falcon Society | The Gallaspy",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FalconSocietyMemberCalendarPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#10263F]">
      <section className="bg-[#10263F] px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1120px]">
          <Link
            href="/falcon-society/members/home"
            className="text-[9px] font-bold uppercase tracking-[0.24em] text-white/50 transition hover:text-[#D7B56D]"
          >
            ← Members Room
          </Link>

          <div className="mt-12 max-w-4xl">
            <div className="flex items-center gap-4">
              <span className="h-2.5 w-2.5 bg-[#8C1D2C]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#D7B56D]">
                What&apos;s Ahead
              </p>
            </div>

            <h1 className="mt-6 font-serif text-[3.5rem] font-light leading-[0.94] sm:text-6xl lg:text-[5.5rem]">
              Member
              <span className="block text-[#D7B56D]">Calendar.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              A private view of upcoming Gallaspy rounds, competitions,
              gatherings, and traditions.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1120px]">
          <div className="border-t border-[#10263F]/15">
            {memberEvents.map((event, index) => (
              <article
                key={`${event.title}-${event.date}`}
                className="grid gap-5 border-b border-[#10263F]/15 py-8 md:grid-cols-[180px_150px_1fr] md:items-start md:gap-8"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6A34]">
                  {event.date}
                </p>

                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8C1D2C]">
                  {event.type}
                </p>

                <div>
                  <h2 className="font-serif text-3xl font-light">
                    {event.title}
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#33475B]/70">
                    {event.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 border border-[#10263F]/15 bg-[#EEE8DC] p-6 sm:p-8">
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#8C1D2C]">
              Member Note
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#33475B]/75">
              Dates, host courses, tee times, RSVP windows, and other event
              details will be added as they are confirmed.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#8C1D2C] px-5 py-12 text-white sm:px-8">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/55">
              Falcon Society
            </p>

            <p className="mt-2 font-serif text-2xl font-light">
              The calendar grows with the club.
            </p>
          </div>

          <Link
            href="/falcon-society/members/home"
            className="text-[9px] font-bold uppercase tracking-[0.22em] text-white"
          >
            Return to Members Room →
          </Link>
        </div>
      </section>
    </main>
  );
}
