import Hero from "@/components/sections/Hero";
import Vision from "@/components/sections/Vision";
import DevelopmentPlan from "@/components/sections/DevelopmentPlan";
import Experience from "@/components/sections/Experience";
import InvestmentPreview from "@/components/sections/InvestmentPreview";
import BeginJourney from "@/components/sections/BeginJourney";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Hero />

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
        <InvestmentPreview />
      </Reveal>

      <Reveal>
        <BeginJourney />
      </Reveal>
    </>
  );
}