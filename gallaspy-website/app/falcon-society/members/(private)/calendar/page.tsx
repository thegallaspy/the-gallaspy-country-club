import Link from "next/link";
import { events, type GallaspyEvent } from "@/data/club";

export const metadata = {
  title: "Member Calendar | Falcon Society | The Gallaspy",
  robots: {
    index: false,
    follow: false,
  },
};

function eventType(event: GallaspyEvent) {
  switch (event.category) {
    case "GALLASPY_ROUND":
      return "Play";
    case "COMPETITION":
      return "Competition";
    case "SOCIAL":
      return "Gather";
    case "SIGNATURE_EVENT":
      return "Tradition";
    case "FOUNDING_COMMUNITY":
      return "Community";
    default:
      return "The Gallaspy";
  }
}

function eventDetail(event: GallaspyEvent) {
  if (event.id === "opening-drive-2026") {
    return "The official beginning of Gallaspy club programming.";
  }

  if (event.id === "gallaspy-invitational-2027") {
    return "72-player individual stroke-play championship.";
  }

  if (event.id === "mercury-match-2027") {
    return "Crest vs Falcon. Eight singles matches. One team champion.";
  }

  if (event.id === "night-at-the-nest-2027") {
    return "The first Night at the Nest.";
  }

  return event.description;
}

export default function FalconSocietyMemberCalendarPage() {
  const memberEvents = [...events]
    .filter((event) => Boolean(event.date))
    .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));

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
              <span className="block text-[#D7B56D]">
                Calendar.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              The official Gallaspy calendar — rounds, competitions,
              gatherings and traditions as the founding years unfold.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1120px]">
          <div className="border-t border-[#10263F]/15">
            {memberEvents.map((event) => {
              const isOpenRound =
                event.category === "GALLASPY_ROUND" &&
                event.status === "REGISTRATION_OPEN" &&
                Boolean(event.registrationHref);

              return (
                <article
                  key={event.id}
                  className="grid gap-5 border-b border-[#10263F]/15 py-8 md:grid-cols-[180px_150px_1fr_auto] md:items-start md:gap-8"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6A34]">
                    {event.dateLabel}
                  </p>

                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8C1D2C]">
                    {eventType(event)}
                  </p>

                  <div>
                    <h2 className="font-serif text-3xl font-light">
                      {event.name}
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#33475B]/70">
                      {eventDetail(event)}
                    </p>

                    {event.venue && (
                      <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.18em] text-[#10263F]/40">
                        {event.venue.confirmed && event.venue.name
                          ? event.venue.name
                          : "Host Course TBA"}
                      </p>
                    )}
                  </div>

                  <div>
                    {isOpenRound ? (
                      <Link
                        href={event.registrationHref!}
                        className="inline-flex min-h-[42px] items-center justify-center bg-[#8C1D2C] px-5 text-[8px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#10263F]"
                      >
                        Register →
                      </Link>
                    ) : (
                      <Link
                        href={event.href}
                        className="inline-flex min-h-[42px] items-center justify-center border border-[#10263F]/20 px-5 text-[8px] font-bold uppercase tracking-[0.2em] transition hover:bg-[#10263F] hover:text-white"
                      >
                        View Event →
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 border border-[#10263F]/15 bg-[#EEE8DC] p-6 sm:p-8">
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#8C1D2C]">
              Member Note
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#33475B]/75">
              Official dates are published here as part of the club
              calendar. Host courses, tee times and additional event
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
