import Link from "next/link";
import {
  getEventsByCategory,
  type GallaspyEvent,
} from "@/data/club";

function statusLabel(status: GallaspyEvent["status"]) {
  const labels: Record<GallaspyEvent["status"], string> = {
    DETAILS_COMING_SOON: "Details Coming Soon",
    REGISTRATION_OPENING_SOON: "Registration Opening Soon",
    REGISTRATION_OPEN: "Registration Open",
    WAITLIST: "Waitlist",
    INVITATION_ONLY: "Invitation Only",
    SOLD_OUT: "Sold Out",
    COMPLETED: "Completed",
  };

  return labels[status];
}

export default function RoundsPage() {
  const rounds = getEventsByCategory("GALLASPY_ROUND");

  const upcomingRounds = rounds.filter(
    (event) => event.status !== "COMPLETED",
  );

  const completedRounds = rounds.filter(
    (event) => event.status === "COMPLETED",
  );

  const nextRound = upcomingRounds[0] ?? null;

  return (
    <main className="bg-[#F4F0E7] text-[#10263F]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#10263F] px-5 pb-16 pt-36 text-white sm:px-8 sm:pb-20 sm:pt-40 lg:px-10 lg:pb-24 lg:pt-44">
        <div className="absolute right-[-3rem] top-16 text-[10rem] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.025] sm:text-[16rem] lg:text-[21rem]">
          ROUNDS
        </div>

        <div className="absolute inset-y-0 right-0 hidden w-[30%] bg-[#0C352D] lg:block" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-[#B89146]" />

            <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
              Gallaspy Rounds
            </p>
          </div>

          <h1 className="mt-8 max-w-[1050px] text-[3.7rem] font-black uppercase leading-[0.82] tracking-[-0.065em] sm:text-[5.3rem] md:text-[6.6rem] lg:text-[7.6rem]">
            Different Courses.
            <span className="block text-[#FFD76A]">
              One Club.
            </span>
          </h1>

          <p className="mt-8 max-w-[690px] text-sm leading-7 text-white/62 sm:text-base sm:leading-8">
            Gallaspy Rounds are recurring opportunities for the
            community to play together at selected golf courses while
            the club builds its traditions, relationships and history.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#upcoming-round"
              className="inline-flex min-h-[50px] items-center justify-center bg-[#FFD76A] px-7 text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F] transition hover:bg-white"
            >
              View Next Round →
            </Link>

            <Link
              href="/calendar"
              className="inline-flex min-h-[50px] items-center justify-center border border-white/35 px-7 text-[8px] font-black uppercase tracking-[0.22em] text-white transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              Club Calendar
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-b border-[#10263F]/10 px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#8B6A34]">
              A Club Without Walls. For Now.
            </p>

            <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[3.8rem]">
              The Round
              <span className="block text-[#0C352D]">
                Is The Meeting Place.
              </span>
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="border-l-2 border-[#B89146] pl-6">
              <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#8B6A34]">
                Community Golf
              </p>

              <p className="mt-4 text-sm leading-7 text-[#10263F]/60">
                Not every Gallaspy Round is a tournament. Some are
                simply opportunities to meet, play and spend time on
                the course together.
              </p>
            </div>

            <div className="border-l-2 border-[#0C352D] pl-6">
              <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#0C352D]">
                A Growing History
              </p>

              <p className="mt-4 text-sm leading-7 text-[#10263F]/60">
                Each completed Round can eventually become part of the
                permanent Gallaspy archive with its venue, photography,
                participants and results when applicable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING ROUND */}
      <section
        id="upcoming-round"
        className="bg-[#0C352D] px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-10 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#FFD76A]">
                Upcoming Round
              </p>

              <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[3.8rem]">
                Tee It Up
                <span className="block text-[#FFD76A]">
                  With Us.
                </span>
              </h2>
            </div>

            {nextRound ? (
              <article className="border border-white/15 bg-[#10263F]/40">
                <div className="border-b border-white/10 px-6 py-4 sm:px-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[7px] font-black uppercase tracking-[0.24em] text-[#FFD76A]">
                      {nextRound.dateLabel}
                    </p>

                    <p className="text-[7px] font-black uppercase tracking-[0.2em] text-white/45">
                      {statusLabel(nextRound.status)}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-[2rem] font-black uppercase leading-none tracking-[-0.045em] sm:text-[2.8rem]">
                    {nextRound.name}
                  </h3>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-white/58">
                    {nextRound.description}
                  </p>

                  <div className="mt-8 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
                    <div className="bg-[#0C352D] p-5">
                      <p className="text-[7px] font-black uppercase tracking-[0.22em] text-[#FFD76A]">
                        Host Course
                      </p>

                      <p className="mt-3 text-sm font-bold text-white">
                        {nextRound.venue?.confirmed &&
                        nextRound.venue.name
                          ? nextRound.venue.name
                          : "TBA"}
                      </p>
                    </div>

                    <div className="bg-[#0C352D] p-5">
                      <p className="text-[7px] font-black uppercase tracking-[0.22em] text-[#FFD76A]">
                        Format
                      </p>

                      <p className="mt-3 text-sm font-bold text-white">
                        {nextRound.format ?? "Details Coming Soon"}
                      </p>
                    </div>

                    <div className="bg-[#0C352D] p-5">
                      <p className="text-[7px] font-black uppercase tracking-[0.22em] text-[#FFD76A]">
                        Availability
                      </p>

                      <p className="mt-3 text-sm font-bold text-white">
                        {typeof nextRound.positionsRemaining === "number"
                          ? `${nextRound.positionsRemaining} Positions`
                          : "Details Coming Soon"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    {nextRound.registrationHref ? (
                      <Link
                        href={nextRound.registrationHref}
                        className="inline-flex min-h-[48px] items-center justify-center bg-[#FFD76A] px-6 text-[8px] font-black uppercase tracking-[0.2em] text-[#10263F] transition hover:bg-white"
                      >
                        Register For Round →
                      </Link>
                    ) : (
                      <Link
                        href="/contact"
                        className="inline-flex min-h-[48px] items-center justify-center bg-[#FFD76A] px-6 text-[8px] font-black uppercase tracking-[0.2em] text-[#10263F] transition hover:bg-white"
                      >
                        Request Round Information →
                      </Link>
                    )}

                    {nextRound.guestPolicy?.allowed && (
                      <Link
                        href={nextRound.registrationHref ?? "/contact"}
                        className="inline-flex min-h-[48px] items-center justify-center border border-white/25 px-6 text-[8px] font-black uppercase tracking-[0.2em] text-white transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
                      >
                        Invite A Player
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ) : (
              <div className="border border-white/15 p-8">
                <p className="text-sm leading-7 text-white/55">
                  The next Gallaspy Round will appear here once details
                  are confirmed.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* UPCOMING ROUNDS */}
      <section className="px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 border-b border-[#10263F]/15 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#8B6A34]">
                Club Programming
              </p>

              <h2 className="mt-4 text-[2.7rem] font-black uppercase leading-none tracking-[-0.05em] sm:text-[3.4rem]">
                Upcoming Rounds.
              </h2>
            </div>

            <Link
              href="/calendar"
              className="text-[8px] font-black uppercase tracking-[0.2em] text-[#0C352D]"
            >
              Full Club Calendar →
            </Link>
          </div>

          <div>
            {upcomingRounds.length > 0 ? (
              upcomingRounds.map((round, index) => (
                <article
                  key={round.id}
                  className="grid gap-5 border-b border-[#10263F]/10 py-7 sm:grid-cols-[150px_1fr_auto] sm:items-center"
                >
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#8B6A34]">
                      {round.dateLabel}
                    </p>
                  </div>

                  <div>
                    <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-[#10263F]/40">
                      {index === 0 ? "Next Round" : "Gallaspy Round"}
                    </p>

                    <h3 className="mt-2 text-[1.5rem] font-black uppercase tracking-[-0.035em]">
                      {round.name}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[7px] font-bold uppercase tracking-[0.17em] text-[#10263F]/40">
                      <span>
                        {round.venue?.confirmed && round.venue.name
                          ? round.venue.name
                          : "Host Course TBA"}
                      </span>

                      <span className="text-[#B89146]">·</span>

                      <span>{statusLabel(round.status)}</span>
                    </div>
                  </div>

                  {round.registrationHref &&
                  round.status === "REGISTRATION_OPEN" ? (
                    <Link
                      href={round.registrationHref}
                      className="inline-flex min-h-[42px] items-center justify-center bg-[#0C352D] px-5 text-[7px] font-black uppercase tracking-[0.2em] text-white transition hover:bg-[#10263F]"
                    >
                      Register →
                    </Link>
                  ) : (
                    <Link
                      href={round.href}
                      className="inline-flex min-h-[42px] items-center justify-center border border-[#10263F]/20 px-5 text-[7px] font-black uppercase tracking-[0.2em] transition hover:bg-[#10263F] hover:text-white"
                    >
                      View Round →
                    </Link>
                  )}
                </article>
              ))
            ) : (
              <p className="py-8 text-sm leading-7 text-[#10263F]/55">
                Additional Gallaspy Rounds will be added as club
                programming is confirmed.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* PREVIOUS ROUNDS */}
      {completedRounds.length > 0 && (
        <section className="border-t border-[#10263F]/10 bg-[#F8F5EE] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#8B6A34]">
              The Archive
            </p>

            <h2 className="mt-4 text-[2.7rem] font-black uppercase leading-none tracking-[-0.05em] sm:text-[3.4rem]">
              Previous Rounds.
            </h2>

            <div className="mt-8 border-t border-[#10263F]/15">
              {completedRounds.map((round) => (
                <Link
                  key={round.id}
                  href={round.href}
                  className="group grid gap-4 border-b border-[#10263F]/10 py-6 sm:grid-cols-[150px_1fr_auto] sm:items-center"
                >
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#8B6A34]">
                    {round.dateLabel}
                  </p>

                  <div>
                    <h3 className="text-[1.4rem] font-black uppercase tracking-[-0.035em]">
                      {round.name}
                    </h3>

                    <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.17em] text-[#10263F]/40">
                      {round.venue?.confirmed && round.venue.name
                        ? round.venue.name
                        : "Venue"}
                    </p>
                  </div>

                  <span className="text-[#8B6A34] transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FUTURE HISTORY */}
      <section className="border-t border-[#10263F]/10 px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#8B6A34]">
              Where We&apos;ve Played
            </p>

            <h2 className="mt-4 max-w-[780px] text-[2.5rem] font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-[3.2rem]">
              Every Round Adds
              <span className="text-[#0C352D]">
                {" "}To The Story.
              </span>
            </h2>
          </div>

          <div>
            <p className="text-sm leading-7 text-[#10263F]/55">
              As Gallaspy Rounds are completed, their courses,
              photography and results will become part of the club&apos;s
              permanent historical record.
            </p>

            <p className="mt-5 text-[7px] font-black uppercase tracking-[0.2em] text-[#8B6A34]">
              The archive begins with the rounds we actually play.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
