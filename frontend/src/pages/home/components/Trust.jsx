import React from "react";
import {
  BarChart3,
  CalendarDays,
  MessageCircle,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Target,
    title: "10+ Years Profitable Trading Experience",
    description: "Trusted by thousands of traders across India",
    iconBg: "linear-gradient(135deg, #F5D0C5, #E88E74)",
    glow: "rgba(232,142,116,0.18)",
  },
  {
    icon: TrendingUp,
    title: "High Accuracy Technical Analysis",
    description: "No guesswork - only data-driven trades",
    iconBg: "linear-gradient(135deg, #A7E2DA, #63C1BB)",
    glow: "rgba(99,193,187,0.18)",
  },
  {
    icon: ShieldCheck,
    title: "Every Call with Proper SL & Target",
    description: "Risk-managed trading - no blind tips",
    iconBg: "linear-gradient(135deg, #A7D8DE, #69B8C1)",
    glow: "rgba(105,184,193,0.18)",
  },
  {
    icon: MessageCircle,
    title: "Live Market Support on WhatsApp",
    description: "Instant updates & trade management help",
    iconBg: "linear-gradient(135deg, #2F7C84, #105F68)",
    glow: "rgba(16,95,104,0.22)",
  },
];

const stats = [
  { icon: BarChart3, label: "5,000+ Active Users" },
  { icon: TrendingUp, label: "70% Avg Accuracy" },
  { icon: CalendarDays, label: "1000+ Trades Shared" },
  { icon: MessageCircle, label: "Live WhatsApp Support" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

const Trust = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-[#F7FEFC] via-[#ECFBF7] to-[#E8F7F3] py-16 md:py-24">
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 42%), radial-gradient(circle at 82% 28%, rgba(200,230,226,0.55) 0%, rgba(200,230,226,0) 38%), radial-gradient(circle at 50% 100%, rgba(158,213,209,0.20) 0%, rgba(158,213,209,0) 42%)",
      }}
    />

    <div
      className="pointer-events-none absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(16,95,104,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(16,95,104,0.12) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />

    <div className="relative mx-auto max-w-6xl px-5 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mb-14 text-center"
      >
        <span className="mb-3 inline-block rounded-full border border-[#B9E2DB] bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#105F68] shadow-sm">
          Why Index Money
        </span>
        <h2 className="mx-auto max-w-5xl text-3xl font-extrabold leading-tight text-slate-800 md:text-4xl lg:text-5xl">
          Why 5,000+ Traders Trust{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #3A9295, #105F68)",
            }}
          >
            Index Money
          </span>{" "}
          for Daily Profits
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
          We provide real-time trading calls with proper entry, stop-loss &
          targets - backed by disciplined strategy and proven results.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, description, iconBg, glow }, i) => (
          <motion.div
            key={title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={cardVariants}
            whileHover={{
              y: -8,
              boxShadow: `0 24px 48px ${glow}, 0 12px 28px rgba(16,95,104,0.10)`,
            }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="group rounded-[26px] border border-[#B8DCD7] bg-white/80 p-6 shadow-[0_12px_30px_rgba(16,95,104,0.10)] backdrop-blur-sm"
          >
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm"
              style={{ background: iconBg }}
            >
              <Icon className="h-5.5 w-5.5 text-white" strokeWidth={2.2} />
            </div>

            <h3 className="mb-3 max-w-[12ch] text-[1.7rem] font-bold leading-[1.18] tracking-[-0.02em] text-slate-800 md:text-[1.9rem] lg:text-[1.65rem]">
              {title}
            </h3>
            <p className="max-w-[19ch] text-base leading-relaxed text-slate-600">
              {description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className="mt-8 rounded-[26px] border border-[#CFE7E2] bg-white/85 px-4 py-4 shadow-[0_12px_30px_rgba(16,95,104,0.08)] backdrop-blur-sm"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {stats.map(({ icon: Icon, label }, index) => (
            <div
              key={label}
              className={`flex items-center justify-center gap-3 px-4 py-2 text-center lg:justify-start ${
                index < stats.length - 1 ? "lg:border-r lg:border-slate-200" : ""
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8F4] text-[#3A9295]">
                <Icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="text-lg font-semibold leading-tight text-slate-700">
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Trust;
