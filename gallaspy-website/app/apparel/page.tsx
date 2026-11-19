import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PRODUCT_CATALOG } from "@/lib/apparel-catalog";

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
    image: "/images/apparel/men/polos/navy-crest-mens-polo.png",
  },
  {
    name: "Crest Performance Polo",
    category: "Men's Polo",
    color: "Forest Green",
    mark: "Crest",
    image: "/images/apparel/men/polos/forest-green-crest-mens-polo.png",
  },
  {
    name: "Crest Performance Polo",
    category: "Men's Polo",
    color: "White",
    mark: "Crest",
    image: "/images/apparel/men/polos/white-crest-mens-polo.png",
  },
  {
    name: "Falcon Performance Polo",
    category: "Men's Polo",
    color: "Navy",
    mark: "Falcon",
    image: "/images/apparel/men/polos/navy-falcon-mens-polo.png",
  },
  {
    name: "Falcon Performance Polo",
    category: "Men's Polo",
    color: "Forest Green",
    mark: "Falcon",
    image: "/images/apparel/men/polos/forest-green-falcon-mens-polo.png",
  },
  {
    name: "Falcon Performance Polo",
    category: "Men's Polo",
    color: "White",
    mark: "Falcon",
    image: "/images/apparel/men/polos/white-falcon-mens-polo.png",
  },

];

const mensQuarterZips: Product[] = [
  {
    name: "Falcon Performance Quarter-Zip",
    category: "Men's Quarter-Zip",
    color: "Navy",
    mark: "Falcon",
    image: "/images/apparel/men/quarter-zips/navy-falcon-mens-quarter-zip.png",
  },
  {
    name: "Crest Performance Quarter-Zip",
    category: "Men's Quarter-Zip",
    color: "Navy",
    mark: "Crest",
    image: "/images/apparel/men/quarter-zips/navy-crest-mens-quarter-zip.png",
  },
  {
    name: "Falcon Performance Quarter-Zip",
    category: "Men's Quarter-Zip",
    color: "Forest Green",
    mark: "Falcon",
    image: "/images/apparel/men/quarter-zips/forest-green-falcon-mens-quarter-zip.png",
  },
  {
    name: "Crest Performance Quarter-Zip",
    category: "Men's Quarter-Zip",
    color: "Forest Green",
    mark: "Crest",
    image: "/images/apparel/men/quarter-zips/forest-green-crest-mens-quarter-zip.png",
  },
  {
    name: "Falcon Performance Quarter-Zip",
    category: "Men's Quarter-Zip",
    color: "White",
    mark: "Falcon",
    image: "/images/apparel/men/quarter-zips/white-falcon-mens-quarter-zip.png",
  },
  {
    name: "Crest Performance Quarter-Zip",
    category: "Men's Quarter-Zip",
    color: "White",
    mark: "Crest",
    image: "/images/apparel/men/quarter-zips/white-crest-mens-quarter-zip.png",
  },
];

const womensApparel: Product[] = [
  {
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's",
    color: "Navy",
    mark: "Falcon",
    image:
      "/images/apparel/women/quarter-zips/navy-falcon-womens-sleeveless-quarter-zip.png",
  },
  {
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's",
    color: "Forest Green",
    mark: "Falcon",
    image:
      "/images/apparel/women/quarter-zips/forest-green-falcon-womens-sleeveless-quarter-zip.png",
  },
  {
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's",
    color: "White",
    mark: "Falcon",
    image:
      "/images/apparel/women/quarter-zips/white-falcon-womens-sleeveless-quarter-zip.png",
  },
  {
    name: "Falcon Performance Skirt",
    category: "Women's",
    color: "Navy",
    mark: "Falcon",
    image:
      "/images/apparel/women/skirts/navy-falcon-womens-skirt.png",
  },
  {
    name: "Falcon Performance Skirt",
    category: "Women's",
    color: "Forest Green",
    mark: "Falcon",
    image:
      "/images/apparel/women/skirts/forest-green-falcon-womens-skirt.png",
  },
  {
    name: "Falcon Performance Skirt",
    category: "Women's",
    color: "White",
    mark: "Falcon",
    image:
      "/images/apparel/women/skirts/white-falcon-womens-skirt.png",
  },
];

