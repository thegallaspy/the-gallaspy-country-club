"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type CollectionView = "men" | "women";

const founderPolos = [
  {
    name: "Founder Polo I",
    category: "Founder Polos",
    image:
      "/images/apparel/falcon-society/red-founder-polo-1.jpg",
  },
  {
    name: "Founder Polo II",
    category: "Founder Polos",
    image:
      "/images/apparel/falcon-society/red-founder-polo-2.jpg",
  },
];

const womensFounderProducts = [
  {
    name: "Women's Founder Falcon Polo",
    category: "Women's Founder Polos",
    image:
      "/images/apparel/falcon-society/women/red-founder-womens-falcon-polo.jpg",
  },
  {
    name: "Women's Founder Sleeveless Falcon Polo",
    category: "Women's Founder Polos",
    image:
      "/images/apparel/falcon-society/women/red-founder-womens-sleeveless-falcon-polo.jpg",
  },
  {
    name: "Women's Founder Sleeveless Crest Polo",
    category: "Women's Founder Polos",
    image:
      "/images/apparel/falcon-society/women/red-founder-womens-sleeveless-crest-polo.jpg",
  },
  {
    name: "Women's Founder Falcon Skirt",
    category: "Women's Founder Skirts",
    image:
      "/images/apparel/falcon-society/women/red-founder-womens-falcon-skirt.jpg",
  },
  {
    name: "Women's Founder Falcon Dress",
    category: "Women's Founder Dresses",
    image:
      "/images/apparel/falcon-society/women/red-founder-womens-falcon-dress.jpg",
  },
];

const hats = [
  {
    name: "Navy Falcon Society Hat",
    image:
      "/images/apparel/falcon-society/navy-falcon-society-hat.jpg",
  },
  {
    name: "Red Falcon Society Hat",
    image:
      "/images/apparel/falcon-society/red-falcon-society-hat.jpg",
  },
  {
    name: "Forest Green Falcon Society Hat",
    image:
      "/images/apparel/falcon-society/forest-green-falcon-society-hat.jpg",
  },
  {
    name: "White Falcon Society Hat",
    image:
      "/images/apparel/falcon-society/white-falcon-society-hat.jpg",
  },
  {
    name: "Falcon Society Hat II",
    image:
      "/images/apparel/falcon-society/hat-2.jpg",
  },
];

