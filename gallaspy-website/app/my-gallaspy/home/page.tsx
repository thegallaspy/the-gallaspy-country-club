import { createClient as createAdminClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Participation = {
  id: string;
  event_id: string;
  event_name: string;
  event_date: string | null;
  participation_status: string | null;
  course_name: string | null;
  course_city: string | null;
  course_state: string | null;
};

function formatDate(value: string | null) {
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
    process.env.SUPABASE_SERVICE_ROLE_KEY;

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
    .select("id, first_name, last_name, email")
    .eq("email", user.email.toLowerCase())
    .maybeSingle();

  if (playerError) {
    console.error("My Gallaspy player lookup error:", playerError);
    throw new Error("Unable to load your Gallaspy profile.");
  }

  if (!player) {
    return (
      <main className="min-h-screen bg-[#10263F] px-5 py-32 text-white">
        <div className="mx-auto max-w-2xl border border-white/20 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#FFD76A]">
            My Gallaspy
          </p>

          <h1 className="mt-5 font-serif text-5xl">
            Player Record Not Found.
          </h1>

          <p className="mt-6 leading-7 text-white/70">
            This email is authenticated, but it is not currently
            connected to a Gallaspy player record. Please sign in
            using the email you registered with.
          </p>
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
          participation_status,
          course_name,
          course_city,
          course_state
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

  const rounds = (participationData ?? []) as Participation[];

  const coursesPlayed = new Set(
    rounds
      .filter(
        (round) =>
          round.participation_status === "completed" &&
          round.course_name,
      )
      .map((round) =>
        [
          round.course_name,
          round.course_city,
          round.course_state,
        ]
          .filter(Boolean)
          .join("|")
          .toLowerCase(),
      ),
  ).size;

  return (
    <main className="min-h-screen bg-[#F4F0E7] px-5 pb-20 pt-32 text-[#10263F] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="border-b border-[#10263F]/15 pb-10">
          <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#8B6A34]">
            Digital Clubhouse
          </p>

          <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
            Welcome,
            <span className="block text-[#0C352D]">
              {player.first_name}.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-[#10263F]/60 sm:text-base">
            Your rounds, Passport, results, achievements and
            Gallaspy history will live here as you participate
            in the club.
          </p>
        </section>

        <section className="grid gap-px bg-[#10263F]/10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white/55 p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#8B6A34]">
              My Rounds
            </p>
            <p className="mt-4 font-serif text-4xl">
              {rounds.length}
            </p>
          </div>

          <div className="bg-white/55 p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#8B6A34]">
              Courses Played
            </p>
            <p className="mt-4 font-serif text-4xl">
              {coursesPlayed}
            </p>
          </div>

          <div className="bg-white/55 p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#8B6A34]">
              Achievements
            </p>
            <p className="mt-4 font-serif text-4xl">—</p>
          </div>

          <div className="bg-white/55 p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#8B6A34]">
              Passport
            </p>
            <p className="mt-4 font-serif text-2xl">
              Building
            </p>
          </div>
        </section>

        <section className="mt-14">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B6A34]">
            Your Gallaspy Record
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            My Rounds
          </h2>

          {rounds.length === 0 ? (
            <div className="mt-8 border border-[#10263F]/15 bg-white/60 p-8">
              <p className="text-sm leading-7 text-[#10263F]/70">
                Your Gallaspy Round registrations will appear here.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-4">
              {rounds.map((round) => (
                <article
                  key={round.id}
                  className="border border-[#10263F]/15 bg-white/70 p-6 sm:p-8"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#8B6A34]">
                    {round.participation_status || "Recorded"}
                  </p>

                  <h3 className="mt-3 font-serif text-3xl text-[#0C352D]">
                    {round.event_name}
                  </h3>

                  <p className="mt-3 text-sm text-[#10263F]/70">
                    {formatDate(round.event_date)}
                  </p>

                  <p className="mt-2 text-sm text-[#10263F]/70">
                    {round.course_name
                      ? [
                          round.course_name,
                          round.course_city,
                          round.course_state,
                        ]
                          .filter(Boolean)
                          .join(", ")
                      : "Host course to be confirmed"}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}