import Link from "next/link";

export default function InvestmentPreview() {
  return (
    <section
      id="investment-preview"
      className="relative overflow-hidden bg-[#10263F] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      {/* BACKGROUND DETAILS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,215,106,0.12),transparent_38%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(22,58,47,0.55),transparent_42%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#FFD76A] sm:text-xs">
            Development &amp; Partnership
          </p>

          <h2 className="mt-4 max-w-2xl font-serif text-[2.5rem] font-light leading-[1.06] sm:text-5xl lg:text-[3.65rem]">
            A Long-Term Vision
            <span className="block">Built Through Partnership</span>
          </h2>

          <div className="mt-6 h-px w-16 bg-[#B89146]" />

          <p className="mt-6 max-w-3xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
            The Gallaspy Golf &amp; Country Club is being envisioned as a
            future private golf and lifestyle destination in Georgia, advanced
            through thoughtful relationships and the foundation needed for the
            long-term club vision.
          </p>
        </div>

        {/* AUDIENCE DISTINCTION */}
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {/* FUTURE MEMBERS */}
          <div className="rounded-[20px] border border-white/12 bg-white/[0.045] px-6 py-8 sm:px-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#FFD76A]">
              For Future Members
            </p>

            <h3 className="mt-3 font-serif text-2xl font-light text-white">
              Follow the Club Journey
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/65">
              Register your interest in the future club and follow the
              development of the golf, dining, wellness, hospitality, and
              recreation vision.
            </p>

            <Link
              href="/membership"
              className="mt-5 inline-flex items-center border-b border-[#FFD76A] pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:text-[#FFD76A]"
            >
              Membership Interest
              <span className="ml-2">→</span>
            </Link>
          </div>

          {/* DEVELOPMENT PARTNERS */}
          <div className="rounded-[20px] border border-[#FFD76A]/24 bg-[#B89146]/10 px-6 py-8 sm:px-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#FFD76A]">
              For Development Partners
            </p>

            <h3 className="mt-3 font-serif text-2xl font-light text-white">
              Explore the Development Vision
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/65">
              Learn more about the development vision, intended phases,
              partnership opportunities, and the long-term strategy for
              bringing The Gallaspy to life.
            </p>

            <Link
              href="/invest"
              className="mt-5 inline-flex items-center border-b border-[#FFD76A] pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:text-[#FFD76A]"
            >
              Development &amp; Partnership
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        {/* DISCLAIMER */}
        <p className="mx-auto mt-7 max-w-4xl text-center text-[10px] leading-5 text-white/42">
          The development vision, scale, amenities, timing, partnership
          structure, and financing approach are conceptual and subject to land
          acquisition, due diligence, planning, approvals, market conditions,
          and future development decisions. The Gallaspy does not currently
          represent that a specific property has been acquired or secured.
          Nothing on this website constitutes an offer to sell or a
          solicitation to purchase securities.
        </p>
      </div>
    </section>
  );
}