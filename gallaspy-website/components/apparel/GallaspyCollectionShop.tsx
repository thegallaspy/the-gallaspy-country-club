"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type CollectionView = "men" | "women";

type CollectionProduct = {
  slug: string;
  name: string;
  category: string;
  color: string;
  price: string;
  image: string;
  collection: "men" | "women" | "headwear";
  mark: "Crest" | "Falcon" | "Script";
};

const products: CollectionProduct[] = [
  {
    slug: "navy-crest-performance-polo",
    name: "Crest Performance Polo",
    category: "Men's Performance Polo",
    color: "Navy",
    price: "$60",
    image: "/images/apparel/men/polos/navy-crest-mens-polo.png",
    collection: "men",
    mark: "Crest",
  },
  {
    slug: "forest-green-crest-performance-polo",
    name: "Crest Performance Polo",
    category: "Men's Performance Polo",
    color: "Forest Green",
    price: "$60",
    image: "/images/apparel/men/polos/forest-green-crest-mens-polo.png",
    collection: "men",
    mark: "Crest",
  },
  {
    slug: "white-crest-performance-polo",
    name: "Crest Performance Polo",
    category: "Men's Performance Polo",
    color: "White",
    price: "$60",
    image: "/images/apparel/men/polos/white-crest-mens-polo.png",
    collection: "men",
    mark: "Crest",
  },
  {
    slug: "navy-falcon-performance-polo",
    name: "Falcon Performance Polo",
    category: "Men's Performance Polo",
    color: "Navy",
    price: "$60",
    image: "/images/apparel/men/polos/navy-falcon-mens-polo.png",
    collection: "men",
    mark: "Falcon",
  },
  {
    slug: "forest-green-falcon-performance-polo",
    name: "Falcon Performance Polo",
    category: "Men's Performance Polo",
    color: "Forest Green",
    price: "$60",
    image: "/images/apparel/men/polos/forest-green-falcon-mens-polo.png",
    collection: "men",
    mark: "Falcon",
  },
  {
    slug: "white-falcon-performance-polo",
    name: "Falcon Performance Polo",
    category: "Men's Performance Polo",
    color: "White",
    price: "$60",
    image: "/images/apparel/men/polos/white-falcon-mens-polo.png",
    collection: "men",
    mark: "Falcon",
  },
  {
    slug: "navy-womens-falcon-sleeveless-quarter-zip",
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's Performance",
    color: "Navy",
    price: "$35",
    image: "/images/apparel/women/quarter-zips/navy-falcon-womens-sleeveless-quarter-zip.png",
    collection: "women",
    mark: "Falcon",
  },
  {
    slug: "forest-green-womens-falcon-sleeveless-quarter-zip",
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's Performance",
    color: "Forest Green",
    price: "$35",
    image: "/images/apparel/women/quarter-zips/forest-green-falcon-womens-sleeveless-quarter-zip.png",
    collection: "women",
    mark: "Falcon",
  },
  {
    slug: "white-womens-falcon-sleeveless-quarter-zip",
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's Performance",
    color: "White",
    price: "$35",
    image: "/images/apparel/women/quarter-zips/white-falcon-womens-sleeveless-quarter-zip.png",
    collection: "women",
    mark: "Falcon",
  },
  {
    slug: "navy-womens-falcon-skirt",
    name: "Falcon Performance Skirt",
    category: "Women's Performance",
    color: "Navy",
    price: "$45",
    image: "/images/apparel/women/skirts/navy-falcon-womens-skirt.png",
    collection: "women",
    mark: "Falcon",
  },
  {
    slug: "forest-green-womens-falcon-skirt",
    name: "Falcon Performance Skirt",
    category: "Women's Performance",
    color: "Forest Green",
    price: "$45",
    image: "/images/apparel/women/skirts/forest-green-falcon-womens-skirt.png",
    collection: "women",
    mark: "Falcon",
  },
  {
    slug: "white-womens-falcon-skirt",
    name: "Falcon Performance Skirt",
    category: "Women's Performance",
    color: "White",
    price: "$45",
    image: "/images/apparel/women/skirts/white-falcon-womens-skirt.png",
    collection: "women",
    mark: "Falcon",
  },
  {
    slug: "navy-crest-performance-hat",
    name: "Crest Performance Hat",
    category: "Performance Headwear",
    color: "Navy",
    price: "$45",
    image: "/images/apparel/headwear/crest/navy-crest-hat.png",
    collection: "headwear",
    mark: "Crest",
  },
  {
    slug: "forest-green-crest-performance-hat",
    name: "Crest Performance Hat",
    category: "Performance Headwear",
    color: "Forest Green",
    price: "$45",
    image: "/images/apparel/headwear/crest/forest-green-crest-performance-hat.png",
    collection: "headwear",
    mark: "Crest",
  },
  {
    slug: "white-crest-performance-hat",
    name: "Crest Performance Hat",
    category: "Performance Headwear",
    color: "White",
    price: "$45",
    image: "/images/apparel/headwear/crest/white-crest-performance-hat.png",
    collection: "headwear",
    mark: "Crest",
  },
  {
    slug: "navy-falcon-performance-hat",
    name: "Falcon Performance Hat",
    category: "Performance Headwear",
    color: "Navy",
    price: "$45",
    image: "/images/apparel/headwear/falcon/navy-falcon-hat.png",
    collection: "headwear",
    mark: "Falcon",
  },
  {
    slug: "forest-green-falcon-performance-hat",
    name: "Falcon Performance Hat",
    category: "Performance Headwear",
    color: "Forest Green",
    price: "$45",
    image: "/images/apparel/headwear/falcon/forest-green-falcon-hat.png",
    collection: "headwear",
    mark: "Falcon",
  },
  {
    slug: "white-falcon-performance-hat",
    name: "Falcon Performance Hat",
    category: "Performance Headwear",
    color: "White",
    price: "$45",
    image: "/images/apparel/headwear/falcon/white-falcon-hat.png",
    collection: "headwear",
    mark: "Falcon",
  },
  {
    slug: "navy-script-performance-hat",
    name: "Script Performance Hat",
    category: "Performance Headwear",
    color: "Navy",
    price: "$45",
    image: "/images/apparel/headwear/script/navy-script-hat.png",
    collection: "headwear",
    mark: "Script",
  },
  {
    slug: "forest-green-script-performance-hat",
    name: "Script Performance Hat",
    category: "Performance Headwear",
    color: "Forest Green",
    price: "$45",
    image: "/images/apparel/headwear/script/forest-green-script-hat.png",
    collection: "headwear",
    mark: "Script",
  },
  {
    slug: "white-script-performance-hat",
    name: "Script Performance Hat",
    category: "Performance Headwear",
    color: "White",
    price: "$45",
    image: "/images/apparel/headwear/script/white-script-hat.png",
    collection: "headwear",
    mark: "Script",
  },
  {
    slug: "navy-falcon-performance-quarter-zip",
    name: "Falcon Performance Quarter-Zip",
    category: "Men's Performance Quarter-Zip",
    color: "Navy",
    price: "$75",
    image: "/images/apparel/men/quarter-zips/navy-falcon-mens-quarter-zip.png",
    collection: "men",
    mark: "Falcon",
  },
  {
    slug: "navy-womens-falcon-performance-polo",
    name: "Falcon Performance Polo",
    category: "Women's Performance Polo",
    color: "Navy",
    price: "$60",
    image: "/images/apparel/women/polos/navy-falcon-womens-polo.png",
    collection: "women",
    mark: "Falcon",
  },
  {
    slug: "navy-crest-performance-quarter-zip",
    name: "Crest Performance Quarter-Zip",
    category: "Men's Performance Quarter-Zip",
    color: "Navy",
    price: "$75",
    image: "/images/apparel/men/quarter-zips/navy-crest-mens-quarter-zip.png",
    collection: "men",
    mark: "Crest",
  },
  {
    slug: "navy-womens-crest-performance-polo",
    name: "Crest Performance Polo",
    category: "Women's Performance Polo",
    color: "Navy",
    price: "$60",
    image: "/images/apparel/women/polos/navy-crest-womens-polo.png",
    collection: "women",
    mark: "Crest",
  },
  {
    slug: "forest-green-falcon-performance-quarter-zip",
    name: "Falcon Performance Quarter-Zip",
    category: "Men's Performance Quarter-Zip",
    color: "Forest Green",
    price: "$75",
    image: "/images/apparel/men/quarter-zips/forest-green-falcon-mens-quarter-zip.png",
    collection: "men",
    mark: "Falcon",
  },
  {
    slug: "forest-green-womens-falcon-performance-polo",
    name: "Falcon Performance Polo",
    category: "Women's Performance Polo",
    color: "Forest Green",
    price: "$60",
    image: "/images/apparel/women/polos/forest-green-falcon-womens-polo.png",
    collection: "women",
    mark: "Falcon",
  },
  {
    slug: "forest-green-crest-performance-quarter-zip",
    name: "Crest Performance Quarter-Zip",
    category: "Men's Performance Quarter-Zip",
    color: "Forest Green",
    price: "$75",
    image: "/images/apparel/men/quarter-zips/forest-green-crest-mens-quarter-zip.png",
    collection: "men",
    mark: "Crest",
  },
  {
    slug: "forest-green-womens-crest-performance-polo",
    name: "Crest Performance Polo",
    category: "Women's Performance Polo",
    color: "Forest Green",
    price: "$60",
    image: "/images/apparel/women/polos/forest-green-crest-womens-polo.png",
    collection: "women",
    mark: "Crest",
  },
  {
    slug: "white-falcon-performance-quarter-zip",
    name: "Falcon Performance Quarter-Zip",
    category: "Men's Performance Quarter-Zip",
    color: "White",
    price: "$75",
    image: "/images/apparel/men/quarter-zips/white-falcon-mens-quarter-zip.png",
    collection: "men",
    mark: "Falcon",
  },
  {
    slug: "white-womens-falcon-performance-polo",
    name: "Falcon Performance Polo",
    category: "Women's Performance Polo",
    color: "White",
    price: "$60",
    image: "/images/apparel/women/polos/white-falcon-womens-polo.png",
    collection: "women",
    mark: "Falcon",
  },
  {
    slug: "white-crest-performance-quarter-zip",
    name: "Crest Performance Quarter-Zip",
    category: "Men's Performance Quarter-Zip",
    color: "White",
    price: "$75",
    image: "/images/apparel/men/quarter-zips/white-crest-mens-quarter-zip.png",
    collection: "men",
    mark: "Crest",
  },
  {
    slug: "white-womens-crest-performance-polo",
    name: "Crest Performance Polo",
    category: "Women's Performance Polo",
    color: "White",
    price: "$60",
    image: "/images/apparel/women/polos/white-crest-womens-polo.png",
    collection: "women",
    mark: "Crest",
  },
];

