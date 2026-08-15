import Image from "next/image";
import Link from "next/link";

export default function InvitationalPreview() {
  return (
    <section className="bg-[#F5F0E6] px-6 py-24 text-[#10263F] sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
        <div>
          <Image
            src="/logos/gallaspy-invitational.png"
            alt="The Gallaspy Invitational"
            width={300}
            height={169}
            className="h-auto w-[170px] sm:w-[210px]"
          />

          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
            The First Annual
          </p>

          <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-[0.98] tracking-[-0.02em] sm:text-5xl md:text-6xl lg:text-7xl">
            The 2027
            <span className="block text-[#B89146]">
              Gallaspy Invitational
            </span>
          </h2>

          <div className="mt-8 h-px w-20 bg-[#B89146]" />

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#10263F]/75">
            June 21, 2027. A 100-player field competing in a 4-person scramble
            for a $10,000 tournament purse and the inaugural Golden Falcon
            Championship Trophy.
          </p>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#10263F]/60">
            The Gallaspy Invitational brings together competition, hospitality,
            partnership, and community for the first major golf experience
            under The Gallaspy name.
          </p>

          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link
              href="/invitational/register"
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#10263F] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B89146] sm:w-auto sm:px-8"
            >
              Player Registration
              <span className="ml-3">→</span>
            </Link>

            <Link
              href="/invitational/sponsors"
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-[#10263F]/20 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#10263F] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B89146] hover:text-[#B89146] sm:w-auto sm:px-8"
            >
              Sponsor the Invitational
            </Link>
          </div>

          <Link
            href="/invitational"
            className="mt-6 inline-flex text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34] transition hover:text-[#10263F]"
          >
            Explore Full Tournament Details →
          </Link>
        </div>

        <div className="border-t border-[#10263F]/15 lg:border-l lg:border-t-0 lg:pl-16">
          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8">
            <div className="border-b border-[#10263F]/15 py-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#8B6A34]">
                Date
              </p>

              <p className="mt-3 font-serif text-3xl">
                June 21, 2027
              </p>
            </div>

            <div className="border-b border-[#10263F]/15 py-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#8B6A34]">
                Format
              </p>

              <p className="mt-3 font-serif text-3xl">
                4-Person Scramble
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
                Prize Purse
              </p>

              <p className="mt-3 font-serif text-3xl">
                $10,000
              </p>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34]">
              Championship
            </p>

            <p className="mt-4 font-serif text-3xl">
              The Golden Falcon
            </p>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#10263F]/60">
              The first-place team will become the inaugural Golden Falcon
              Champions. The $10,000 tournament purse will be awarded across
              the top four teams.
            </p>
          </div>

          <div className="mt-10 border-t border-[#10263F]/15 pt-8">
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