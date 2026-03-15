import React, { useState } from "react";
import {
  TrendingUp,
  BarChart2,
  Activity,
  CheckCircle2,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ─── Brand palette (mirrors index.css tokens) ─────────────────────────────────
// im-50  → #C8E6E2   im-100 → #9ED5D1
// im-300 → #63C1BB   im-600 → #3A9295   im-900 → #105F68

// ─── Data ─────────────────────────────────────────────────────────────────────

const plans = [
  {
    title: "Nifty Option Plan",
    subtitle: "Perfect for Nifty traders",
    icon: TrendingUp,
    iconName: "TrendingUp",
    price: "₹1,999",
  },
  {
    title: "Bank Nifty Option Plan",
    subtitle: "Our most requested service",
    icon: BarChart2,
    iconName: "BarChart2",
    price: "₹2,499",
  },
  {
    title: "Sensex Option Plan",
    subtitle: "Sensex-focused strategies",
    icon: Activity,
    iconName: "Activity",
    price: "₹1,999",
  },
  {
    title: "Nifty Futures Plan",
    subtitle: "High-conviction futures calls",
    icon: TrendingUp,
    iconName: "TrendingUp",
    price: "₹3,499",
  },
  {
    title: "Bank Nifty Futures Plan",
    subtitle: "Premium futures advisory",
    icon: BarChart2,
    iconName: "BarChart2",
    price: "₹3,999",
  },
  {
    title: "Sensex Futures Plan",
    subtitle: "Sensex F&O edge",
    icon: Activity,
    iconName: "Activity",
    price: "₹3,499",
  },
];

const features = [
  { icon: Zap, text: "Technical analysis research" },
  { icon: Shield, text: "Entry, SL & target provided" },
  { icon: Clock, text: "Real-time market updates" },
  { icon: CheckCircle2, text: "Trade management guidance" },
];

// ─── Plan Card ────────────────────────────────────────────────────────────────

const PlanCard = ({
  title,
  subtitle,
  icon: Icon,
  iconName,
  price,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const active = hovered || isSelected;

  const handleEnter = () => setHovered(true);
  const handleLeave = () => setHovered(false);

  const handleSubscribe = () => {
    navigate("/subscribe", {
      state: { plan: { title, price, iconName } },
    });
  };

  return (
    <motion.div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => onSelect?.(title)}
      animate={active ? { y: -10, scale: 1.02 } : { y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={
        active ?
          {
            background: "linear-gradient(135deg, #63C1BB, #3A9295)",
            boxShadow: "0 24px 52px rgba(99,193,187,0.40)",
            borderColor: "transparent",
          }
        : {
            background: "#ffffff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
            borderColor: "#C8E6E2",
          }
      }
      className="relative rounded-2xl border flex flex-col p-6 gap-5 cursor-pointer h-full transition-colors duration-300"
    >
      {/* Icon + Title */}
      <div className="flex items-center gap-3">
        <motion.div
          animate={
            active ?
              { backgroundColor: "rgba(255,255,255,0.20)" }
            : { backgroundColor: "#C8E6E2" }
          }
          transition={{ duration: 0.25 }}
          className="p-2.5 rounded-xl flex-shrink-0"
        >
          <Icon
            className="w-5 h-5 transition-colors duration-300"
            style={{ color: hovered ? "#ffffff" : "#105F68" }}
            strokeWidth={2}
          />
        </motion.div>

        <div>
          <h3
            className="font-bold text-base leading-snug transition-colors duration-300"
            style={{ color: active ? "#ffffff" : "#105F68" }}
          >
            {title}
          </h3>
          <p
            className="text-xs mt-0.5 transition-colors duration-300"
            style={{ color: active ? "rgba(255,255,255,0.70)" : "#3A9295" }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px transition-colors duration-300"
        style={{
          backgroundColor: active ? "rgba(255,255,255,0.20)" : "#C8E6E2",
        }}
      />

      {/* Features */}
      <ul className="flex flex-col gap-2.5 flex-1">
        {features.map(({ icon: FIcon, text }, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <span
              className="flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0 transition-colors duration-300"
              style={{
                backgroundColor: active ? "rgba(255,255,255,0.20)" : "#C8E6E2",
              }}
            >
              <FIcon
                className="w-3 h-3 transition-colors duration-300"
                style={{ color: active ? "#ffffff" : "#3A9295" }}
                strokeWidth={2.5}
              />
            </span>
            <span
              className="text-sm transition-colors duration-300"
              style={{ color: active ? "rgba(255,255,255,0.90)" : "#105F68" }}
            >
              {text}
            </span>
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className="flex items-baseline gap-1">
        <span
          className="text-2xl font-extrabold tracking-tight transition-colors duration-300"
          style={{ color: active ? "#ffffff" : "#105F68" }}
        >
          {price}
        </span>
        <span
          className="text-sm transition-colors duration-300"
          style={{ color: active ? "rgba(255,255,255,0.60)" : "#3A9295" }}
        >
          / month
        </span>
      </div>

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={handleSubscribe}
        className="w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
        style={
          hovered ?
            {
              backgroundColor: "#ffffff",
              color: "#105F68",
              boxShadow: "0 4px 16px rgba(255,255,255,0.25)",
            }
          : {
              backgroundColor: "#105F68",
              color: "#ffffff",
            }
        }
      >
        Subscribe Now
      </motion.button>
    </motion.div>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────

const PlansSection = () => {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]?.title ?? "");

  return (
    <section
      id="plans-section"
      className="relative py-16 md:py-20 bg-transparent"
    >
      <div className="relative max-w-6xl mx-auto px-5 md:px-6">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border"
            style={{
              backgroundColor: "#C8E6E2",
              color: "#105F68",
              borderColor: "#9ED5D1",
            }}
          >
            Subscription Plans
          </motion.span>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
            style={{ color: "#105F68" }}
          >
            Choose Your <span style={{ color: "#3A9295" }}>Trading Plan</span>
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "#3A9295" }}
          >
            Professional index and F&amp;O advisory services designed for
            disciplined traders.
          </p>
        </motion.div>

        {/* ── Static grid • 2 rows x 3 cols (responsive) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {plans.map((plan) => (
            <PlanCard
              key={plan.title}
              {...plan}
              isSelected={selectedPlan === plan.title}
              onSelect={setSelectedPlan}
            />
          ))}
        </motion.div>

        <div className="mt-5 text-center text-sm font-medium text-[#105F68]">
          Selected plan:{" "}
          <span className="font-bold">{selectedPlan || "None"}</span>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
