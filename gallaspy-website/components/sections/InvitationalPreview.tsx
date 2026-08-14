import Link from "next/link";

export default function InvitationalPreview() {
  return (
    <section className="bg-[#F5F0E6] px-6 py-24 text-[#10263F] sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
            The First Annual
          </p>

          <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-7xl">
            The 2027
            <span className="block text-[#B89146]">
              Gallaspy Invitational
            </span>
          </h2>

          <div className="mt-8 h-px w-20 bg-[#B89146]" />

          <p className="mt-8 max-w-xl text-base leading-8 text-[#10263F]/70">
            Before there is a permanent course, there is a commitment to the
            game. The inaugural Gallaspy Invitational is the first major
            golf experience under The Gallaspy name.
          </p>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#10263F]/60">
            A 100-player field. Four-person scramble. Premium player
            experience. Competition, hospitality, partnership, and the
            beginning of a new annual tradition.
          </p>

          <Link
            href="/invitational"
            className="mt-9 inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#10263F] px-8 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B89146]"
          >
            Explore the Invitational
            <span className="ml-3">→</span>
          </Link>
        </div>

        <div className="border-t border-[#10263F]/15 lg:border-l lg:border-t-0 lg:pl-16">
          <div className="grid grid-cols-2 gap-x-8">
            <div className="border-b border-[#10263F]/15 py-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#8B6A34]">
                Year
              </p>
              <p className="mt-3 font-serif text-3xl">
                2027
              </p>
            </div>

            <div className="border-b border-[#10263F]/15 py-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#8B6A34]">
                Format
              </p>
              <p className="mt-3 font-serif text-3xl">
                Scramble
              </p>
            </div>

            <div className="border-b border-[#10263F]/15 py-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#8B6A34]">
                Field
              </p>
              <p className="mt-3 font-serif text-3xl">
                100 Players
              </p>
            </div>

            <div className="border-b border-[#10263F]/15 py-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#8B6A34]">
                Start
              </p>
              <p className="mt-3 font-serif text-3xl">
                11:00 AM
              </p>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34]">
              2027 Host Course
            </p>

            <p className="mt-4 font-serif text-3xl">
              Official venue announcement forthcoming.
            </p>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#10263F]/60">
              The inaugural host course is being finalized and will be
              announced following completion of the venue agreement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}