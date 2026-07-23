import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Club | The Gallaspy Golf & Country Club",
  description:
    "Explore championship golf, the Grand Clubhouse, fine dining, wellness, racquet sports, vineyard experiences, lodging, and private events at The Gallaspy Golf & Country Club.",
};

const amenities = [
  {
    id: "golf",
    eyebrow: "Championship Golf",
    title: "Designed for Exceptional Play",
    description:
      "At the heart of The Gallaspy is an 18-hole championship golf course shaped around the natural beauty of the property. The experience is envisioned for players of every skill level, with thoughtful course design, first-class practice facilities, and a strong tradition of member competition.",
    image: "/images/golf.png",
    imageAlt: "Championship golf course at The Gallaspy",
    href: "/club/golf",
    buttonLabel: "Explore Championship Golf",
    features: [
      "18 Championship Holes",
      "Practice Facility",
      "Short-Game Complex",
      "Putting Course",
    ],
  },
  {
    id: "clubhouse",
    eyebrow: "The Grand Clubhouse",
    title: "The Heart of The Gallaspy",
    description:
      "The Grand Clubhouse is envisioned as the architectural and social centerpiece of the club. Members will gather here for dining, celebrations, golf traditions, private events, and the everyday moments that create a lasting sense of belonging.",
    image: "/images/clubhouse.png",
    imageAlt: "The Grand Clubhouse at The Gallaspy",
    href: "/club/clubhouse",
    buttonLabel: "Discover the Grand Clubhouse",
    features: [
      "Member Lounges",
      "Golf Shop",
      "Locker Rooms",
      "18th Green Terrace",
    ],
  },
  {
    id: "restaurant",
    eyebrow: "Mercury Street Restaurant",
    title: "Dining With a Sense of Place",
    description:
      "Mercury Street Restaurant is planned as the culinary heart of the club. Members will enjoy chef-driven menus, private dining, seasonal events, an elevated wine program, and outdoor terraces overlooking the club landscape.",
    image: "/images/mercurystreet.png",
    imageAlt: "Mercury Street Restaurant at The Gallaspy",
    href: "/club/restaurant",
    buttonLabel: "Discover Mercury Street",
    features: [
      "Chef-Driven Dining",
      "Private Dining Rooms",
      "Outdoor Terrace",
      "Signature Wine Program",
    ],
  },
  {
    id: "wellness",
    eyebrow: "Wellness & Spa",
    title: "Restore, Recharge, Renew",
    description:
      "The wellness experience will combine fitness, recovery, spa treatments, and resort-style recreation in a private setting. Every space is intended to support balance, health, and a more complete club lifestyle.",
    image: "/images/wellness.png",
    imageAlt: "Wellness and spa facilities at The Gallaspy",
    href: "/club/wellness",
    buttonLabel: "Experience Wellness",
    features: [
      "Full-Service Spa",
      "Fitness Center",
      "Recovery Therapies",
      "Resort-Style Pool",
    ],
  },
  {
    id: "racquet",
    eyebrow: "Racquet Club",
    title: "Competition, Instruction, and Recreation",
    description:
      "The racquet program will serve both competitive players and families. Tennis, pickleball, clinics, league play, and social programming will create an active, welcoming environment for members of all ages.",
    image: "/images/arrival.png",
    imageAlt: "Racquet and recreation experience at The Gallaspy",
    href: "/club/racquet",
    buttonLabel: "Explore the Racquet Club",
    features: [
      "Tennis Courts",
      "Pickleball Courts",
      "Professional Instruction",
      "Member League Play",
    ],
  },
  {
    id: "vineyard",
    eyebrow: "Vineyard & Winery",
    title: "A Signature Experience of the Club",
    description:
      "The estate vineyard and future winery are envisioned as defining features of The Gallaspy. Members will gather for tastings, harvest dinners, private events, and seasonal experiences that connect hospitality with the natural character of the land.",
    image: "/images/vineyard.png",
    imageAlt: "Vineyard and winery at The Gallaspy",
    href: "/club/vineyard",
    buttonLabel: "Visit the Vineyard",
    features: [
      "Estate Vineyard",
      "Private Tastings",
      "Harvest Dinners",
      "Member Wine Events",
    ],
  },
  {
    id: "lodging",
    eyebrow: "Member Lodging",
    title: "A Private Retreat Within the Club",
    description:
      "Luxury lodging will allow members and guests to extend their experience beyond a single day. Suites, cottages, and personalized hospitality will support weekend stays, family visits, executive retreats, and special celebrations.",
    image: "/images/lodging.png",
    imageAlt: "Luxury member lodging at The Gallaspy",
    href: "/club/lodging",
    buttonLabel: "Explore Member Lodging",
    features: [
      "Luxury Suites",
      "Guest Cottages",
      "Concierge Service",
      "Weekend Retreats",
    ],
  },
  {
    id: "events",
    eyebrow: "Event Pavilion",
    title: "A Setting for Life’s Most Meaningful Moments",
    description:
      "The Event Pavilion will be designed for weddings, galas, corporate retreats, charity gatherings, and private celebrations. Elegant architecture, flexible indoor-outdoor spaces, and exceptional service will make every event feel distinctive.",
    image: "/images/clubhouse.png",
    imageAlt: "Event Pavilion and clubhouse at The Gallaspy",
    href: "/club/events",
    buttonLabel: "Explore Private Events",
    features: [
      "Weddings & Galas",
      "Corporate Retreats",
      "Charity Events",
      "Private Celebrations",
    ],
  },
];

