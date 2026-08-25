"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductCard from "@/components/apparel/ProductCard";

type CollectionView = "men" | "women";

type WomensProductType =
  | "womens-polo"
  | "womens-sleeveless-polo"
  | "womens-skirt";

const mensProducts = [
  {
    name: "Navy Performance Polo",
    category: "Polos",
    productType: "polo" as const,
    colorLabel: "Navy",
    scriptImage:
      "/images/apparel/gallaspy/navy-script-polo.jpg",
    crestImage:
      "/images/apparel/gallaspy/navy-crest-polo.jpg",
    price: "$70",
  },
  {
    name: "White Performance Polo",
    category: "Polos",
    productType: "polo" as const,
    colorLabel: "White",
    scriptImage:
      "/images/apparel/gallaspy/white-script-polo.jpg",
    crestImage:
      "/images/apparel/gallaspy/white-crest-polo.jpg",
    price: "$70",
  },
  {
    name: "Forest Green Performance Polo",
    category: "Polos",
    productType: "polo" as const,
    colorLabel: "Forest Green",
    scriptImage:
      "/images/apparel/gallaspy/forest-green-script-polo.jpg",
    crestImage:
      "/images/apparel/gallaspy/forest-green-crest-polo.jpg",
    price: "$70",
  },
  {
    name: "Navy Club Hat",
    category: "Headwear",
    productType: "hat" as const,
    colorLabel: "Navy",
    scriptImage:
      "/images/apparel/gallaspy/navy-script-hat.jpg",
    crestImage:
      "/images/apparel/gallaspy/navy-crest-hat.jpg",
    price: "$45",
  },
  {
    name: "White Club Hat",
    category: "Headwear",
    productType: "hat" as const,
    colorLabel: "White",
    scriptImage:
      "/images/apparel/gallaspy/white-script-hat.jpg",
    crestImage:
      "/images/apparel/gallaspy/white-crest-hat.jpg",
    price: "$45",
  },
  {
    name: "Forest Green Club Hat",
    category: "Headwear",
    productType: "hat" as const,
    colorLabel: "Forest Green",
    scriptImage:
      "/images/apparel/gallaspy/forest-green-script-hat.jpg",
    crestImage:
      "/images/apparel/gallaspy/forest-green-crest-hat.jpg",
    price: "$45",
  },
];

const womensProducts = [
  {
    name: "Navy Women's Crest Polo",
    category: "Women's Polos",
    productType: "womens-polo" as const,
    colorLabel: "Navy",
    image:
      "/images/apparel/gallaspy/women/navy-womens-crest-polo.jpg",
    price: "$70",
  },
  {
    name: "White Women's Crest Polo",
    category: "Women's Polos",
    productType: "womens-polo" as const,
    colorLabel: "White",
    image:
      "/images/apparel/gallaspy/women/white-womens-crest-polo.jpg",
    price: "$70",
  },
  {
    name: "Forest Green Women's Crest Polo",
    category: "Women's Polos",
    productType: "womens-polo" as const,
    colorLabel: "Forest Green",
    image:
      "/images/apparel/gallaspy/women/forest-green-womens-crest-polo.jpg",
    price: "$70",
  },
  {
    name: "Navy Women's Sleeveless Crest Polo",
    category: "Women's Sleeveless Polos",
    productType:
      "womens-sleeveless-polo" as const,
    colorLabel: "Navy",
    image:
      "/images/apparel/gallaspy/women/navy-womens-sleeveless-crest-polo.jpg",
    price: "$70",
  },
  {
    name: "White Women's Sleeveless Crest Polo",
    category: "Women's Sleeveless Polos",
    productType:
      "womens-sleeveless-polo" as const,
    colorLabel: "White",
    image:
      "/images/apparel/gallaspy/women/white-womens-sleeveless-crest-polo.jpg",
    price: "$70",
  },
  {
    name: "Forest Green Women's Sleeveless Crest Polo",
    category: "Women's Sleeveless Polos",
    productType:
      "womens-sleeveless-polo" as const,
    colorLabel: "Forest Green",
    image:
      "/images/apparel/gallaspy/women/forest-green-womens-sleeveless-crest-polo.jpg",
    price: "$70",
  },
  {
    name: "Navy Women's Crest Skirt",
    category: "Women's Skirts",
    productType: "womens-skirt" as const,
    colorLabel: "Navy",
    image:
      "/images/apparel/gallaspy/women/navy-womens-crest-skirt.jpg",
    price: "$70",
  },
  {
    name: "White Women's Crest Skirt",
    category: "Women's Skirts",
    productType: "womens-skirt" as const,
    colorLabel: "White",
    image:
      "/images/apparel/gallaspy/women/white-womens-crest-skirt.jpg",
    price: "$70",
  },
  {
    name: "Forest Green Women's Crest Skirt",
    category: "Women's Skirts",
    productType: "womens-skirt" as const,
    colorLabel: "Forest Green",
    image:
      "/images/apparel/gallaspy/women/forest-green-womens-crest-skirt.jpg",
    price: "$70",
  },
];

