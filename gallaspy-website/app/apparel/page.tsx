import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Gallaspy Apparel",
  description:
    "Shop The Gallaspy Apparel — premium golf apparel from The Gallaspy Golf Club.",
};

type Product = {
  name: string;
  category: string;
  color: string;
  mark: string;
  image: string;
};

const mensPolos: Product[] = [
  {
    name: "Crest Performance Polo",
    category: "Men's Polo",
    color: "Navy",
    mark: "Crest",
    image: "/images/apparel/men/polos/navy-crest-polo.png",
  },
  {
    name: "Crest Performance Polo",
    category: "Men's Polo",
    color: "Forest Green",
    mark: "Crest",
    image: "/images/apparel/men/polos/forest-green-crest-polo.png",
  },
  {
    name: "Crest Performance Polo",
    category: "Men's Polo",
    color: "White",
    mark: "Crest",
    image: "/images/apparel/men/polos/white-crest-polo.png",
  },
  {
    name: "Falcon Performance Polo",
    category: "Men's Polo",
    color: "Navy",
    mark: "Falcon",
    image: "/images/apparel/men/polos/navy-falcon-polo.png",
  },
  {
    name: "Falcon Performance Polo",
    category: "Men's Polo",
    color: "Forest Green",
    mark: "Falcon",
    image: "/images/apparel/men/polos/forest-green-falcon-polo.png",
  },
  {
    name: "Falcon Performance Polo",
    category: "Men's Polo",
    color: "White",
    mark: "Falcon",
    image: "/images/apparel/men/polos/white-falcon-polo.png",
  },
  {
    name: "Script Performance Polo",
    category: "Men's Polo",
    color: "Navy",
    mark: "Script",
    image: "/images/apparel/men/polos/navy-script-polo.png",
  },
  {
    name: "Script Performance Polo",
    category: "Men's Polo",
    color: "Forest Green",
    mark: "Script",
    image: "/images/apparel/men/polos/forest-green-script-polo.png",
  },
  {
    name: "Script Performance Polo",
    category: "Men's Polo",
    color: "White",
    mark: "Script",
    image: "/images/apparel/men/polos/white-script-polo.png",
  },
];

const womensApparel: Product[] = [
  {
    name: "Falcon Sleeveless Polo",
    category: "Women's",
    color: "Navy",
    mark: "Falcon",
    image:
      "/images/apparel/women/sleeveless-polos/navy-womens-falcon-sleeveless-polo.png",
  },
  {
    name: "Falcon Sleeveless Polo",
    category: "Women's",
    color: "Forest Green",
    mark: "Falcon",
    image:
      "/images/apparel/women/sleeveless-polos/forest-green-womens-falcon-sleeveless-polo.png",
  },
  {
    name: "Falcon Sleeveless Polo",
    category: "Women's",
    color: "White",
    mark: "Falcon",
    image:
      "/images/apparel/women/sleeveless-polos/white-womens-falcon-sleeveless-polo.png",
  },
  {
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's",
    color: "Navy",
    mark: "Falcon",
    image:
      "/images/apparel/women/quarter-zips/navy-womens-falcon-sleeveless-quarter-zip.png",
  },
  {
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's",
    color: "Forest Green",
    mark: "Falcon",
    image:
      "/images/apparel/women/quarter-zips/forest-green-womens-falcon-sleeveless-quarter-zip.png",
  },
  {
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's",
    color: "White",
    mark: "Falcon",
    image:
      "/images/apparel/women/quarter-zips/white-womens-falcon-sleeveless-quarter-zip.png",
  },
  {
    name: "Falcon Performance Skirt",
    category: "Women's",
    color: "Navy",
    mark: "Falcon",
    image:
      "/images/apparel/women/skirts/navy-womens-falcon-skirt.png",
  },
  {
    name: "Falcon Performance Skirt",
    category: "Women's",
    color: "Forest Green",
    mark: "Falcon",
    image:
      "/images/apparel/women/skirts/forest-green-womens-falcon-skirt.png",
  },
  {
    name: "Falcon Performance Skirt",
    category: "Women's",
    color: "White",
    mark: "Falcon",
    image:
      "/images/apparel/women/skirts/white-womens-falcon-skirt.png",
  },
];

