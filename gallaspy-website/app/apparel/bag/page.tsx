"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CartItem = {
  id: string;
  slug: string;
  name: string;
  color: string;
  price: string;
  image: string;
  size: string;
  quantity: number;
};

function priceToNumber(price: string) {
  return Number(price.replace(/[^0-9.]/g, "")) || 0;
}

export default function BagPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("gallaspy-cart") || "[]",
    ) as CartItem[];

    setItems(saved);
    setLoaded(true);
  }, []);

  function saveCart(nextItems: CartItem[]) {
    setItems(nextItems);

    localStorage.setItem(
      "gallaspy-cart",
      JSON.stringify(nextItems),
    );

    window.dispatchEvent(new Event("gallaspy-cart-updated"));
  }

  function changeQuantity(id: string, amount: number) {
    const nextItems = items
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(0, item.quantity + amount),
            }
          : item,
      )
      .filter((item) => item.quantity > 0);

    saveCart(nextItems);
  }

  function removeItem(id: string) {
    saveCart(items.filter((item) => item.id !== id));
  }

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + priceToNumber(item.price) * item.quantity,
        0,
      ),
    [items],
  );

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#F5F2EA] pt-32 text-[#10263F]" />
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F2EA] text-[#10263F]">
      {/* HEADER */}
      <section className="bg-[#10263F] px-5 pb-12 pt-32 text-white sm:px-8 sm:pb-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-[#B3262D]" />

            <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
              The Gallaspy Apparel
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="text-[3.6rem] font-black uppercase leading-[0.84] tracking-[-0.065em] sm:text-[5rem]">
              Your
              <span className="block text-[#E56A70]">Bag.</span>
            </h1>

            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-white/45">
              {itemCount} {itemCount === 1 ? "Item" : "Items"}
            </p>
          </div>
        </div>
      </section>

      {items.length === 0 ? (
        /* EMPTY BAG */
        <section className="px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#B3262D]">
              Your Bag Is Empty
            </p>

            <h2 className="mt-5 text-[2.6rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-[3.5rem]">
              Find Something
              <span className="block text-[#0C352D]">
                For The Course.
              </span>
            </h2>

            <Link
              href="/apparel"
              className="mt-9 inline-flex min-h-[52px] items-center justify-center bg-[#10263F] px-8 text-[9px] font-black uppercase tracking-[0.22em] text-white transition hover:bg-[#B3262D]"
            >
              Shop The Collection →
            </Link>
          </div>
        </section>
      ) : (
        /* BAG CONTENT */
        <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
            {/* ITEMS */}
            <div>
              <div className="border-b border-[#10263F]/15 pb-4">
                <p className="text-[8px] font-black uppercase tracking-[0.28em] text-[#8B6A34]">
                  Items
                </p>
              </div>

              {items.map((item) => (
                <article
                  key={item.id}
                  className="grid grid-cols-[105px_1fr] gap-5 border-b border-[#10263F]/15 py-6 sm:grid-cols-[145px_1fr]"
                >
                  <Link
                    href={`/apparel/${item.slug}`}
                    className="relative aspect-[4/5] overflow-hidden bg-[#ECE8DF]"
                  >
                    <Image
                      src={item.image}
                      alt={`${item.color} ${item.name}`}
                      fill
                      sizes="145px"
                      className="object-contain p-2"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[7px] font-black uppercase tracking-[0.22em] text-[#8B6A34]">
                            {item.color}
                          </p>

                          <Link
                            href={`/apparel/${item.slug}`}
                            className="mt-1 block font-serif text-lg leading-tight transition hover:text-[#B3262D] sm:text-xl"
                          >
                            {item.name}
                          </Link>

                          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#10263F]/45">
                            Size:{" "}
                            {item.size === "OneSize"
                              ? "One Size"
                              : item.size}
                          </p>
                        </div>

                        <p className="shrink-0 text-sm font-black">
                          {item.price}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center border border-[#10263F]/20 bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(item.id, -1)
                          }
                          className="flex h-10 w-10 items-center justify-center text-lg transition hover:bg-[#10263F] hover:text-white"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>

                        <span className="min-w-[42px] text-center text-[10px] font-black">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(item.id, 1)
                          }
                          className="flex h-10 w-10 items-center justify-center text-lg transition hover:bg-[#10263F] hover:text-white"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-[8px] font-black uppercase tracking-[0.2em] text-[#B3262D] transition hover:text-[#10263F]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              <Link
                href="/apparel"
                className="mt-7 inline-flex border-b border-[#10263F] pb-1 text-[8px] font-black uppercase tracking-[0.2em] transition hover:border-[#B3262D] hover:text-[#B3262D]"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* SUMMARY */}
            <aside>
              <div className="border border-[#10263F]/15 bg-[#F9F6EF] p-6 sm:p-7 lg:sticky lg:top-28">
                <div className="border-b border-[#10263F]/15 pb-5">
                  <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#B3262D]">
                    Order Summary
                  </p>

                  <h2 className="mt-3 text-[1.8rem] font-black uppercase tracking-[-0.04em]">
                    The Gallaspy
                  </h2>
                </div>

                <div className="space-y-4 py-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#10263F]/55">
                      Items
                    </p>

                    <p className="text-sm font-semibold">
                      {itemCount}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#10263F]/55">
                      Subtotal
                    </p>

                    <p className="text-sm font-semibold">
                      ${subtotal.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#10263F]/55">
                      Shipping
                    </p>

                    <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#8B6A34]">
                      Calculated At Checkout
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#10263F]/15 pt-5">
                  <div className="flex items-end justify-between">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em]">
                      Total
                    </p>

                    <p className="text-2xl font-black tracking-[-0.04em]">
                      ${subtotal.toFixed(2)}
                    </p>
                  </div>

                  <Link
                    href="/apparel/checkout"
                    className="mt-7 flex min-h-[56px] w-full items-center justify-center bg-[#10263F] px-6 text-[9px] font-black uppercase tracking-[0.23em] text-white transition hover:bg-[#0C352D]"
                  >
                    Checkout →
                  </Link>

                  <p className="mt-4 text-center text-[8px] leading-5 text-[#10263F]/40">
                    Secure payment will be completed during checkout.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      )}
    </main>
  );
}
