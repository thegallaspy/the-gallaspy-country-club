import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClubNavigation } from "@/components/ClubNavigation";

export const metadata: Metadata = {
  title: "Mercury Street Restaurant | The Gallaspy Golf & Country Club",
  description:
    "Discover Mercury Street Restaurant, private dining, seasonal cuisine, wine experiences, and outdoor terrace dining at The Gallaspy Golf & Country Club.",
};

const diningExperiences = [
  {
    number: "01",
    title: "Main Dining Room",
    description:
      "A refined yet welcoming setting for everyday member dining, special evenings, and relaxed gatherings with family and friends.",
  },
  {
    number: "02",
    title: "Private Dining Rooms",
    description:
      "Intimate rooms for business dinners, family milestones, wine pairings, and member-hosted celebrations.",
  },
  {
    number: "03",
    title: "Outdoor Terrace",
    description:
      "Open-air dining with views across the club landscape, designed for brunch, cocktails, sunset dinners, and seasonal events.",
  },
  {
    number: "04",
    title: "Member Bar & Lounge",
    description:
      "A polished social setting for post-round drinks, casual conversation, signature cocktails, and evening gatherings.",
  },
  {
    number: "05",
    title: "Chef’s Table",
    description:
      "A more immersive culinary experience featuring tasting menus, private demonstrations, and chef-led dinners.",
  },
  {
    number: "06",
    title: "Wine Room",
    description:
      "A dedicated setting for curated tastings, private collections, vineyard dinners, and member wine experiences.",
  },
];

const culinaryPrinciples = [
  {
    title: "Seasonal",
    description:
      "Menus shaped around the best ingredients of each season and designed to keep the dining experience fresh throughout the year.",
  },
  {
    title: "Local",
    description:
      "A commitment to regional farms, producers, and flavors that connect the restaurant to Georgia and the surrounding community.",
  },
  {
    title: "Refined",
    description:
      "Thoughtful presentation, attentive service, and elevated execution without losing warmth or approachability.",
  },
  {
    title: "Memorable",
    description:
      "Signature dishes, wine pairings, and special events intended to become part of the culture and traditions of the club.",
  },
];

const memberTraditions = [
  {
    title: "Sunday Brunch",
    description:
      "A relaxed weekly tradition for families, friends, and members gathering after golf, worship, or a quiet morning at the club.",
  },
  {
    title: "Wine Dinners",
    description:
      "Chef-curated menus paired with estate, regional, and international wines in an intimate member setting.",
  },
  {
    title: "Harvest Evenings",
    description:
      "Seasonal dinners celebrating the vineyard, local ingredients, and the natural rhythm of the property.",
  },
  {
    title: "Holiday Dining",
    description:
      "Festive menus and elegant celebrations designed to become annual family traditions at The Gallaspy.",
  },
  {
    title: "Chef Series",
    description:
      "Special dinners, demonstrations, and guest-chef experiences that bring variety and discovery to the culinary calendar.",
  },
  {
    title: "Post-Round Gatherings",
    description:
      "Casual food, drinks, and conversation that naturally continue the golf experience after the final putt.",
  },
];

