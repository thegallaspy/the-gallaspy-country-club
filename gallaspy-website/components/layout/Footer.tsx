import Image from "next/image";
import Link from "next/link";

const exploreLinks = [
  { name: "Why the Gallaspy?", href: "/why-the-gallaspy" },
  { name: "Master Plan", href: "/master-plan" },
  { name: "Membership", href: "/membership" },
  { name: "Investment", href: "/investment" },
  { name: "Founder’s Letter", href: "/founders-letter" },
];

const clubLinks = [
  { name: "Championship Golf", href: "/club#golf" },
  { name: "Tennis", href: "/club#tennis" },
  { name: "Wellness & Spa", href: "/club#wellness" },
  { name: "Events", href: "/club#events" },
  { name: "Mercury Street Restaurant", href: "/club#restaurants" },
  { name: "Vineyard", href: "/club#vineyard" },
];

const informationLinks = [
  { name: "Gallery", href: "/gallery" },
  { name: "Careers", href: "/careers" },
  { name: "Frequently Asked Questions", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#081B2D] text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.09]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#10263F]/90 via-[#081B2D]/95 to-[#061522]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,215,106,0.12),transparent_34%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(184,145,70,0.1),transparent_36%)]" />
      </div>

      {/* Closing statement */}
      <div className="relative z-10 border-b border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 pb-16 pt-20 text-center sm:px-8 sm:pb-20 sm:pt-24 lg:px-10 lg:pb-24 lg:pt-28">
          <Link
            href="/"
            aria-label="The Gallaspy Golf and Country Club home"
            className="group relative"
          >
            <div className="absolute inset-0 scale-75 rounded-full bg-[#FFD76A]/10 blur-3xl transition duration-700 group-hover:scale-100 group-hover:bg-[#FFD76A]/15" />

            <Image
              src="/logos/crest.png"
              alt="The Gallaspy crest"
              width={170}
              height={170}
              className="relative h-auto w-[108px] object-contain drop-shadow-[0_18px_35px_rgba(0,0,0,0.35)] sm:w-[125px]"
            />
          </Link>

          <p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.46em] text-[#FFD76A] sm:text-[10px]">
            Covington, Georgia
          </p>

          <h2 className="mt-5 max-w-5xl font-serif text-[2.55rem] font-light leading-[1.03] tracking-[-0.025em] text-white sm:text-5xl lg:text-[4.3rem]">
            A Legacy of Golf,
            <span className="block text-white/88">
              Hospitality, and Belonging
            </span>
          </h2>

          <div className="mt-7 flex items-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#B89146]" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#FFD76A]" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#B89146]" />
          </div>

          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
            The Gallaspy Golf &amp; Country Club is being envisioned as a
            distinguished private destination where championship golf,
            timeless hospitality, wellness, recreation, and family traditions
            come together for generations.
          </p>

          <div className="mt-9 flex w-full max-w-xl flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/membership"
              className="group inline-flex min-h-[50px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#B89146] px-7 text-[10px] font-semibold uppercase tracking-[0.21em] text-white shadow-[0_16px_38px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-1 hover:bg-[#FFD76A] hover:text-[#10263F]"
            >
              Membership Interest

              <span
                className="ml-3 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>

            <Link
              href="/contact"
              className="group inline-flex min-h-[50px] items-center justify-center rounded-full border border-white/30 bg-white/[0.035] px-7 text-[10px] font-semibold uppercase tracking-[0.21em] text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              Contact the Team

              <span
                className="ml-3 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 border-b border-white/10 py-14 md:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.9fr_0.9fr_1fr] lg:gap-9 lg:py-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="The Gallaspy Golf and Country Club home"
              className="inline-block"
            >
              <Image
                src="/logos/logo.png"
                alt="The Gallaspy Golf & Country Club"
                width={280}
                height={90}
                className="h-auto w-[205px] object-contain brightness-0 invert sm:w-[225px]"
              />
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/58">
              A future private golf and lifestyle destination founded on
              tradition, family, excellence, and long-term stewardship.
            </p>

            <div className="mt-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
                Follow the Journey
              </p>

              <a
                href="https://www.instagram.com/thegallaspy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow The Gallaspy on Instagram"
                className="group mt-4 inline-flex items-center gap-3 text-sm text-white/66 transition duration-300 hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/16 bg-white/[0.04] text-[11px] transition duration-300 group-hover:border-[#FFD76A]/70 group-hover:text-[#FFD76A]">
                  IG
                </span>

                <span>@thegallaspy</span>
              </a>
            </div>
          </div>

          {/* Explore */}
          <FooterColumn title="Explore" links={exploreLinks} />

          {/* Club */}
          <FooterColumn title="The Club" links={clubLinks} />

          {/* Information */}
          <FooterColumn title="Information" links={informationLinks} />

          {/* Contact */}
          <div>
            <FooterHeading>Contact</FooterHeading>

            <div className="mt-6 space-y-5 text-sm leading-6 text-white/62">
              <p>
                The Gallaspy Development Group
                <br />
                Covington, Georgia
              </p>

              <div>
                <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.24em] text-white/35">
                  Email
                </p>

                <a
                  href="mailto:TheGallaspy@gmail.com"
                  className="transition-colors duration-300 hover:text-[#FFD76A]"
                >
                  TheGallaspy@gmail.com
                </a>
              </div>

              <div>
                <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.24em] text-white/35">
                  Telephone
                </p>

                <a
                  href="tel:+14045431393"
                  className="transition-colors duration-300 hover:text-[#FFD76A]"
                >
                  404-543-1393
                </a>
              </div>

              <Link
                href="/contact"
                className="group mt-2 inline-flex items-center border-b border-[#B89146] pb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:text-[#FFD76A]"
              >
                Send an Inquiry

                <span
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-5 py-7 text-[10px] leading-5 text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} The Gallaspy Golf &amp; Country Club.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/privacy"
              className="transition-colors duration-300 hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-white"
            >
              Terms
            </Link>

            <span className="hidden h-1 w-1 rounded-full bg-[#B89146] sm:block" />

            <p>Private Golf &amp; Lifestyle Destination</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterLink = {
  name: string;
  href: string;
};

type FooterColumnProps = {
  title: string;
  links: FooterLink[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <FooterHeading>{title}</FooterHeading>

      <nav className="mt-6 flex flex-col items-start gap-3.5">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="group relative w-fit text-sm text-white/62 transition-colors duration-300 hover:text-white"
          >
            {link.name}

            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#B89146] transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </nav>
    </div>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A]">
        {children}
      </p>

      <div className="mt-3 h-px w-8 bg-[#B89146]/70" />
    </div>
  );
}