import Link from "next/link";
import {
  getUpcomingEvents,
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

export default function PlayPage() {
  const upcoming = getUpcomingEvents(3);

  const nextRound =
    getEventsByCategory("GALLASPY_ROUND").find(
      (event) => event.status !== "COMPLETED",
    ) ?? null;

  return (
    <main className="bg-[#F4F0E7] text-[#10263F]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#10263F] px-5 pb-16 pt-36 text-white sm:px-8 sm:pb-20 sm:pt-40 lg:px-10 lg:pb-24 lg:pt-44">
        <div className="absolute right-[-4rem] top-20 text-[15rem] font-black leading-none tracking-[-0.1em] text-white/[0.025] sm:text-[22rem]">
          PLAY
        </div>

        <div className="absolute inset-y-0 right-0 hidden w-[32%] bg-[#0C352D] lg:block" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-[#B89146]" />

            <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
              Play With The Gallaspy
            </p>
          </div>

          <h1 className="mt-8 max-w-[1000px] text-[4rem] font-black uppercase leading-[0.82] tracking-[-0.07em] sm:text-[5.5rem] md:text-[6.8rem] lg:text-[8rem]">
            Show Up.
            <span className="block text-[#FFD76A]">Tee It Up.</span>
          </h1>

          <p className="mt-8 max-w-[650px] text-sm leading-7 text-white/65 sm:text-base">
            The Gallaspy is being built through rounds, competition,
            gatherings and the golfers who continue showing up to play.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/rounds"
              className="inline-flex min-h-[50px] items-center justify-center bg-[#FFD76A] px-7 text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F] transition hover:bg-white"
            >
              Explore Gallaspy Rounds →
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

      {/* HOW WE PLAY */}
      <section className="border-b border-[#10263F]/10 px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#8B6A34]">
                Gallaspy Rounds
              </p>

              <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[3.8rem]">
                Different Courses.
                <span className="block text-[#0C352D]">
                  One Club.
                </span>
              </h2>
            </div>

            <div className="border-l-4 border-[#0C352D] bg-white/45 px-6 py-7 sm:px-8 sm:py-8">
              <p className="max-w-[650px] text-base leading-8 text-[#10263F]/70">
                Gallaspy Rounds bring the community together at selected
                courses throughout the region. Each date is another chance
                to play, meet other golfers, and be part of the club as its
                traditions take shape.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/rounds/register"
                  className="inline-flex min-h-[48px] items-center justify-center bg-[#10263F] px-7 text-[8px] font-black uppercase tracking-[0.22em] text-white transition hover:bg-[#0C352D]"
                >
                  Register For A Round →
                </Link>

                <Link
                  href="/rounds"
                  className="inline-flex min-h-[48px] items-center justify-center border border-[#10263F]/25 px-7 text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F] transition hover:border-[#10263F]"
                >
                  Explore Gallaspy Rounds
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEXT GALLASPY ROUND */}
      <section className="bg-[#0C352D] px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#FFD76A]">
                Gallaspy Rounds
              </p>

              <h2 className="mt-5 text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[3.8rem]">
                The Next
                <span className="block text-[#FFD76A]">
                  Round.
                </span>
              </h2>

              <p className="mt-6 max-w-[430px] text-sm leading-7 text-white/58">
                Regular opportunities for the Gallaspy community to
                meet, play and experience different courses together.
              </p>
            </div>

            {nextRound ? (
              <div className="border border-white/15 bg-[#10263F]/40 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[7px] font-black uppercase tracking-[0.24em] text-[#FFD76A]">
                    {nextRound.dateLabel}
                  </span>

                  <span className="text-white/20">·</span>

                  <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/45">
                    {statusLabel(nextRound.status)}
                  </span>
                </div>

                <h3 className="mt-5 text-[2rem] font-black uppercase leading-none tracking-[-0.045em] sm:text-[2.6rem]">
                  {nextRound.name}
                </h3>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">
                  {nextRound.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[7px] font-bold uppercase tracking-[0.18em] text-white/40">
                  <span>
                    {nextRound.venue?.confirmed &&
                    nextRound.venue.name
                      ? nextRound.venue.name
                      : "Host Course TBA"}
                  </span>

                  {nextRound.format && (
                    <>
                      <span className="text-[#FFD76A]">·</span>
                      <span>{nextRound.format}</span>
                    </>
                  )}

                  {typeof nextRound.positionsRemaining === "number" && (
                    <>
                      <span className="text-[#FFD76A]">·</span>
                      <span>
                        {nextRound.positionsRemaining} Positions
                        Remaining
                      </span>
                    </>
                  )}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/rounds"
                    className="inline-flex min-h-[46px] items-center justify-center bg-[#FFD76A] px-6 text-[8px] font-black uppercase tracking-[0.2em] text-[#10263F] transition hover:bg-white"
                  >
                    View Round →
                  </Link>

                  {nextRound.guestPolicy?.allowed && (
                    <Link
                      href={nextRound.registrationHref ?? "/contact"}
                      className="inline-flex min-h-[46px] items-center justify-center border border-white/25 px-6 text-[8px] font-black uppercase tracking-[0.2em] text-white transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
                    >
                      Invite A Player
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <div className="border border-white/15 p-7">
                <p className="text-sm leading-7 text-white/55">
                  The next Gallaspy Round will be posted as details are
                  confirmed.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* UPCOMING */}
      <section className="px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 border-b border-[#10263F]/15 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#8B6A34]">
                Club Calendar
              </p>

              <h2 className="mt-4 text-[2.6rem] font-black uppercase leading-none tracking-[-0.05em] sm:text-[3.3rem]">
                Coming Up.
              </h2>
            </div>

            <Link
              href="/calendar"
              className="text-[8px] font-black uppercase tracking-[0.2em] text-[#0C352D]"
            >
              View Full Calendar →
            </Link>
          </div>

          <div>
            {upcoming.map((event) => (
              <Link
                key={event.id}
                href={event.href}
                className="group grid gap-5 border-b border-[#10263F]/10 py-7 sm:grid-cols-[150px_1fr_auto] sm:items-center"
              >
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#8B6A34]">
                    {event.dateLabel}
                  </p>
                </div>

                <div>
                  <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-[#10263F]/40">
                    {statusLabel(event.status)}
                  </p>

                  <h3 className="mt-2 text-[1.45rem] font-black uppercase tracking-[-0.035em] transition group-hover:text-[#0C352D]">
                    {event.name}
                  </h3>
                </div>

                <span className="text-[#8B6A34] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-[#10263F]/10 px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#8B6A34]">
              The First Tee
            </p>

            <h2 className="mt-4 max-w-[760px] text-[2.3rem] font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-[3rem]">
              New To
              <span className="text-[#0C352D]">
                {" "}The Gallaspy?
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#10263F]/55">
              Start with the game. See what is happening next and find
              the right way to get involved.
            </p>
          </div>

          <Link
            href="/calendar"
            className="inline-flex min-h-[50px] items-center justify-center bg-[#10263F] px-8 text-[9px] font-black uppercase tracking-[0.22em] text-white transition hover:bg-[#0C352D]"
          >
            See What&apos;s Next →
          </Link>
        </div>
      </section>
    </main>
  );
}
