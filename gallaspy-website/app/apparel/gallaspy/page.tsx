import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/apparel/ProductCard";

export const metadata: Metadata = {
  title: "The Gallaspy Collection | Apparel",
  description:
    "Shop The Gallaspy Collection — signature golf and lifestyle apparel available to the public.",
};

const products = [
  {
    name: "Navy Performance Polo",
    category: "Polos",
    colorLabel: "Navy",
    scriptImage: "/images/apparel/gallaspy/navy-script-polo.jpg",
    crestImage: "/images/apparel/gallaspy/navy-crest-polo.jpg",
    price: "$95",
  },
  {
    name: "White Performance Polo",
    category: "Polos",
    colorLabel: "White",
    scriptImage: "/images/apparel/gallaspy/white-script-polo.jpg",
    crestImage: "/images/apparel/gallaspy/white-crest-polo.jpg",
    price: "$95",
  },
  {
    name: "Forest Green Performance Polo",
    category: "Polos",
    colorLabel: "Forest Green",
    scriptImage: "/images/apparel/gallaspy/forest-green-script-polo.jpg",
    crestImage: "/images/apparel/gallaspy/forest-green-crest-polo.jpg",
    price: "$95",
  },
  {
    name: "Navy Club Hat",
    category: "Headwear",
    colorLabel: "Navy",
    scriptImage: "/images/apparel/gallaspy/navy-script-hat.jpg",
    crestImage: "/images/apparel/gallaspy/navy-crest-hat.jpg",
    price: "$42",
  },
  {
    name: "White Club Hat",
    category: "Headwear",
    colorLabel: "White",
    scriptImage: "/images/apparel/gallaspy/white-script-hat.jpg",
    crestImage: "/images/apparel/gallaspy/white-crest-hat.jpg",
    price: "$42",
  },
  {
    name: "Forest Green Club Hat",
    category: "Headwear",
    colorLabel: "Forest Green",
    scriptImage: "/images/apparel/gallaspy/forest-green-script-hat.jpg",
    crestImage: "/images/apparel/gallaspy/forest-green-crest-hat.jpg",
    price: "$42",
  },
];

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
              <span className="block text-[#FFD76A]">Collection</span>
            </h1>

            <div className="mt-7 h-px w-20 bg-[#B89146]" />

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Signature golf apparel available in Navy, White, and Forest
              Green, with your choice of Script or Crest design.
            </p>

            <Link
              href="#products"
              className="mt-9 inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
            >
              View the Collection
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
              Choose Your Color.
              <span className="block">Choose Your Mark.</span>
            </h2>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />
          </div>

          <div className="lg:border-l lg:border-[#10263F]/12 lg:pl-12">
            <p className="font-serif text-2xl font-light leading-relaxed sm:text-3xl">
              One collection. Two official Gallaspy designs.
            </p>

            <p className="mt-6 text-sm leading-7 text-[#52605A] sm:text-base sm:leading-8">
              Each product is available in the Gallaspy Script or Gallaspy
              Crest design. The public collection is intentionally limited to
              Navy, White, and Forest Green.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        id="products"
        className="scroll-mt-24 bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#B89146]">
                The Collection
              </p>

              <h2 className="mt-4 font-serif text-[2.7rem] font-light sm:text-5xl">
                Polos & Headwear
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#52605A]">
              Select Script or Crest on each product card to preview the
              corresponding design.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.name}
                name={product.name}
                category={product.category}
                colorLabel={product.colorLabel}
                scriptImage={product.scriptImage}
                crestImage={product.crestImage}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTION NOTE */}
      <section className="bg-[#10263F] px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#FFD76A]">
              The Gallaspy Collection
            </p>

            <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
              Publicly Available.
              <span className="block">Distinctly Gallaspy.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
              This is the public-facing apparel collection. Member and Falcon
              Society collections remain separate from public retail.
            </p>
          </div>

          <div className="lg:border-l lg:border-white/12 lg:pl-10">
            <p className="text-sm leading-7 text-white/65">
              Checkout will be activated once final pricing, inventory,
              production, sizing, and fulfillment are ready.
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