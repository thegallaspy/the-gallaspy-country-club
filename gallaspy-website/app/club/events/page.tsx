import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClubNavigation } from "@/components/ClubNavigation";

export const metadata: Metadata = {
  title: "Private Events | The Gallaspy Golf & Country Club",
  description:
    "Discover weddings, corporate retreats, galas, charity tournaments, vineyard celebrations, and private gatherings at The Gallaspy Golf & Country Club.",
};

const eventExperiences = [
  {
    number: "01",
    title: "Weddings",
    description:
      "Elegant ceremonies and receptions set among the vineyard, clubhouse, event pavilion, and landscaped grounds.",
  },
  {
    number: "02",
    title: "Corporate Retreats",
    description:
      "Private meeting spaces, golf, dining, lodging, and curated hospitality for executive teams and client gatherings.",
  },
  {
    number: "03",
    title: "Galas & Celebrations",
    description:
      "Sophisticated settings for milestone occasions, nonprofit galas, anniversary events, and formal evenings.",
  },
  {
    number: "04",
    title: "Charity Tournaments",
    description:
      "Full-service golf events supported by registration, dining, sponsorship, awards, and post-round celebrations.",
  },
  {
    number: "05",
    title: "Vineyard Events",
    description:
      "Private dinners, wine experiences, rehearsal events, and sunset celebrations surrounded by the estate vineyard.",
  },
  {
    number: "06",
    title: "Outdoor Gatherings",
    description:
      "Lawn events, seasonal festivals, concerts, family celebrations, and open-air hospitality across the property.",
  },
  {
    number: "07",
    title: "Private Dining",
    description:
      "Intimate dinners, chef-led experiences, business meals, and curated celebrations at Mercury Street Restaurant.",
  },
  {
    number: "08",
    title: "Member Traditions",
    description:
      "Signature club events, holiday celebrations, founders gatherings, and annual experiences that grow over time.",
  },
];

const venues = [
  {
    title: "The Event Pavilion",
    description:
      "A flexible signature venue designed for weddings, galas, performances, corporate gatherings, and large celebrations.",
  },
  {
    title: "The Grand Clubhouse",
    description:
      "Refined ballrooms, terraces, private dining spaces, and member rooms for formal and intimate events.",
  },
  {
    title: "The Vineyard",
    description:
      "A distinctive estate setting for ceremonies, dinners, wine experiences, and sunset celebrations.",
  },
  {
    title: "Mercury Street Restaurant",
    description:
      "Chef-driven private dining and elevated hospitality for dinners, receptions, and curated culinary events.",
  },
  {
    title: "The Golf Course",
    description:
      "Tournament experiences, sponsor events, member-guests, and outdoor hospitality across the championship course.",
  },
  {
    title: "The Event Lawn",
    description:
      "A versatile open-air setting for festivals, family events, concerts, ceremonies, and seasonal traditions.",
  },
];

const planningServices = [
  "Dedicated event planning",
  "Custom menus and catering",
  "Vendor coordination",
  "Ceremony and reception design",
  "Audio-visual support",
  "Transportation planning",
  "Guest lodging coordination",
  "Golf and recreation packages",
];

const signatureEvents = [
  "Founders Gala",
  "Annual Charity Classic",
  "Vineyard Harvest Dinner",
  "Member-Guest Weekend",
  "Holiday Celebration",
  "Summer Concert Series",
];

