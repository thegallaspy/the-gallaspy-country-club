"use client";

import Image from "next/image";
import { useState } from "react";

type ProductCardProps = {
  name: string;
  category: string;
  colorLabel: string;
  scriptImage: string;
  crestImage: string;
  price: string;
};

export default function ProductCard({
  name,
  category,
  colorLabel,
  scriptImage,
  crestImage,
  price,
}: ProductCardProps) {
  const [design, setDesign] = useState<"script" | "crest">("script");

  const activeImage = design === "script" ? scriptImage : crestImage;

  return (
    <article className="group overflow-hidden rounded-[22px] border border-[#10263F]/10 bg-[#F7F4EE] transition duration-300 hover:-translate-y-1 hover:border-[#B89146]/35 hover:shadow-[0_20px_50px_rgba(16,38,63,0.1)]">
      {/* PRODUCT IMAGE */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#ECE6DB]">
        <Image
          src={activeImage}
          alt={`${colorLabel} ${name} - ${design === "script" ? "Script" : "Crest"} design`}
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

      {/* PRODUCT DETAILS */}
      <div className="p-6">
        <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#B89146]">
          {category}
        </p>

        <h3 className="mt-4 font-serif text-[1.8rem] font-light leading-tight text-[#10263F]">
          {name}
        </h3>

        <p className="mt-4 text-lg font-medium text-[#10263F]">
          {price}
        </p>

        {/* DESIGN SELECTOR */}
        <div className="mt-6">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
            Design
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setDesign("script")}
              className={`min-h-[42px] rounded-lg border px-3 text-[9px] font-semibold uppercase tracking-[0.16em] transition ${
                design === "script"
                  ? "border-[#10263F] bg-[#10263F] text-white"
                  : "border-[#10263F]/15 bg-white text-[#10263F] hover:border-[#B89146]"
              }`}
            >
              Script
            </button>

            <button
              type="button"
              onClick={() => setDesign("crest")}
              className={`min-h-[42px] rounded-lg border px-3 text-[9px] font-semibold uppercase tracking-[0.16em] transition ${
                design === "crest"
                  ? "border-[#10263F] bg-[#10263F] text-white"
                  : "border-[#10263F]/15 bg-white text-[#10263F] hover:border-[#B89146]"
              }`}
            >
              Crest
            </button>
          </div>
        </div>

        {/* SIZE SELECTOR PLACEHOLDER */}
        {category === "Polos" && (
          <div className="mt-6">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Size
            </p>

            <div className="mt-3 grid grid-cols-4 gap-2">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  type="button"
                  disabled
                  className="min-h-[38px] rounded-lg border border-[#10263F]/10 bg-white text-[9px] font-semibold text-[#10263F]/40"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PURCHASE */}
        <button
          type="button"
          disabled
          className="mt-6 inline-flex min-h-[46px] w-full items-center justify-center rounded-full bg-[#10263F] px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-white opacity-55"
        >
          Purchase Coming Soon
        </button>
      </div>
    </article>
  );
}