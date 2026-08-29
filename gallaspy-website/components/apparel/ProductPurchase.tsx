"use client";

import { useState } from "react";

type ProductPurchaseProps = {
  slug: string;
  name: string;
  color: string;
  price: string;
  image: string;
  sizes: string[];
};

export default function ProductPurchase({
  slug,
  name,
  color,
  price,
  image,
  sizes,
}: ProductPurchaseProps) {
  const [selectedSize, setSelectedSize] = useState(
    sizes.length === 1 && sizes[0] === "One Size" ? "One Size" : "",
  );
  const [added, setAdded] = useState(false);

  function addToBag() {
    if (!selectedSize) return;

    const cartItem = {
      id: `${slug}-${selectedSize}`,
      slug,
      name,
      color,
      price,
      image,
      size: selectedSize,
      quantity: 1,
    };

    const existingCart = JSON.parse(
      localStorage.getItem("gallaspy-cart") || "[]",
    );

    const existingIndex = existingCart.findIndex(
      (item: { id: string }) => item.id === cartItem.id,
    );

    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem(
      "gallaspy-cart",
      JSON.stringify(existingCart),
    );

    window.dispatchEvent(new Event("gallaspy-cart-updated"));

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  }

  return (
    <>
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#10263F]/45">
            {sizes[0] === "One Size" ? "Size" : "Select Size"}
          </p>

          {selectedSize && (
            <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#8B6A34]">
              {selectedSize}
            </p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {sizes.map((size) => {
            const active = selectedSize === size;

            return (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                style={{
                  color: active ? "#FFFFFF" : "#10263F",
                }}
                className={`min-w-[58px] border px-4 py-3 text-[9px] font-black uppercase tracking-[0.15em] transition ${
                  active
                    ? "border-[#10263F] bg-[#10263F]"
                    : "border-[#10263F]/25 bg-[#F8F5EE] hover:border-[#10263F] hover:bg-white"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>

        {!selectedSize && sizes[0] !== "One Size" && (
          <p className="mt-3 text-[10px] font-medium text-[#B3262D]">
            Select a size to add this item to your bag.
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={!selectedSize}
        onClick={addToBag}
        className={`mt-8 flex min-h-[58px] w-full items-center justify-center px-7 text-[9px] font-black uppercase tracking-[0.25em] transition ${
          !selectedSize
            ? "cursor-not-allowed bg-[#10263F]/20 text-[#10263F]/40"
            : added
              ? "bg-[#0D352C] text-white"
              : "bg-[#10263F] text-white hover:bg-[#0D352C]"
        }`}
      >
        {added ? "Added to Bag ✓" : "Add to Bag"}
      </button>
    </>
  );
}
