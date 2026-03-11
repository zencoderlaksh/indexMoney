import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, ArrowRight, Shield, Zap, Target } from "lucide-react";

const stats = [
  { label: "10+ Years Market Understanding", icon: Shield },
  { label: "Advanced Technical Analysis", icon: TrendingUp },
  { label: "Defined Risk Management", icon: Target },
  { label: "Structured Trading Strategy", icon: Zap },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-slate-50" />
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute rounded-full bg-[#C8E6E2] opacity-30"
          style={{ width: 520, height: 520, top: -120, left: -140 }}
          animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full bg-[#9ED5D1] opacity-20"
          style={{ width: 420, height: 420, bottom: -120, right: -140 }}
          animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#105F68]">
                Market Research • Technical Analysis • Risk Discipline
              </p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Empowering traders with structured & technical market research
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Index Money is a professional Index and F&O advisory platform
                focused on disciplined, research-driven trading strategies. We
                do not believe in random tips or unrealistic promises —
                everything is planned, risk-managed, and based purely on
                technical analysis.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/subscribe"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3A9295] to-[#105F68] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
              >
                View Subscription Plans
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#9ED5D1] bg-white px-6 py-3 text-sm font-semibold text-[#105F68] shadow-sm transition hover:bg-[#C8E6E2]/60"
              >
                Contact Us
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {stats.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white/70 p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7F7F5] text-[#105F68]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-lg backdrop-blur">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#105F68]">
                  Trade with clarity & discipline
                </p>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Structured plans for Nifty, Bank Nifty & Sensex
                </h2>
                <p className="text-sm leading-relaxed text-slate-600">
                  Get clearly defined entry, stop-loss and target levels for
                  every setup. Trade with a risk-first mindset and a consistent
                  methodology.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Accuracy Level
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[#105F68]">96%</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Daily Trade Opportunities
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[#105F68]">
                    1–2 Setups
                  </p>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