const womensPolos: Product[] = [
  {
    name: "Falcon Performance Polo",
    category: "Women's Polo",
    color: "Navy",
    mark: "Falcon",
    image: "/images/apparel/women/polos/navy-falcon-womens-polo.png",
  },
  {
    name: "Crest Performance Polo",
    category: "Women's Polo",
    color: "Navy",
    mark: "Crest",
    image: "/images/apparel/women/polos/navy-crest-womens-polo.png",
  },
  {
    name: "Falcon Performance Polo",
    category: "Women's Polo",
    color: "Forest Green",
    mark: "Falcon",
    image: "/images/apparel/women/polos/forest-green-falcon-womens-polo.png",
  },
  {
    name: "Crest Performance Polo",
    category: "Women's Polo",
    color: "Forest Green",
    mark: "Crest",
    image: "/images/apparel/women/polos/forest-green-crest-womens-polo.png",
  },
  {
    name: "Falcon Performance Polo",
    category: "Women's Polo",
    color: "White",
    mark: "Falcon",
    image: "/images/apparel/women/polos/white-falcon-womens-polo.png",
  },
  {
    name: "Crest Performance Polo",
    category: "Women's Polo",
    color: "White",
    mark: "Crest",
    image: "/images/apparel/women/polos/white-crest-womens-polo.png",
  },
];

const headwear: Product[] = [
  {
    name: "Crest Performance Hat",
    category: "Headwear",
    color: "Navy",
    mark: "Crest",
    image:
      "/images/apparel/headwear/crest/navy-crest-hat.png",
  },
  {
    name: "Crest Performance Hat",
    category: "Headwear",
    color: "Forest Green",
    mark: "Crest",
    image:
      "/images/apparel/headwear/crest/forest-green-crest-hat.png",
  },
  {
    name: "Crest Performance Hat",
    category: "Headwear",
    color: "White",
    mark: "Crest",
    image:
      "/images/apparel/headwear/crest/white-crest-hat.png",
  },
  {
    name: "Falcon Performance Hat",
    category: "Headwear",
    color: "Navy",
    mark: "Falcon",
    image:
      "/images/apparel/headwear/falcon/navy-falcon-hat.png",
  },
  {
    name: "Falcon Performance Hat",
    category: "Headwear",
    color: "Forest Green",
    mark: "Falcon",
    image:
      "/images/apparel/headwear/falcon/forest-green-falcon-hat.png",
  },
  {
    name: "Falcon Performance Hat",
    category: "Headwear",
    color: "White",
    mark: "Falcon",
    image:
      "/images/apparel/headwear/falcon/white-falcon-hat.png",
  },
  {
    name: "Script Performance Hat",
    category: "Headwear",
    color: "Navy",
    mark: "Script",
    image:
      "/images/apparel/headwear/script/navy-script-hat.png",
  },
  {
    name: "Script Performance Hat",
    category: "Headwear",
    color: "Forest Green",
    mark: "Script",
    image:
      "/images/apparel/headwear/script/forest-green-script-hat.png",
  },
  {
    name: "Script Performance Hat",
    category: "Headwear",
    color: "White",
    mark: "Script",
    image:
      "/images/apparel/headwear/script/white-script-hat.png",
  },
];


