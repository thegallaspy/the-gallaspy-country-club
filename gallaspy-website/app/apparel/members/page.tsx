"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type CollectionView = "men" | "women";

const mensProducts = [
  {
    name: "Navy Falcon Polo",
    category: "Polos",
    image:
      "/images/apparel/members/navy-falcon-polo.jpg",
  },
  {
    name: "White Falcon Polo",
    category: "Polos",
    image:
      "/images/apparel/members/white-falcon-polo.jpg",
  },
  {
    name: "Forest Green Falcon Polo",
    category: "Polos",
    image:
      "/images/apparel/members/forest-green-falcon-polo.jpg",
  },
  {
    name: "Navy Falcon Hat",
    category: "Headwear",
    image:
      "/images/apparel/members/navy-falcon-hat.jpg",
  },
  {
    name: "White Falcon Hat",
    category: "Headwear",
    image:
      "/images/apparel/members/white-falcon-hat.jpg",
  },
  {
    name: "Forest Green Falcon Hat",
    category: "Headwear",
    image:
      "/images/apparel/members/forest-green-falcon-hat.jpg",
  },
];

const womensProducts = [
  {
    name: "Navy Women's Falcon Polo",
    category: "Women's Polos",
    image:
      "/images/apparel/members/women/navy-womens-falcon-polo.jpg",
  },
  {
    name: "White Women's Falcon Polo",
    category: "Women's Polos",
    image:
      "/images/apparel/members/women/white-womens-falcon-polo.jpg",
  },
  {
    name: "Forest Green Women's Falcon Polo",
    category: "Women's Polos",
    image:
      "/images/apparel/members/women/forest-green-womens-falcon-polo.jpg",
  },
  {
    name: "Navy Women's Sleeveless Falcon Polo",
    category: "Women's Sleeveless Polos",
    image:
      "/images/apparel/members/women/navy-womens-sleeveless-falcon-polo.jpg",
  },
  {
    name: "White Women's Sleeveless Falcon Polo",
    category: "Women's Sleeveless Polos",
    image:
      "/images/apparel/members/women/white-womens-sleeveless-falcon-polo.jpg",
  },
  {
    name: "Forest Green Women's Sleeveless Falcon Polo",
    category: "Women's Sleeveless Polos",
    image:
      "/images/apparel/members/women/forest-green-womens-sleeveless-falcon-polo.jpg",
  },
  {
    name: "Navy Women's Falcon Skirt",
    category: "Women's Skirts",
    image:
      "/images/apparel/members/women/navy-womens-falcon-skirt.jpg",
  },
  {
    name: "White Women's Falcon Skirt",
    category: "Women's Skirts",
    image:
      "/images/apparel/members/women/white-womens-falcon-skirt.jpg",
  },
  {
    name: "Forest Green Women's Falcon Skirt",
    category: "Women's Skirts",
    image:
      "/images/apparel/members/women/forest-green-womens-falcon-skirt.jpg",
  },
  {
    name: "Navy Women's Falcon Dress",
    category: "Women's Dresses",
    image:
      "/images/apparel/members/women/navy-womens-falcon-dress.jpg",
  },
  {
    name: "White Women's Falcon Dress",
    category: "Women's Dresses",
    image:
      "/images/apparel/members/women/white-womens-falcon-dress.jpg",
  },
  {
    name: "Forest Green Women's Falcon Dress",
    category: "Women's Dresses",
    image:
      "/images/apparel/members/women/forest-green-womens-falcon-dress.jpg",
  },
];

