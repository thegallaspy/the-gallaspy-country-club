import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery | The Gallaspy Golf & Country Club",
  description:
    "Explore the visual vision for The Gallaspy Golf & Country Club, including championship golf, dining, wellness, lodging, vineyard experiences, and private-club life.",
};

const galleryImages = [
  {
    title: "The Arrival",
    category: "Arrival Experience",
    description:
      "A private, tree-lined entrance designed to establish a sense of elegance from the moment members arrive.",
    image: "/images/arrival.png",
    alt: "Arrival experience at The Gallaspy Golf and Country Club",
    layout: "large",
  },
  {
    title: "The Clubhouse",
    category: "Club Life",
    description:
      "The social heart of the club, bringing dining, hospitality, events, and member traditions together.",
    image: "/images/clubhouse.png",
    alt: "Grand clubhouse at The Gallaspy Golf and Country Club",
    layout: "standard",
  },
  {
    title: "Championship Golf",
    category: "Golf",
    description:
      "An 18-hole championship experience shaped around the natural character of the property.",
    image: "/images/golf.png",
    alt: "Championship golf course at The Gallaspy",
    layout: "standard",
  },
  {
    title: "Mercury Street Restaurant",
    category: "Dining",
    description:
      "Chef-driven dining, private gatherings, and outdoor terraces overlooking the club landscape.",
    image: "/images/mercurystreet.png",
    alt: "Mercury Street Restaurant at The Gallaspy",
    layout: "wide",
  },
  {
    title: "Wellness & Spa",
    category: "Wellness",
    description:
      "A restorative environment for fitness, spa treatments, recovery, and resort-style recreation.",
    image: "/images/wellness.png",
    alt: "Wellness and spa facilities at The Gallaspy",
    layout: "standard",
  },
  {
    title: "The Vineyard",
    category: "Vineyard",
    description:
      "An estate vineyard envisioned for tastings, seasonal dinners, private events, and member experiences.",
    image: "/images/vineyard.png",
    alt: "Vineyard and winery at The Gallaspy",
    layout: "standard",
  },
  {
    title: "Member Lodging",
    category: "Hospitality",
    description:
      "Private suites and cottages designed for weekend stays, family visits, and special occasions.",
    image: "/images/lodging.png",
    alt: "Luxury member lodging at The Gallaspy",
    layout: "large",
  },
];

function getLayoutClasses(layout: string) {
  if (layout === "large") {
    return "md:col-span-2 md:row-span-2 min-h-[430px] lg:min-h-[620px]";
  }

  if (layout === "wide") {
    return "md:col-span-2 min-h-[360px] lg:min-h-[430px]";
  }

  return "min-h-[340px] lg:min-h-[400px]";
}

export default function GalleryPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden px-5 pt-[72px] sm:px-8">
        <Image
          src="/images/clubhouse.png"
          alt="The Gallaspy Golf and Country Club"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#10263F]/64" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/92 via-[#10263F]/58 to-[#10263F]/22" />

        <div className="relative z-10 mx-auto w-full max-w-[1060px] py-20 text-white sm:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              The Gallery
            </p>

            <h1 className="mt-5 font-serif text-[2.8rem] font-light leading-[1.02] text-white sm:text-6xl lg:text-[4.7rem]">
              A Vision
              <span className="block">Brought to Life</span>
            </h1>

            <div className="mt-6 h-px w-16 bg-[#B89146]" />

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              Explore the proposed environments, experiences, and destinations
              that will define life at The Gallaspy Golf &amp; Country Club.
            </p>

            <a
              href="#gallery"
              className="mt-8 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#B89146] bg-[#B89146] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-[#FFD76A] hover:text-[#10263F]"
            >
              View the Gallery
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Visual Story
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Designed Around
              <span className="block">Experience and Place</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />
          </div>

          <div className="border-l border-[#B89146]/35 pl-6 sm:pl-8">
            <p className="text-base leading-8 text-[#1E3557]">
              Every part of The Gallaspy is being envisioned to feel connected,
              refined, and deeply rooted in the character of the land.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              These renderings represent the intended spirit of the club, from
              the arrival sequence and championship golf to dining, wellness,
              lodging, and vineyard experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section
        id="gallery"
        className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 lg:py-20"
      >
        <div className="mx-auto w-full max-w-[1180px]">
          <div className="grid auto-rows-auto gap-5 md:grid-cols-2">
            {galleryImages.map((item) => (
              <article
                key={item.title}
                className={`group relative overflow-hidden rounded-[22px] ${getLayoutClasses(
                  item.layout,
                )}`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes={
                    item.layout === "large" || item.layout === "wide"
                      ? "(max-width: 768px) 100vw, 100vw"
                      : "(max-width: 768px) 100vw, 50vw"
                  }
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/92 via-[#10263F]/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FFD76A]">
                    {item.category}
                  </p>

                  <h2 className="mt-3 font-serif text-3xl font-light leading-tight text-white sm:text-[2.3rem]">
                    {item.title}
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/78">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Vision statement */}
      <section className="bg-[#163A2F] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
            A Legacy in the Making
          </p>

          <blockquote className="mt-6 font-serif text-[2rem] font-light leading-[1.2] text-white sm:text-[2.8rem]">
            “A place where championship golf, exceptional hospitality, and
            family traditions come together.”
          </blockquote>

          <div className="mx-auto mt-7 h-px w-14 bg-[#B89146]" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/72">
            The final design will continue to evolve through planning,
            architecture, engineering, and development, while remaining guided
            by the club&apos;s founding principles of tradition, family, and
            excellence.
          </p>
        </div>
      </section>

      {/* Explore more */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Continue Exploring
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Discover the Full Vision
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Link
              href="/club"
              className="group rounded-[18px] border border-[#1E3557]/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(16,38,63,0.08)]"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#B89146]">
                The Club
              </p>

              <h3 className="mt-4 font-serif text-2xl font-light text-[#10263F]">
                Explore the Amenities
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#1E3557]/75">
                Learn more about golf, dining, wellness, lodging, events, and
                private-club life.
              </p>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#10263F]">
                View The Club →
              </p>
            </Link>

            <Link
              href="/why-the-gallaspy"
              className="group rounded-[18px] border border-[#1E3557]/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(16,38,63,0.08)]"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#B89146]">
                The Vision
              </p>

              <h3 className="mt-4 font-serif text-2xl font-light text-[#10263F]">
                Why The Gallaspy
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#1E3557]/75">
                Discover the location, legacy, guiding principles, and phased
                development plan.
              </p>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#10263F]">
                Discover the Vision →
              </p>
            </Link>

            <Link
              href="/membership"
              className="group rounded-[18px] border border-[#1E3557]/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(16,38,63,0.08)]"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#B89146]">
                Membership
              </p>

              <h3 className="mt-4 font-serif text-2xl font-light text-[#10263F]">
                Join the Founding Generation
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#1E3557]/75">
                Register your interest in future membership opportunities and
                project updates.
              </p>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#10263F]">
                Register Interest →
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1E3557] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1060px] flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Become Part of the Vision
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              The Beginning of
              <span className="block">Something Extraordinary</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/75">
              Register your interest to receive future development,
              membership, and project announcements.
            </p>
          </div>

          <Link
            href="/membership#membership-interest"
            className="inline-flex min-h-[46px] shrink-0 items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
          >
            Register Interest
          </Link>
        </div>
      </section>
    </main>
  );
}