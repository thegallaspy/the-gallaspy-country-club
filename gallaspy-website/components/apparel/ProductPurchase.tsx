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
      <div className="mt-7 border-l-[3px] border-[#B3262D] bg-white/55 px-5 py-4">
        <p className="text-[8px] font-black uppercase tracking-[0.28em] text-[#B3262D]">
          Founding Apparel · Pre-Order
        </p>

        <p className="mt-2 text-sm leading-6 text-[#10263F]/65">
          Reserve this piece from the first official Gallaspy apparel
          production run.
        </p>
      </div>

      <div className="mt-7">
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
            Select your size to reserve this piece.
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={!selectedSize}
        onClick={addToBag}
        className={`mt-7 flex min-h-[60px] w-full items-center justify-center px-7 text-[9px] font-black uppercase tracking-[0.25em] transition ${
          !selectedSize
            ? "cursor-not-allowed bg-[#10263F]/20 text-[#10263F]/40"
            : added
              ? "bg-[#0D352C] text-white"
              : "bg-[#10263F] text-white hover:bg-[#0D352C]"
        }`}
      >
        {added
          ? "Reserved in Bag ✓"
          : selectedSize
            ? `Pre-Order — ${price}`
            : "Select Size to Pre-Order"}
      </button>

      <div className="mt-4 grid grid-cols-3 divide-x divide-[#10263F]/10 border-y border-[#10263F]/10 py-4">
        <div className="px-2 text-center first:pl-0">
          <p className="text-[7px] font-black uppercase leading-4 tracking-[0.16em] text-[#10263F]/55">
            First
            <span className="block">Production</span>
          </p>
        </div>

        <div className="px-2 text-center">
          <p className="text-[7px] font-black uppercase leading-4 tracking-[0.16em] text-[#10263F]/55">
            Secure
            <span className="block">Checkout</span>
          </p>
        </div>

        <div className="px-2 text-center last:pr-0">
          <p className="text-[7px] font-black uppercase leading-4 tracking-[0.16em] text-[#10263F]/55">
            Email
            <span className="block">Updates</span>
          </p>
        </div>
      </div>

      <p className="mt-4 text-[10px] leading-5 text-[#10263F]/45">
        This item is offered by pre-order and is not currently ready to ship.
        Payment is collected at checkout to reserve your selection. Production
        and fulfillment updates will be sent to the email provided with your
        order.
      </p>
    </>
  );
}
