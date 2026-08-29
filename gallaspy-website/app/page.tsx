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

      {/* 05 — THE FOUNDING COMMUNITY */}
      <Reveal>
        <FoundingCommunity />
      </Reveal>

      {/* 06 — WHAT'S NEXT */}
      <Reveal>
        <UpcomingAtGallaspy />
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
