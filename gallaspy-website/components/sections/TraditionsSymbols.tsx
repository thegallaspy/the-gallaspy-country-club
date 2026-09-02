import Link from "next/link";
import { traditions } from "@/data/club";

const traditionOrder = [
  "opening-drive",
  "spring-opener",
  "gallaspy-invitational",
  "mercury-match",
  "night-at-the-nest",
];

export default function TraditionsSymbols() {
  const orderedTraditions = traditionOrder
    .map((id) => traditions.find((tradition) => tradition.id === id))
    .filter((tradition) => tradition !== undefined);

  return (
    <section className="bg-[#10263F] px-5 py-16 text-white sm:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D7B56D]">
              Traditions
            </p>

            <h2 className="mt-4 font-serif text-[2.8rem] font-light leading-[1.02] text-white sm:text-5xl lg:text-[3.5rem]">
              Traditions
              <span className="block text-[#D7B56D]">
                Start Here.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              A club becomes meaningful through the moments that return.
              These are the traditions The Gallaspy is establishing from
              the beginning.
            </p>

            <Link
              href="/traditions"
              className="mt-8 inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#D7B56D] transition hover:text-white"
            >
              Explore Traditions
              <span className="ml-3">→</span>
            </Link>
          </div>

          <div className="border-t border-white/15">
            {orderedTraditions.map((tradition, index) => (
              <article
                key={tradition.id}
                className="grid gap-4 border-b border-white/15 py-6 sm:grid-cols-[54px_1fr] sm:gap-7"
              >
                <p className="font-serif text-xl font-light text-[#D7B56D]">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-white/40">
                    {tradition.monthLabel} · Since {tradition.firstOccurrenceYear}
                  </p>

                  <h3 className="mt-2 font-serif text-2xl font-light text-white sm:text-[1.75rem]">
                    {tradition.name}
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
                    {tradition.description}
                  </p>

                  {tradition.id === "mercury-match" && (
                    <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D7B56D]">
                      Crest vs. Falcon · Two Houses. One Club. One Match.
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
