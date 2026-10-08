import Link from "next/link";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getEventsByCategory } from "@/data/club";

export const dynamic = "force-dynamic";

type Participation = {
  id: string;
  event_id: string;
  event_name: string;
  event_date: string | null;
  event_category: string | null;
  participation_status: string | null;
};

function formatDate(value: string | null | undefined) {
  if (!value) return "Date to be confirmed";

  return new Date(`${value.slice(0, 10)}T12:00:00`).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );
}

function participationLabel(status: string | null) {
  if (!status) return "Recorded";

  return status
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function MyGallaspyHomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/my-gallaspy");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey =
    process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("My Gallaspy database access is not configured.");
  }

  const admin = createAdminClient(
    supabaseUrl,
    supabaseServiceRoleKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );

  const { data: player, error: playerError } = await admin
    .from("gallaspy_players")
    .select(
      "id, first_name, last_name, email, city, state, ghin_number, handicap_index",
    )
    .eq("email", user.email.toLowerCase())
    .maybeSingle();

  if (playerError) {
    console.error("My Gallaspy player lookup error:", playerError);
    throw new Error("Unable to load your Gallaspy profile.");
  }

  if (!player) {
    return (
      <main className="min-h-screen bg-[#10263F] px-5 pb-28 pt-32 text-white">
        <div className="mx-auto max-w-2xl border border-white/20 p-8">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FFD76A]">
            My Gallaspy
          </p>

          <h1 className="mt-5 text-4xl font-black uppercase leading-none tracking-[-0.045em] sm:text-5xl">
            Player Record
            <span className="block text-[#FFD76A]">Not Found.</span>
          </h1>

          <p className="mt-6 text-sm leading-7 text-white/65">
            This email is authenticated, but it is not currently
            connected to a Gallaspy player record. Sign in using
            the email used for your Gallaspy Round registration.
          </p>

          <Link
            href="/rounds"
            className="mt-8 inline-flex min-h-[48px] items-center justify-center bg-[#FFD76A] px-6 text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F]"
          >
            View Gallaspy Rounds →
          </Link>
        </div>
      </main>
    );
  }

  const { data: participationData, error: participationError } =
    await admin
      .from("gallaspy_participation")
      .select(
        `
          id,
          event_id,
          event_name,
          event_date,
          event_category,
          participation_status
        `,
      )
      .eq("player_id", player.id)
      .order("event_date", { ascending: false });

  if (participationError) {
    console.error(
      "My Gallaspy participation lookup error:",
      participationError,
    );

    throw new Error("Unable to load your Gallaspy rounds.");
  }

  const participation =
    (participationData ?? []) as Participation[];

  const roundParticipation = participation.filter(
    (record) =>
      record.event_category === "GALLASPY_ROUND" ||
      record.event_id.startsWith("gallaspy-"),
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingRounds = getEventsByCategory("GALLASPY_ROUND")
    .filter((event) => event.status !== "COMPLETED")
    .filter((event) => {
      if (!event.date) return true;

      return (
        new Date(`${event.date}T12:00:00`).getTime() >=
        today.getTime()
      );
    })
    .sort((a, b) => {
      const aTime = a.date
        ? new Date(`${a.date}T12:00:00`).getTime()
        : Number.MAX_SAFE_INTEGER;

      const bTime = b.date
        ? new Date(`${b.date}T12:00:00`).getTime()
        : Number.MAX_SAFE_INTEGER;

      return aTime - bTime;
    });

  const nextRound = upcomingRounds[0] ?? null;

  const nextRoundParticipation = nextRound
    ? roundParticipation.find(
        (record) => record.event_id === nextRound.id,
      )
    : null;

  const completedRounds = roundParticipation.filter((record) => {
    if (!record.event_date) return false;

    return (
      new Date(`${record.event_date}T23:59:59`).getTime() <
      Date.now()
    );
  });

  const upcomingRegisteredRounds = roundParticipation.filter(
    (record) => {
      if (!record.event_date) return false;

      return (
        new Date(`${record.event_date}T23:59:59`).getTime() >=
        Date.now()
      );
    },
  );

  const location = [player.city, player.state]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="min-h-screen bg-[#F4F0E7] pb-28 pt-28 text-[#10263F] sm:pt-32">
      {/* PLAYER HEADER */}
      <section className="border-b border-[#10263F]/10 px-5 pb-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-[#B89146]" />

                <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#8B6A34]">
                  Digital Clubhouse
                </p>
              </div>

              <h1 className="mt-6 text-[3.3rem] font-black uppercase leading-[0.84] tracking-[-0.06em] sm:text-[4.8rem] lg:text-[6rem]">
                Welcome,
                <span className="block text-[#0C352D]">
                  {player.first_name}.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-[#10263F]/55">
                Your Gallaspy participation, upcoming rounds and
                club history in one private place.
              </p>
            </div>

            <div className="border-l-2 border-[#B89146] pl-5 lg:min-w-[260px]">
              <p className="text-[7px] font-black uppercase tracking-[0.25em] text-[#8B6A34]">
                Player Record
              </p>

              <p className="mt-3 text-sm font-bold">
                {player.first_name} {player.last_name}
              </p>

              {location && (
                <p className="mt-1 text-xs text-[#10263F]/45">
                  {location}
                </p>
              )}

              {player.handicap_index && (
                <p className="mt-3 text-[8px] font-black uppercase tracking-[0.18em] text-[#0C352D]">
                  Handicap · {player.handicap_index}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* NEXT ROUND */}
      <section className="bg-[#0C352D] px-5 py-10 text-white sm:px-8 sm:py-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-center">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#FFD76A]">
                Next Gallaspy Round
              </p>

              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em]">
                Your Next
                <span className="block text-[#FFD76A]">
                  Opportunity.
                </span>
              </h2>
            </div>

            {nextRound ? (
              <article className="border border-white/15 bg-[#10263F]/45">
                <div className="border-b border-white/10 px-6 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#FFD76A]">
                      {nextRound.dateLabel}
                    </p>

                    {nextRoundParticipation ? (
                      <span className="bg-[#FFD76A] px-3 py-2 text-[7px] font-black uppercase tracking-[0.2em] text-[#10263F]">
                        ✓ Confirmed
                      </span>
                    ) : (
                      <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white/45">
                        Not Registered
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-3xl font-black uppercase leading-none tracking-[-0.045em] sm:text-4xl">
                    {nextRound.name}
                  </h3>

                  <div className="mt-6 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
                    <div className="bg-[#0C352D] p-5">
                      <p className="text-[7px] font-black uppercase tracking-[0.22em] text-[#FFD76A]">
                        Host Course
                      </p>

                      <p className="mt-3 text-sm font-bold">
                        {nextRound.venue?.confirmed &&
                        nextRound.venue.name
                          ? nextRound.venue.name
                          : "To Be Announced"}
                      </p>
                    </div>

                    <div className="bg-[#0C352D] p-5">
                      <p className="text-[7px] font-black uppercase tracking-[0.22em] text-[#FFD76A]">
                        Your Status
                      </p>

                      <p className="mt-3 text-sm font-bold">
                        {nextRoundParticipation
                          ? participationLabel(
                              nextRoundParticipation.participation_status,
                            )
                          : "Registration Available"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    {nextRoundParticipation ? (
                      <Link
                        href="/rounds"
                        className="inline-flex min-h-[46px] items-center justify-center border border-white/25 px-6 text-[8px] font-black uppercase tracking-[0.2em] text-white"
                      >
                        View Round Details →
                      </Link>
                    ) : nextRound.registrationHref ? (
                      <Link
                        href={nextRound.registrationHref}
                        className="inline-flex min-h-[46px] items-center justify-center bg-[#FFD76A] px-6 text-[8px] font-black uppercase tracking-[0.2em] text-[#10263F]"
                      >
                        Register For Round →
                      </Link>
                    ) : (
                      <Link
                        href="/rounds"
                        className="inline-flex min-h-[46px] items-center justify-center border border-white/25 px-6 text-[8px] font-black uppercase tracking-[0.2em] text-white"
                      >
                        View Gallaspy Rounds →
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ) : (
              <div className="border border-white/15 p-8">
                <p className="text-sm leading-7 text-white/60">
                  The next Gallaspy Round will appear here when
                  club programming is announced.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PLAYER STATS */}
      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden border border-[#10263F]/10 bg-[#10263F]/10 grid-cols-2 lg:grid-cols-4">
            <div className="bg-white/65 p-5 sm:p-6">
              <p className="text-[7px] font-black uppercase tracking-[0.22em] text-[#8B6A34]">
                My Rounds
              </p>

              <p className="mt-3 text-4xl font-black tracking-[-0.05em]">
                {roundParticipation.length}
              </p>
            </div>

            <div className="bg-white/65 p-5 sm:p-6">
              <p className="text-[7px] font-black uppercase tracking-[0.22em] text-[#8B6A34]">
                Completed
              </p>

              <p className="mt-3 text-4xl font-black tracking-[-0.05em]">
                {completedRounds.length}
              </p>
            </div>

            <div className="bg-white/65 p-5 sm:p-6">
              <p className="text-[7px] font-black uppercase tracking-[0.22em] text-[#8B6A34]">
                Upcoming
              </p>

              <p className="mt-3 text-4xl font-black tracking-[-0.05em]">
                {upcomingRegisteredRounds.length}
              </p>
            </div>

            <div className="bg-white/65 p-5 sm:p-6">
              <p className="text-[7px] font-black uppercase tracking-[0.22em] text-[#8B6A34]">
                Passport
              </p>

              <p className="mt-3 text-lg font-black uppercase tracking-[-0.02em] text-[#0C352D]">
                Building
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROUND HISTORY */}
      <section className="px-5 pb-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between border-b border-[#10263F]/15 pb-6">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#8B6A34]">
                Your Gallaspy Record
              </p>

              <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.05em] sm:text-5xl">
                My Rounds.
              </h2>
            </div>

            <Link
              href="/rounds"
              className="hidden text-[8px] font-black uppercase tracking-[0.2em] text-[#0C352D] sm:block"
            >
              All Rounds →
            </Link>
          </div>

          {roundParticipation.length === 0 ? (
            <div className="mt-6 border border-[#10263F]/15 bg-white/60 p-8">
              <p className="text-sm leading-7 text-[#10263F]/65">
                Your Gallaspy Round registrations will appear here
                after you register.
              </p>

              <Link
                href="/rounds"
                className="mt-6 inline-flex min-h-[44px] items-center justify-center bg-[#0C352D] px-5 text-[8px] font-black uppercase tracking-[0.2em] text-white"
              >
                Find A Round →
              </Link>
            </div>
          ) : (
            <div className="border-t border-[#10263F]/10">
              {roundParticipation.map((round) => {
                const isPast =
                  round.event_date &&
                  new Date(
                    `${round.event_date}T23:59:59`,
                  ).getTime() < Date.now();

                return (
                  <article
                    key={round.id}
                    className="grid gap-4 border-b border-[#10263F]/10 py-6 sm:grid-cols-[150px_1fr_auto] sm:items-center"
                  >
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#8B6A34]">
                      {formatDate(round.event_date)}
                    </p>

                    <div>
                      <p className="text-[7px] font-black uppercase tracking-[0.2em] text-[#10263F]/35">
                        {isPast ? "Gallaspy History" : "Upcoming"}
                      </p>

                      <h3 className="mt-2 text-xl font-black uppercase tracking-[-0.035em] text-[#0C352D]">
                        {round.event_name}
                      </h3>
                    </div>

                    <span className="text-[7px] font-black uppercase tracking-[0.2em] text-[#8B6A34]">
                      {participationLabel(
                        round.participation_status,
                      )}
                    </span>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
