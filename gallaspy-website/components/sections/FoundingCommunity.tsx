import Link from "next/link";
import { foundingCommunity } from "@/data/club";

export default function FoundingCommunity() {
  const confirmedCount = foundingCommunity.confirmedCount;
  const goal = foundingCommunity.goal;

  const progress =
    confirmedCount === null
      ? null
      : Math.min(100, Math.max(0, (confirmedCount / goal) * 100));

  return (
    <section className="bg-[#10263F] px-5 py-16 text-white sm:px-8 lg:py-24">
      <div className="mx-auto grid w-full max-w-[1120px] gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-20">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#D7B56D]">
            The Falcon Society
          </p>

          <h2 className="mt-5 max-w-2xl font-serif text-[2.8rem] font-light leading-[1.03] text-white sm:text-5xl lg:text-[3.6rem]">
            Be Part of
            <span className="block text-[#D7B56D]">the Beginning.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
            The Falcon Society is the Founding 100 of The Gallaspy — the first
            100 individuals and families selected to become part of the
            community during its opening chapter.
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
            Before there is a permanent first tee, there are rounds to play,
            competitions to establish, gatherings to share, and traditions to
            begin.
          </p>

          <Link
            href="/falcon-society"
            className="mt-8 inline-flex min-h-[48px] items-center justify-center border border-[#D7B56D] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D7B56D] transition hover:bg-[#D7B56D] hover:text-[#10263F]"
          >
            Explore the Founding 100
          </Link>
        </div>

        <div className="border-l border-white/15 pl-0 lg:pl-12">
          <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-white/45">
            Founding Community
          </p>

          <div className="mt-5 flex items-end gap-3">
            <span className="font-serif text-7xl font-light leading-none text-white sm:text-8xl">
              {confirmedCount === null ? "—" : confirmedCount}
            </span>

            <span className="pb-2 font-serif text-2xl text-white/40">
              / {goal}
            </span>
          </div>

          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#D7B56D]">
            Confirmed Founding 100
          </p>

          <div className="mt-7 h-[3px] w-full overflow-hidden bg-white/15">
            {progress !== null && (
              <div
                className="h-full bg-[#D7B56D]"
                style={{ width: `${progress}%` }}
              />
            )}
          </div>

          <p className="mt-6 max-w-md text-xs leading-6 text-white/50">
            The public count reflects confirmed Falcon Society participants,
            not applications. The count will be published as the Founding 100
            is established.
          </p>

          <Link
            href="/falcon-society/apply"
            className="mt-7 inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:text-[#D7B56D]"
          >
            Apply for Consideration
            <span className="ml-3 text-[#D7B56D]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
