import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Founder's Letter | The Gallaspy Golf & Country Club",
  description:
    "Read the founder's vision for The Gallaspy Golf & Country Club and the legacy it is being created to build.",
};

export default function FoundersLetterPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      {/* Hero */}
      <section className="relative flex min-h-[66vh] items-center overflow-hidden px-5 pt-[72px] sm:px-8">
        <Image
          src="/images/arrival.png"
          alt="The arrival experience at The Gallaspy Golf and Country Club"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#10263F]/68" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/92 via-[#10263F]/62 to-[#10263F]/28" />

        <div className="relative z-10 mx-auto w-full max-w-[1060px] py-20 text-white sm:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              Founder&apos;s Letter
            </p>

            <h1 className="mt-5 font-serif text-[2.8rem] font-light leading-[1.02] text-white sm:text-6xl lg:text-[4.7rem]">
              A Legacy
              <span className="block">in the Making</span>
            </h1>

            <div className="mt-6 h-px w-16 bg-[#B89146]" />

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              A personal message about the purpose, values, and long-term
              vision behind The Gallaspy Golf &amp; Country Club.
            </p>
          </div>
        </div>
      </section>

      {/* Letter */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <aside>
            <div className="sticky top-28 rounded-[20px] border border-[#1E3557]/10 bg-white p-6 shadow-[0_20px_60px_rgba(16,38,63,0.06)] sm:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#B89146]">
                From the Founder
              </p>

              <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-[#10263F]">
                Building Something Worth Passing Down
              </h2>

              <div className="mt-5 h-px w-12 bg-[#B89146]" />

              <p className="mt-5 text-sm leading-7 text-[#1E3557]/75">
                The Gallaspy is guided by three principles:
              </p>

              <div className="mt-5 space-y-3">
                {["Tradition", "Family", "Excellence"].map((item) => (
                  <div
                    key={item}
                    className="rounded-[12px] bg-[#F7F4EE] px-4 py-3"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#10263F]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <article className="rounded-[22px] border border-[#1E3557]/10 bg-white px-6 py-9 shadow-[0_20px_70px_rgba(16,38,63,0.06)] sm:px-10 sm:py-12 lg:px-14">
            <p className="font-serif text-2xl font-light text-[#10263F] sm:text-3xl">
              Dear Future Members, Partners, and Friends,
            </p>

            <div className="mt-8 space-y-6 text-[15px] leading-8 text-[#1E3557]/82">
              <p>
                Great clubs are not built overnight. They are built through
                vision, purpose, patience, and an unwavering commitment to
                excellence.
              </p>

              <p>
                The Gallaspy Golf &amp; Country Club was created to become more
                than a destination. It is being envisioned as a tradition—one
                that families can pass down, friendships can grow within, and
                generations can proudly call home.
              </p>

              <p>
                My vision is to establish one of the South&apos;s most
                distinguished private clubs, where championship golf,
                exceptional service, timeless architecture, and meaningful
                experiences come together in a setting unlike any other.
              </p>

              <p>
                The club is being planned around a complete lifestyle. Members
                will be able to enjoy championship golf, fine dining, wellness,
                racquet sports, vineyard experiences, family recreation,
                private events, and luxury lodging within one connected
                destination.
              </p>

              <p>
                Every decision we make is guided by three principles:
                tradition, family, and excellence.
              </p>

              <p>
                Tradition means honoring the values and standards that define
                the world&apos;s greatest clubs. Family means creating a place
                where every generation belongs. Excellence means pursuing the
                highest standard in everything we build, every experience we
                create, and every relationship we foster.
              </p>

              <p>
                The proposed 585.6-acre setting in Covington, Georgia gives us
                the opportunity to create something truly meaningful. The land
                provides the room for championship golf, hospitality,
                wellness, residential living, recreation, and long-term growth
                while preserving privacy and the natural character of the
                property.
              </p>

              <p>
                This project will require thoughtful planning, strong
                partnerships, disciplined development, and people who believe
                in the long-term vision. It will be built in phases, with each
                chapter carefully designed to support the next.
              </p>

              <p>
                Most importantly, The Gallaspy will be shaped by the people who
                become part of it. The founding generation will help establish
                the culture, the traditions, and the standard by which the club
                will be known for decades to come.
              </p>

              <p>
                This is more than the beginning of a country club.
              </p>

              <p className="font-serif text-2xl font-light leading-relaxed text-[#10263F] sm:text-3xl">
                This is the beginning of a legacy.
              </p>
            </div>

            <div className="mt-10 border-t border-[#1E3557]/10 pt-8">
              <p className="font-serif text-2xl font-light text-[#10263F]">
                The Gallaspy
              </p>

              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#B89146]">
                Founder &amp; Managing Partner
              </p>

              <p className="mt-2 text-sm text-[#1E3557]/70">
                The Gallaspy Development Group
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-[#163A2F] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
            The Founding Vision
          </p>

          <blockquote className="mt-6 font-serif text-[2rem] font-light leading-[1.2] text-white sm:text-[2.8rem]">
            “The greatest measure of this club will not be what we build, but
            what families experience here for generations.”
          </blockquote>

          <div className="mx-auto mt-7 h-px w-14 bg-[#B89146]" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1E3557] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1060px] flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Become Part of the Story
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              Join the Founding Generation
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/75">
              Register your interest to receive future project updates,
              development announcements, and membership information.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/membership#membership-interest"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Register Interest
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/40 px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}