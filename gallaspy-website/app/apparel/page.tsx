import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apparel | The Gallaspy Golf & Country Club",
  description:
    "Explore The Gallaspy Collection, Members Only apparel, and the Falcon Society founding collection.",
};

const collections = [
  {
    eyebrow: "Public Collection",
    title: "The Gallaspy Collection",
    description:
      "Signature golf and lifestyle apparel representing The Gallaspy. Available to golfers and supporters through selected public releases.",
    href: "/apparel/gallaspy",
    action: "Shop the Collection",
    image:
      "/images/apparel/gallaspy/gallaspy-collection.jpg",
    imageAlt:
      "The Gallaspy public apparel collection",
    tone: "public" as const,
  },
  {
    eyebrow: "Private Club Collection",
    title: "Members Only",
    description:
      "A private apparel collection reserved exclusively for members of The Gallaspy Golf & Country Club — designed as a lasting expression of club belonging.",
    href: "/apparel/members",
    action: "View Member Collection",
    image:
      "/images/apparel/members/member-collection.jpg",
    imageAlt:
      "The Gallaspy Members Only apparel collection",
    tone: "members" as const,
  },
  {
    eyebrow: "Founding Collection",
    title: "Falcon Society",
    description:
      "A founding collection reserved for the first 100 members who define the opening chapter of The Gallaspy and carry its earliest traditions forward.",
    href: "/apparel/falcon-society",
    action: "View Falcon Society",
    image:
      "/images/apparel/falcon-society/falcon-society-collection.jpg",
    imageAlt:
      "The Gallaspy Falcon Society apparel collection",
    tone: "falcon" as const,
  },
];

