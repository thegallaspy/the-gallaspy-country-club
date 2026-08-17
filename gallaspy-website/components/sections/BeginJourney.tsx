import Image from "next/image";
import Link from "next/link";

const journeyOptions = [
  {
    eyebrow: "Play",
    title: "Join the 2027 Invitational",
    description:
      "Join the player priority list for the inaugural Gallaspy Invitational and receive official registration, venue, pricing, and tournament updates as they are released.",
    href: "/invitational/register",
    label: "Player Registration",
  },
  {
    eyebrow: "Partner",
    title: "Support the Invitational",
    description:
      "Explore founding sponsorship opportunities, on-course activations, hospitality, player gifting, awards, and custom brand integrations for the inaugural event.",
    href: "/invitational/sponsors",
    label: "Explore Sponsorship",
  },
  {
    eyebrow: "Belong",
    title: "Follow the Club Vision",
    description:
      "Register your interest in the future Gallaspy membership community and follow the journey as the long-term private-club vision continues to take shape.",
    href: "/membership",
    label: "Future Membership",
  },
];

export default function BeginJourney() {
  return (
    <section className="relative overflow-hidden bg-[#0B251E] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <Image
          src="/images/arrival.png"
          alt="Conceptual vision for the future arrival experience at The Gallaspy Golf and Country Club"
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#0B251E]/84" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0B251E]/96 via-[#0B251E]/74 to-[#0B251E]/86" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#071A15]/70 via-transparent to-[#071A15]/20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#FFD76A] sm:text-xs">
            Begin Your Journey
          </p>

          <h2 className="mt-4 font-serif text-[2.5rem] font-light leading-[1.08] sm:text-5xl lg:text-[3.6rem]">
            Choose How You Become
            <span className="block">Part of the Story</span>
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-[#D4AF37]" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
            The Gallaspy is being built from the ground up. Today, that journey
            continues through the 2027 Invitational, founding partnerships, and
            the community forming around the future club.
          </p>
        </div>

        {/* OPTIONS */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {journeyOptions.map((option) => (
            <article
              key={option.title}
              className="group flex min-h-[260px] flex-col rounded-[18px] border border-white/12 bg-white/[0.065] px-6 py-7 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#FFD76A]/45 hover:bg-white/[0.1]"
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#FFD76A]">
                {option.eyebrow}
              </p>

              <div className="mt-4 h-px w-10 bg-[#D4AF37] transition-all duration-300 group-hover:w-16" />

              <h3 className="mt-6 font-serif text-2xl font-light leading-tight sm:text-[1.75rem]">
                {option.title}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-7 text-white/68">
                {option.description}
              </p>

              <Link
                href={option.href}
                className="mt-7 inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFD76A] transition hover:text-white"
              >
                {option.label}

                <span className="ml-3 text-base transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>

        {/* FINAL BRAND LINE */}
        <div className="mx-auto mt-12 max-w-3xl border-t border-white/12 pt-8 text-center">
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