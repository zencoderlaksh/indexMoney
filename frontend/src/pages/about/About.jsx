import React from "react";
import HeroSection from "./components/HeroSection";
import WhoWeAreSection from "./components/WhoWeAreSection";
import MissionVisionSection from "./components/MissionVisionSection";
import ProcessSection from "./components/ProcessSection";
import PlansSection from "./components/PlansSection";
import HowItWorksSection from "./components/HowItWorksSection";
import FAQSection from "./components/FAQSection";
import Disclaimer from "./components/Disclaimer";

const About = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      <HeroSection />
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <WhoWeAreSection />
        <MissionVisionSection />
        <ProcessSection />
        <PlansSection />
        <HowItWorksSection />
        <FAQSection />
        <Disclaimer />
      </div>
    </div>
  );
};

export default About;
