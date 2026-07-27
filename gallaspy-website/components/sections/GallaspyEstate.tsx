import Image from "next/image";
import Link from "next/link";

const wines = [
  {
    name: "Mildred's Reserve",
    varietal: "Cabernet Franc",
    region: "North Georgia",
    image: "/images/wine/mildreds-reserve-bottle.png",
    eyebrow: "The Flagship Red",
    description:
      "Named in honor of Mildred Gallaspy, this Cabernet Franc represents the family legacy that inspired The Gallaspy. Envisioned for intimate dinners, fireside evenings, milestone celebrations, and traditions that will be passed from one generation to the next.",
  },
  {
    name: "Déjà Cuvée",
    varietal: "Petit Manseng",
    region: "North Georgia",
    image: "/images/wine/deja-bottle.png",
    eyebrow: "The Signature White",
    description:
      "Inspired by love, partnership, and the future, Déjà Cuvée celebrates new beginnings. This expressive Petit Manseng is envisioned for weddings, estate gatherings, warm Georgia afternoons, and unforgettable moments shared at the club.",
  },
];

export default function GallaspyEstate() {
  return (
    <section className="relative overflow-hidden bg-[#F6F1E8] text-[#10263F]">
      {/* Decorative background details */}
      <div className="pointer-events-none absolute -left-40 top-32 h-[420px] w-[420px] rounded-full border border-[#B89146]/15" />
      <div className="pointer-events-none absolute -right-52 bottom-48 h-[520px] w-[520px] rounded-full border border-[#B89146]/15" />

      {/* Estate introduction */}
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 sm:px-8 lg:px-12 lg:pb-28 lg:pt-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-24">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#9B762E]">
              The Gallaspy Estate
            </p>

            <h2 className="mt-6 font-serif text-5xl font-light leading-[0.95] sm:text-6xl lg:text-[5.4rem]">
              Wine with
              <span className="block italic text-[#9B762E]">a story.</span>
            </h2>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-16 bg-[#B89146]" />
              <div className="h-1.5 w-1.5 rotate-45 border border-[#B89146]" />
            </div>
          </div>

          <div className="max-w-2xl lg:pb-2">
            <p className="font-serif text-2xl font-light leading-relaxed text-[#10263F] sm:text-3xl">
              A signature collection inspired by family, love, hospitality, and
              the legacy behind The Gallaspy.
            </p>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#10263F]/65 sm:text-base sm:leading-8">
              The inaugural wines of The Gallaspy Estate are being created to
              become part of the club&apos;s most meaningful experiences—from
              private dinners and weddings to member celebrations and
              generations of family tradition.
            </p>
          </div>
        </div>
      </div>

      {/* Mildred's Reserve */}
      <article className="relative border-y border-[#10263F]/10 bg-[#10263F] text-white">
        <div className="mx-auto grid min-h-[760px] max-w-[1500px] lg:grid-cols-2">
          <div className="relative flex min-h-[560px] items-end justify-center overflow-hidden px-8 pt-16 lg:min-h-[760px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_55%)]" />
            <div className="absolute bottom-12 left-1/2 h-16 w-56 -translate-x-1/2 rounded-[50%] bg-black/45 blur-2xl" />

            <div className="relative h-[520px] w-full max-w-[300px] sm:h-[610px] lg:h-[680px] lg:max-w-[360px]">
              <Image
                src={wines[0].image}
                alt={`${wines[0].name} ${wines[0].varietal}`}
                fill
                priority
                sizes="(max-width: 1024px) 300px, 360px"
                className="object-contain object-bottom drop-shadow-[0_35px_45px_rgba(0,0,0,0.55)] transition duration-700 hover:-translate-y-3"
              />
            </div>

            <p className="absolute left-8 top-10 hidden font-serif text-[7rem] font-light leading-none text-white/[0.035] sm:block lg:text-[10rem]">
              01
            </p>
          </div>

          <div className="flex items-center px-7 py-20 sm:px-12 lg:px-20 lg:py-24">
            <div className="max-w-xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#D4AF37]">
                {wines[0].eyebrow}
              </p>

              <h3 className="mt-6 font-serif text-5xl font-light leading-none sm:text-6xl lg:text-7xl">
                Mildred&apos;s
                <span className="block italic text-[#D4AF37]">Reserve</span>
              </h3>

              <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50">
                <span>{wines[0].varietal}</span>
                <span className="text-[#D4AF37]">•</span>
                <span>{wines[0].region}</span>
              </div>

              <div className="my-8 h-px w-16 bg-[#D4AF37]" />

              <p className="text-base leading-8 text-white/70">
                {wines[0].description}
              </p>

              <p className="mt-8 font-serif text-xl italic leading-8 text-white/90">
                A tribute to the woman whose name became the foundation of the
                estate.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Déjà Cuvée */}
      <article className="relative bg-[#EAE1D1]">
        <div className="mx-auto grid min-h-[760px] max-w-[1500px] lg:grid-cols-2">
          <div className="order-2 flex items-center px-7 py-20 sm:px-12 lg:order-1 lg:px-20 lg:py-24">
            <div className="ml-auto max-w-xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#9B762E]">
                {wines[1].eyebrow}
              </p>

              <h3 className="mt-6 font-serif text-5xl font-light leading-none text-[#10263F] sm:text-6xl lg:text-7xl">
                Déjà
                <span className="block italic text-[#9B762E]">Cuvée</span>
              </h3>

              <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#10263F]/50">
                <span>{wines[1].varietal}</span>
                <span className="text-[#9B762E]">•</span>
                <span>{wines[1].region}</span>
              </div>

              <div className="my-8 h-px w-16 bg-[#B89146]" />

              <p className="text-base leading-8 text-[#10263F]/68">
                {wines[1].description}
              </p>

              <p className="mt-8 font-serif text-xl italic leading-8 text-[#10263F]">
                Created in celebration of love, partnership, and the legacy
                still being written.
              </p>
            </div>
          </div>

          <div className="relative order-1 flex min-h-[560px] items-end justify-center overflow-hidden px-8 pt-16 lg:order-2 lg:min-h-[760px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,145,70,0.24),transparent_56%)]" />
            <div className="absolute bottom-12 left-1/2 h-16 w-56 -translate-x-1/2 rounded-[50%] bg-[#10263F]/25 blur-2xl" />

            <div className="relative h-[520px] w-full max-w-[300px] sm:h-[610px] lg:h-[680px] lg:max-w-[360px]">
              <Image
                src={wines[1].image}
                alt={`${wines[1].name} ${wines[1].varietal}`}
                fill
                sizes="(max-width: 1024px) 300px, 360px"
                className="object-contain object-bottom drop-shadow-[0_35px_45px_rgba(16,38,63,0.25)] transition duration-700 hover:-translate-y-3"
              />
            </div>

            <p className="absolute right-8 top-10 hidden font-serif text-[7rem] font-light leading-none text-[#10263F]/[0.04] sm:block lg:text-[10rem]">
              02
            </p>
          </div>
        </div>
      </article>

      {/* Estate experiences */}
      <div className="relative bg-[#163A2F] px-6 py-24 text-white sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-24">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#D4AF37]">
                The Estate Experience
              </p>

              <h3 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
                Crafted for the moments that will define the club.
              </h3>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white/68">
                Members will experience private tastings, chef-paired dinners,
                seasonal releases, harvest celebrations, wedding events, and
                exclusive allocations from The Gallaspy Estate.
              </p>
            </div>

            <div className="border-l border-white/15 pl-8 sm:pl-12">
              <div className="space-y-7">
                {[
                  "Private wine tastings",
                  "Member-only estate allocations",
                  "Chef-paired dining experiences",
                  "Harvest and release celebrations",
                  "Weddings and private gatherings",
                ].map((experience, index) => (
                  <div
                    key={experience}
                    className="flex items-center gap-5 border-b border-white/10 pb-7"
                  >
                    <span className="font-serif text-xl text-[#D4AF37]">
                      0{index + 1}
                    </span>

                    <p className="text-sm uppercase tracking-[0.18em] text-white/82">
                      {experience}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/club/vineyard"
                className="mt-10 inline-flex min-h-[50px] items-center justify-center rounded-full border border-[#D4AF37] bg-[#D4AF37] px-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#10263F] transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Explore The Gallaspy Estate
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Development disclosure */}
      <div className="bg-[#10263F] px-6 py-7 text-center">
        <p className="mx-auto max-w-4xl text-[10px] leading-5 text-white/38">
          The Gallaspy Estate collection is currently in development. Final
          wine profiles, production partners, packaging, release timing, and
          availability remain subject to future production decisions and
          applicable regulatory approvals.
        </p>
      </div>
    </section>
  );
}