export default function EventsPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      <ClubNavigation />

      {/* Hero */}
      <section className="relative flex min-h-[82vh] items-center overflow-hidden px-5 sm:px-8">
        <Image
          src="/images/event-pavilion.png"
          alt="Private events at The Gallaspy Golf and Country Club"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#10263F]/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/95 via-[#10263F]/68 to-[#10263F]/18" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#10263F]/55 to-transparent" />

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
              <span className="text-[#FFD76A]">Private Events</span>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">
              Private Events
            </p>

            <h1 className="mt-5 font-serif text-[3rem] font-light leading-[0.98] text-white sm:text-6xl lg:text-[5rem]">
              Remarkable Settings
              <span className="block text-[#FFD76A]">Unforgettable Moments</span>
            </h1>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              From vineyard weddings and charity tournaments to executive
              retreats, galas, and family celebrations, The Gallaspy is being
              designed to host meaningful events with exceptional hospitality.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#events-overview"
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Explore Private Events
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

      {/* Overview */}
      <section
        id="events-overview"
        className="scroll-mt-40 bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24"
      >
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Event Vision
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Hospitality Designed
              <span className="block">Around the Occasion</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              Every event at The Gallaspy will be shaped around the purpose,
              personality, and scale of the gathering.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              The property will offer a collection of distinctive venues,
              including the Event Pavilion, Grand Clubhouse, vineyard, event
              lawn, golf course, and Mercury Street Restaurant.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              With lodging, dining, wellness, recreation, and transportation
              available within the club, hosts will be able to create complete
              multi-day experiences for members and guests.
            </p>
          </div>

          <div className="relative min-h-[460px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/event-pavilion.png"
              alt="Elegant event setting at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/72 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
                Elevated Hospitality
              </p>
              <p className="mt-3 max-w-lg font-serif text-2xl font-light">
                Thoughtful planning, distinctive venues, and service that makes
                every gathering feel effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Experiences */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Event Experiences
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              Created for Every Occasion
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#1E3557]/80">
              A complete range of indoor, outdoor, golf, dining, and overnight
              experiences will allow each event to feel original and personal.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {eventExperiences.map((experience) => (
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
              src="/images/event-pavilion.png"
              alt="The Event Pavilion at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/35 to-transparent" />
          </div>

          <div className="flex items-center px-7 py-12 sm:px-10 lg:px-14">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
                The Signature Venue
              </p>

              <blockquote className="mt-6 font-serif text-[2rem] font-light leading-[1.2] text-white sm:text-[2.7rem]">
                “The Event Pavilion will be a place where major milestones
                become lasting traditions.”
              </blockquote>

              <div className="mt-7 h-px w-14 bg-[#B89146]" />

              <p className="mt-6 text-sm leading-7 text-white/75">
                Designed for flexibility and elegance, the pavilion will support
                large celebrations, formal dinners, ceremonies, performances,
                and community events throughout the year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Venues */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
                Signature Venues
              </p>

              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
                A Setting for
                <span className="block">Every Kind of Gathering</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#1E3557]/75">
              Events can move across the property, creating layered experiences
              that combine indoor elegance, outdoor beauty, recreation, dining,
              and overnight stays.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {venues.map((venue, index) => (
              <article
                key={venue.title}
                className="rounded-[18px] border border-[#1E3557]/10 bg-white p-7"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89146]">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-5 font-serif text-2xl font-light text-[#10263F]">
                  {venue.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#B89146]" />

                <p className="mt-4 text-sm leading-7 text-[#1E3557]/80">
                  {venue.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Weddings */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="relative min-h-[460px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/wedding.png"
              alt="Vineyard wedding at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/58 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">
                Weddings at The Gallaspy
              </p>
              <p className="mt-3 max-w-lg font-serif text-2xl font-light">
                Elegant ceremonies, refined receptions, and complete weekend
                experiences in one private destination.
              </p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Weddings & Celebrations
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              A Weekend
              <span className="block">Worth Remembering</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              Couples will be able to host every part of their celebration
              within the club—from welcome dinners and golf outings to the
              ceremony, reception, brunch, and guest accommodations.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              The vineyard, Event Pavilion, Grand Clubhouse, landscaped grounds,
              and member lodging will create a private and seamless wedding
              destination near Metro Atlanta.
            </p>

            <Link
              href="/club/vineyard"
              className="mt-8 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#10263F] bg-[#10263F] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:border-[#B89146] hover:bg-[#B89146]"
            >
              Explore the Vineyard
            </Link>
          </div>
        </div>
      </section>

      {/* Planning */}
      <section className="bg-[#163A2F] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
              Event Planning
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
              Thoughtful Service
              <span className="block">From Start to Finish</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-white/88">
              A dedicated events team will help hosts coordinate every detail,
              from venue selection and dining to lodging, transportation, golf,
              wellness, and guest experiences.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {planningServices.map((service) => (
                <div
                  key={service}
                  className="rounded-[14px] border border-white/15 bg-white/[0.06] px-4 py-4"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                    {service}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[440px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/event-pavilion.png"
              alt="Private event planning at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/55 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Golf Events */}
      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] overflow-hidden rounded-[22px] bg-[#1E3557] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[360px] lg:min-h-[500px]">
            <Image
              src="/images/golf.png"
              alt="Charity golf tournament at The Gallaspy"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1E3557]/30" />
          </div>

          <div className="flex items-center px-7 py-12 text-white sm:px-10 lg:px-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
                Golf Events
              </p>

              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
                Tournaments With
                <span className="block">Purpose & Prestige</span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-white/75">
                Charity tournaments, corporate outings, member-guests, and
                sponsor events will be supported by championship golf, dining,
                registration, awards, and post-round hospitality.
              </p>

              <Link
                href="/club/golf"
                className="mt-8 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Explore Championship Golf
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Calendar */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Signature Traditions
            </p>

            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              A Calendar That
              <span className="block">Shapes Club Life</span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#B89146]" />

            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              Annual events will give members and families traditions to
              anticipate and share from one generation to the next.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {signatureEvents.map((event) => (
                <div
                  key={event}
                  className="rounded-[14px] border border-[#1E3557]/10 bg-[#F7F4EE] px-4 py-4"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#10263F]">
                    {event}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[22px]">
            <Image
              src="/images/event-pavilion.png"
              alt="Signature member events at The Gallaspy"
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
                Complete the Experience
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
                label: "Stay",
                href: "/club/lodging",
              },
              {
                title: "Vineyard & Winery",
                label: "Celebrate",
                href: "/club/vineyard",
              },
              {
                title: "Mercury Street Restaurant",
                label: "Dine",
                href: "/club/restaurant",
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
          src="/images/event-pavilion.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-[#10263F]/86" />

        <div className="relative z-10 mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
            Private Events at The Gallaspy
          </p>

          <h2 className="mt-5 font-serif text-[2.6rem] font-light leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Gather With Purpose
            <span className="block text-[#FFD76A]">Celebrate With Distinction</span>
          </h2>

          <div className="mx-auto mt-7 h-px w-16 bg-[#B89146]" />

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Become part of the founding generation and help shape the events,
            traditions, and celebrations that will define The Gallaspy for
            generations.
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