function CollectionCard({ product }: { product: CollectionProduct }) {
  return (
    <Link
      href={`/apparel/${product.slug}`}
      className="group block overflow-hidden rounded-[22px] border border-[#10263F]/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#B89146]/35 hover:shadow-[0_20px_50px_rgba(16,38,63,0.1)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F3EFE6]">
        <Image
          src={product.image}
          alt={`${product.color} ${product.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-4 transition duration-500 group-hover:scale-[1.015]"
        />
        <div className="absolute left-4 top-4 rounded-full bg-[#10263F]/85 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white">
          {product.color}
        </div>
      </div>
      <div className="bg-[#F7F4EE] p-6">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#B89146]">
          {product.category} · {product.mark}
        </p>
        <h3 className="mt-3 font-serif text-2xl text-[#10263F]">{product.name}</h3>
        <p className="mt-3 text-lg font-medium text-[#10263F]">{product.price}</p>
        <span className="mt-6 inline-flex min-h-[46px] w-full items-center justify-center rounded-full bg-[#10263F] px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition group-hover:bg-[#B89146]">
          View Product →
        </span>
      </div>
    </Link>
  );
}

export default function GallaspyCollectionShop() {
  const [view, setView] = useState<CollectionView>("men");
  const visibleProducts = products.filter((product) =>
    view === "men"
      ? product.collection === "men" || product.collection === "headwear"
      : product.collection === "women"
  );

  return (
    <section id="products" className="scroll-mt-24 bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B89146]">Shop the Collection</p>
        <h2 className="mt-4 font-serif text-4xl font-light text-[#10263F] sm:text-5xl">The Gallaspy Collection</h2>
        <div className="mt-8 flex gap-3">
          {(["men", "women"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setView(option)}
              className={`min-h-[44px] rounded-full border px-7 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                view === option
                  ? "border-[#10263F] bg-[#10263F] text-white"
                  : "border-[#10263F]/20 text-[#10263F] hover:border-[#10263F]"
              }`}
            >
              {option === "men" ? "Men" : "Women"}
            </button>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-[#52605A]">
          {view === "men"
            ? "Performance polos, quarter-zips, and headwear featuring approved Falcon, Crest, and Script designs."
            : "Women’s performance polos, sleeveless quarter-zips, and golf skirts featuring Falcon and Crest designs."}
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <CollectionCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
