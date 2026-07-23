import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClubNavigation } from "@/components/ClubNavigation";

export const metadata: Metadata = {
  title: "Vineyard & Winery | The Gallaspy Golf & Country Club",
  description:
    "Discover the estate vineyard, winery, tasting room, private wine club, culinary pairings, harvest traditions, and vineyard events at The Gallaspy Golf & Country Club.",
};

const vineyardExperiences = [
  {
    number: "01",
    title: "Estate Vineyard",
    description:
      "A signature landscape designed to produce distinctive wines while creating one of the club’s most memorable settings.",
  },
  {
    number: "02",
    title: "Winery & Tasting Room",
    description:
      "An elegant destination for guided tastings, member gatherings, private experiences, and relaxed afternoons overlooking the vines.",
  },
  {
    number: "03",
    title: "Private Wine Cellar",
    description:
      "A curated cellar supporting member selections, reserve releases, private storage, and exceptional dining experiences.",
  },
  {
    number: "04",
    title: "Founders Wine Club",
    description:
      "A private membership experience featuring allocations, first access, special bottlings, tastings, and winemaker events.",
  },
  {
    number: "05",
    title: "Harvest Traditions",
    description:
      "Seasonal celebrations built around the vineyard, including harvest weekends, family experiences, dinners, and club traditions.",
  },
  {
    number: "06",
    title: "Wine Education",
    description:
      "Approachable seminars, pairing classes, regional tastings, cellar tours, and educational experiences led by experts.",
  },
  {
    number: "07",
    title: "Private Celebrations",
    description:
      "Vineyard weddings, rehearsal dinners, intimate gatherings, and milestone occasions surrounded by a distinctive estate setting.",
  },
  {
    number: "08",
    title: "Culinary Pairings",
    description:
      "A direct connection to Mercury Street Restaurant through seasonal menus, wine dinners, chef collaborations, and private dining.",
  },
];

const vineyardPrinciples = [
  {
    title: "Estate-Driven",
    description:
      "A vineyard experience rooted in the property, its landscape, and the long-term identity of The Gallaspy.",
  },
  {
    title: "Member-Centered",
    description:
      "Private tastings, club allocations, storage, events, and personalized experiences designed for members.",
  },
  {
    title: "Educational",
    description:
      "Welcoming opportunities to learn about regions, varietals, winemaking, collecting, and food pairing.",
  },
  {
    title: "Celebratory",
    description:
      "A natural destination for seasonal traditions, weddings, dinners, family events, and memorable gatherings.",
  },
];

const winePrograms = [
  {
    title: "Guided Tastings",
    description:
      "Curated flights and private tastings designed for both experienced collectors and members beginning their wine journey.",
  },
  {
    title: "Winemaker Dinners",
    description:
      "Intimate dinners pairing thoughtful menus with estate releases, guest wineries, and special selections.",
  },
  {
    title: "Cellar Consultations",
    description:
      "Personal guidance for members interested in collecting, organizing, storing, and building a private wine program.",
  },
  {
    title: "Regional Series",
    description:
      "Educational tastings exploring celebrated wine regions, grape varieties, producers, and winemaking traditions.",
  },
  {
    title: "Harvest Weekends",
    description:
      "Seasonal experiences featuring vineyard activity, family programming, outdoor dining, music, and member celebrations.",
  },
  {
    title: "Private Pairings",
    description:
      "Customized wine and culinary experiences for small groups, celebrations, corporate gatherings, and member-hosted events.",
  },
];

const harvestTraditions = [
  "Annual Harvest Dinner",
  "Founders Wine Release",
  "Vineyard Family Day",
  "Chef & Winemaker Series",
  "Seasonal Tasting Weekends",
  "Private Cellar Events",
];