export default function ClubPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      {/* Hero */}
      <section className="relative flex min-h-[74vh] items-center overflow-hidden px-5 pt-[72px] sm:px-8">
        <Image
          src="/images/hero.jpg"
          alt="The Gallaspy Golf and Country Club"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#10263F]/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/90 via-[#10263F]/58 to-[#10263F]/25" />

        <div className="relative z-10 mx-auto w-full max-w-[1060px] py-20 text-white sm:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              The Club
            </p>

            <h1 className="mt-5 font-serif text-[2.8rem] font-light leading-[1.02] text-white sm:text-6xl lg:text-[4.7rem]">
              A Private Club
              <span className="block">Unlike Any Other</span>
            </h1>

            <div className="mt-6 h-px w-16 bg-[#B89146]" />

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              Every detail of The Gallaspy is being envisioned to bring
              championship golf, exceptional hospitality, wellness, recreation,
              and family traditions together in one extraordinary private
              destination.
            </p>

            <Link
              href="#golf"
              className="mt-8 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#B89146] bg-[#B89146] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-[#FFD76A] hover:text-[#10263F]"
            >
              Explore the Experiences
            </Link>
          </div>
        </div>
      </section>

      {/* Experience navigation */}
      <section className="border-b border-[#1E3557]/10 bg-[#10263F] px-5 py-5 sm:px-8">
        <div className="mx-auto flex w-full max-w-[1060px] gap-2 overflow-x-auto pb-1">
          {amenities.map((amenity) => (
            <Link
              key={amenity.id}
              href={`#${amenity.id}`}
              className="inline-flex min-h-[38px] shrink-0 items-center justify-center rounded-full border border-white/20 px-4 text-[9px] font-bold uppercase tracking-[0.15em] text-white/80 transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              {amenity.eyebrow}
            </Link>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Gallaspy Experience
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              More Than Amenities
              <span className="block">A Complete Way of Life</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />
          </div>

          <div className="border-l border-[#B89146]/35 pl-6 sm:pl-8">
            <p className="text-base leading-8 text-[#1E3557]">
              The Gallaspy is being designed as a place where members can move
              naturally from golf and wellness to dining, recreation,
              hospitality, and private celebrations.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              Each part of the club supports the next, creating an experience
              that feels connected, personal, and worthy of becoming a
              tradition for generations.
            </p>
          </div>
        </div>
      </section>

      {/* Amenity sections */}
      {amenities.map((amenity, index) => {
        const imageFirst = index % 2 === 0;

        return (
          <section
            key={amenity.id}
            id={amenity.id}
            className={`scroll-mt-24 ${
              index % 2 === 0 ? "bg-white" : "bg-[#F7F4EE]"
            }`}
          >
            <div className="mx-auto grid w-full max-w-[1060px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
              <Link
                href={amenity.href}
                aria-label={amenity.buttonLabel}
                className={`group relative min-h-[360px] overflow-hidden rounded-[22px] lg:min-h-[520px] ${
                  imageFirst ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <Image
                  src={amenity.image}
                  alt={amenity.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/55 via-transparent to-transparent opacity-70 transition group-hover:opacity-90" />

                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-6 text-white">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em]">
                    View Experience
                  </p>

                  <span className="text-xl transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>

              <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
                  {amenity.eyebrow}
                </p>

                <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
                  {amenity.title}
                </h2>

                <div className="mt-6 h-px w-14 bg-[#B89146]" />

                <p className="mt-6 text-sm leading-7 text-[#1E3557]/80 sm:text-base sm:leading-8">
                  {amenity.description}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {amenity.features.map((feature) => (
                    <div
                      key={feature}
                      className="rounded-[14px] border border-[#1E3557]/10 bg-[#F7F4EE] px-4 py-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#10263F]">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href={amenity.href}
                  className="mt-8 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#B89146] bg-[#B89146] px-7 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:bg-[#FFD76A] hover:text-[#10263F]"
                >
                  {amenity.buttonLabel}
                  <span className="ml-3 text-base">→</span>
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      {/* Final CTA */}
      <section className="bg-[#1E3557] px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1060px] flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Membership at The Gallaspy
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              More Than Amenities.
              <span className="block">A Way of Life.</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/75">
              Become part of the founding generation and help shape the
              traditions of a club being built to last.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href="/founding-250#registration"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Join the Founding 250
            </Link>

            <Link
              href="/membership#membership-interest"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/35 px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              Explore Membership
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}