import React from "react";
import { motion } from "framer-motion";
import Hero from "./components/Hero";
import Trust from "./components/Trust";
import PlansSection from "./components/PlansSection";
import PerformanceSection from "./components/PerformanceSection";
import MarketChartsSection from "./components/MarketChartsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import DematPromoSection from "./components/DematPromoSection";
import FinalCTASection from "./components/FinalCTASection";

// ─── Animated blob component ──────────────────────────────────────────────────
const Blob = ({ color, size, top, left, right, bottom, duration, delay, xRange, yRange }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      backgroundColor: color,
      width: size,
      height: size,
      top, left, right, bottom,
      opacity: 0.12,
      filter: "blur(90px)",
    }}
    animate={{
      x: xRange ?? [0, 40, -30, 0],
      y: yRange ?? [0, -40, 30, 0],
      scale: [1, 1.1, 0.95, 1],
    }}
    transition={{
      duration: duration ?? 14,
      delay: delay ?? 0,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// ─── Home ─────────────────────────────────────────────────────────────────────
const Home = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* ── Global animated background — white base + very subtle teal tints ── */}
      <div className="fixed inset-0 -z-10 bg-white">

        {/* Slow-shifting soft radial overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse at 15% 15%, rgba(200,230,226,0.30) 0%, transparent 55%)",
              "radial-gradient(ellipse at 85% 25%, rgba(158,213,209,0.22) 0%, transparent 55%)",
              "radial-gradient(ellipse at 50% 85%, rgba(200,230,226,0.25) 0%, transparent 55%)",
              "radial-gradient(ellipse at 15% 15%, rgba(200,230,226,0.30) 0%, transparent 55%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating blobs — only two lightest colors, very low opacity */}
        <Blob color="#C8E6E2" size={600} top="-150px" left="-150px" duration={18} delay={0} xRange={[0, 60, -40, 0]} yRange={[0, 50, -30, 0]} />
        <Blob color="#9ED5D1" size={500} top="15%" right="-120px" duration={22} delay={4} xRange={[0, -50, 40, 0]} yRange={[0, 60, -40, 0]} />
        <Blob color="#C8E6E2" size={420} top="55%" left="5%" duration={20} delay={8} xRange={[0, 40, -50, 0]} yRange={[0, -50, 30, 0]} />
        <Blob color="#9ED5D1" size={360} bottom="10%" right="10%" duration={16} delay={2} xRange={[0, -30, 50, 0]} yRange={[0, 40, -50, 0]} />
        <Blob color="#C8E6E2" size={300} bottom="-60px" left="42%" duration={24} delay={11} xRange={[0, 50, -30, 0]} yRange={[0, -40, 20, 0]} />
      </div>

      {/* ── Page content ── */}
      <Hero />
      <Trust />
      <PlansSection />
      <PerformanceSection />
      <MarketChartsSection />
      <TestimonialsSection />
      <DematPromoSection />
      <FinalCTASection />
    </div>
  );
};

export default Home;