export default function ApparelPage() {
  return (
    <main className="overflow-hidden bg-[#F7F4EE] text-[#10263F]">
      {/* HERO */}
      <section className="relative flex min-h-[76vh] items-center overflow-hidden px-5 pt-[82px] text-white sm:px-8 lg:px-10">
        <Image
          src="/images/apparel/apparel-hero.jpg"
          alt="The Gallaspy apparel collection"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#071827]/58" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071827]/96 via-[#071827]/70 to-[#071827]/24" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/78 via-transparent to-[#071827]/20" />

        <div className="relative z-10 mx-auto w-full max-w-6xl py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#FFD76A]">
              The Gallaspy Apparel
            </p>

            <h1 className="mt-5 max-w-4xl font-serif text-[3rem] font-light leading-[0.98] sm:text-6xl lg:text-[5.2rem]">
              Three Collections.
              <span className="block text-[#FFD76A]">
                Three Levels of Belonging.
              </span>
            </h1>

            <div className="mt-7 h-px w-20 bg-[#B89146]" />

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
              Signature Gallaspy apparel for the public, private merchandise
              reserved for members, and a founding collection created for the
              Falcon Society.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/apparel/gallaspy"
                className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#FFD76A] px-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Shop The Gallaspy Collection
              </Link>

              <Link
                href="#collections"
                className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-white/45 bg-[#10263F]/25 px-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
              >
                Explore All Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#B89146]">
              The Collection Structure
            </p>

            <h2 className="mt-5 font-serif text-[2.6rem] font-light leading-tight sm:text-5xl">
              What You Wear
              <span className="block">
                Should Mean Something
              </span>
            </h2>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />
          </div>

          <div className="lg:border-l lg:border-[#10263F]/12 lg:pl-12">
            <p className="font-serif text-2xl font-light leading-relaxed sm:text-3xl">
              Public apparel represents the brand. Private apparel represents
              belonging.
            </p>

            <p className="mt-6 text-sm leading-7 text-[#52605A] sm:text-base sm:leading-8">
              The Gallaspy Collection is available to golfers and supporters.
              Members Only and Falcon Society apparel remain intentionally
              restricted so each collection preserves the meaning behind the
              status it represents.
            </p>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section
        id="collections"
        className="scroll-mt-24 bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
      >
        <div className="mx-auto w-full max-w-6xl space-y-10">
          {collections.map((collection, index) => {
            const reverse = index === 1;

            const panelClass =
              collection.tone === "public"
                ? "border-[#10263F]/10 bg-[#F7F4EE]"
                : collection.tone === "members"
                  ? "border-white/10 bg-[#10263F] text-white"
                  : "border-[#D4AF37]/28 bg-[#0D3027] text-white shadow-[0_28px_80px_rgba(13,48,39,0.16)]";

            const eyebrowClass =
              collection.tone === "public"
                ? "text-[#B89146]"
                : "text-[#FFD76A]";

            const dividerClass =
              collection.tone === "public"
                ? "bg-[#B89146]"
                : "bg-[#FFD76A]";

            const bodyClass =
              collection.tone === "public"
                ? "text-[#52605A]"
                : "text-white/70";

            const buttonClass =
              collection.tone === "public"
                ? "border-[#10263F] bg-[#10263F] text-white hover:border-[#B89146] hover:bg-[#B89146]"
                : "border-[#FFD76A] text-white hover:bg-[#FFD76A] hover:text-[#10263F]";

            return (
              <article
                key={collection.title}
                className={`overflow-hidden rounded-[28px] border ${panelClass}`}
              >
                <div className="grid lg:grid-cols-2">
                  {/* IMAGE */}
                  <div
                    className={`relative min-h-[420px] overflow-hidden sm:min-h-[520px] lg:min-h-[590px] ${
                      reverse ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={collection.image}
                      alt={collection.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition duration-700 hover:scale-[1.025]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/60 via-transparent to-transparent" />

                    {collection.tone === "falcon" && (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,215,106,0.08),transparent_38%)]" />
                    )}

                  </div>

                  {/* CONTENT */}
                  <div
                    className={`flex min-h-[420px] flex-col justify-center p-8 sm:p-10 lg:min-h-[590px] lg:p-14 ${
                      reverse ? "lg:order-1" : ""
                    } ${
                      collection.tone === "falcon"
                        ? "lg:px-16"
                        : ""
                    }`}
                  >
                    <p
                      className={`text-[9px] font-semibold uppercase tracking-[0.3em] ${eyebrowClass}`}
                    >
                      {collection.eyebrow}
                    </p>

                    <h2 className="mt-5 min-h-[3.2rem] font-serif text-4xl font-light leading-tight sm:text-5xl lg:min-h-[4rem]">
                      {collection.title}
                    </h2>

                    <div
                      className={`mt-6 h-px w-14 ${dividerClass}`}
                    />

                    <p
                      className={`mt-6 max-w-xl text-sm leading-7 sm:text-base ${bodyClass}`}
                    >
                      {collection.description}
                    </p>

                    <div className="mt-10">
                      <Link
                        href={collection.href}
                        className={`inline-flex min-h-[50px] min-w-[220px] items-center justify-center rounded-full border px-7 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:-translate-y-0.5 ${buttonClass}`}
                      >
                        {collection.action}
                        <span className="ml-3">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ACCESS LEVELS */}
      <section className="bg-[#F7F4EE] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-3">
          <AccessCard
            number="01"
            title="Public"
            subtitle="The Gallaspy Collection"
            description="Available for purchase by golfers, supporters, and customers without club membership."
          />

          <AccessCard
            number="02"
            title="Members"
            subtitle="Members Only"
            description="Reserved for verified members as a permanent expression of club belonging."
          />

          <AccessCard
            number="03"
            title="Founding 100"
            subtitle="Falcon Society"
            description="Founding apparel reserved for the earliest members who define The Gallaspy's opening chapter."
          />
        </div>
      </section>

      {/* FINAL NOTE */}
      <section className="bg-[#EEE8DC] px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B89146]">
            Collection Access
          </p>

          <p className="mt-4 text-xs leading-6 text-[#52605A]">
            Purchasing public Gallaspy merchandise does not confer membership,
            Falcon Society status, club privileges, or priority membership
            consideration. Members Only and Falcon Society collections remain
            subject to their respective eligibility requirements.
          </p>
        </div>
      </section>
    </main>
  );
}

function AccessCard({
  number,
  title,
  subtitle,
  description,
}: {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <article className="rounded-[22px] border border-[#10263F]/10 bg-white p-7">
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#B89146]">
          {number}
        </p>

        <div className="h-px w-10 bg-[#B89146]" />
      </div>

      <h3 className="mt-6 font-serif text-3xl font-light">
        {title}
      </h3>

      <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
        {subtitle}
      </p>

      <p className="mt-5 text-sm leading-7 text-[#52605A]">
        {description}
      </p>
    </article>
  );
}