const headwear: Product[] = [
  {
    name: "Crest Performance Hat",
    category: "Headwear",
    color: "Navy",
    mark: "Crest",
    image:
      "/images/apparel/headwear/crest/navy-crest-performance-hat.png",
  },
  {
    name: "Crest Performance Hat",
    category: "Headwear",
    color: "Forest Green",
    mark: "Crest",
    image:
      "/images/apparel/headwear/crest/forest-green-crest-performance-hat.png",
  },
  {
    name: "Crest Performance Hat",
    category: "Headwear",
    color: "White",
    mark: "Crest",
    image:
      "/images/apparel/headwear/crest/white-crest-performance-hat.png",
  },
  {
    name: "Falcon Performance Hat",
    category: "Headwear",
    color: "Navy",
    mark: "Falcon",
    image:
      "/images/apparel/headwear/falcon/navy-falcon-performance-hat.png",
  },
  {
    name: "Falcon Performance Hat",
    category: "Headwear",
    color: "Forest Green",
    mark: "Falcon",
    image:
      "/images/apparel/headwear/falcon/forest-green-falcon-performance-hat.png",
  },
  {
    name: "Falcon Performance Hat",
    category: "Headwear",
    color: "White",
    mark: "Falcon",
    image:
      "/images/apparel/headwear/falcon/white-falcon-performance-hat.png",
  },
  {
    name: "Script Performance Hat",
    category: "Headwear",
    color: "Navy",
    mark: "Script",
    image:
      "/images/apparel/headwear/script/navy-script-performance-hat.png",
  },
  {
    name: "Script Performance Hat",
    category: "Headwear",
    color: "Forest Green",
    mark: "Script",
    image:
      "/images/apparel/headwear/script/forest-green-script-performance-hat.png",
  },
  {
    name: "Script Performance Hat",
    category: "Headwear",
    color: "White",
    mark: "Script",
    image:
      "/images/apparel/headwear/script/white-script-performance-hat.png",
  },
];

const allProducts = [...mensPolos, ...womensApparel, ...headwear];

