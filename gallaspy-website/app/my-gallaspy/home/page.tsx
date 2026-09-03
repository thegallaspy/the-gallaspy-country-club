import { createClient as createAdminClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function MyGallaspyHomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/my-gallaspy");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "My Gallaspy database access is not configured.",
    );
  }

  const admin = createAdminClient(
    supabaseUrl,
    supabaseSecretKey,
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
      `
        id,
        first_name,
        last_name,
        email,
        city,
        state,
        ghin_number,
        handicap_index,
        founding_year_participant,
        falcon_society_member,
        profile_visibility
      `,
    )
    .eq("email", user.email.toLowerCase())
    .maybeSingle();

  if (playerError) {
    console.error("My Gallaspy player lookup error:", playerError);
    throw new Error("Unable to load your Gallaspy profile.");
  }

  if (!player) {
    return (
      <main className="min-h-screen bg-[#10263F] px-5 py-24 text-white sm:px-8">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[760px] items-center justify-center">
          <section className="w-full border border-white/15 bg-white/[0.03] px-6 py-12 sm:px-10">
            <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
              My Gallaspy
            </p>

            <h1 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-[-0.045em] sm:text-5xl">
              Player Record
              <span className="block text-[#FFD76A]">
                Not Found.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/65">
              This email is authenticated, but it is not currently connected
              to a Gallaspy player record. Use the same email address you used
              when registering for a Gallaspy Round.
            </p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F0E7] px-5 pb-20 pt-32 text-[#10263F] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="border-b border-[#10263F]/15 pb-10">
          <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#8B6A34]">
            Digital Clubhouse
          </p>

          <h1 className="mt-5 text-5xl font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Welcome,
            <span className="block text-[#0C352D]">
              {player.first_name}.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-[#10263F]/60 sm:text-base">
            Your rounds, Passport, results, achievements and Gallaspy history
            will live here as you participate in the club.
          </p>
        </section>

        <section className="grid gap-px bg-[#10263F]/10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white/55 p-6">
            <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#8B6A34]">
              My Rounds
            </p>
            <p className="mt-4 text-3xl font-black">—</p>
          </div>

          <div className="bg-white/55 p-6">
            <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#8B6A34]">
              Courses Played
            </p>
            <p className="mt-4 text-3xl font-black">—</p>
          </div>

          <div className="bg-white/55 p-6">
            <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#8B6A34]">
              Achievements
            </p>
            <p className="mt-4 text-3xl font-black">—</p>
          </div>

          <div className="bg-white/55 p-6">
            <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#8B6A34]">
              Passport
            </p>
            <p className="mt-4 text-3xl font-black">Building</p>
          </div>
        </section>
      </div>
    </main>
  );
}
