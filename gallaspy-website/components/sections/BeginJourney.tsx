import Image from "next/image";
import Link from "next/link";

const journeyOptions = [
  {
    title: "2027 Gallaspy Invitational",
    description:
      "Discover the inaugural tournament, player experience, sponsorship opportunities, and the first major golf tradition under The Gallaspy name.",
    href: "/invitational",
    label: "Explore the Invitational",
  },
  {
    title: "Future Membership",
    description:
      "Register your interest in becoming part of the future Gallaspy membership community as the long-term club vision develops.",
    href: "/membership",
    label: "Explore Membership",
  },
  {
    title: "Development & Partnership",
    description:
      "Explore the long-term development vision and opportunities for aligned landowners, brands, operators, developers, and strategic partners.",
    href: "/invest",
    label: "Explore Partnership",
  },
];

export default function BeginJourney() {
  return (
    <section className="relative overflow-hidden bg-[#0B251E] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="absolute inset-0">
        <Image
          src="/images/arrival.png"
          alt="Conceptual vision for the arrival experience at The Gallaspy Golf and Country Club"
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#0B251E]/82" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B251E]/95 via-[#0B251E]/72 to-[#0B251E]/82" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#FFD76A] sm:text-xs">
            Begin Your Journey
          </p>

          <h2 className="mt-4 font-serif text-[2.5rem] font-light leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
            Be Part of a Legacy
            <span className="block">in the Making</span>
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-[#D4AF37]" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
            The Gallaspy is being built from the ground up around golf,
            hospitality, community, and long-term legacy. The journey begins
            now through the Invitational, future membership community, and
            relationships that can help bring the larger vision to life.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {journeyOptions.map((option) => (
            <article
              key={option.title}
              className="group flex min-h-[220px] flex-col rounded-[18px] border border-white/12 bg-white/[0.07] px-6 py-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#FFD76A]/45 hover:bg-white/[0.1]"
            >
              <div className="h-px w-10 bg-[#D4AF37] transition-all duration-300 group-hover:w-16" />

              <h3 className="mt-5 font-serif text-2xl font-light leading-tight sm:text-[1.75rem]">
                {option.title}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-6 text-white/68">
                {option.description}
              </p>

              <Link
                href={option.href}
                className="mt-6 inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFD76A] transition hover:text-white"
              >
                {option.label}
                <span className="ml-3 text-base transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl border-t border-white/12 pt-7 text-center">
          <p className="font-serif text-xl font-light leading-relaxed text-white sm:text-2xl">
            Championship golf. Timeless hospitality. A legacy designed for
            generations.
          </p>

          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A]">
            Georgia · Est. 2026
          </p>
        </div>
      </div>
    </section>
  );
}