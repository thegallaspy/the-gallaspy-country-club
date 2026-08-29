import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductPurchase from "@/components/apparel/ProductPurchase";

const products = [
  {
    slug: "navy-crest-performance-polo",
    name: "Crest Performance Polo",
    category: "Men's Performance Polo",
    color: "Navy",
    price: "$60",
    image: "/images/apparel/men/polos/navy-crest-polo.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    slug: "forest-green-crest-performance-polo",
    name: "Crest Performance Polo",
    category: "Men's Performance Polo",
    color: "Forest Green",
    price: "$60",
    image: "/images/apparel/men/polos/forest-green-crest-polo.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    slug: "white-crest-performance-polo",
    name: "Crest Performance Polo",
    category: "Men's Performance Polo",
    color: "White",
    price: "$60",
    image: "/images/apparel/men/polos/white-crest-polo.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },

  {
    slug: "navy-falcon-performance-polo",
    name: "Falcon Performance Polo",
    category: "Men's Performance Polo",
    color: "Navy",
    price: "$60",
    image: "/images/apparel/men/polos/navy-falcon-polo.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    slug: "forest-green-falcon-performance-polo",
    name: "Falcon Performance Polo",
    category: "Men's Performance Polo",
    color: "Forest Green",
    price: "$60",
    image: "/images/apparel/men/polos/forest-green-falcon-polo.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    slug: "white-falcon-performance-polo",
    name: "Falcon Performance Polo",
    category: "Men's Performance Polo",
    color: "White",
    price: "$60",
    image: "/images/apparel/men/polos/white-falcon-polo.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },

  {
    slug: "navy-script-performance-polo",
    name: "Script Performance Polo",
    category: "Men's Performance Polo",
    color: "Navy",
    price: "$60",
    image: "/images/apparel/men/polos/navy-script-polo.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    slug: "forest-green-script-performance-polo",
    name: "Script Performance Polo",
    category: "Men's Performance Polo",
    color: "Forest Green",
    price: "$60",
    image: "/images/apparel/men/polos/forest-green-script-polo.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    slug: "white-script-performance-polo",
    name: "Script Performance Polo",
    category: "Men's Performance Polo",
    color: "White",
    price: "$60",
    image: "/images/apparel/men/polos/white-script-polo.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },

  {
    slug: "navy-womens-falcon-sleeveless-polo",
    name: "Falcon Sleeveless Polo",
    category: "Women's Performance",
    color: "Navy",
    price: "$40",
    image: "/images/apparel/women/sleeveless-polos/navy-womens-falcon-sleeveless-polo.png",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "forest-green-womens-falcon-sleeveless-polo",
    name: "Falcon Sleeveless Polo",
    category: "Women's Performance",
    color: "Forest Green",
    price: "$40",
    image: "/images/apparel/women/sleeveless-polos/forest-green-womens-falcon-sleeveless-polo.png",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "white-womens-falcon-sleeveless-polo",
    name: "Falcon Sleeveless Polo",
    category: "Women's Performance",
    color: "White",
    price: "$40",
    image: "/images/apparel/women/sleeveless-polos/white-womens-falcon-sleeveless-polo.png",
    sizes: ["XS", "S", "M", "L", "XL"],
  },

  {
    slug: "navy-womens-falcon-sleeveless-quarter-zip",
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's Performance",
    color: "Navy",
    price: "$35",
    image: "/images/apparel/women/quarter-zips/navy-womens-falcon-sleeveless-quarter-zip.png",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "forest-green-womens-falcon-sleeveless-quarter-zip",
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's Performance",
    color: "Forest Green",
    price: "$35",
    image: "/images/apparel/women/quarter-zips/forest-green-womens-falcon-sleeveless-quarter-zip.png",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "white-womens-falcon-sleeveless-quarter-zip",
    name: "Falcon Sleeveless Quarter-Zip",
    category: "Women's Performance",
    color: "White",
    price: "$35",
    image: "/images/apparel/women/quarter-zips/white-womens-falcon-sleeveless-quarter-zip.png",
    sizes: ["XS", "S", "M", "L", "XL"],
  },

  {
    slug: "navy-womens-falcon-skirt",
    name: "Falcon Performance Skirt",
    category: "Women's Performance",
    color: "Navy",
    price: "$45",
    image: "/images/apparel/women/skirts/navy-womens-falcon-skirt.png",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "forest-green-womens-falcon-skirt",
    name: "Falcon Performance Skirt",
    category: "Women's Performance",
    color: "Forest Green",
    price: "$45",
    image: "/images/apparel/women/skirts/forest-green-womens-falcon-skirt.png",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "white-womens-falcon-skirt",
    name: "Falcon Performance Skirt",
    category: "Women's Performance",
    color: "White",
    price: "$45",
    image: "/images/apparel/women/skirts/white-womens-falcon-skirt.png",
    sizes: ["XS", "S", "M", "L", "XL"],
  },

  {
    slug: "navy-crest-performance-hat",
    name: "Crest Performance Hat",
    category: "Performance Headwear",
    color: "Navy",
    price: "$45",
    image: "/images/apparel/headwear/crest/navy-crest-performance-hat.png",
    sizes: ["One Size"],
  },
  {
    slug: "forest-green-crest-performance-hat",
    name: "Crest Performance Hat",
    category: "Performance Headwear",
    color: "Forest Green",
    price: "$45",
    image: "/images/apparel/headwear/crest/forest-green-crest-performance-hat.png",
    sizes: ["One Size"],
  },
  {
    slug: "white-crest-performance-hat",
    name: "Crest Performance Hat",
    category: "Performance Headwear",
    color: "White",
    price: "$45",
    image: "/images/apparel/headwear/crest/white-crest-performance-hat.png",
    sizes: ["One Size"],
  },

  {
    slug: "navy-falcon-performance-hat",
    name: "Falcon Performance Hat",
    category: "Performance Headwear",
    color: "Navy",
    price: "$45",
    image: "/images/apparel/headwear/falcon/navy-falcon-performance-hat.png",
    sizes: ["One Size"],
  },
  {
    slug: "forest-green-falcon-performance-hat",
    name: "Falcon Performance Hat",
    category: "Performance Headwear",
    color: "Forest Green",
    price: "$45",
    image: "/images/apparel/headwear/falcon/forest-green-falcon-performance-hat.png",
    sizes: ["One Size"],
  },
  {
    slug: "white-falcon-performance-hat",
    name: "Falcon Performance Hat",
    category: "Performance Headwear",
    color: "White",
    price: "$45",
    image: "/images/apparel/headwear/falcon/white-falcon-performance-hat.png",
    sizes: ["One Size"],
  },

  {
    slug: "navy-script-performance-hat",
    name: "Script Performance Hat",
    category: "Performance Headwear",
    color: "Navy",
    price: "$45",
    image: "/images/apparel/headwear/script/navy-script-performance-hat.png",
    sizes: ["One Size"],
  },
  {
    slug: "forest-green-script-performance-hat",
    name: "Script Performance Hat",
    category: "Performance Headwear",
    color: "Forest Green",
    price: "$45",
    image: "/images/apparel/headwear/script/forest-green-script-performance-hat.png",
    sizes: ["One Size"],
  },
  {
    slug: "white-script-performance-hat",
    name: "Script Performance Hat",
    category: "Performance Headwear",
    color: "White",
    price: "$45",
    image: "/images/apparel/headwear/script/white-script-performance-hat.png",
    sizes: ["One Size"],
  },
];

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

  return (
    <main className="bg-[#F3EFE6] text-[#10263F]">
      <section className="border-t-[7px] border-[#B3262D]">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <Link
            href="/apparel"
            className="text-[9px] font-black uppercase tracking-[0.24em] text-[#10263F]/50 transition hover:text-[#B3262D]"
          >
            ← Back to Apparel
          </Link>
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-10 lg:pb-28">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE6DD]">
            <Image
              src={product.image}
              alt={`${product.color} ${product.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain p-4 sm:p-8"
            />
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

            <div className="mt-7 flex items-end justify-between border-b border-[#10263F]/15 pb-6">
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.24em] text-[#10263F]/40">
                  Color
                </p>
                <p className="mt-2 text-lg font-bold">{product.color}</p>
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

            <div className="mt-8 border-t border-[#10263F]/15 pt-6">
              <p className="text-sm leading-7 text-[#10263F]/55">
                Premium golf apparel from The Gallaspy Golf Club.
              </p>

              <p className="mt-2 font-serif text-lg italic text-[#8B6A34]">
                Made for the course. Built for The Gallaspy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