export default function GallaspyCollectionShop() {
  const [view, setView] =
    useState<CollectionView>("men");

  return (
    <section
      id="products"
      className="scroll-mt-24 bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#B89146]">
              The Collection
            </p>

            <h2 className="mt-4 font-serif text-[2.7rem] font-light sm:text-5xl">
              Golf Apparel
              <span className="block">
                for Men &amp; Women
              </span>
            </h2>
          </div>

          <div className="inline-flex w-fit rounded-full border border-[#10263F]/12 bg-[#F7F4EE] p-1.5">
            <button
              type="button"
              onClick={() =>
                setView("men")
              }
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
              onClick={() =>
                setView("women")
              }
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

        {view === "men" ? (
          <>
            <div className="mt-8 flex flex-col gap-3 border-t border-[#10263F]/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-serif text-2xl font-light">
                Men&apos;s Collection
              </p>

              <p className="max-w-lg text-sm leading-7 text-[#52605A]">
                Performance polos and club
                headwear in Navy, White, and
                Forest Green with your choice
                of Script or Crest.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mensProducts.map(
                (product) => (
                  <ProductCard
                    key={product.name}
                    name={product.name}
                    category={
                      product.category
                    }
                    productType={
                      product.productType
                    }
                    colorLabel={
                      product.colorLabel
                    }
                    scriptImage={
                      product.scriptImage
                    }
                    crestImage={
                      product.crestImage
                    }
                    price={product.price}
                  />
                )
              )}
            </div>
          </>
        ) : (
          <>
            <div className="mt-8 flex flex-col gap-3 border-t border-[#10263F]/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-serif text-2xl font-light">
                  Women&apos;s Collection
                </p>

                <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#B89146]">
                  Gallaspy Crest
                </p>
              </div>

              <p className="max-w-lg text-sm leading-7 text-[#52605A]">
                Women&apos;s polos, sleeveless
                polos, and golf skirts in Navy,
                White, and Forest Green,
                finished with the Gallaspy Crest.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {womensProducts.map(
                (product) => (
                  <WomenProductCard
                    key={product.name}
                    name={product.name}
                    category={
                      product.category
                    }
                    productType={
                      product.productType
                    }
                    colorLabel={
                      product.colorLabel
                    }
                    image={product.image}
                    price={product.price}
                  />
                )
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function WomenProductCard({
  name,
  category,
  productType,
  colorLabel,
  image,
  price,
}: {
  name: string;
  category: string;
  productType: WomensProductType;
  colorLabel: string;
  image: string;
  price: string;
}) {
  const [size, setSize] =
    useState("M");

  const params =
    new URLSearchParams();

  params.set(
    "product",
    productType
  );

  params.set(
    "color",
    colorLabel
  );

  params.set(
    "design",
    "Crest"
  );

  params.set(
    "size",
    size
  );

  const checkoutHref =
    `/apparel/checkout?${params.toString()}`;

  return (
    <article className="group overflow-hidden rounded-[22px] border border-[#10263F]/10 bg-[#F7F4EE] transition duration-300 hover:-translate-y-1 hover:border-[#B89146]/35 hover:shadow-[0_20px_50px_rgba(16,38,63,0.1)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#ECE6DB]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.015]"
        />

        <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#10263F]/75 px-3 py-1.5 backdrop-blur-md">
          <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#FFD76A]">
            {colorLabel}
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

        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-medium">
            {price}
          </p>

          <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#8B6A34]">
            Crest
          </p>
        </div>

        <div className="mt-6">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
            Size
          </p>

          <div className="mt-3 grid grid-cols-4 gap-2">
            {[
              "S",
              "M",
              "L",
              "XL",
            ].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  setSize(option)
                }
                className={`min-h-[38px] rounded-lg border text-[9px] font-semibold transition ${
                  size === option
                    ? "border-[#10263F] bg-[#10263F] text-white"
                    : "border-[#10263F]/10 bg-white text-[#10263F] hover:border-[#B89146]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <Link
          href={checkoutHref}
          className="mt-6 inline-flex min-h-[46px] w-full items-center justify-center rounded-full bg-[#10263F] px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-[#B89146]"
        >
          Purchase
          <span className="ml-3">
            →
          </span>
        </Link>

        <p className="mt-3 text-center text-[10px] leading-5 text-[#52605A]">
          Secure checkout powered by Square.
        </p>
      </div>
    </article>
  );
}