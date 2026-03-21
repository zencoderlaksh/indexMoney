import React, { useState } from "react";
import {
  TrendingUp,
  BarChart2,
  Activity,
  CheckCircle2,
  Zap,
  Shield,
  Clock,
  Flame,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    title: "Nifty Option Plan",
    subtitle: "Best for Nifty traders",
    icon: TrendingUp,
    iconName: "TrendingUp",
    oldPrice: "\u20B94,499",
    price: "\u20B91,999",
    popular: false,
  },
  {
    title: "Bank Nifty Option Plan",
    subtitle: "Our most requested service",
    icon: BarChart2,
    iconName: "BarChart2",
    oldPrice: "\u20B94,999",
    price: "\u20B92,499",
    popular: true,
  },
  {
    title: "Sensex Option Plan",
    subtitle: "Fast-moving intraday opportunities",
    icon: Activity,
    iconName: "Activity",
    oldPrice: "\u20B94,499",
    price: "\u20B91,999",
    popular: false,
  },
  {
    title: "Nifty Futures Plan",
    subtitle: "High-conviction futures calls",
    icon: TrendingUp,
    iconName: "TrendingUp",
    oldPrice: "\u20B96,999",
    price: "\u20B93,499",
    popular: false,
  },
  {
    title: "Bank Nifty Futures Plan",
    subtitle: "Premium futures advisory",
    icon: BarChart2,
    iconName: "BarChart2",
    oldPrice: "\u20B97,499",
    price: "\u20B93,999",
    popular: false,
  },
  {
    title: "Sensex Futures Plan",
    subtitle: "Sensex F&O edge",
    icon: Activity,
    iconName: "Activity",
    oldPrice: "\u20B96,999",
    price: "\u20B93,499",
    popular: false,
  },
];

const features = [
  { icon: Zap, text: "Technical analysis research" },
  { icon: Shield, text: "Entry, SL & target provided" },
  { icon: Clock, text: "Real-time market updates" },
  { icon: CheckCircle2, text: "Trade management guidance" },
];

const trustPoints = [
  "Instant Access",
  "No Hidden Charges",
  "WhatsApp Support",
];

const PlanCard = ({
  title,
  subtitle,
  icon: Icon,
  iconName,
  oldPrice,
  price,
  popular,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const active = hovered || isSelected || popular;

  const handleEnter = () => setHovered(true);
  const handleLeave = () => setHovered(false);

  const handleSubscribe = () => {
    navigate("/pay-now", {
      state: { plan: { title, price, iconName } },
    });
  };

  return (
    <motion.div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => onSelect?.(title)}
      animate={
        active ?
          { y: -10, scale: popular ? 1.04 : 1.02 }
        : { y: 0, scale: 1 }
      }
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={
        active ?
          {
            background: "linear-gradient(135deg, #63C1BB, #3A9295)",
            boxShadow: popular ?
              "0 28px 60px rgba(58,146,149,0.34)"
            : "0 24px 52px rgba(99,193,187,0.40)",
            borderColor: "transparent",
          }
        : {
            background: "#ffffff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
            borderColor: "#C8E6E2",
          }
      }
      className="relative flex h-full cursor-pointer flex-col gap-5 rounded-2xl border p-6 transition-colors duration-300"
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#105F68] px-3 py-1 text-xs font-bold text-white shadow-lg">
            <Flame className="h-3.5 w-3.5" />
            Most Popular
          </span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <motion.div
          animate={
            active ?
              { backgroundColor: "rgba(255,255,255,0.20)" }
            : { backgroundColor: "#C8E6E2" }
          }
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 rounded-xl p-2.5"
        >
          <Icon
            className="h-5 w-5 transition-colors duration-300"
            style={{ color: active ? "#ffffff" : "#105F68" }}
            strokeWidth={2}
          />
        </motion.div>

        <div>
          <h3
            className="text-base font-bold leading-snug transition-colors duration-300"
            style={{ color: active ? "#ffffff" : "#105F68" }}
          >
            {title}
          </h3>
          <p
            className="mt-0.5 text-xs transition-colors duration-300"
            style={{ color: active ? "rgba(255,255,255,0.78)" : "#3A9295" }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      <div
        className="h-px transition-colors duration-300"
        style={{
          backgroundColor: active ? "rgba(255,255,255,0.20)" : "#C8E6E2",
        }}
      />

      <ul className="flex flex-1 flex-col gap-2.5">
        {features.map(({ icon: FIcon, text }) => (
          <li key={text} className="flex items-center gap-2.5">
            <span
              className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300"
              style={{
                backgroundColor: active ? "rgba(255,255,255,0.20)" : "#C8E6E2",
              }}
            >
              <FIcon
                className="h-3 w-3 transition-colors duration-300"
                style={{ color: active ? "#ffffff" : "#3A9295" }}
                strokeWidth={2.5}
              />
            </span>
            <span
              className="text-sm transition-colors duration-300"
              style={{ color: active ? "rgba(255,255,255,0.92)" : "#105F68" }}
            >
              {text}
            </span>
          </li>
        ))}
      </ul>

      <div>
        <div className="flex items-end gap-2">
          <span
            className="text-sm font-semibold line-through transition-colors duration-300"
            style={{ color: active ? "rgba(255,255,255,0.65)" : "#6B7280" }}
          >
            {oldPrice}
          </span>
          <span
            className="text-3xl font-extrabold tracking-tight transition-colors duration-300"
            style={{ color: active ? "#ffffff" : "#105F68" }}
          >
            {price}
          </span>
        </div>
        <div
          className="mt-1 text-xs font-semibold transition-colors duration-300"
          style={{ color: active ? "#FDE68A" : "#B45309" }}
        >
          ⏳ Limited Time Offer
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={(event) => {
          event.stopPropagation();
          handleSubscribe();
        }}
        className="w-full rounded-xl py-2.5 text-sm font-bold transition-all duration-300"
        style={
          active ?
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
        🚀 Get Instant Access
      </motion.button>

      <div
        className="flex flex-col gap-1.5 text-xs font-medium transition-colors duration-300"
        style={{ color: active ? "rgba(255,255,255,0.92)" : "#105F68" }}
      >
        {trustPoints.map((point) => (
          <div key={point} className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{point}</span>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl px-3 py-2 text-center text-xs font-semibold transition-colors duration-300"
        style={{
          backgroundColor: active ? "rgba(255,255,255,0.12)" : "#F3FAF8",
          color: active ? "#FDE68A" : "#105F68",
        }}
      >
        ⏳ Offer valid till today
      </div>
    </motion.div>
  );
};

const PlansSection = () => {
  const [selectedPlan, setSelectedPlan] = useState("Bank Nifty Option Plan");

  return (
    <section
      id="plans-section"
      className="relative bg-transparent py-16 md:py-20"
    >
      <div className="relative mx-auto max-w-6xl px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-3 inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              backgroundColor: "#C8E6E2",
              color: "#105F68",
              borderColor: "#9ED5D1",
            }}
          >
            Subscription Plans
          </motion.span>

          <h2
            className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl"
            style={{ color: "#105F68" }}
          >
            Start Earning with Our{" "}
            <span style={{ color: "#3A9295" }}>Trading Plans 🚀</span>
          </h2>
          <p
            className="mx-auto max-w-2xl text-base md:text-lg"
            style={{ color: "#3A9295" }}
          >
            Get real-time Nifty, BankNifty & Sensex calls with proper entry, SL
            & targets.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
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

        <div className="mt-6 text-center text-sm font-semibold text-[#105F68]">
          ⏳ Offer valid till today
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
