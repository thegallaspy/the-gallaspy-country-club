import Link from "next/link";
import { getUpcomingEvents, type GallaspyEvent } from "@/data/club";

function formatEventDate(event: GallaspyEvent) {
  if (event.date) {
    const date = new Date(`${event.date}T12:00:00`);
    return {
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      day: date.getDate().toString(),
    };
  }

  if (event.month && event.year) {
    const date = new Date(event.year, event.month - 1, 1);
    return {
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      day: "TBA",
    };
  }

  return {
    month: "DATE",
    day: "TBA",
  };
}

function formatCategory(category: GallaspyEvent["category"]) {
  return category
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

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

export default function UpcomingAtGallaspy() {
  const upcoming = getUpcomingEvents().slice(0, 3);

  return (
    <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="flex flex-col gap-7 border-b border-[#10263F]/15 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Club Calendar
            </p>

            <h2 className="mt-4 font-serif text-[2.7rem] font-light leading-[1.05] text-[#10263F] sm:text-5xl">
              Upcoming at
              <span className="block">The Gallaspy.</span>
            </h2>
          </div>

          <Link
            href="/calendar"
            className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:text-[#B89146]"
          >
            View Full Calendar
            <span className="ml-3 text-[#B89146]">→</span>
          </Link>
        </div>

        <div className="border-b border-[#10263F]/15">
          {upcoming.map((event) => {
            const date = formatEventDate(event);

            return (
              <article
                key={event.slug}
                className="grid gap-6 border-t border-[#10263F]/15 py-8 first:border-t-0 md:grid-cols-[110px_1fr_auto] md:items-center"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#B89146]">
                    {date.month}
                  </p>

                  <p className="mt-1 font-serif text-4xl font-light text-[#10263F]">
                    {date.day}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#10263F]/45">
                      {formatCategory(event.category)}
                    </p>

                    <span className="h-1 w-1 rounded-full bg-[#B89146]" />

                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8C1D2C]">
                      {formatStatus(event.status)}
                    </p>
                  </div>

                  <h3 className="mt-3 font-serif text-2xl font-light text-[#10263F] sm:text-3xl">
                    {event.name}
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#33475B]/75">
                    {event.description}
                  </p>

                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#10263F]/45">
                    {event.venue?.confirmed && event.venue.name
                      ? event.venue.name
                      : "Location TBA"}
                  </p>
                </div>

                <div>
                  {event.registrationHref &&
                  event.status === "REGISTRATION_OPEN" ? (
                    <Link
                      href={event.registrationHref}
                      className="inline-flex min-h-[44px] items-center justify-center border-2 border-[#0C352D] bg-[#0C352D] px-6 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-transparent hover:text-[#0C352D]"
                    >
                      Register →
                    </Link>
                  ) : (
                    <Link
                      href={event.href}
                      className="inline-flex min-h-[44px] items-center justify-center border-2 border-[#10263F] bg-[#10263F] px-6 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-transparent hover:text-[#10263F]"
                    >
                      View Event
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
