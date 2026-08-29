import Link from "next/link";

export default function ClubDispatch() {
  return (
    <section className="bg-[#0C352D] px-5 py-16 text-white sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1120px]">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
          <div>
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-[#D7B56D]" />
              <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#D7B56D]">
                The Club Dispatch
              </p>
            </div>

            <h2 className="mt-7 max-w-3xl font-serif text-[3rem] font-light leading-[0.98] sm:text-5xl lg:text-6xl">
              Stay close to
              <span className="block text-[#D7B56D]">what happens next.</span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              Rounds. Competition. Gatherings. Club news. The Dispatch keeps
              you connected to the next opportunity to play, participate, or
              follow the story of The Gallaspy.
            </p>
          </div>

          <div className="border-l border-white/15 pl-0 lg:pl-10">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
              Inside The Dispatch
            </p>

            <div className="mt-5 border-t border-white/15">
              {[
                "Upcoming Gallaspy Rounds",
                "Invitational News",
                "Mercury Match Updates",
                "Club Gatherings",
                "Apparel & Announcements",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 border-b border-white/15 py-3.5"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[#D7B56D]" />
                  <span className="text-xs uppercase tracking-[0.13em] text-white/65">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="mt-7 inline-flex min-h-[48px] items-center justify-center bg-[#D7B56D] px-7 text-[9px] font-bold uppercase tracking-[0.21em] text-[#10263F] transition hover:bg-white"
            >
              Receive The Dispatch →
            </Link>

            <p className="mt-4 max-w-sm text-[10px] leading-5 text-white/35">
              Dispatch registration will be introduced as the club
              communications system expands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