export default function MembersCollectionPage() {
  const [view, setView] =
    useState<CollectionView>("men");

  const activeProducts =
    view === "men"
      ? mensProducts
      : womensProducts;

  return (
    <main className="overflow-hidden bg-[#F7F4EE] text-[#10263F]">
      {/* HERO */}
      <section className="relative flex min-h-[68vh] items-center overflow-hidden bg-[#10263F] px-5 pt-[82px] text-white sm:px-8 lg:px-10">
        <Image
          src="/images/apparel/members/member-collection.jpg"
          alt="The Gallaspy Members Only apparel collection"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#071827]/68" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071827]/95 via-[#071827]/76 to-[#071827]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/75 via-transparent to-[#071827]/20" />

        <div className="relative z-10 mx-auto w-full max-w-6xl py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#FFD76A]">
              Private Club Collection
            </p>

            <h1 className="mt-5 font-serif text-[3rem] font-light leading-[0.98] sm:text-6xl lg:text-[5rem]">
              Members
              <span className="block text-[#FFD76A]">
                Only
              </span>
            </h1>

            <div className="mt-7 h-px w-20 bg-[#B89146]" />

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Falcon apparel reserved exclusively for members of The Gallaspy
              Golf &amp; Country Club.
            </p>

          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#B89146]">
              The Member Collection
            </p>

            <h2 className="mt-5 font-serif text-[2.6rem] font-light leading-tight sm:text-5xl">
              The Falcon
              <span className="block">
                Reserved for Members
              </span>
            </h2>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />
          </div>

          <div className="lg:border-l lg:border-[#10263F]/12 lg:pl-12">
            <p className="font-serif text-2xl font-light leading-relaxed sm:text-3xl">
              Publicly visible. Privately available.
            </p>

            <p className="mt-6 text-sm leading-7 text-[#52605A] sm:text-base sm:leading-8">
              The Falcon identity distinguishes formal club membership from
              general brand support. Member apparel is intended to remain a
              permanent privilege of belonging to The Gallaspy.
            </p>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#B89146]">
                Members Only
              </p>

              <h2 className="mt-4 font-serif text-[2.7rem] font-light sm:text-5xl">
                Falcon Collection
              </h2>
            </div>

            <div className="inline-flex w-fit rounded-full border border-[#10263F]/12 bg-[#F7F4EE] p-1.5">
              <button
                type="button"
                onClick={() => setView("men")}
                className={`min-w-[120px] rounded-full px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                  view === "men"
                    ? "bg-[#10263F] text-white shadow-sm"
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
                    ? "bg-[#10263F] text-white shadow-sm"
                    : "text-[#10263F]/55 hover:text-[#10263F]"
                }`}
              >
                Women
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[#10263F]/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-serif text-2xl font-light">
                {view === "men"
                  ? "Men's Member Collection"
                  : "Women's Member Collection"}
              </p>

              <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#B89146]">
                Falcon Identity
              </p>
            </div>

            <p className="max-w-lg text-sm leading-7 text-[#52605A]">
              {view === "men"
                ? "Member polos and headwear in Navy, White, and Forest Green."
                : "Member polos, sleeveless polos, golf skirts, and dresses in Navy, White, and Forest Green."}
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeProducts.map(
              (product) => (
                <MemberProductCard
                  key={product.name}
                  name={product.name}
                  category={product.category}
                  image={product.image}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP CONNECTION */}
      <section className="bg-[#10263F] px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#FFD76A]">
              Member Privilege
            </p>

            <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
              Membership Comes First.
              <span className="block">
                The Collection Follows.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
              Member Collection purchase access is reserved for verified
              members and remains separate from public Gallaspy retail.
            </p>
          </div>

          <div className="lg:border-l lg:border-white/12 lg:pl-10">
            <p className="text-sm leading-7 text-white/65">
              Interested in the future club? Join the Membership Interest List
              to follow development and membership announcements.
            </p>

            <Link
              href="/membership"
              className="mt-7 inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#10263F] transition hover:bg-white"
            >
              Membership Interest
            </Link>
          </div>
        </div>
      </section>

      {/* ACCESS NOTE */}
      <section className="bg-[#EEE8DC] px-5 py-10 text-center sm:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B89146]">
            Member Collection Access
          </p>

          <p className="mt-4 text-xs leading-6 text-[#52605A]">
            Display of Member Collection merchandise does not constitute a
            public offer for sale. Eligibility to purchase member-exclusive
            merchandise is restricted to verified club members.
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

function MemberProductCard({
  name,
  category,
  image,
}: {
  name: string;
  category: string;
  image: string;
}) {
  return (
    <article className="group overflow-hidden rounded-[22px] border border-[#10263F]/10 bg-[#F7F4EE] transition duration-300 hover:-translate-y-1 hover:border-[#B89146]/35 hover:shadow-[0_20px_50px_rgba(16,38,63,0.1)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#ECE6DB]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
        />

        <div className="absolute right-4 top-4 rounded-full border border-white/25 bg-[#10263F]/82 px-3 py-1.5 backdrop-blur-md">
          <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#FFD76A]">
            Member Exclusive
          </p>
        </div>
      </div>

      <div className="p-6">
        <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#B89146]">
          {category}
        </p>

        <h3 className="mt-4 font-serif text-[1.8rem] font-light leading-tight">
          {name}
        </h3>

        <div className="mt-6 rounded-[14px] border border-[#10263F]/10 bg-white px-4 py-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8B6A34]">
            Membership Required
          </p>

          <p className="mt-2 text-xs leading-5 text-[#52605A]">
            Purchase access is reserved for verified members of The Gallaspy
            Golf &amp; Country Club.
          </p>
        </div>
      </div>
    </article>
  );
}