export default function FalconSocietyCollectionPage() {
  const [view, setView] =
    useState<CollectionView>("men");

  return (
    <main className="overflow-hidden bg-[#F7F4EE] text-[#10263F]">
      {/* HERO */}
      <section className="relative flex min-h-[76vh] items-center overflow-hidden px-5 pt-[82px] text-white sm:px-8 lg:px-10">
        <Image
          src="/images/apparel/falcon-society/falcon-society-collection.jpg"
          alt="The Falcon Society apparel collection"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#071827]/64" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071827]/96 via-[#071827]/72 to-[#071827]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/82 via-transparent to-[#071827]/20" />

        <div className="relative z-10 mx-auto w-full max-w-6xl py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#FFD76A]">
              Founding Collection
            </p>

            <h1 className="mt-5 font-serif text-[3rem] font-light leading-[0.98] sm:text-6xl lg:text-[5.2rem]">
              Falcon Society
              <span className="block text-[#FFD76A]">
                Founding Member Collection
              </span>
            </h1>

            <div className="mt-7 h-px w-20 bg-[#B89146]" />

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
              A limited collection created to represent the founding
              generation of The Gallaspy Golf &amp; Country Club.
            </p>

            <div className="mt-8 inline-flex rounded-full border border-[#FFD76A]/40 bg-[#10263F]/40 px-5 py-2.5 backdrop-blur-sm">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFD76A]">
                Display Only · Founding 100
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-[#10263F] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#FFD76A]">
              Falcon Society
            </p>

            <h2 className="mt-5 font-serif text-[2.6rem] font-light leading-tight sm:text-5xl">
              Reserved for the
              <span className="block text-[#FFD76A]">
                Opening Chapter
              </span>
            </h2>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />
          </div>

          <div className="lg:border-l lg:border-white/12 lg:pl-12">
            <p className="font-serif text-2xl font-light leading-relaxed sm:text-3xl">
              Not general merchandise. Founding recognition.
            </p>

            <p className="mt-6 text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
              The Falcon Society Collection remains permanently connected to
              founding status. These pieces represent recognition of The
              Gallaspy&apos;s first 100 founding members and are never intended
              for unrestricted public retail.
            </p>
          </div>
        </div>
      </section>

      {/* FOUNDER APPAREL */}
      <section className="bg-[#F7F4EE] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#B89146]">
                Founders Apparel
              </p>

              <h2 className="mt-4 font-serif text-[2.7rem] font-light sm:text-5xl">
                The Founder Red Collection
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#52605A] sm:text-base">
                Founder Red is reserved exclusively for the Falcon Society,
                distinguishing the Founding 100 from every other Gallaspy
                collection.
              </p>
            </div>

            {/* MEN / WOMEN TABS */}
            <div className="inline-flex w-fit rounded-full border border-[#10263F]/12 bg-white p-1.5 shadow-sm">
              <button
                type="button"
                onClick={() => setView("men")}
                className={`min-w-[120px] rounded-full px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                  view === "men"
                    ? "bg-[#10263F] text-white"
                    : "text-[#10263F]/55 hover:text-[#10263F]"
                }`}
              >
                Men
              </button>

              <button
                type="button"
                onClick={() => setView("women")}
                className={`min-w-[120px] rounded-full px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                  view === "women"
                    ? "bg-[#10263F] text-white"
                    : "text-[#10263F]/55 hover:text-[#10263F]"
                }`}
              >
                Women
              </button>
            </div>
          </div>

          <div className="mt-10 border-t border-[#10263F]/10 pt-8">
            <p className="font-serif text-2xl font-light">
              {view === "men"
                ? "Men's Founder Collection"
                : "Women's Founder Collection"}
            </p>

            <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#B89146]">
              Founder Red · Founding 100 Exclusive
            </p>
          </div>

          {/* MEN */}
          {view === "men" && (
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {founderPolos.map((product) => (
                <FounderProductCard
                  key={product.name}
                  name={product.name}
                  category={product.category}
                  image={product.image}
                  large
                />
              ))}
            </div>
          )}

          {/* WOMEN */}
          {view === "women" && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {womensFounderProducts.map((product) => (
                <FounderProductCard
                  key={product.name}
                  name={product.name}
                  category={product.category}
                  image={product.image}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HEADWEAR */}
      <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#B89146]">
                Falcon Society Headwear
              </p>

              <h2 className="mt-4 font-serif text-[2.7rem] font-light sm:text-5xl">
                Founding Collection Hats
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#52605A]">
              Five Falcon Society hats complete the founding collection,
              reserved exclusively for the Founding 100.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hats.map((product) => (
              <article
                key={product.name}
                className="group overflow-hidden rounded-[22px] border border-[#10263F]/10 bg-[#F7F4EE] transition duration-300 hover:-translate-y-1 hover:border-[#B89146]/35 hover:shadow-[0_20px_50px_rgba(16,38,63,0.1)]"
              >
                <div className="relative aspect-square overflow-hidden bg-[#ECE6DB]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.025]"
                  />

                  <div className="absolute right-4 top-4 rounded-full border border-white/25 bg-[#10263F]/82 px-3 py-1.5 backdrop-blur-md">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#FFD76A]">
                      Falcon Society
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#B89146]">
                    Headwear
                  </p>

                  <h3 className="mt-4 font-serif text-[1.8rem] font-light leading-tight">
                    {product.name}
                  </h3>

                  <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8B6A34]">
                    Founding 100 Exclusive
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXCLUSIVITY */}
      <section className="bg-[#163A2F] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#FFD76A]">
            Founding Recognition
          </p>

          <h2 className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
            Some Pieces Should
            <span className="block text-[#FFD76A]">
              Never Become General Retail
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
            The value of the Falcon Society Collection comes from what it
            represents. Founder Red and the Falcon Society identity remain
            permanently tied to The Gallaspy&apos;s founding generation.
          </p>

          <Link
            href="/falcon-society"
            className="mt-9 inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#FFD76A] px-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#FFD76A] hover:text-[#10263F]"
          >
            Explore Falcon Society
          </Link>
        </div>
      </section>

      {/* NOTE */}
      <section className="bg-[#EEE8DC] px-5 py-10 text-center text-[#10263F] sm:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B89146]">
            Collection Status
          </p>

          <p className="mt-4 text-xs leading-6 text-[#52605A]">
            Falcon Society merchandise displayed on this page is not offered
            for public purchase. Display does not constitute a membership
            offer, reservation, guarantee of Falcon Society status, or current
            entitlement to merchandise.
          </p>

          <Link
            href="/apparel"
            className="mt-6 inline-flex text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B6A34] transition hover:text-[#10263F]"
          >
            ← Back to All Apparel
          </Link>
        </div>
      </section>
    </main>
  );
}

function FounderProductCard({
  name,
  category,
  image,
  large = false,
}: {
  name: string;
  category: string;
  image: string;
  large?: boolean;
}) {
  return (
    <article className="group overflow-hidden rounded-[24px] border border-[#B89146]/20 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#B89146]/50 hover:shadow-[0_24px_65px_rgba(16,38,63,0.12)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#ECE6DB]">
        <Image
          src={image}
          alt={name}
          fill
          sizes={
            large
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
        />

        <div className="absolute left-0 top-0 h-1 w-full bg-[#B89146]" />

        <div className="absolute right-5 top-5 rounded-full border border-[#FFD76A]/35 bg-[#10263F]/88 px-4 py-2 backdrop-blur-md">
          <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#FFD76A]">
            Founding 100
          </p>
        </div>
      </div>

      <div className="p-7 sm:p-8">
        <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#B89146]">
          {category}
        </p>

        <h3 className="mt-4 font-serif text-3xl font-light">
          {name}
        </h3>

        <div className="mt-6 border-t border-[#10263F]/10 pt-5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
            Founder Exclusive
          </p>

          <p className="mt-2 text-xs leading-6 text-[#52605A]">
            Part of the Falcon Society Founder Red collection. Reserved for
            Founding 100 recognition and not available for public purchase.
          </p>
        </div>
      </div>
    </article>
  );
}