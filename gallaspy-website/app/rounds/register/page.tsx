import Link from "next/link";
import { events } from "@/data/club";
import RoundRegistrationForm from "./RoundRegistrationForm";

type PageProps = {
  searchParams: Promise<{
    round?: string;
  }>;
};

export default async function RoundRegistrationPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const rounds = events
    .filter(
      (event) =>
        event.category === "GALLASPY_ROUND" &&
        event.status !== "COMPLETED" &&
        event.status !== "SOLD_OUT" &&
        Boolean(event.date),
    )
    .sort((a, b) =>
      (a.date ?? "").localeCompare(b.date ?? ""),
    )
    .map((event) => ({
      id: event.id,
      name: event.name,
      dateLabel: event.dateLabel,
    }));

  return (
    <main className="min-h-screen bg-[#F4F0E7] text-[#10263F]">
      <section className="bg-[#10263F] px-5 pb-14 pt-32 text-white sm:px-8 sm:pb-16 sm:pt-36 lg:px-10 lg:pb-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
            Gallaspy Rounds
          </p>

          <h1 className="mt-6 max-w-5xl text-[3.4rem] font-black uppercase leading-[0.84] tracking-[-0.06em] sm:text-[4.8rem] md:text-[5.8rem]">
            Join The
            <span className="block text-[#FFD76A]">
              Next Round.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
            Choose an upcoming Gallaspy Round and add your name to the
            playing list. Course and tee-time information will be
            communicated as each Round is finalized.
          </p>

          <Link
            href="/rounds"
            className="mt-8 inline-flex text-[8px] font-black uppercase tracking-[0.22em] text-white/70 transition hover:text-[#FFD76A]"
          >
            ← Back To Gallaspy Rounds
          </Link>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
          <aside>
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#8B6A34]">
              Play With The Gallaspy
            </p>

            <h2 className="mt-5 text-[2.7rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-[3.4rem]">
              Your Round
              <span className="block text-[#0C352D]">
                Starts Here.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#10263F]/62">
              Gallaspy Rounds bring the community together at different
              courses throughout the year. They are club outings first —
              not every Round is a tournament.
            </p>

            <div className="mt-8 border-t border-[#10263F]/15 pt-6">
              <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#0C352D]">
                Different Courses. One Club.
              </p>
            </div>
          </aside>

          <RoundRegistrationForm
            rounds={rounds}
            initialRoundId={params.round}
          />
        </div>
      </section>
    </main>
  );
}
