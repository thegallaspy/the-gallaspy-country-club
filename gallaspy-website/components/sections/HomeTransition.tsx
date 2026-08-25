import Link from "next/link";

const tournamentDetails = [
  "1st Annual Gallaspy Invitational",
  "June 21, 2027",
  "100-Player Field",
  "4-Person Scramble",
];

export default function HomeTransition() {
  return (
    <section className="border-b border-[#10263F]/10 bg-[#F5F0E6] px-5 py-7 text-[#10263F] sm:px-8 sm:py-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 lg:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-[8px] font-semibold uppercase tracking-[0.18em] text-[#10263F]/60 sm:text-[9px] sm:tracking-[0.22em] lg:justify-start lg:text-left">
          {tournamentDetails.map((detail, index) => (
            <span key={detail} className="flex items-center gap-x-3">
              {index > 0 && <span className="text-[#B89146]">·</span>}
              {detail}
            </span>
          ))}
        </div>

        <nav
          aria-label="Homepage highlights"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          <Link
            href="/invitational"
            className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#8B6A34] transition hover:text-[#10263F] sm:text-[9px]"
          >
            Explore Invitational
          </Link>

          <span className="hidden h-3 w-px bg-[#10263F]/20 sm:block" />

          <Link
            href="/why-the-gallaspy"
            className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#8B6A34] transition hover:text-[#10263F] sm:text-[9px]"
          >
            Discover Our Story
          </Link>
        </nav>
      </div>
    </section>
  );
}