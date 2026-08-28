import Image from "next/image";
import Link from "next/link";

const clubLinks = [
  { name: "The Club", href: "/the-club" },
  { name: "Play", href: "/play" },
  { name: "Invitational", href: "/invitational" },
  { name: "Traditions", href: "/traditions" },
];

const otherLinks = [
  { name: "The Gallaspy Apparel", href: "/apparel" },
  { name: "Our Story", href: "/why-the-gallaspy" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#071827] text-white">
      {/* TOP STATEMENT */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.38em] text-[#FFD76A]">
                The Gallaspy Golf Club
              </p>

              <div className="mt-5 h-px w-12 bg-[#FFD76A]" />

              <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
                Georgia · Est. 2026
              </p>
            </div>

            <div>
              <h2 className="max-w-[850px] font-serif text-[2.8rem] font-light leading-[0.96] tracking-[-0.03em] sm:text-[3.8rem] lg:text-[4.8rem]">
                Play the game.
                <span className="block italic text-[#FFD76A]">
                  Build the club.
                </span>
              </h2>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/play"
                  className="inline-flex min-h-[50px] items-center justify-center border border-[#FFD76A] bg-[#FFD76A] px-7 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#10263F] transition-all duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-white"
                >
                  Play With Us →
                </Link>

                <Link
                  href="/apparel"
                  className="inline-flex min-h-[50px] items-center justify-center border border-white/25 px-7 text-[9px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#FFD76A] hover:text-[#FFD76A]"
                >
                  Shop The Gallaspy →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 border-b border-white/10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] lg:gap-12 lg:py-16">
          {/* BRAND */}
          <div>
            <Link
              href="/"
              aria-label="The Gallaspy Golf Club home"
              className="inline-flex items-center gap-4"
            >
              <div className="relative h-20 w-20">
                <Image
                  src="/logos/crest.png"
                  alt="The Gallaspy crest"
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>

              <div>
                <p className="font-serif text-2xl font-light">
                  The Gallaspy
                </p>

                <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A]">
                  Golf Club
                </p>
              </div>
            </Link>

            <p className="mt-7 max-w-[330px] text-sm font-light leading-7 text-white/55">
              A golf club being built through the game, the people who play
              it, and the traditions created along the way.
            </p>

            <a
              href="https://www.instagram.com/thegallaspy"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFD76A] transition-colors hover:text-white"
            >
              Instagram · @thegallaspy →
            </a>
          </div>

          {/* CLUB */}
          <div>
            <FooterHeading>Club</FooterHeading>

            <nav className="mt-6 flex flex-col items-start gap-4">
              {clubLinks.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </nav>
          </div>

          {/* DISCOVER */}
          <div>
            <FooterHeading>Discover</FooterHeading>

            <nav className="mt-6 flex flex-col items-start gap-4">
              {otherLinks.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </nav>
          </div>

          {/* CONTACT */}
          <div>
            <FooterHeading>Contact</FooterHeading>

            <div className="mt-6">
              <p className="text-sm font-light leading-7 text-white/55">
                The Gallaspy Development Group, LLC
                <br />
                Georgia
              </p>

              <a
                href="mailto:info@thegallaspy.com"
                className="mt-5 inline-block text-sm text-white transition-colors hover:text-[#FFD76A]"
              >
                info@thegallaspy.com
              </a>

              <Link
                href="/contact"
                className="mt-7 flex w-fit items-center border-b border-[#FFD76A]/60 pb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFD76A] transition-colors hover:text-white"
              >
                Send An Inquiry →
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col gap-6 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] uppercase tracking-[0.15em] text-white/35">
            © {new Date().getFullYear()} The Gallaspy Golf Club
          </p>

          <div className="flex flex-wrap items-center gap-5 text-[9px] uppercase tracking-[0.15em] text-white/35">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-white"
            >
              Terms
            </Link>

            <span className="text-[#FFD76A]">●</span>

            <span>Play · Compete · Gather</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A]">
        {children}
      </p>

      <div className="mt-3 h-px w-8 bg-[#FFD76A]/70" />
    </div>
  );
}

function FooterLink({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative w-fit font-serif text-lg font-light text-white/65 transition-colors duration-300 hover:text-white"
    >
      {name}

      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#FFD76A] transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
