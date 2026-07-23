import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClubNavigation } from "@/components/ClubNavigation";

export const metadata: Metadata = {
  title: "The Grand Clubhouse | The Gallaspy Golf & Country Club",
  description:
    "Discover the architectural vision, member spaces, dining, traditions, and arrival experience of The Grand Clubhouse at The Gallaspy Golf & Country Club.",
};

const clubhouseSpaces = [
  {
    number: "01",
    title: "The Great Hall",
    description:
      "A welcoming central gathering space envisioned with timeless materials, gracious proportions, and a strong connection to the surrounding landscape.",
  },
  {
    number: "02",
    title: "Member Lounge",
    description:
      "A comfortable and refined setting for conversation, informal meetings, post-round gatherings, and everyday club life.",
  },
  {
    number: "03",
    title: "Locker Rooms",
    description:
      "Thoughtfully appointed men’s and women’s locker rooms with private changing areas, lounges, personal storage, and attentive service.",
  },
  {
    number: "04",
    title: "Golf Shop",
    description:
      "A full-service golf shop offering premium apparel, equipment, accessories, professional services, club fitting, and member merchandise.",
  },
  {
    number: "05",
    title: "Private Dining",
    description:
      "Elegant private dining rooms designed for intimate celebrations, business dinners, family occasions, and member-hosted gatherings.",
  },
  {
    number: "06",
    title: "Grand Ballroom",
    description:
      "A flexible and beautifully appointed ballroom for galas, weddings, holiday celebrations, club ceremonies, and signature events.",
  },
  {
    number: "07",
    title: "Outdoor Terrace",
    description:
      "An expansive terrace designed for dining, cocktails, fire-side gatherings, and relaxed evenings overlooking the course.",
  },
  {
    number: "08",
    title: "18th Green Overlook",
    description:
      "A signature viewing experience where members can watch finishing play and gather at the natural conclusion of every round.",
  },
];

const arrivalSequence = [
  {
    number: "01",
    title: "Main Entrance",
    description:
      "A distinctive stone entrance monument introduces the property and establishes a sense of arrival from the first moment.",
  },
  {
    number: "02",
    title: "Security Gate",
    description:
      "A professionally staffed gatehouse provides a warm welcome while protecting the privacy and comfort of members and guests.",
  },
  {
    number: "03",
    title: "Gallaspy Boulevard",
    description:
      "A tree-lined signature drive creates a memorable procession through the property toward the heart of the club.",
  },
  {
    number: "04",
    title: "Arrival Court",
    description:
      "A landscaped roundabout, water feature, covered porte-cochère, and valet arrival complete the journey to the clubhouse.",
  },
];

const architecturalPrinciples = [
  {
    title: "Timeless",
    description:
      "Architecture designed to feel established, enduring, and appropriate for a club intended to serve generations.",
  },
  {
    title: "Warm",
    description:
      "Natural stone, rich wood, layered textures, and inviting furnishings create a sense of comfort and belonging.",
  },
  {
    title: "Connected",
    description:
      "Expansive windows, terraces, courtyards, and covered outdoor rooms connect the interiors to golf and landscape.",
  },
  {
    title: "Distinctive",
    description:
      "A recognizable architectural identity gives The Gallaspy a character that is elegant, memorable, and entirely its own.",
  },
];

const traditions = [
  {
    title: "Club Championships",
    description:
      "Awards ceremonies, championship dinners, and post-round gatherings that celebrate the competitive spirit of the club.",
  },
  {
    title: "Holiday Celebrations",
    description:
      "Seasonal events, family traditions, formal dinners, and festive gatherings that members anticipate year after year.",
  },
  {
    title: "Sunday Brunch",
    description:
      "A relaxed weekly tradition bringing families and friends together around hospitality, conversation, and exceptional food.",
  },
  {
    title: "Member Dinners",
    description:
      "Chef-led evenings, wine pairings, special menus, and intimate gatherings designed exclusively for the membership.",
  },
  {
    title: "Family Milestones",
    description:
      "Birthdays, anniversaries, graduations, engagements, and other meaningful occasions celebrated in a place that feels like home.",
  },
  {
    title: "Founders’ Traditions",
    description:
      "Signature experiences established by the founding generation and carried forward as part of the club’s lasting culture.",
  },
];

