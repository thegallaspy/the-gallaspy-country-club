import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductPurchase from "@/components/apparel/ProductPurchase";

type Product = {
  slug: string;
  name: string;
  category: string;
  color: string;
  price: string;
  image: string;
  sizes: string[];
  collection: "men" | "women" | "headwear";
  mark: "Crest" | "Falcon" | "Script";
};

const products: Product[] = [
  {
    slug: "navy-crest-performance-polo",
    name: "Crest Performance Polo",
    category: "Men's Performance Polo",
    color: "Navy",
    price: "$60",
    image: "/images/apparel/men/polos/navy-crest-polo.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
    collection: "men",
    mark: "Crest",
  },
  {
    slug: "forest-green-crest-performance-polo",
    name: "Crest Performance Polo",
    category: "Men's Performance Polo",
    color: "Forest Green",
    price: "$60",
    image: "/images/apparel/men/polos/forest-green-crest-polo.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
    collection: "men",
    mark: "Crest",
  },
  {
    slug: "white-crest-performance-polo",
    name: "Crest Performance Polo",
    category: "Men's Performance Polo",
    color: "White",
    price: "$60",
    image: "/images/apparel/men/polos/white-crest-polo.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
    collection: "men",
    mark: "Crest",
  },
  {
    slug: "navy-falcon-performance-polo",
    name: "Falcon Performance Polo",
    category: "Men's Performance Polo",
    color: "Navy",
    price: "$60",
    image: "/images/apparel/men/polos/navy-falcon-polo.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
    collection: "men",
    mark: "Falcon",
  },
  {
    slug: "forest-green-falcon-performance-polo",
    name: "Falcon Performance Polo",
    category: "Men's Performance Polo",
    color: "Forest Green",
    price: "$60",
    image: "/images/apparel/men/polos/forest-green-falcon-polo.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
    collection: "men",
    mark: "Falcon",
  },
  {
    slug: "white-falcon-performance-polo",
    name: "Falcon Performance Polo",
    category: "Men's Performance Polo",
    color: "White",
    price: "$60",
    image: "/images/apparel/men/polos/white-falcon-polo.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
    collection: "men",
    mark: "Falcon",
  },
  {
    slug: "navy-womens-falcon-sleeveless-quarter-zip",
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's Performance",
    color: "Navy",
    price: "$35",
    image:
      "/images/apparel/women/quarter-zips/navy-womens-falcon-sleeveless-quarter-zip.png",
    sizes: ["XS", "S", "M", "L", "XL"],
    collection: "women",
    mark: "Falcon",
  },
  {
    slug: "forest-green-womens-falcon-sleeveless-quarter-zip",
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's Performance",
    color: "Forest Green",
    price: "$35",
    image:
      "/images/apparel/women/quarter-zips/forest-green-womens-falcon-sleeveless-quarter-zip.png",
    sizes: ["XS", "S", "M", "L", "XL"],
    collection: "women",
    mark: "Falcon",
  },
  {
    slug: "white-womens-falcon-sleeveless-quarter-zip",
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's Performance",
    color: "White",
    price: "$35",
    image:
      "/images/apparel/women/quarter-zips/white-womens-falcon-sleeveless-quarter-zip.png",
    sizes: ["XS", "S", "M", "L", "XL"],
    collection: "women",
    mark: "Falcon",
  },
  {
    slug: "navy-womens-falcon-skirt",
    name: "Falcon Performance Skirt",
    category: "Women's Performance",
    color: "Navy",
    price: "$45",
    image: "/images/apparel/women/skirts/navy-womens-falcon-skirt.png",
    sizes: ["XS", "S", "M", "L", "XL"],
    collection: "women",
    mark: "Falcon",
  },
  {
    slug: "forest-green-womens-falcon-skirt",
    name: "Falcon Performance Skirt",
    category: "Women's Performance",
    color: "Forest Green",
    price: "$45",
    image:
      "/images/apparel/women/skirts/forest-green-womens-falcon-skirt.png",
    sizes: ["XS", "S", "M", "L", "XL"],
    collection: "women",
    mark: "Falcon",
  },
  {
    slug: "white-womens-falcon-skirt",
    name: "Falcon Performance Skirt",
    category: "Women's Performance",
    color: "White",
    price: "$45",
    image: "/images/apparel/women/skirts/white-womens-falcon-skirt.png",
    sizes: ["XS", "S", "M", "L", "XL"],
    collection: "women",
    mark: "Falcon",
  },
  {
    slug: "navy-crest-performance-hat",
    name: "Crest Performance Hat",
    category: "Performance Headwear",
    color: "Navy",
    price: "$45",
    image: "/images/apparel/headwear/crest/navy-crest-performance-hat.png",
    sizes: ["One Size"],
    collection: "headwear",
    mark: "Crest",
  },
  {
    slug: "forest-green-crest-performance-hat",
    name: "Crest Performance Hat",
    category: "Performance Headwear",
    color: "Forest Green",
    price: "$45",
    image:
      "/images/apparel/headwear/crest/forest-green-crest-performance-hat.png",
    sizes: ["One Size"],
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
    sizes: ["One Size"],
    collection: "headwear",
    mark: "Crest",
  },
  {
    slug: "navy-falcon-performance-hat",
    name: "Falcon Performance Hat",
    category: "Performance Headwear",
    color: "Navy",
    price: "$45",
    image: "/images/apparel/headwear/falcon/navy-falcon-performance-hat.png",
    sizes: ["One Size"],
    collection: "headwear",
    mark: "Falcon",
  },
  {
    slug: "forest-green-falcon-performance-hat",
    name: "Falcon Performance Hat",
    category: "Performance Headwear",
    color: "Forest Green",
    price: "$45",
    image:
      "/images/apparel/headwear/falcon/forest-green-falcon-performance-hat.png",
    sizes: ["One Size"],
    collection: "headwear",
    mark: "Falcon",
  },
  {
    slug: "white-falcon-performance-hat",
    name: "Falcon Performance Hat",
    category: "Performance Headwear",
    color: "White",
    price: "$45",
    image: "/images/apparel/headwear/falcon/white-falcon-performance-hat.png",
    sizes: ["One Size"],
    collection: "headwear",
    mark: "Falcon",
  },
  {
    slug: "navy-script-performance-hat",
    name: "Script Performance Hat",
    category: "Performance Headwear",
    color: "Navy",
    price: "$45",
    image: "/images/apparel/headwear/script/navy-script-performance-hat.png",
    sizes: ["One Size"],
    collection: "headwear",
    mark: "Script",
  },
  {
    slug: "forest-green-script-performance-hat",
    name: "Script Performance Hat",
    category: "Performance Headwear",
    color: "Forest Green",
    price: "$45",
    image:
      "/images/apparel/headwear/script/forest-green-script-performance-hat.png",
    sizes: ["One Size"],
    collection: "headwear",
    mark: "Script",
  },
  {
    slug: "white-script-performance-hat",
    name: "Script Performance Hat",
    category: "Performance Headwear",
    color: "White",
    price: "$45",
    image: "/images/apparel/headwear/script/white-script-performance-hat.png",
    sizes: ["One Size"],
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
    sizes: ["S", "M", "L", "XL", "2XL"],
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
    sizes: ["XS", "S", "M", "L", "XL"],
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
    sizes: ["S", "M", "L", "XL", "2XL"],
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
    sizes: ["XS", "S", "M", "L", "XL"],
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
    sizes: ["S", "M", "L", "XL", "2XL"],
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
    sizes: ["XS", "S", "M", "L", "XL"],
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
    sizes: ["S", "M", "L", "XL", "2XL"],
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
    sizes: ["XS", "S", "M", "L", "XL"],
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
    sizes: ["S", "M", "L", "XL", "2XL"],
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
    sizes: ["XS", "S", "M", "L", "XL"],
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
    sizes: ["S", "M", "L", "XL", "2XL"],
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
    sizes: ["XS", "S", "M", "L", "XL"],
    collection: "women",
    mark: "Crest",
  },
];