export default function VineyardPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      <ClubNavigation />

      {/* Hero */}
      <section className="relative flex min-h-[82vh] items-center overflow-hidden px-5 sm:px-8">
        <Image
          src="/images/vineyard.png"
          alt="Estate vineyard and winery at The Gallaspy Golf and Country Club"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#10263F]/52" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/94 via-[#10263F]/65 to-[#10263F]/12" />
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
              <span className="text-[#FFD76A]">Vineyard</span>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              Vineyard & Winery
            </p>

            <h1 className="mt-5 font-serif text-[3rem] font-light leading-[0.98] text-white sm:text-6xl lg:text-[5rem]">
              Rooted in Place
              <span className="block text-[#FFD76A]">Created for Connection</span>
            </h1>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              The Gallaspy Vineyard & Winery is envisioned as a signature
              member destination for estate wines, culinary experiences,
              education, seasonal traditions, and unforgettable gatherings.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#vineyard-vision"
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Discover the Vineyard
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

      {/* Vision */}
      <section
        id="vineyard-vision"
        className="scroll-mt-40 bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24"
      >
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Vineyard Vision
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              A Signature Estate
              <span className="block">Within the Club</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              The vineyard is planned as both a working landscape and a defining
              part of the member experience.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              Rows of vines, a refined winery, a private tasting room, and
              seasonal gathering spaces will create a setting unlike that of a
              traditional country club.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              Members will be able to experience the vineyard throughout the
              year—from quiet tastings and educational programs to harvest
              celebrations, wine dinners, weddings, and private events.
            </p>
          </div>

          <div className="relative min-h-[460px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/vineyard.png"
              alt="The Gallaspy estate vineyard"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/72 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
                A Distinctive Club Experience
              </p>
              <p className="mt-3 max-w-lg font-serif text-2xl font-light">
                An estate setting where wine, hospitality, landscape, and
                tradition come together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Vineyard Experiences
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              More Than a Winery
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#1E3557]/80">
              The vineyard will support private member experiences, culinary
              programming, education, celebrations, and traditions throughout
              the year.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {vineyardExperiences.map((experience) => (
              <article
                key={experience.number}
                className="group rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-6 transition hover:-translate-y-1 hover:border-[#B89146]/45 hover:shadow-lg"
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
              src="/images/winery.png"
              alt="Winery and tasting experience at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/35 to-transparent" />
          </div>

          <div className="flex items-center px-7 py-12 sm:px-10 lg:px-14">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
                The Member Experience
              </p>

              <blockquote className="mt-6 font-serif text-[2rem] font-light leading-[1.2] text-white sm:text-[2.7rem]">
                “The vineyard will create experiences that feel deeply rooted
                in the land and distinctly Gallaspy.”
              </blockquote>

              <div className="mt-7 h-px w-14 bg-[#B89146]" />

              <p className="mt-6 text-sm leading-7 text-white/75">
                Members will be able to enjoy the vineyard casually or
                ceremonially—through a private tasting, an evening dinner, a
                harvest celebration, or a once-in-a-lifetime event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="relative min-h-[440px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/winery.png"
              alt="Private wine tasting room at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/65 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
                Estate Hospitality
              </p>

              <p className="mt-3 max-w-lg font-serif text-2xl font-light">
                Refined enough for collectors and welcoming enough for every
                member to enjoy.
              </p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Vineyard Philosophy
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Estate-Driven,
              <span className="block">Member-Centered</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              The wine program will be designed around hospitality,
              accessibility, discovery, and a strong sense of place.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {vineyardPrinciples.map((principle) => (
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

      {/* Wine Programming */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
                Wine Programming
              </p>

              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
                Discover, Collect,
                <span className="block">Taste & Celebrate</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#1E3557]/75">
              The wine program will give members recurring opportunities to
              learn, explore, collect, entertain, and build meaningful
              traditions around the vineyard.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {winePrograms.map((program, index) => (
              <article
                key={program.title}
                className="rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-7"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89146]">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-5 font-serif text-2xl font-light text-[#10263F]">
                  {program.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#B89146]" />

                <p className="mt-4 text-sm leading-7 text-[#1E3557]/80">
                  {program.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Harvest */}
      <section className="bg-[#163A2F] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Harvest Traditions
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              Seasons Worth
              <span className="block">Celebrating Together</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-white/88">
              The vineyard will create a natural calendar of traditions that
              members and families can anticipate year after year.
            </p>

            <p className="mt-5 text-sm leading-7 text-white/72">
              From the first release of an estate bottle to harvest dinners
              under the stars, these experiences will help establish the
              culture, character, and memories of the club.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {harvestTraditions.map((tradition) => (
                <div
                  key={tradition}
                  className="rounded-[14px] border border-white/15 bg-white/[0.06] px-4 py-4"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                    {tradition}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[440px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/vineyard.png"
              alt="Harvest celebrations at The Gallaspy vineyard"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/55 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Restaurant Connection */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] overflow-hidden rounded-[22px] bg-[#1E3557] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[360px] lg:min-h-[500px]">
            <Image
              src="/images/restaurant.png"
              alt="Mercury Street Restaurant and vineyard dining at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1E3557]/30" />
          </div>

          <div className="flex items-center px-7 py-12 text-white sm:px-10 lg:px-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
                Culinary Connection
              </p>

              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
                Paired With
                <span className="block">Mercury Street</span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-white/75">
                The vineyard and Mercury Street Restaurant will work together
                through seasonal pairings, private dinners, chef collaborations,
                wine education, and estate events.
              </p>

              <Link
                href="/club/restaurant"
                className="mt-8 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Explore Mercury Street
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events Connection */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Vineyard Celebrations
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              A Remarkable Setting
              <span className="block">for Life’s Milestones</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              The vineyard will provide one of the club’s most distinctive
              environments for weddings, dinners, celebrations, and private
              member events.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              Its natural beauty, estate character, and connection to the Event
              Pavilion will allow gatherings to move seamlessly between indoor
              hospitality and outdoor views.
            </p>

            <Link
              href="/club/events"
              className="mt-8 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#10263F] bg-[#10263F] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:border-[#B89146] hover:bg-[#B89146]"
            >
              Explore Private Events
            </Link>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/events.png"
              alt="Vineyard weddings and private events at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/52 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Continue Exploring */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
                Continue Exploring
              </p>

              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
                Beyond the Vineyard
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
                title: "Member Lodging",
                label: "Next Experience",
                href: "/club/lodging",
              },
              {
                title: "Mercury Street Restaurant",
                label: "Dining",
                href: "/club/restaurant",
              },
              {
                title: "Private Events",
                label: "Celebrate",
                href: "/club/events",
              },
            ].map((experience) => (
              <Link
                key={experience.href}
                href={experience.href}
                className="group rounded-[18px] border border-[#1E3557]/10 bg-white p-7 transition hover:-translate-y-1 hover:border-[#B89146]/45 hover:shadow-lg"
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
          src="/images/vineyard.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-[#10263F]/86" />

        <div className="relative z-10 mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
            The Gallaspy Vineyard & Winery
          </p>

          <h2 className="mt-5 font-serif text-[2.6rem] font-light leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Raise a Glass
            <span className="block text-[#FFD76A]">to What Comes Next</span>
          </h2>

          <div className="mx-auto mt-7 h-px w-16 bg-[#B89146]" />

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Become part of the founding generation and help shape vineyard
            traditions, member experiences, and a signature estate destination
            unlike any other club in the region.
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
