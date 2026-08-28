import Hero from "@/components/sections/Hero";
import HomeTransition from "@/components/sections/HomeTransition";
import ClubIntroduction from "@/components/sections/ClubIntroduction";
import FirstFlight from "@/components/sections/FirstFlight";
import PlayWithUs from "@/components/sections/PlayWithUs";
import InvitationalPreview from "@/components/sections/InvitationalPreview";
import TraditionsSymbols from "@/components/sections/TraditionsSymbols";
import Founders from "@/components/sections/Founders";
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
        <FirstFlight />
      </Reveal>

      <Reveal>
        <PlayWithUs />
      </Reveal>

      <Reveal>
        <InvitationalPreview />
      </Reveal>

      <Reveal>
        <TraditionsSymbols />
      </Reveal>

      <Reveal>
        <Founders />
      </Reveal>

      <Reveal>
        <JoinBeginning />
      </Reveal>
    </>
  );
}