export default function ApparelPage() {
  return <main className="g616-interior g4-shop gsite-editorial-page g626-shop">
    <section className="g4-shop-hero">
      <div className="g2-container g4-shop-hero-grid">
        <div className="g4-shop-hero-copy">
          <p className="g2-eyebrow">THE GALLASPY GOLF CLUB  /  OFFICIAL APPAREL</p>
          <h1>THE CLUB<br/><em>COLLECTION.</em></h1>
          <p>Performance golf essentials, designed around our official marks. Considered details. A distinct identity on and off the course.</p>
          <div className="g4-shop-nav"><a href="#men">SHOP MEN →</a><a href="#women">SHOP WOMEN →</a><a href="#headwear">SHOP HEADWEAR →</a></div>
          <span className="g4-shop-season">NAVY  /  FOREST GREEN  /  WHITE</span>
        </div>
        <div className="g4-shop-hero-art g626-shop-display" aria-label="Gallaspy official apparel">
          <Image src="/images/apparel/men/polos/navy-crest-mens-polo.png" alt="Gallaspy navy performance polo" width={540} height={620} priority className="g4-art-polo" />
          <Image src="/images/apparel/headwear/falcon/white-falcon-hat.png" alt="Gallaspy white Falcon performance hat" width={330} height={330} priority className="g4-art-hat" />
          <div className="g4-art-wordmark">THE GALLASPY™</div>
        </div>
      </div>
    </section>
    <nav className="g4-shop-subnav" aria-label="Shop collections"><div className="g2-container"><a href="#men">01 / MEN</a><a href="#women">02 / WOMEN</a><a href="#headwear">03 / HEADWEAR</a></div></nav>
    <ProductSection id="men" eyebrow="01 / THE MEN'S COLLECTION" title="Made for the round." description="Performance polos and quarter-zips. Choose your mark, then your color." products={[...mensPolos, ...mensQuarterZips]} background="white" />
    <ProductSection id="women" eyebrow="02 / THE WOMEN'S COLLECTION" title="Play in your element." description="Polos, sleeveless performance tops, skirts, and golf essentials." products={[...womensPolos, ...womensApparel]} background="light" />
    <ProductSection id="headwear" eyebrow="03 / THE HEADWEAR COLLECTION" title="Wear the mark." description="Falcon, Crest, and Script hats in the three official colors." products={headwear} background="white" />
    <section className="g4-shop-outro"><div className="g2-container"><p>THE GALLASPY GOLF CLUB</p><h2>YOUR GAME. <em>YOUR LEGACY.</em></h2><Link href="/the-club">EXPLORE THE CLUB →</Link></div></section>
  </main>;
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
  const dark = false;

  const sectionClass = background === "white" ? "bg-white text-[#10263F]" : "bg-[#F6F8F6] text-[#10263F]";

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

        <div className="g3-shop-grid mt-8 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
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
  const colorSlug = product.color
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  const nameSlug = product.name
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-");

  let slug = `${colorSlug}-${nameSlug}`;

  if (nameSlug.includes("sleeveless-quarter-zip")) {
    slug = `${colorSlug}-womens-falcon-sleeveless-quarter-zip`;
  } else if (nameSlug.includes("skirt")) {
    slug = `${colorSlug}-womens-falcon-skirt`;
  } else if (product.category === "Women") {
    slug = `${colorSlug}-womens-${nameSlug}`;
  }

  if (product.category === "Women's Polo") {
    slug = `${colorSlug}-womens-${nameSlug}`;
  }
  const catalogEntry = Object.entries(PRODUCT_CATALOG).find(([, item]) => item.image === product.image) ?? Object.entries(PRODUCT_CATALOG).find(([, item]) => item.name === product.name && item.color === product.color && item.image.includes("/women/") === product.image.includes("/women/") && item.image.includes("/men/") === product.image.includes("/men/"));
  const destinationSlug = catalogEntry?.[0] ?? slug;
  const priceCents = catalogEntry?.[1]?.priceCents;
  return (
    <Link
      href={`/apparel/${destinationSlug}`}
      className="g4-product g626-product group block"
      aria-label={`View ${product.color} ${product.name}`}
    >
      <article>
        <div className="g3-product-media gallaspy-cutout-stage relative aspect-[4/4.5] overflow-hidden">
          <Image
            src={product.image}
            alt={`${product.color} ${product.name}`}
            fill
            sizes="(max-width: 640px) 48vw, (max-width: 1024px) 33vw, 25vw"
            className="gallaspy-cutout-image object-contain p-2 transition-transform duration-500 group-hover:scale-[1.045]"
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

              <h3 className="mt-1.5 text-base font-bold leading-tight transition-colors group-hover:text-[#B3262D] sm:text-base">
                {product.name}
              </h3>

              <p className="mt-1 text-xs text-[#10263F]/60">{product.color}</p>
              {priceCents != null && <p className="g4-product-price">{new Intl.NumberFormat("en-US", {style:"currency",currency:"USD"}).format(priceCents / 100)}</p>}
            </div>

            <span
              className="mt-1 h-3 w-3 shrink-0 rounded-full border border-[#10263F]/20"
              style={{ backgroundColor: product.color === "Navy" ? "#10263f" : product.color === "Forest Green" ? "#174a38" : "#fff" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </article>
    </Link>
  );
}