export default function RestaurantPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      <ClubNavigation />

      {/* Hero */}
      <section className="relative flex min-h-[82vh] items-center overflow-hidden px-5 sm:px-8">
        <Image
          src="/images/mercurystreet.png"
          alt="Mercury Street Restaurant at The Gallaspy Golf and Country Club"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#10263F]/58" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/95 via-[#10263F]/68 to-[#10263F]/18" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#10263F]/50 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1060px] py-24 text-white">
          <div className="max-w-3xl">
            <div className="mb-7 flex flex-wrap items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/65">
              <Link href="/" className="transition hover:text-[#FFD76A]">
                Home
              </Link>
              <span>/</span>
              <Link href="/club" className="transition hover:text-[#FFD76A]">
                The Club
              </Link>
              <span>/</span>
              <span className="text-[#FFD76A]">Restaurant</span>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              Mercury Street Restaurant
            </p>

            <h1 className="mt-5 font-serif text-[3rem] font-light leading-[0.98] text-white sm:text-6xl lg:text-[5rem]">
              Dining With
              <span className="block text-[#FFD76A]">a Sense of Place</span>
            </h1>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              Mercury Street Restaurant is envisioned as the culinary heart of
              The Gallaspy—where thoughtful cuisine, gracious service, local
              character, and memorable member traditions come together.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#restaurant-vision"
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Discover Mercury Street
              </Link>

              <Link
                href="/membership"
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/55 bg-white/[0.05] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
              >
                Explore Membership
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Vision */}
      <section
        id="restaurant-vision"
        className="scroll-mt-40 bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24"
      >
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Culinary Vision
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              More Than a Restaurant
              <span className="block">A Member Tradition</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              Mercury Street Restaurant is being designed as a place members
              can enjoy often, not only on special occasions.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              The experience will balance elevated cuisine with everyday
              comfort, creating a setting equally suited for a casual lunch,
              post-round gathering, family dinner, private celebration, or
              memorable evening with guests.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              Seasonal menus, thoughtful hospitality, private dining, a strong
              wine program, and indoor-outdoor spaces will make Mercury Street
              one of the defining experiences of club life.
            </p>
          </div>

          <div className="relative min-h-[460px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/mercurystreet.png"
              alt="Dining experience at Mercury Street Restaurant"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/72 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
                The Culinary Heart
              </p>
              <p className="mt-3 max-w-lg font-serif text-2xl font-light">
                A place for everyday dining, meaningful celebrations, and
                lasting club traditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dining Experiences */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Dining Experiences
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Designed for Every Occasion
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#1E3557]/80">
              From a relaxed lunch to a private dinner or signature celebration,
              each space is being designed to feel distinct while remaining
              connected to the spirit of the club.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {diningExperiences.map((experience) => (
              <article
                key={experience.number}
                className="group rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-7 transition hover:-translate-y-1 hover:border-[#B89146]/45 hover:shadow-lg"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89146]">
                  {experience.number}
                </p>

                <h3 className="mt-5 font-serif text-2xl font-light text-[#10263F]">
                  {experience.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#B89146] transition-all group-hover:w-16" />

                <p className="mt-4 text-sm leading-7 text-[#1E3557]/80">
                  {experience.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Feature */}
      <section className="bg-[#10263F] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] overflow-hidden rounded-[22px] border border-white/10 lg:grid-cols-2">
          <div className="relative min-h-[420px] lg:min-h-[600px]">
            <Image
              src="/images/mercurystreet.png"
              alt="Elegant dining at Mercury Street Restaurant"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/35 to-transparent" />
          </div>

          <div className="flex items-center px-7 py-12 sm:px-10 lg:px-14">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
                The Member Table
              </p>

              <blockquote className="mt-6 font-serif text-[2rem] font-light leading-[1.2] text-white sm:text-[2.7rem]">
                “The best club dining feels exceptional enough for a
                celebration and familiar enough for every week.”
              </blockquote>

              <div className="mt-7 h-px w-14 bg-[#B89146]" />

              <p className="mt-6 text-sm leading-7 text-white/75">
                Mercury Street is intended to become one of the places members
                return to most often—a setting where hospitality feels personal
                and every table carries the possibility of a new tradition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary Philosophy */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="relative min-h-[440px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/vineyard.png"
              alt="Vineyard and culinary landscape at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/65 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
                From Property to Plate
              </p>

              <p className="mt-3 max-w-lg font-serif text-2xl font-light">
                Seasonal cuisine connected to the land, vineyard, and character
                of Georgia.
              </p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Culinary Philosophy
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Thoughtful Cuisine,
              <span className="block">Rooted in Place</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              The culinary program will reflect the natural character of the
              property and the hospitality traditions of the region.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              Menus will be designed around seasonality, quality ingredients,
              and a balance of familiar favorites and elevated culinary
              experiences.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {culinaryPrinciples.map((principle) => (
                <div
                  key={principle.title}
                  className="rounded-[14px] border border-[#1E3557]/10 bg-white p-5"
                >
                  <h3 className="font-serif text-xl font-light text-[#10263F]">
                    {principle.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#1E3557]/75">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wine Program */}
      <section className="bg-[#163A2F] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Wine at The Gallaspy
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              A Program Connected
              <span className="block">to the Vineyard</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-white/88">
              Mercury Street’s wine program will be closely connected to the
              estate vineyard and the broader hospitality vision of the club.
            </p>

            <p className="mt-5 text-sm leading-7 text-white/72">
              Members will enjoy curated tastings, private wine dinners,
              vineyard events, cellar experiences, and pairings designed around
              seasonal menus.
            </p>

            <Link
              href="/club/vineyard"
              className="mt-8 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Explore the Vineyard
            </Link>
          </div>

          <div className="relative min-h-[440px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/vineyard.png"
              alt="Vineyard and wine program at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/55 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Member Traditions */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
                Member Traditions
              </p>

              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
                Experiences Worth
                <span className="block">Returning To</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#1E3557]/75">
              The restaurant will help shape the weekly, seasonal, and annual
              traditions that define life at The Gallaspy.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {memberTraditions.map((tradition, index) => (
              <article
                key={tradition.title}
                className="rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-7"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89146]">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-5 font-serif text-2xl font-light text-[#10263F]">
                  {tradition.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#B89146]" />

                <p className="mt-4 text-sm leading-7 text-[#1E3557]/80">
                  {tradition.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Master Plan Link */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] overflow-hidden rounded-[22px] bg-[#1E3557] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[360px] lg:min-h-[500px]">
            <Image
              src="/images/masterplan-render.png"
              alt="Mercury Street Restaurant within The Gallaspy master plan"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1E3557]/30" />
          </div>

          <div className="flex items-center px-7 py-12 text-white sm:px-10 lg:px-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
                The Complete Vision
              </p>

              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
                Dining at the Heart
                <span className="block">of Club Life</span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-white/75">
                Mercury Street Restaurant will connect the Grand Clubhouse,
                vineyard, event spaces, championship golf, and member
                hospitality within one complete destination.
              </p>

              <Link
                href="/master-plan"
                className="mt-8 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Explore the Master Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Exploring */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
                Continue Exploring
              </p>

              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
                Beyond the Table
              </h2>
            </div>

            <Link
              href="/club"
              className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#10263F] transition hover:text-[#B89146]"
            >
              View All Experiences →
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Wellness & Spa",
                label: "Next Experience",
                href: "/club/wellness",
              },
              {
                title: "The Grand Clubhouse",
                label: "Clubhouse",
                href: "/club/clubhouse",
              },
              {
                title: "Vineyard & Winery",
                label: "Wine",
                href: "/club/vineyard",
              },
            ].map((experience) => (
              <Link
                key={experience.href}
                href={experience.href}
                className="group rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-7 transition hover:-translate-y-1 hover:border-[#B89146]/45 hover:shadow-lg"
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#B89146]">
                  {experience.label}
                </p>

                <div className="mt-5 flex items-end justify-between gap-4">
                  <h3 className="font-serif text-2xl font-light text-[#10263F]">
                    {experience.title}
                  </h3>

                  <span className="text-xl text-[#B89146] transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#10263F] px-5 py-20 text-white sm:px-8 lg:py-28">
        <Image
          src="/images/mercurystreet.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-[#10263F]/86" />

        <div className="relative z-10 mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
            Mercury Street Restaurant
          </p>

          <h2 className="mt-5 font-serif text-[2.6rem] font-light leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Every Table
            <span className="block text-[#FFD76A]">Tells a Story</span>
          </h2>

          <div className="mx-auto mt-7 h-px w-16 bg-[#B89146]" />

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Become part of the founding generation and help shape the dining
            traditions, celebrations, and member experiences that will define
            The Gallaspy.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/founding-250#registration"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Join the Founding 250
            </Link>

            <Link
              href="/membership"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/45 px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              View Membership
            </Link>

            <Link
              href="/club"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/45 px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              Explore the Club
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}