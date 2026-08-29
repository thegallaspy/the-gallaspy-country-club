import Link from "next/link";
import {
  events,
  getNextEvent,
  type GallaspyEvent,
} from "@/data/club";

function formatStatus(status: GallaspyEvent["status"]) {
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

function getCurrentMonthEvent() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  return (
    events.find(
      (event) =>
        event.year === year &&
        event.month === month &&
        event.status !== "COMPLETED",
    ) ?? null
  );
}

export default function HomeTransition() {
  const nextEvent = getNextEvent();
  const thisMonth = getCurrentMonthEvent();

  if (!nextEvent) {
    return null;
  }

  return (
    <section className="border-b border-white/10 bg-[#10263F] text-white">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[1.2fr_0.8fr]">
        {/* NEXT EVENT */}
        <div className="relative px-5 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
          <div className="absolute bottom-0 left-0 top-0 w-[5px] bg-[#B89146]" />

          <div className="mx-auto max-w-4xl lg:mx-0">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#B89146]" />

              <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#FFD76A]">
                Next Event
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.24em] text-white/45">
                  {nextEvent.dateLabel}
                </p>

                <h2 className="mt-2 text-[2rem] font-black uppercase leading-none tracking-[-0.045em] sm:text-[2.6rem]">
                  {nextEvent.name}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="text-[7px] font-black uppercase tracking-[0.22em] text-[#FFD76A]">
                    {formatStatus(nextEvent.status)}
                  </span>

                  {nextEvent.venue?.confirmed &&
                    nextEvent.venue.name && (
                      <>
                        <span className="text-white/20">·</span>

                        <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/45">
                          {nextEvent.venue.name}
                        </span>
                      </>
                    )}
                </div>
              </div>

              <Link
                href={nextEvent.href}
                className="group inline-flex min-h-[44px] shrink-0 items-center justify-center border border-[#FFD76A] px-5 text-[8px] font-black uppercase tracking-[0.2em] text-[#FFD76A] transition hover:bg-[#FFD76A] hover:text-[#10263F]"
              >
                View Event
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* THIS MONTH */}
        <div className="border-t border-white/10 bg-[#0C352D] px-5 py-7 sm:px-8 sm:py-8 lg:border-l lg:border-t-0 lg:px-10 lg:py-9">
          <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#FFD76A]">
            This Month At The Gallaspy
          </p>

          {thisMonth ? (
            <div className="mt-5">
              <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/45">
                {thisMonth.dateLabel}
              </p>

              <div className="mt-2 flex items-end justify-between gap-5">
                <div>
                  <h3 className="text-[1.45rem] font-black uppercase leading-none tracking-[-0.04em]">
                    {thisMonth.name}
                  </h3>

                  <p className="mt-3 text-[7px] font-black uppercase tracking-[0.22em] text-[#FFD76A]">
                    {formatStatus(thisMonth.status)}
                  </p>
                </div>

                <Link
                  href={thisMonth.href}
                  aria-label={`View ${thisMonth.name}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-[#FFD76A] transition hover:border-[#FFD76A] hover:bg-[#FFD76A] hover:text-[#10263F]"
                >
                  →
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-5">
              <p className="text-[1.35rem] font-black uppercase tracking-[-0.035em]">
                Club Programming
              </p>

              <p className="mt-3 max-w-[390px] text-xs leading-6 text-white/50">
                The next Gallaspy gathering will appear here as club programming is confirmed.
              </p>

              <Link
                href="/play"
                className="mt-4 inline-flex text-[7px] font-black uppercase tracking-[0.22em] text-[#FFD76A]"
              >
                View Club Calendar →
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="grid h-[5px] grid-cols-4">
        <div className="bg-[#10263F]" />
        <div className="bg-[#0C352D]" />
        <div className="bg-[#B89146]" />
        <div className="bg-[#F4F0E7]" />
      </div>
    </section>
  );
}
