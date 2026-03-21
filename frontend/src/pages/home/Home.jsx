import React from "react";
import { motion } from "framer-motion";
import { BarChart3, ShieldCheck, TrendingUp } from "lucide-react";
import Hero from "./components/Hero";
import Trust from "./components/Trust";
import PlansSection from "./components/PlansSection";
import PerformanceSection from "./components/PerformanceSection";
import MarketChartsSection from "./components/MarketChartsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import DematPromoSection from "./components/DematPromoSection";
import FinalCTASection from "./components/FinalCTASection";
import SectionErrorBoundary from "../../components/SectionErrorBoundary";

const Blob = ({
  color,
  size,
  top,
  left,
  right,
  bottom,
  duration,
  delay,
  xRange,
  yRange,
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      backgroundColor: color,
      width: size,
      height: size,
      top,
      left,
      right,
      bottom,
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

const mobileInsightCards = [
  {
    icon: TrendingUp,
    title: "Daily Performance Snapshot",
    value: "70% Avg Accuracy",
    description: "Clear intraday setups across Nifty, Bank Nifty, and Sensex.",
  },
  {
    icon: BarChart3,
    title: "Transparent Trade Reporting",
    value: "1000+ Trades Shared",
    description: "Visible results and clearer reporting without heavy chart rendering.",
  },
  {
    icon: ShieldCheck,
    title: "Risk-Managed Calls",
    value: "Proper SL & Targets",
    description: "Structured levels help traders manage entries and exits better.",
  },
];

const LightweightInsights = () => (
  <section className="py-16 md:py-20 bg-transparent">
    <div className="max-w-6xl mx-auto px-5 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
          Market <span className="text-teal-600">Insights</span> at a Glance
        </h2>
        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto mt-4">
          A lighter mobile-friendly snapshot that keeps the site reliable on
          phones while preserving the key performance signals.
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-3">
        {mobileInsightCards.map(({ icon: Icon, title, value, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E7F7F5] text-[#105F68]">
              <Icon className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {title}
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-800">{value}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Home = () => {
  const [useLightweightInsights, setUseLightweightInsights] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const checkDevice = () => {
      const isSmallScreen = window.innerWidth <= 820;
      const isCoarsePointer =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(pointer: coarse)").matches;

      setUseLightweightInsights(isSmallScreen || isCoarsePointer);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-white">
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

        <Blob
          color="#C8E6E2"
          size={600}
          top="-150px"
          left="-150px"
          duration={18}
          delay={0}
          xRange={[0, 60, -40, 0]}
          yRange={[0, 50, -30, 0]}
        />
        <Blob
          color="#9ED5D1"
          size={500}
          top="15%"
          right="-120px"
          duration={22}
          delay={4}
          xRange={[0, -50, 40, 0]}
          yRange={[0, 60, -40, 0]}
        />
        <Blob
          color="#C8E6E2"
          size={420}
          top="55%"
          left="5%"
          duration={20}
          delay={8}
          xRange={[0, 40, -50, 0]}
          yRange={[0, -50, 30, 0]}
        />
        <Blob
          color="#9ED5D1"
          size={360}
          bottom="10%"
          right="10%"
          duration={16}
          delay={2}
          xRange={[0, -30, 50, 0]}
          yRange={[0, 40, -50, 0]}
        />
        <Blob
          color="#C8E6E2"
          size={300}
          bottom="-60px"
          left="42%"
          duration={24}
          delay={11}
          xRange={[0, 50, -30, 0]}
          yRange={[0, -40, 20, 0]}
        />
      </div>

      <Hero />
      <Trust />
      <PlansSection />

      {useLightweightInsights ? (
        <LightweightInsights />
      ) : (
        <>
          <SectionErrorBoundary fallback={<LightweightInsights />}>
            <PerformanceSection />
          </SectionErrorBoundary>
          <SectionErrorBoundary fallback={<LightweightInsights />}>
            <MarketChartsSection />
          </SectionErrorBoundary>
        </>
      )}

      <TestimonialsSection />
      <DematPromoSection />
      <FinalCTASection />
    </div>
  );
};

export default Home;
