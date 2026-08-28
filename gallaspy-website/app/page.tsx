import Hero from "@/components/sections/Hero";
import HomeTransition from "@/components/sections/HomeTransition";
import ClubIntroduction from "@/components/sections/ClubIntroduction";
import PlayWithUs from "@/components/sections/PlayWithUs";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import InvitationalPreview from "@/components/sections/InvitationalPreview";
import TraditionsSymbols from "@/components/sections/TraditionsSymbols";
import JoinBeginning from "@/components/sections/JoinBeginning";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeTransition />

      <Reveal>
        <ClubIntroduction />
      </Reveal>

      <Reveal>
        <PlayWithUs />
      </Reveal>

      <Reveal>
        <UpcomingEvents />
      </Reveal>

      <Reveal>
        <InvitationalPreview />
      </Reveal>

      <Reveal>
        <TraditionsSymbols />
      </Reveal>

      <Reveal>
        <JoinBeginning />
      </Reveal>
    </>
  );
}
