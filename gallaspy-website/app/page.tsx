import Hero from "@/components/sections/Hero";
import InvitationalPreview from "@/components/sections/InvitationalPreview";
import Vision from "@/components/sections/Vision";
import DevelopmentPlan from "@/components/sections/DevelopmentPlan";
import Experience from "@/components/sections/Experience";
import WhyGallaspy from "@/components/sections/WhyGallaspy";
import Founders from "@/components/sections/Founders";
import InvestmentPreview from "@/components/sections/InvestmentPreview";
import BeginJourney from "@/components/sections/BeginJourney";
import Reveal from "@/components/ui/Reveal";
import HomeTransition from "@/components/sections/HomeTransition";

export default function Home() {
  return (
    <>
      <Hero />

      <HomeTransition />

      <Reveal>
        <InvitationalPreview />
      </Reveal>

      <Reveal>
        <Vision />
      </Reveal>

      <Reveal>
        <DevelopmentPlan />
      </Reveal>

      <Reveal>
        <Experience />
      </Reveal>

      <Reveal>
        <WhyGallaspy />
      </Reveal>

      <Reveal>
        <Founders />
      </Reveal>

      <Reveal>
        <InvestmentPreview />
      </Reveal>

      <Reveal>
        <BeginJourney />
      </Reveal>
    </>
  );
}