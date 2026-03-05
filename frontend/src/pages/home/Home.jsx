import React from "react";
import Hero from "./components/Hero";
import Trust from "./components/Trust";
import PlansSection from "./components/PlansSection";
import PerformanceSection from "./components/PerformanceSection";
import TestimonialsSection from "./components/TestimonialsSection";
import DematPromoSection from "./components/DematPromoSection";
import FinalCTASection from "./components/FinalCTASection";

const Home = () => {
  return (
    <div>
      <Hero />
      <Trust />
      <PlansSection />
      <PerformanceSection />
      <TestimonialsSection />
      <DematPromoSection />
      <FinalCTASection />
    </div>
  );
};

export default Home;