function ProductTile({ product }: { product: Product }) {
  return (
    <Link
      href={`/apparel/${product.slug}`}
      className="group block"
      aria-label={`View ${product.color} ${product.name}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE6DD]">
        <Image
          src={product.image}
          alt={`${product.color} ${product.name}`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04]"
        />

        <div className="absolute left-3 top-3 bg-[#10263F] px-3 py-2 text-[7px] font-black uppercase tracking-[0.2em] text-white">
          Pre-Order
        </div>
      </div>

      <div className="pt-4">
        <p className="text-[7px] font-black uppercase tracking-[0.2em] text-[#B3262D]">
          {product.color}
        </p>

        <div className="mt-1 flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg leading-tight text-[#10263F] transition group-hover:text-[#B3262D]">
            {product.name}
          </h3>

          <p className="shrink-0 text-sm font-black text-[#10263F]">
            {product.price}
          </p>
        </div>

        <p className="mt-3 text-[8px] font-black uppercase tracking-[0.18em] text-[#10263F]/40">
          Reserve yours →
        </p>
      </div>
    </Link>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const alternateColors = products
    .filter(
      (item) =>
        item.name === product.name &&
        item.slug !== product.slug,
    )
    .slice(0, 3);

  let completeTheLook: Product[] = [];

  if (product.collection === "women") {
    completeTheLook = products
      .filter(
        (item) =>
          item.collection === "women" &&
          item.color === product.color &&
          item.name !== product.name,
      )
      .slice(0, 2);
  } else if (product.collection === "men") {
    completeTheLook = products
      .filter(
        (item) =>
          item.collection === "headwear" &&
          item.color === product.color &&
          item.mark === product.mark,
      )
      .slice(0, 1);
  } else {
    completeTheLook = products
      .filter(
        (item) =>
          item.collection === "men" &&
          item.color === product.color &&
          item.mark === product.mark,
      )
      .slice(0, 1);
  }

  const moreFromCollection = products
    .filter(
      (item) =>
        item.collection === product.collection &&
        item.slug !== product.slug &&
        !alternateColors.some(
          (alternate) => alternate.slug === item.slug,
        ) &&
        !completeTheLook.some(
          (look) => look.slug === item.slug,
        ),
    )
    .slice(0, 4);

  return (
    <main className="bg-[#F3EFE6] text-[#10263F]">
      <section className="border-t-[7px] border-[#B3262D]">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/apparel"
              className="text-[8px] font-black uppercase tracking-[0.24em] text-[#10263F]/45 transition hover:text-[#B3262D]"
            >
              ← Back to Apparel
            </Link>

            <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#B3262D]">
              Founding Apparel · Pre-Order
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-10 lg:pb-24">
          <div>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE6DD]">
              <Image
                src={product.image}
                alt={`${product.color} ${product.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain p-4 sm:p-8"
              />

              <div className="absolute left-4 top-4 bg-[#10263F] px-4 py-2.5 text-[8px] font-black uppercase tracking-[0.22em] text-white">
                First Production
              </div>
            </div>

          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#B3262D]" />

              <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#8B6A34]">
                {product.category}
              </p>
            </div>

            <h1 className="mt-6 text-[3rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4.2rem]">
              {product.name}
            </h1>

            <p className="mt-5 max-w-lg font-serif text-xl font-light italic leading-8 text-[#10263F]/65">
              Part of the first official apparel release from The Gallaspy
              Golf Club.
            </p>

            <div className="mt-7 flex items-end justify-between border-b border-[#10263F]/15 pb-6">
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.24em] text-[#10263F]/40">
                  Color
                </p>

                <p className="mt-2 text-lg font-bold">
                  {product.color}
                </p>
              </div>

              <p className="text-3xl font-black tracking-[-0.04em]">
                {product.price}
              </p>
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
        </div>
      </section>

      <section className="border-y border-[#10263F]/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-20">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#B3262D]">
              The First Run
            </p>

            <h2 className="mt-4 max-w-xl font-serif text-[2.7rem] font-light leading-[0.98] tracking-[-0.035em] sm:text-[3.5rem]">
              Made to become part
              <span className="block italic text-[#8B6A34]">
                of the club.
              </span>
            </h2>
          </div>

          <div className="max-w-xl lg:justify-self-end">
            <p className="text-sm leading-7 text-[#10263F]/65">
              The first Gallaspy apparel release brings the visual identity of
              the club onto the course. Each piece is designed around the
              colors, marks, and understated character of The Gallaspy.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#10263F]/65">
              This first production is being offered by pre-order. Your order
              reserves the selected piece and size before production and
              fulfillment.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#10263F] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#FFD76A]">
            Product Details
          </p>

          <div className="mt-8 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Performance", "Designed for movement on and off the course."],
              ["02", product.mark, `${product.mark} identity of The Gallaspy.`],
              ["03", product.color, "One of the core colors of the club."],
              [
                "04",
                "First Production",
                "Reserved through the founding apparel pre-order.",
              ],
            ].map(([number, title, copy]) => (
              <div key={number} className="bg-[#10263F] px-6 py-8">
                <p className="text-[8px] font-black tracking-[0.25em] text-[#B3262D]">
                  {number}
                </p>

                <h3 className="mt-5 font-serif text-2xl font-light">
                  {title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-white/50">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F3EFE6]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#B3262D]">
              How Pre-Order Works
            </p>

            <h2 className="mt-4 font-serif text-[2.7rem] font-light tracking-[-0.035em] sm:text-[3.5rem]">
              Reserve the first run.
            </h2>
          </div>

          <div className="mt-10 grid gap-8 border-t border-[#10263F]/15 pt-9 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "01",
                "Reserve",
                "Choose your piece, color, and size and complete checkout.",
              ],
              [
                "02",
                "Production",
                "Pre-orders are consolidated into the upcoming production run.",
              ],
              [
                "03",
                "Made",
                "Your reserved pieces are consolidated into the first production run.",
              ],
              [
                "04",
                "Delivered",
                "Order and fulfillment updates are sent to you by email.",
              ],
            ].map(([number, title, copy]) => (
              <div key={number}>
                <p className="text-[8px] font-black tracking-[0.25em] text-[#B3262D]">
                  {number}
                </p>

                <h3 className="mt-4 font-serif text-2xl">
                  {title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-[#10263F]/55">
                  {copy}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-2xl border-l-2 border-[#B3262D] pl-5 text-xs leading-6 text-[#10263F]/50">
            Pre-order items are not currently ready to ship. Payment is
            collected at checkout to reserve your order. Production and
            fulfillment updates will be communicated by email.
          </p>
        </div>
      </section>

      {alternateColors.length > 0 && (
        <section className="border-t border-[#10263F]/10 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#B3262D]">
                  Same Piece
                </p>

                <h2 className="mt-3 font-serif text-3xl font-light sm:text-4xl">
                  Explore the colors.
                </h2>
              </div>

              <Link
                href="/apparel"
                className="hidden text-[8px] font-black uppercase tracking-[0.2em] text-[#10263F]/45 hover:text-[#B3262D] sm:block"
              >
                View All →
              </Link>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-3">
              {alternateColors.map((item) => (
                <ProductTile key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {completeTheLook.length > 0 && (
        <section className="bg-[#0D352C] text-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#FFD76A]">
                  Complete the Look
                </p>

                <h2 className="mt-4 font-serif text-[2.7rem] font-light leading-none">
                  Built to
                  <span className="block italic text-[#FFD76A]">
                    wear together.
                  </span>
                </h2>
              </div>

              <p className="max-w-lg text-sm leading-7 text-white/55 lg:justify-self-end">
                Pair this piece with coordinating Gallaspy apparel in the same
                club color.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-5">
              {completeTheLook.map((item) => (
                <Link
                  key={item.slug}
                  href={`/apparel/${item.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] bg-white/[0.06]">
                    <Image
                      src={item.image}
                      alt={`${item.color} ${item.name}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 35vw"
                      className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[7px] font-black uppercase tracking-[0.2em] text-[#FFD76A]">
                        {item.color}
                      </p>

                      <h3 className="mt-1 font-serif text-xl">
                        {item.name}
                      </h3>
                    </div>

                    <p className="text-sm font-black">
                      {item.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {moreFromCollection.length > 0 && (
        <section className="bg-[#F3EFE6]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
            <p className="text-[8px] font-black uppercase tracking-[0.32em] text-[#B3262D]">
              Keep Exploring
            </p>

            <h2 className="mt-3 font-serif text-3xl font-light sm:text-4xl">
              More from The Gallaspy.
            </h2>

            <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
              {moreFromCollection.map((item) => (
                <ProductTile key={item.slug} product={item} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/apparel"
                className="inline-flex min-h-[50px] items-center justify-center bg-[#10263F] px-8 text-[8px] font-black uppercase tracking-[0.23em] text-white transition hover:bg-[#0D352C]"
              >
                Shop All Apparel →
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-[#071827] text-white">
        <div className="h-[6px] bg-[#B3262D]" />

        <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:px-10 lg:py-24">
          <div className="relative mx-auto h-20 w-20">
            <Image
              src="/logos/official/falcon-G.png"
              alt="The Gallaspy Falcon"
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>

          <p className="mt-7 text-[8px] font-black uppercase tracking-[0.35em] text-[#FFD76A]">
            More Than Apparel
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-[2.8rem] font-light leading-[0.98] tracking-[-0.035em] sm:text-[4rem]">
            Wear the club.
            <span className="block italic text-[#FFD76A]">
              Then come play with us.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/55">
            Discover The Gallaspy, upcoming Rounds, traditions, and the club
            being built around the game.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/rounds"
              className="inline-flex min-h-[50px] items-center justify-center bg-[#FFD76A] px-7 text-[8px] font-black uppercase tracking-[0.22em] text-[#10263F] transition hover:bg-white"
            >
              Upcoming Rounds →
            </Link>

            <Link
              href="/the-club"
              className="inline-flex min-h-[50px] items-center justify-center border border-white/25 px-7 text-[8px] font-black uppercase tracking-[0.22em] text-white transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              Discover The Club
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
