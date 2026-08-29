import Link from "next/link";
import {
  events,
  type EventCategory,
  type EventStatus,
} from "@/data/club";

const categoryLabels: Record<EventCategory, string> = {
  GALLASPY_ROUND: "Gallaspy Round",
  SIGNATURE_EVENT: "Signature Event",
  COMPETITION: "Competition",
  SOCIAL: "Social",
  FOUNDING_COMMUNITY: "Founding Community",
};

const statusLabels: Record<EventStatus, string> = {
  DETAILS_COMING_SOON: "Details Coming Soon",
  REGISTRATION_OPENING_SOON: "Registration Opening Soon",
  REGISTRATION_OPEN: "Registration Open",
  WAITLIST: "Waitlist",
  INVITATION_ONLY: "Invitation Only",
  SOLD_OUT: "Sold Out",
  COMPLETED: "Completed",
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function sortEvents() {
  return [...events].sort((a, b) => {
    const aMonth = a.month ?? 1;
    const bMonth = b.month ?? 1;

    const aDay = a.date
      ? Number(a.date.split("-")[2])
      : 1;

    const bDay = b.date
      ? Number(b.date.split("-")[2])
      : 1;

    return (
      a.year - b.year ||
      aMonth - bMonth ||
      aDay - bDay
    );
  });
}

export default function CalendarPage() {
  const sortedEvents = sortEvents();

  const years = Array.from(
    new Set(sortedEvents.map((event) => event.year)),
  );

  return (
    <main className="bg-[#F4F0E7] text-[#10263F]">
      {/* HERO */}
      <section className="border-b border-[#10263F]/10 px-5 pb-14 pt-32 sm:px-8 sm:pb-16 sm:pt-36 lg:px-10 lg:pb-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-[#B89146]" />

            <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#8B6A34] sm:text-[9px]">
              The Digital Clubhouse
            </p>
          </div>

          <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-[3.25rem] font-black uppercase leading-[0.86] tracking-[-0.055em] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem]">
                Club
                <span className="block text-[#0C352D]">
                  Calendar.
                </span>
              </h1>
            </div>

            <div className="max-w-xl lg:pb-2">
              <p className="text-[15px] leading-7 text-[#10263F]/65 sm:text-base sm:leading-8">
                Rounds, competition, gatherings and the traditions
                taking shape at The Gallaspy. This calendar grows as
                club programming is confirmed.
              </p>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[7px] font-black uppercase tracking-[0.2em] text-[#10263F]/45">
                <span>Play</span>
                <span className="text-[#B89146]">·</span>
                <span>Compete</span>
                <span className="text-[#B89146]">·</span>
                <span>Gather</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALENDAR */}
      <section className="px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {years.map((year) => {
            const yearEvents = sortedEvents.filter(
              (event) => event.year === year,
            );

            return (
              <div
                key={year}
                className="mb-20 last:mb-0"
              >
                <div className="flex items-end justify-between border-b border-[#10263F]/20 pb-5">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#8B6A34]">
                      The Gallaspy
                    </p>

                    <h2 className="mt-2 text-[2.7rem] font-black leading-none tracking-[-0.05em] sm:text-[3.5rem]">
                      {year}
                    </h2>
                  </div>

                  <p className="hidden text-[8px] font-bold uppercase tracking-[0.22em] text-[#10263F]/35 sm:block">
                    {yearEvents.length}{" "}
                    {yearEvents.length === 1 ? "Event" : "Events"}
                  </p>
                </div>

                <div>
                  {yearEvents.map((event) => {
                    const month =
                      event.month && monthNames[event.month - 1];

                    const day = event.date
                      ? event.date.split("-")[2]
                      : null;

                    return (
                      <article
                        key={event.id}
                        className="group grid gap-5 border-b border-[#10263F]/10 py-7 transition-colors duration-300 hover:bg-white/35 sm:grid-cols-[105px_1fr_auto] sm:items-center sm:px-4 lg:grid-cols-[135px_1fr_180px]"
                      >
                        {/* DATE */}
                        <div>
                          <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#8B6A34]">
                            {month}
                          </p>

                          {day ? (
                            <p className="mt-1 text-[2rem] font-black leading-none tracking-[-0.05em] text-[#10263F]">
                              {Number(day)}
                            </p>
                          ) : (
                            <p className="mt-2 text-[8px] font-black uppercase tracking-[0.18em] text-[#10263F]/40">
                              Date TBA
                            </p>
                          )}
                        </div>

                        {/* EVENT */}
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-[#0C352D]">
                              {categoryLabels[event.category]}
                            </span>

                            <span className="text-[#B89146]">
                              ·
                            </span>

                            <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-[#10263F]/40">
                              {statusLabels[event.status]}
                            </span>
                          </div>

                          <h3 className="mt-2 text-[1.55rem] font-black uppercase leading-none tracking-[-0.035em] sm:text-[1.75rem]">
                            {event.name}
                          </h3>

                          <p className="mt-3 max-w-2xl text-[13px] leading-6 text-[#10263F]/58">
                            {event.description}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[7px] font-bold uppercase tracking-[0.16em] text-[#10263F]/40">
                            {event.venue?.confirmed &&
                            event.venue.name ? (
                              <span>{event.venue.name}</span>
                            ) : (
                              <span>Location TBA</span>
                            )}

                            {event.format && (
                              <>
                                <span className="text-[#B89146]">
                                  ·
                                </span>
                                <span>{event.format}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="sm:text-right">
                          <Link
                            href={event.href}
                            className="inline-flex min-h-[42px] items-center justify-center border border-[#10263F]/20 px-4 text-[7px] font-black uppercase tracking-[0.2em] text-[#10263F] transition duration-300 hover:border-[#10263F] hover:bg-[#10263F] hover:text-white"
                          >
                            View Event
                            <span className="ml-3">→</span>
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CALENDAR NOTE */}
      <section className="bg-[#0C352D] px-5 py-14 text-white sm:px-8 lg:px-10 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#FFD76A]">
              Club Programming
            </p>

            <h2 className="mt-4 text-[2rem] font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-[2.7rem]">
              The calendar starts here.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
              New rounds and gatherings will be added as details are
              confirmed. No permanent home is required to start
              building the traditions of a club.
            </p>
          </div>

          <Link
            href="/play"
            className="inline-flex min-h-[48px] w-full items-center justify-center border border-[#FFD76A] px-6 text-[8px] font-black uppercase tracking-[0.22em] text-[#FFD76A] transition hover:bg-[#FFD76A] hover:text-[#10263F] sm:w-auto"
          >
            Play With The Gallaspy
            <span className="ml-3">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
