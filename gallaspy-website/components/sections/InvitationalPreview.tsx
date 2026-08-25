import Image from "next/image";
import Link from "next/link";

export default function InvitationalPreview() {
  return (
    <section className="relative overflow-hidden bg-[#F5F0E6] px-5 py-20 text-[#10263F] sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      {/* DECORATIVE BACKGROUND */}
      <div className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-[#B89146]/[0.055] blur-3xl" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-[#10263F]/[0.035] blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
        {/* LEFT */}
        <div>
          <div className="flex items-center gap-4">
            <Image
              src="/logos/gallaspy-invitational.png"
              alt="The Gallaspy Invitational"
              width={300}
              height={169}
              className="h-auto w-[150px] sm:w-[210px]"
            />

            <div className="hidden h-px flex-1 bg-gradient-to-r from-[#B89146]/50 to-transparent sm:block" />
          </div>

          <h2 className="mt-8 max-w-3xl font-serif text-[2.55rem] font-light leading-[0.97] tracking-[-0.025em] sm:mt-10 sm:text-5xl md:text-6xl lg:text-[4.6rem]">
            The 2027
            <span className="block text-[#B89146]">
              Gallaspy Invitational
            </span>
          </h2>

          <div className="mt-7 h-px w-16 bg-[#B89146] sm:mt-8 sm:w-20" />

          <p className="mt-7 max-w-xl text-base leading-7 text-[#10263F]/78 sm:mt-8 sm:text-lg sm:leading-8">
            A 100-player field competing in a 4-person scramble for a
            $10,000 tournament purse and the inaugural Golden Falcon
            Championship Trophy.
          </p>

          {/* PRIMARY ACTIONS */}
          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link
              href="/invitational/register"
              className="group inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#10263F] px-6 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_30px_rgba(16,38,63,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B89146] sm:w-auto sm:min-w-[220px] sm:px-8 sm:text-[10px]"
            >
              Join Player Priority List

              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

          </div>

          <Link
            href="/invitational"
            className="group mt-6 inline-flex items-center text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34] transition hover:text-[#10263F] sm:text-[10px]"
          >
            Explore Full Tournament Details

            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          {/* PRIORITY NOTE */}
          <div className="mt-8 max-w-xl border-l-2 border-[#B89146] bg-white/35 px-5 py-4">
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#8B6A34]">
              Player Priority List
            </p>

            <p className="mt-2 text-xs leading-6 text-[#10263F]/60">
              Joining the priority list does not reserve or guarantee a
              position in the field. Official registration and payment will be
              announced when tournament registration opens.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="border-t border-[#10263F]/15 pt-2 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
          {/* GOLDEN FALCON */}
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34] sm:text-[10px]">
              Championship
            </p>

            <p className="mt-4 font-serif text-[2rem] font-light leading-tight sm:text-3xl">
              The Golden Falcon
            </p>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#10263F]/60">
              The first-place team will become the inaugural Golden Falcon
              Champions. The tournament purse is planned to be awarded across
              the leading teams under the final published tournament rules.
            </p>
          </div>

          {/* HOST COURSE */}
          <div className="mt-8 border-t border-[#10263F]/15 pt-7 sm:mt-10 sm:pt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34] sm:text-[10px]">
                2027 Host Course
              </p>

              <span className="rounded-full border border-[#B89146]/30 bg-[#B89146]/[0.07] px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
                Announcement Forthcoming
              </span>
            </div>

            <p className="mt-4 font-serif text-[2rem] font-light leading-tight sm:text-3xl">
              A Championship Setting for the Inaugural Event
            </p>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#10263F]/60">
              The host-course agreement is being finalized. The official venue
              will be announced once the agreement is completed.
            </p>
          </div>

          {/* EVENT IDENTITY */}
          <div className="mt-8 rounded-[18px] bg-[#10263F] px-6 py-6 text-white sm:mt-10">
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#FFD76A]">
              The Beginning of a Tradition
            </p>

            <p className="mt-3 font-serif text-2xl font-light">
              One Tournament. One Trophy. One First Champion.
            </p>

            <p className="mt-3 text-sm leading-6 text-white/62">
              The 2027 event begins an annual tradition intended to grow with
              The Gallaspy for years to come.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}