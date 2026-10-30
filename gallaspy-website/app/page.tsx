import Link from "next/link";
import Hero from "@/components/sections/Hero";
import HomeTransition from "@/components/sections/HomeTransition";
import ClubIntroduction from "@/components/sections/ClubIntroduction";
import PlayWithUs from "@/components/sections/PlayWithUs";
import FoundingCommunity from "@/components/sections/FoundingCommunity";
import UpcomingAtGallaspy from "@/components/sections/UpcomingAtGallaspy";
import InvitationalPreview from "@/components/sections/InvitationalPreview";
import TraditionsSymbols from "@/components/sections/TraditionsSymbols";
import ClubDispatch from "@/components/sections/ClubDispatch";
import JoinBeginning from "@/components/sections/JoinBeginning";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      {/* 01 — THE CLUB TODAY */}
      <Hero />

      {/* 02 — WHAT'S HAPPENING NOW */}
      <HomeTransition />

      {/* 03 — PLAY. COMPETE. GATHER. */}
      <Reveal>
        <ClubIntroduction />
      </Reveal>

      {/* 04 — PLAY WITH THE GALLASPY */}
      <Reveal>
        <PlayWithUs />
      </Reveal>

      {/* DIGITAL CLUBHOUSE — APP PREVIEW (NO APP STORE CLAIM) */}
      <section className="bg-white px-5 py-14 text-[#10263F] sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 border-t border-[#10263F]/15 pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#B3262D]">THE GALLASPY APP</p>
            <h2 className="mt-4 text-[2.5rem] font-black uppercase leading-[0.93] tracking-[-0.04em] sm:text-[3.5rem]">Golf goes with you.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#10263F]/70 sm:text-base">
              Host or find rounds, track scores, connect with golfers, and explore Shot Tracer
              and the Gallaspy community. A free app account is separate from paid club membership.
            </p>
            <p className="mt-3 text-xs text-[#10263F]/55">Native iPhone and Android release details will be announced when available.</p>
          </div>
          <Link href="/my-gallaspy" className="inline-flex min-h-[48px] items-center justify-center bg-[#0C352D] px-7 text-[9px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#10263F]">
            Explore My Gallaspy →
          </Link>
        </div>
      </section>

      {/* 05 — WHAT'S NEXT */}
      <Reveal>
        <UpcomingAtGallaspy />
      </Reveal>

      {/* 06 — THE FOUNDING COMMUNITY */}
      <Reveal>
        <FoundingCommunity />
      </Reveal>

      {/* 07 — FLAGSHIP COMPETITION */}
      <Reveal>
        <InvitationalPreview />
      </Reveal>

      {/* 08 — TRADITIONS */}
      <Reveal>
        <TraditionsSymbols />
      </Reveal>

      {/* 09 — CLUB COMMUNICATIONS */}
      <Reveal>
        <ClubDispatch />
      </Reveal>

      {/* 10 — STORY / FINAL PATHS */}
      <Reveal>
        <JoinBeginning />
      </Reveal>
    </>
  );
}
