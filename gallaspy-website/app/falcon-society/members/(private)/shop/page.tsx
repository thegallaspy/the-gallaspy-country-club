"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductPurchase from "@/components/apparel/ProductPurchase";

type CollectionView = "men" | "women";

const mensProducts = [
  {
    slug: "falcon-society-founder-mens-polo",
    name: "Men's Founder Polo",
    category: "Founder Polo",
    color: "Founder Red",
    price: "$76",
    image:
      "/images/apparel/falcon-society/men/red-founder-mens-polo.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "falcon-society-founder-mens-vest",
    name: "Men's Founder Vest",
    category: "Founder Vest",
    color: "Founder Red",
    price: "$84",
    image:
      "/images/apparel/falcon-society/men/red-founder-mens-vest.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];

const womensProducts = [
  {
    slug: "falcon-society-founder-womens-polo",
    name: "Women's Founder Polo",
    category: "Founder Polo",
    color: "Founder Red",
    price: "$76",
    image:
      "/images/apparel/falcon-society/women/red-founder-womens-polo.png",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "falcon-society-founder-womens-sleeveless-quarter-zip",
    name: "Women's Founder Sleeveless Quarter-Zip",
    category: "Sleeveless Quarter-Zip",
    color: "Founder Red",
    price: "$80",
    image:
      "/images/apparel/falcon-society/women/red-founder-womens-sleeveless-quarter-zip.png",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "falcon-society-founder-womens-skirt",
    name: "Women's Founder Skirt",
    category: "Golf Skirt",
    color: "Founder Red",
    price: "$68",
    image:
      "/images/apparel/falcon-society/women/red-founder-womens-skirt.png",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
];

const hats = [
  {
    slug: "falcon-society-red-hat",
    name: "Red Falcon Society Hat",
    color: "Founder Red",
    image:
      "/images/apparel/falcon-society/hats/red-falcon-society-hat.png",
  },
  {
    slug: "falcon-society-navy-hat",
    name: "Navy Falcon Society Hat",
    color: "Navy",
    image:
      "/images/apparel/falcon-society/hats/navy-falcon-society-hat.png",
  },
  {
    slug: "falcon-society-forest-green-hat",
    name: "Forest Green Falcon Society Hat",
    color: "Forest Green",
    image:
      "/images/apparel/falcon-society/hats/forest-green-falcon-society-hat.png",
  },
  {
    slug: "falcon-society-white-hat",
    name: "White Falcon Society Hat",
    color: "White",
    image:
      "/images/apparel/falcon-society/hats/white-falcon-society-hat.png",
  },
];

export default function FalconSocietyShopPage() {
  const [view, setView] = useState<CollectionView>("men");

  const apparel = view === "men" ? mensProducts : womensProducts;

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#10263F]">
      <section className="bg-[#10263F] px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1120px]">
          <Link
            href="/falcon-society/members/home"
            className="text-[9px] font-bold uppercase tracking-[0.24em] text-white/50 transition hover:text-[#D7B56D]"
          >
            ← Members Room
          </Link>

          <div className="mt-12 max-w-4xl">
            <div className="flex items-center gap-4">
              <span className="h-2.5 w-2.5 bg-[#8C1D2C]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#D7B56D]">
                Founding 100 Exclusive
              </p>
            </div>

            <h1 className="mt-6 font-serif text-[3.5rem] font-light leading-[0.94] sm:text-6xl lg:text-[5.5rem]">
              The Society
              <span className="block text-[#D7B56D]">Shop.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              Falcon Society pieces reserved for The Gallaspy&apos;s founding
              generation. Founder Red remains exclusive to the Founding 100.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex flex-col gap-8 border-b border-[#10263F]/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#8C1D2C]">
                Founder Apparel
              </p>
              <h2 className="mt-3 font-serif text-4xl font-light">
                The Founder Red Collection
              </h2>
            </div>

            <div className="flex border border-[#10263F]/20">
              {(["men", "women"] as CollectionView[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setView(option)}
                  className={`min-h-[44px] min-w-[110px] px-5 text-[9px] font-bold uppercase tracking-[0.2em] transition ${
                    view === option
                      ? "bg-[#10263F] text-white"
                      : "bg-transparent text-[#10263F] hover:bg-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {apparel.map((product) => (
              <SocietyProduct key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#10263F]/15 bg-[#EEE8DC] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="max-w-3xl">
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#8C1D2C]">
              Headwear
            </p>
            <h2 className="mt-3 font-serif text-4xl font-light">
              Falcon Society Hats
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#33475B]/70">
              Member price · $45
            </p>
          </div>

          <div className="mt-10 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {hats.map((hat) => (
              <SocietyProduct
                key={hat.slug}
                product={{
                  ...hat,
                  category: "Falcon Society Headwear",
                  price: "$45",
                  sizes: ["One Size"],
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#8C1D2C] px-5 py-12 text-white sm:px-8">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/55">
              Falcon Society
            </p>
            <p className="mt-2 font-serif text-2xl font-light">
              Reserved for the Founding 100.
            </p>
          </div>

          <Link
            href="/apparel/bag"
            className="text-[9px] font-bold uppercase tracking-[0.22em] text-white"
          >
            View Your Bag →
          </Link>
        </div>
      </section>
    </main>
  );
}

function SocietyProduct({
  product,
}: {
  product: {
    slug: string;
    name: string;
    category: string;
    color: string;
    price: string;
    image: string;
    sizes: string[];
  };
}) {
  return (
    <article>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#ECE6DB]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-3"
        />

        <div className="absolute right-4 top-4 bg-[#10263F] px-3 py-2">
          <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-[#D7B56D]">
            Members Only
          </p>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#8C1D2C]">
              {product.category}
            </p>
            <h3 className="mt-2 font-serif text-2xl font-light leading-tight">
              {product.name}
            </h3>
            <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#10263F]/45">
              {product.color}
            </p>
          </div>

          <p className="shrink-0 text-sm font-bold">{product.price}</p>
        </div>

        <ProductPurchase
          slug={product.slug}
          name={product.name}
          color={product.color}
          price={product.price}
          image={product.image}
          sizes={product.sizes}
        />
      </div>
    </article>
  );
}
