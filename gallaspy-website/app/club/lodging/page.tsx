import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClubNavigation } from "@/components/ClubNavigation";

export const metadata: Metadata = {
  title: "Member Lodging | The Gallaspy Golf & Country Club",
  description:
    "Luxury member cottages, guest suites, executive accommodations, and overnight experiences at The Gallaspy Golf & Country Club.",
};

// NOTE:
// This page follows the same design language as the Golf, Clubhouse,
// Restaurant, Wellness, Racquet, and Vineyard pages.
// Continue using your existing components and styling system.

export default function LodgingPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#1E3557]">
      <ClubNavigation />

      <section className="relative min-h-[82vh] flex items-center">
        <Image
          src="/images/lodging.png"
          alt="Luxury member lodging"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#10263F]/65" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-white">
          <p className="uppercase tracking-[0.35em] text-[#FFD76A] text-xs font-bold">
            Member Lodging
          </p>

          <h1 className="mt-5 font-serif text-6xl font-light leading-tight">
            Stay Longer.
            <span className="block text-[#FFD76A]">
              Feel At Home.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/85">
            The Gallaspy Member Lodging experience is envisioned as a collection
            of refined cottages, guest suites, and executive accommodations
            allowing members and their guests to enjoy multi-day stays without
            leaving the club.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">
            <Link
              href="/membership"
              className="rounded-full bg-[#FFD76A] px-8 py-4 text-[#10263F] uppercase text-xs font-bold tracking-[0.2em]"
            >
              Explore Membership
            </Link>

            <Link
              href="/club/events"
              className="rounded-full border border-white/40 px-8 py-4 uppercase text-xs font-bold tracking-[0.2em]"
            >
              Private Events
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <p className="uppercase tracking-[0.35em] text-[#B89146] text-xs font-bold">
            A Private Retreat
          </p>

          <h2 className="mt-4 font-serif text-5xl font-light text-[#10263F]">
            Luxury Accommodations
          </h2>

          <p className="mt-8 text-lg leading-8 text-[#1E3557]/80">
            Overnight lodging will allow members, visiting family, golf guests,
            tournament participants, and business travelers to enjoy a complete
            destination experience without leaving the property.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {[
            "Luxury Member Cottages",
            "Executive Guest Suites",
            "Family Lodges",
            "Concierge Services",
            "Morning Golf Packages",
            "Private Courtyards",
            "Club Transportation",
            "Resort-Level Hospitality",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-white border border-[#1E3557]/10 p-6"
            >
              <h3 className="font-serif text-2xl text-[#10263F]">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#10263F] text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.35em] text-[#FFD76A] text-xs font-bold">
            The Overnight Experience
          </p>

          <h2 className="mt-5 font-serif text-5xl font-light">
            Wake Up Steps From
            <span className="block text-[#FFD76A]">
              Championship Golf
            </span>
          </h2>

          <p className="mt-8 max-w-3xl mx-auto text-lg leading-8 text-white/80">
            Guests will enjoy elegant accommodations, sunrise golf, fine dining,
            wellness amenities, vineyard experiences, and personalized service—
            creating one seamless luxury retreat.
          </p>

          <div className="mt-12 flex justify-center flex-wrap gap-4">
            <Link
              href="/club/events"
              className="rounded-full bg-[#FFD76A] px-8 py-4 text-[#10263F] uppercase text-xs font-bold tracking-[0.2em]"
            >
              Explore Events
            </Link>

            <Link
              href="/club"
              className="rounded-full border border-white/40 px-8 py-4 uppercase text-xs font-bold tracking-[0.2em]"
            >
              Back to The Club
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}