export default function ClubhousePage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      <ClubNavigation />

      <section className="relative flex min-h-[82vh] items-center overflow-hidden px-5 sm:px-8">
        <Image
          src="/images/clubhouse.png"
          alt="The Grand Clubhouse at The Gallaspy Golf and Country Club"
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
              <Link href="/" className="transition hover:text-[#FFD76A]">Home</Link>
              <span>/</span>
              <Link href="/club" className="transition hover:text-[#FFD76A]">The Club</Link>
              <span>/</span>
              <span className="text-[#FFD76A]">Clubhouse</span>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#FFD76A]">The Grand Clubhouse</p>

            <h1 className="mt-5 font-serif text-[3rem] font-light leading-[0.98] text-white sm:text-6xl lg:text-[5rem]">
              The Heart of
              <span className="block text-[#FFD76A]">The Gallaspy</span>
            </h1>

            <div className="mt-7 h-px w-16 bg-[#B89146]" />

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              The Grand Clubhouse is envisioned as the social and architectural centerpiece of The Gallaspy—a place where members gather, dine, celebrate, relax, and build traditions that will last for generations.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#clubhouse-vision" className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white">
                Discover the Clubhouse
              </Link>
              <Link href="/membership" className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/55 bg-white/[0.05] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]">
                Explore Membership
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="clubhouse-vision" className="scroll-mt-40 bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">The Clubhouse Vision</p>
            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">
              More Than a Building
              <span className="block">A Place of Belonging</span>
            </h2>
            <div className="mt-6 h-px w-14 bg-[#B89146]" />
            <p className="mt-6 text-base leading-8 text-[#1E3557]">
              Every great private club has a central place where members feel immediately at home. For The Gallaspy, that place will be the Grand Clubhouse.
            </p>
            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              It is being planned as the natural meeting point between golf, dining, hospitality, celebrations, and daily member life. Formal when the occasion calls for it, relaxed when members simply want to gather, the clubhouse will support both memorable events and everyday traditions.
            </p>
            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">
              The goal is to create an environment that feels distinguished without feeling distant—elegant, welcoming, and deeply connected to the character of the property.
            </p>
          </div>

          <div className="relative min-h-[460px] overflow-hidden rounded-[22px]">
            <Image src="/images/clubhouse.png" alt="Architectural vision for The Grand Clubhouse" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/72 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">Architectural Centerpiece</p>
              <p className="mt-3 max-w-lg font-serif text-2xl font-light">A timeless home for golf, hospitality, fellowship, and celebration.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#10263F] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">The Arrival Experience</p>
              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">
                A Memorable Journey
                <span className="block">From Gate to Clubhouse</span>
              </h2>
              <div className="mt-6 h-px w-14 bg-[#B89146]" />
            </div>
            <p className="text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
              Arrival at The Gallaspy is intended to feel intentional and cinematic. Each stage introduces the property gradually, building anticipation before members and guests reach the Grand Clubhouse.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {arrivalSequence.map((item) => (
              <article key={item.number} className="rounded-[18px] border border-white/15 bg-white/[0.06] p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FFD76A]">{item.number}</p>
                <h3 className="mt-5 font-serif text-2xl font-light text-white">{item.title}</h3>
                <div className="mt-4 h-px w-10 bg-[#B89146]" />
                <p className="mt-4 text-sm leading-7 text-white/72">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="relative mt-12 min-h-[420px] overflow-hidden rounded-[22px]">
            <Image src="/images/arrival.png" alt="Arrival sequence leading to The Grand Clubhouse" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#10263F]/78 via-[#10263F]/25 to-transparent" />
            <div className="absolute inset-0 flex items-end p-7 sm:p-10">
              <div className="max-w-xl text-white">
                <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">Gallaspy Boulevard</p>
                <p className="mt-3 font-serif text-3xl font-light sm:text-4xl">Every arrival should feel like the beginning of an experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">Inside the Clubhouse</p>
            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">Spaces Designed Around Member Life</h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#1E3557]/80">Each space is being considered as part of a complete member journey—from preparing for a round to gathering for dinner, attending a celebration, or simply enjoying the club.</p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {clubhouseSpaces.map((space) => (
              <article key={space.number} className="group rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-6 transition hover:-translate-y-1 hover:border-[#B89146]/45 hover:shadow-lg">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89146]">{space.number}</p>
                <h3 className="mt-5 font-serif text-2xl font-light text-[#10263F]">{space.title}</h3>
                <div className="mt-4 h-px w-10 bg-[#B89146] transition-all group-hover:w-16" />
                <p className="mt-4 text-sm leading-7 text-[#1E3557]/80">{space.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] overflow-hidden rounded-[22px] bg-[#1E3557] lg:grid-cols-2">
          <div className="relative min-h-[420px] lg:min-h-[600px]">
            <Image src="/images/clubhouse.png" alt="The Grand Clubhouse overlooking the club grounds" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/35 to-transparent" />
          </div>
          <div className="flex items-center px-7 py-12 text-white sm:px-10 lg:px-14">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">The Member Experience</p>
              <blockquote className="mt-6 font-serif text-[2rem] font-light leading-[1.2] text-white sm:text-[2.7rem]">“Every great club has a place where members feel at home. For The Gallaspy, that place is the Grand Clubhouse.”</blockquote>
              <div className="mt-7 h-px w-14 bg-[#B89146]" />
              <p className="mt-6 text-sm leading-7 text-white/75">The clubhouse will be more than the backdrop for club life. It will be the setting where relationships are strengthened, milestones are celebrated, and traditions begin.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="relative min-h-[440px] overflow-hidden rounded-[22px]">
            <Image src="/images/hero.jpg" alt="Timeless architecture and landscape at The Gallaspy" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10263F]/65 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FFD76A]">Timeless by Design</p>
              <p className="mt-3 max-w-lg font-serif text-2xl font-light">Architecture rooted in natural materials, Southern hospitality, and enduring character.</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">Architectural Vision</p>
            <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">Elegant, Warm,<span className="block">and Enduring</span></h2>
            <div className="mt-6 h-px w-14 bg-[#B89146]" />
            <p className="mt-6 text-base leading-8 text-[#1E3557]">The architectural character of the Grand Clubhouse will balance refinement with warmth.</p>
            <p className="mt-5 text-sm leading-7 text-[#1E3557]/80">Natural stone, warm wood, large windows, covered terraces, and carefully framed views will create an environment that feels established from the day it opens.</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {architecturalPrinciples.map((principle) => (
                <div key={principle.title} className="rounded-[14px] border border-[#1E3557]/10 bg-[#F7F4EE] p-5">
                  <h3 className="font-serif text-xl font-light text-[#10263F]">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#1E3557]/75">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#163A2F] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">Club Traditions</p>
              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">The Place Where<span className="block">Traditions Take Root</span></h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/75">The strongest clubs are defined not only by their facilities, but by the rituals and shared experiences members return to year after year.</p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {traditions.map((tradition, index) => (
              <article key={tradition.title} className="rounded-[18px] border border-white/15 bg-white/[0.06] p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FFD76A]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-5 font-serif text-2xl font-light text-white">{tradition.title}</h3>
                <div className="mt-4 h-px w-10 bg-[#B89146]" />
                <p className="mt-4 text-sm leading-7 text-white/72">{tradition.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F4EE] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1060px] overflow-hidden rounded-[22px] bg-[#1E3557] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[360px] lg:min-h-[500px]">
            <Image src="/images/masterplan-render.png" alt="The Grand Clubhouse within The Gallaspy master plan" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1E3557]/30" />
          </div>
          <div className="flex items-center px-7 py-12 text-white sm:px-10 lg:px-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">The Complete Vision</p>
              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-white sm:text-5xl">At the Center<span className="block">of Club Life</span></h2>
              <p className="mt-6 text-sm leading-7 text-white/75">The Grand Clubhouse will connect championship golf, Mercury Street Restaurant, wellness, member lodging, events, and the wider community within one cohesive destination.</p>
              <Link href="/master-plan" className="mt-8 inline-flex min-h-[45px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white">Explore the Master Plan</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B89146]">Continue Exploring</p>
              <h2 className="mt-4 font-serif text-[2.35rem] font-light leading-[1.08] text-[#10263F] sm:text-5xl">Beyond the Clubhouse</h2>
            </div>
            <Link href="/club" className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#10263F] transition hover:text-[#B89146]">View All Experiences →</Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { title: "Mercury Street Restaurant", label: "Next Experience", href: "/club/restaurant" },
              { title: "Championship Golf", label: "Golf", href: "/club/golf" },
              { title: "Private Events", label: "Celebrations", href: "/club/events" },
            ].map((experience) => (
              <Link key={experience.href} href={experience.href} className="group rounded-[18px] border border-[#1E3557]/10 bg-[#F7F4EE] p-7 transition hover:-translate-y-1 hover:border-[#B89146]/45 hover:shadow-lg">
                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#B89146]">{experience.label}</p>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <h3 className="font-serif text-2xl font-light text-[#10263F]">{experience.title}</h3>
                  <span className="text-xl text-[#B89146] transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#10263F] px-5 py-20 text-white sm:px-8 lg:py-28">
        <Image src="/images/clubhouse.png" alt="" fill sizes="100vw" className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-[#10263F]/86" />
        <div className="relative z-10 mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">The Grand Clubhouse</p>
          <h2 className="mt-5 font-serif text-[2.6rem] font-light leading-[1.08] text-white sm:text-5xl lg:text-6xl">Where Every Round Ends<span className="block text-[#FFD76A]">and Every Tradition Begins</span></h2>
          <div className="mx-auto mt-7 h-px w-16 bg-[#B89146]" />
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">Become part of the founding generation and help shape the traditions, experiences, and culture that will define The Gallaspy for decades to come.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/founding-250#registration" className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#FFD76A] bg-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:-translate-y-0.5 hover:bg-white">Join the Founding 250</Link>
            <Link href="/membership" className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/45 px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]">View Membership</Link>
            <Link href="/club" className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/45 px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:border-[#FFD76A] hover:text-[#FFD76A]">Explore the Club</Link>
          </div>
        </div>
      </section>
    </main>
  );
}