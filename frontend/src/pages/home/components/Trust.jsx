import React from "react";
import { BarChart3, TrendingUp, Target, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BarChart3,
    title: "10+ Years Market Experience",
    description:
      "Deep market understanding and structured trading insights built over a decade of active participation.",
    accent: "#C8E6E2",
    iconBg: "from-[#C8E6E2] to-[#9ED5D1]",
    glow: "rgba(99,193,187,0.12)",
  },
  {
    icon: TrendingUp,
    title: "Technical Based Research",
    description:
      "Strategies built purely on price action and technical analysis — no tips, no noise.",
    accent: "#9ED5D1",
    iconBg: "from-[#9ED5D1] to-[#63C1BB]",
    glow: "rgba(58,146,149,0.12)",
  },
  {
    icon: Target,
    title: "Defined SL & Target System",
    description:
      "Every call comes with a clear stop-loss and target level. Discipline built in.",
    accent: "#63C1BB",
    iconBg: "from-[#63C1BB] to-[#3A9295]",
    glow: "rgba(16,95,104,0.12)",
  },
  {
    icon: MessageCircle,
    title: "Dedicated Support",
    description:
      "Continuous updates and expert assistance throughout live market hours.",
    accent: "#3A9295",
    iconBg: "from-[#3A9295] to-[#105F68]",
    glow: "rgba(16,95,104,0.15)",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const Trust = () => (
  <section className="py-16 md:py-24 bg-gradient-to-b from-[#E9FFFB] via-[#D9F9F2] to-[#EAF8F2] relative overflow-hidden">
    {/* Accent texture */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 55%), radial-gradient(circle at 80% 65%, rgba(99,193,187,0.15) 0%, rgba(99,193,187,0) 45%)",
      }}
    />

    <div className="relative max-w-6xl mx-auto px-5 md:px-6">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="text-center mb-16"
      >
        <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#C8E6E2] text-[#105F68] border border-[#9ED5D1]">
          Why Index Money
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 leading-tight mb-4">
          Why Traders Trust{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #3A9295, #105F68)",
            }}
          >
            Index Money
          </span>
        </h2>
        <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto">
          Structured advisory backed by technical research, clear risk
          management, and unwavering discipline.
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, description, iconBg, glow }, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={cardVariants}
            whileHover={{
              y: -10,
              scale: 1.03,
              boxShadow: `0 26px 56px ${glow}, 0 10px 26px rgba(16,95,104,0.25)`,
              borderColor: "#105F68",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="group relative rounded-2xl p-6 flex flex-col gap-4 cursor-default overflow-hidden border border-[#A6DAD2] bg-gradient-to-br from-white via-[#E8F8F5] to-[#DFF3EF]"
            style={{ boxShadow: "0 10px 28px rgba(16,95,104,0.14)" }}
          >
            {/* Subtle top gradient line */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(90deg, ${
                  iconBg.includes("C8E6") ? "#C8E6E2"
                  : iconBg.includes("9ED5") ? "#9ED5D1"
                  : iconBg.includes("63C1") ? "#63C1BB"
                  : "#3A9295"
                }, #105F68)`,
              }}
            />

            {/* Icon circle */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${
                  iconBg.includes("C8E6") ? "#C8E6E2, #9ED5D1"
                  : iconBg.includes("9ED5") ? "#9ED5D1, #63C1BB"
                  : iconBg.includes("63C1") ? "#63C1BB, #3A9295"
                  : "#3A9295, #105F68"
                })`,
              }}
            >
              <Icon className="w-6 h-6 text-white" strokeWidth={2} />
            </div>

            <div>
              <h3 className="text-slate-800 font-bold text-base mb-2 leading-snug">
                {title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Trust;
