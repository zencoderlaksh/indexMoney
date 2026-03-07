import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, TrendingUp, ShieldCheck, Clock } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis,
} from "recharts";

/* ── Static chart data ─────────────────────────────────────────────────────── */
const chartData = [
  { time: "9:15", value: 22100 },
  { time: "9:30", value: 22180 },
  { time: "9:45", value: 22140 },
  { time: "10:00", value: 22310 },
  { time: "10:30", value: 22260 },
  { time: "11:00", value: 22420 },
  { time: "11:30", value: 22390 },
  { time: "12:00", value: 22540 },
  { time: "12:30", value: 22480 },
  { time: "13:00", value: 22610 },
  { time: "13:30", value: 22590 },
  { time: "14:00", value: 22720 },
  { time: "14:30", value: 22670 },
  { time: "15:00", value: 22810 },
  { time: "15:30", value: 22850 },
];

/* ── Stat pill card ────────────────────────────────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, delay, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 16, scale: 0.92 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className={`absolute flex items-center gap-2.5 bg-white/90 backdrop-blur-md border border-white shadow-lg shadow-slate-200/50 rounded-2xl px-4 py-3 ${className}`}
  >
    <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-[#C8E6E2] to-[#9ED5D1] flex-shrink-0">
      <Icon className="w-4 h-4 text-[#105F68]" strokeWidth={2.5} />
    </span>
    <div>
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide leading-none mb-0.5">{label}</p>
      <p className="text-sm font-bold text-[#105F68] leading-none">{value}</p>
    </div>
  </motion.div>
);

/* ── Custom chart tooltip ──────────────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#105F68] text-white text-xs px-3 py-2 rounded-xl shadow-lg">
      <p className="font-semibold">{label}</p>
      <p>₹{payload[0].value.toLocaleString()}</p>
    </div>
  );
};

/* ── Hero grid background ─────────────────────────────────────────────────── */
const GridBg = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#105F68" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hero-grid)" />
  </svg>
);

/* ── Hero ──────────────────────────────────────────────────────────────────── */
const Hero = () => {
  const navigate = useNavigate();

  const scrollToPlans = () => {
    document.getElementById("plans-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen lg:min-h-[92vh] flex items-center overflow-hidden py-16 lg:py-20">
      <GridBg />

      {/* Soft radial glow */}
      <div
        className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, #C8E6E2 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #9ED5D1 0%, transparent 65%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">

        {/* ── Left: Content ── */}
        <div className="flex flex-col gap-7">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 bg-[#C8E6E2]/60 border border-[#9ED5D1] text-[#105F68] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#63C1BB] animate-pulse" />
              Professional Index & F&O Advisory
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-slate-900 leading-[1.08] tracking-tight">
              Trade Smarter.<br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #3A9295, #105F68)" }}
              >
                Grow Faster.
              </span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-slate-500 text-lg leading-relaxed max-w-lg"
          >
            Professional advisory on Nifty, Bank Nifty & Sensex — powered by structured technical analysis with defined SL & targets.
          </motion.p>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: ShieldCheck, text: "Risk Managed Strategy" },
              { icon: TrendingUp, text: "10+ Years Experience" },
              { icon: Clock, text: "Real-time Calls" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
                <Icon className="w-3.5 h-3.5 text-[#3A9295]" strokeWidth={2} />
                {text}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <motion.button
              onClick={scrollToPlans}
              whileHover={{ scale: 1.04, boxShadow: "0 12px 32px rgba(58,146,149,0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #3A9295, #105F68)" }}
            >
              View Subscription Plans <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              onClick={() => navigate("/signup")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 text-[#105F68] font-bold text-sm px-7 py-3.5 rounded-xl border-2 border-[#9ED5D1] hover:border-[#63C1BB] hover:bg-[#C8E6E2]/30 transition-all duration-200"
            >
              Start Free Trial
            </motion.button>
          </motion.div>
        </div>

        {/* ── Right: Trading Chart Visualization ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          {/* Chart card */}
          <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-slate-200/60 border border-white p-6 overflow-visible">

            {/* Card header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Nifty 50 — Today</p>
                <p className="text-2xl font-extrabold text-slate-800 mt-0.5">22,850 <span className="text-sm font-semibold text-emerald-500">+750 (+3.4%)</span></p>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE
              </span>
            </div>

            {/* Recharts area chart */}
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#63C1BB" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#63C1BB" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3A9295"
                    strokeWidth={2.5}
                    fill="url(#areaGrad)"
                    dot={false}
                    activeDot={{ r: 5, fill: "#105F68", stroke: "#fff", strokeWidth: 2 }}
                    animationDuration={1400}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { label: "Nifty", val: "+3.4%", up: true },
                { label: "Bank Nifty", val: "+2.1%", up: true },
                { label: "Sensex", val: "+3.6%", up: true },
              ].map(({ label, val, up }) => (
                <div key={label} className="bg-slate-50 rounded-xl py-2.5 flex flex-col items-center gap-0.5">
                  <span className="text-[10px] text-slate-400 font-semibold">{label}</span>
                  <span className={`text-sm font-bold ${up ? "text-emerald-600" : "text-red-500"}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating stat cards */}
          <StatCard
            icon={TrendingUp}
            label="Accuracy Rate"
            value="96%"
            delay={0.6}
            className="-top-5 -left-10"
          />
          <StatCard
            icon={ShieldCheck}
            label="Market Experience"
            value="10+ Years"
            delay={0.75}
            className="-bottom-5 -left-6"
          />
          <StatCard
            icon={Clock}
            label="Daily Opportunities"
            value="1–2 Calls"
            delay={0.88}
            className="-top-3 -right-8"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