export default function ApparelPage() {
  return (
    <main className="overflow-hidden bg-[#F5F2EA] text-[#10263F]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#071827] pt-[82px] text-white">
        {/* SPORT STRIPE */}
        <div className="absolute left-0 top-[82px] z-30 flex h-[7px] w-full">
          <div className="w-[64%] bg-[#B3262D]" />
          <div className="w-[20%] bg-[#F5F2EA]" />
          <div className="flex-1 bg-[#174535]" />
        </div>

        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_38%,rgba(23,69,53,0.7),transparent_38%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#071827_0%,#0B2940_48%,#0C352D_100%)] opacity-90" />

        {/* OVERSIZED SCRIPT MARK */}
        <div className="pointer-events-none absolute right-[-5%] top-[20%] h-[290px] w-[720px] opacity-[0.07] sm:h-[390px] sm:w-[900px] lg:h-[470px] lg:w-[1050px]">
          <Image
            src="/logos/script.png"
            alt=""
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[760px] max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.78fr_1.22fr] lg:px-10 lg:py-20">
          {/* COPY */}
          <div className="relative z-20">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#D4383E]" />

              <p className="text-[9px] font-black uppercase tracking-[0.36em] text-[#FFD76A]">
                The Gallaspy Golf Club
              </p>
            </div>

            <h1 className="mt-7 max-w-[620px] text-[4.6rem] font-black uppercase leading-[0.78] tracking-[-0.075em] sm:text-[6rem] lg:text-[7.3rem]">
              The
              <span className="block">Gallaspy</span>
            </h1>

            <div className="mt-5 flex items-center gap-4">
              <span className="h-[3px] w-14 bg-[#B3262D]" />

              <p className="font-serif text-[2rem] font-light italic text-[#FFD76A] sm:text-[2.5rem]">
                Apparel
              </p>
            </div>

            <p className="mt-7 max-w-[460px] text-sm font-light leading-7 text-white/65 sm:text-base">
              Performance golf apparel carrying the marks and colors of
              The Gallaspy.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#men"
                className="inline-flex min-h-[50px] items-center justify-center bg-[#FFD76A] px-7 text-[9px] font-black uppercase tracking-[0.23em] text-[#10263F] transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Shop Men →
              </a>

              <a
                href="#women"
                className="inline-flex min-h-[50px] items-center justify-center border border-white/30 bg-white/[0.03] px-7 text-[9px] font-black uppercase tracking-[0.23em] text-white transition duration-300 hover:-translate-y-1 hover:border-[#FFD76A] hover:text-[#FFD76A]"
              >
                Shop Women
              </a>
            </div>

            <div className="mt-12 flex items-center gap-7 border-t border-white/15 pt-5">
              <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-white/38">
                Navy
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#B3262D]" />
              <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-white/38">
                Forest
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#B3262D]" />
              <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-white/38">
                White
              </span>
            </div>
          </div>

          {/* PRODUCT CAMPAIGN */}
          <div className="relative min-h-[500px] sm:min-h-[610px] lg:min-h-[690px]">
            {/* RED EDITORIAL NUMBER */}
            <div className="absolute right-0 top-2 z-0 text-[8rem] font-black leading-none tracking-[-0.08em] text-[#B3262D]/18 sm:text-[11rem] lg:text-[14rem]">
              26
            </div>

            {/* NAVY POLO */}
            <div className="absolute left-[-2%] top-[11%] z-10 h-[67%] w-[48%] -rotate-[4deg] transition-transform duration-500 hover:z-40 hover:rotate-0 hover:scale-[1.025]">
              <Image
                src="/images/apparel/men/polos/navy-crest-polo.png"
                alt="Navy Gallaspy Crest Performance Polo"
                fill
                priority
                sizes="(max-width: 1024px) 55vw, 32vw"
                className="object-contain p-1 drop-shadow-[0_28px_24px_rgba(0,0,0,0.38)] sm:p-3"
              />

            </div>

            {/* GREEN WOMENS */}
            <div className="absolute right-[0%] top-[1%] z-20 h-[69%] w-[48%] rotate-[4deg] transition-transform duration-500 hover:z-40 hover:rotate-0 hover:scale-[1.025]">
              <Image
                src="/images/apparel/women/quarter-zips/forest-green-womens-falcon-sleeveless-quarter-zip.png"
                alt="Forest Green Gallaspy Falcon Sleeveless Quarter-Zip"
                fill
                priority
                sizes="(max-width: 1024px) 55vw, 32vw"
                className="object-contain p-1 drop-shadow-[0_28px_24px_rgba(0,0,0,0.38)] sm:p-3"
              />

            </div>

            {/* WHITE HAT */}
            <div className="absolute bottom-[1%] left-[29%] z-30 h-[42%] w-[45%] -rotate-[1deg] transition-transform duration-500 hover:rotate-0 hover:scale-[1.025]">
              <Image
                src="/images/apparel/headwear/script/white-script-performance-hat.png"
                alt="White Gallaspy Script Performance Hat"
                fill
                priority
                sizes="(max-width: 1024px) 55vw, 28vw"
                className="object-contain p-2 drop-shadow-[0_24px_20px_rgba(0,0,0,0.4)]"
              />

            </div>
          </div>
        </div>

        {/* MOVING-POSTER STYLE STRIP */}
        <div className="relative z-20 border-y border-white/10 bg-[#0B2E26]">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-10 overflow-hidden px-5 py-4 sm:px-8 lg:px-10">
            {[
              "THE GALLASPY",
              "PERFORMANCE",
              "CREST",
              "FALCON",
              "SCRIPT",
              "EST. 2026",
            ].map((item) => (
              <div
                key={item}
                className="flex shrink-0 items-center gap-10"
              >
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/68">
                  {item}
                </span>

                <span className="text-[#D4383E]">●</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTION NAV */}
      <section className="border-b border-[#10263F]/12 bg-[#F5F2EA]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-5 py-6 sm:px-8 lg:px-10">
          <span className="mr-2 text-[8px] font-black uppercase tracking-[0.28em] text-[#B3262D]">
            Shop
          </span>

          <a
            href="#men"
            className="text-[10px] font-bold uppercase tracking-[0.18em] transition hover:text-[#B3262D]"
          >
            Men
          </a>

          <a
            href="#women"
            className="text-[10px] font-bold uppercase tracking-[0.18em] transition hover:text-[#B3262D]"
          >
            Women
          </a>

          <a
            href="#headwear"
            className="text-[10px] font-bold uppercase tracking-[0.18em] transition hover:text-[#B3262D]"
          >
            Headwear
          </a>

        </div>
      </section>

      {/* MEN */}
      <ProductSection
        id="men"
        eyebrow="01 / Men's"
        title="Performance Polos"
        description="Three marks. Three club colors. Performance polos built around the visual identity of The Gallaspy."
        products={mensPolos}
        background="light"
      />

      {/* WOMEN FEATURE BAND */}
      <section className="relative overflow-hidden bg-[#12382D] text-white">
        <div className="absolute left-0 top-0 h-full w-[7px] bg-[#B3262D]" />

        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10 lg:py-16">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#FFD76A]">
              Women's Collection
            </p>

            <h2 className="mt-3 font-serif text-4xl font-light tracking-[-0.03em] sm:text-5xl">
              Falcon performance.
              <span className="ml-2 italic text-[#FFD76A]">
                Built as a system.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm font-light leading-7 text-white/60">
              Sleeveless polos, quarter-zips, and coordinating skirts designed
              to work together while remaining individual pieces.
            </p>
          </div>

          <a
            href="#women"
            className="inline-flex min-h-[48px] items-center justify-center border border-white/25 px-6 text-[9px] font-bold uppercase tracking-[0.22em] transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
          >
            View Women's →
          </a>
        </div>
      </section>

      {/* WOMEN */}
      <ProductSection
        id="women"
        eyebrow="02 / Women's"
        title="The Falcon Collection"
        description="Clean performance silhouettes built around the Falcon mark in navy, forest green, and white."
        products={womensApparel}
        background="white"
      />

      {/* HEADWEAR */}
      <ProductSection
        id="headwear"
        eyebrow="03 / Headwear"
        title="Performance Hats"
        description="Crest, Falcon, and Script performance headwear across the three core colors of The Gallaspy."
        products={headwear}
        background="navy"
      />

      {/* BRAND CLOSE */}
      <section className="relative overflow-hidden bg-[#071827] text-white">
        <div className="h-[7px] bg-[#B3262D]" />

        <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto relative h-24 w-24">
            <Image
              src="/logos/falcon.png"
              alt="The Gallaspy Falcon"
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>

          <p className="mt-8 text-[8px] font-black uppercase tracking-[0.38em] text-[#FFD76A]">
            The Gallaspy Golf Club
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl font-serif text-[3rem] font-light leading-[0.95] tracking-[-0.04em] sm:text-[4rem] lg:text-[5rem]">
            What we wear becomes
            <span className="block italic text-[#FFD76A]">
              part of the club.
            </span>
          </h2>

          <Link
            href="/the-club"
            className="mt-9 inline-flex border-b border-[#FFD76A] pb-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#FFD76A] transition hover:text-white"
          >
            Discover The Club →
          </Link>
        </div>
      </section>
    </main>
  );
}

function ProductSection({
  id,
  eyebrow,
  title,
  description,
  products,
  background,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
  background: "light" | "white" | "navy";
}) {
  const dark = background === "navy";

  const sectionClass =
    background === "navy"
      ? "bg-[#10263F] text-white"
      : background === "white"
        ? "bg-white text-[#10263F]"
        : "bg-[#F5F2EA] text-[#10263F]";

  return (
    <section
      id={id}
      className={`scroll-mt-24 ${sectionClass}`}
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid gap-8 border-b border-current/10 pb-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p
              className={`text-[8px] font-black uppercase tracking-[0.34em] ${
                dark ? "text-[#FFD76A]" : "text-[#B3262D]"
              }`}
            >
              {eyebrow}
            </p>

            <h2 className="mt-4 font-serif text-[3rem] font-light leading-[0.95] tracking-[-0.04em] sm:text-[4rem]">
              {title}
            </h2>
          </div>

          <p
            className={`max-w-xl text-sm font-light leading-7 lg:justify-self-end ${
              dark ? "text-white/55" : "text-[#10263F]/55"
            }`}
          >
            {description}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={`${product.name}-${product.color}`}
              product={product}
              dark={dark}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  dark,
}: {
  product: Product;
  dark: boolean;
}) {
  const slug = `${product.color}-${product.name}`
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <Link
      href={`/apparel/${product.category === "Women" ? slug.replace(`${product.color}-`, `${product.color}-womens-`) : slug}`}
      className="group block"
      aria-label={`View ${product.color} ${product.name}`}
    >
      <article>
        <div
          className={`relative aspect-[4/5] overflow-hidden ${
            dark ? "bg-[#F0ECE4]" : "bg-[#ECE8DF]"
          }`}
        >
          <div className="absolute left-3 top-3 z-10 bg-[#B3262D] px-2.5 py-1.5 text-[7px] font-black uppercase tracking-[0.2em] text-white">
            {product.mark}
          </div>

          <Image
            src={product.image}
            alt={`${product.color} ${product.name}`}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.045]"
          />

          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-[#10263F] px-4 py-3 text-white transition-transform duration-300 group-hover:translate-y-0">
            <span className="text-[8px] font-black uppercase tracking-[0.22em]">
              View Product
            </span>
            <span>→</span>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className={`text-[7px] font-bold uppercase tracking-[0.22em] ${
                  dark ? "text-[#FFD76A]" : "text-[#8B6A34]"
                }`}
              >
                {product.category}
              </p>

              <h3 className="mt-1.5 font-serif text-lg font-light leading-tight transition-colors group-hover:text-[#B3262D] sm:text-xl">
                {product.name}
              </h3>

              <p
                className={`mt-1 text-xs ${
                  dark ? "text-white/45" : "text-[#10263F]/45"
                }`}
              >
                {product.color}
              </p>
            </div>

            <span
              className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full border ${
                dark ? "border-white/30" : "border-[#10263F]/20"
              }`}
            />
          </div>
        </div>
      </article>
    </Link>
  );
}

