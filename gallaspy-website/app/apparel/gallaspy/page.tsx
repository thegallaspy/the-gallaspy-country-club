import type { Metadata } from "next";
import Link from "next/link";
import GallaspyCollectionShop from "@/components/apparel/GallaspyCollectionShop";

export const metadata: Metadata = {
  title: "The Gallaspy Collection | Apparel",
  description:
    "Shop The Gallaspy Collection — signature golf apparel for men and women.",
};

export default function GallaspyCollectionPage() {
  return (
    <main className="overflow-hidden bg-[#F7F4EE] text-[#10263F]">
      {/* HERO */}
      <section className="relative flex min-h-[64vh] items-center bg-[#10263F] px-5 pt-[82px] text-white sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,106,0.09),transparent_40%)]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#FFD76A]">
              Public Collection
            </p>

            <h1 className="mt-5 font-serif text-[3rem] font-light leading-[0.98] sm:text-6xl lg:text-[5rem]">
              The Gallaspy
              <span className="block text-[#FFD76A]">
                Collection
              </span>
            </h1>

            <div className="mt-7 h-px w-20 bg-[#B89146]" />

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Signature golf apparel for men and women in Navy, White, and
              Forest Green, created around the official Gallaspy identity.
            </p>

            <Link
              href="#products"
              className="mt-9 inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#B89146]">
              Signature Apparel
            </p>

            <h2 className="mt-5 font-serif text-[2.6rem] font-light leading-tight sm:text-5xl">
              Built for the Game.
              <span className="block">
                Designed for The Gallaspy.
              </span>
            </h2>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />
          </div>

          <div className="lg:border-l lg:border-[#10263F]/12 lg:pl-12">
            <p className="font-serif text-2xl font-light leading-relaxed sm:text-3xl">
              A public collection with distinct men&apos;s and women&apos;s
              apparel.
            </p>

            <p className="mt-6 text-sm leading-7 text-[#52605A] sm:text-base sm:leading-8">
              Men&apos;s polos and headwear are offered in Script and Crest
              designs. The current women&apos;s collection is Crest-led, with
              polos, sleeveless polos, and golf skirts in the core Gallaspy
              palette.
            </p>
          </div>
        </div>
      </section>

      {/* MEN / WOMEN SHOP */}
      <GallaspyCollectionShop />

      {/* COLLECTION NOTE */}
      <section className="bg-[#10263F] px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#FFD76A]">
              The Gallaspy Collection
            </p>

            <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
              Publicly Available.
              <span className="block">
                Distinctly Gallaspy.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
              This collection is available to golfers and supporters while
              Members Only and Falcon Society apparel remain separate from
              general retail.
            </p>
          </div>

          <div className="lg:border-l lg:border-white/12 lg:pl-10">
            <p className="text-sm leading-7 text-white/65">
              Public purchases are securely processed through Square.
              Availability, sizes, and quantities may vary by release.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#FFD76A] hover:text-[#10263F]"
            >
              Apparel Inquiries
            </Link>
          </div>
        </div>
      </section>

      {/* BACK */}
      <section className="bg-[#EEE8DC] px-5 py-10 text-center sm:px-8">
        <Link
          href="/apparel"
          className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B6A34] transition hover:text-[#10263F]"
        >
          ← Back to All Apparel
        </Link>
      </section>
    </main>
  );
}