import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Clock,
  ExternalLink,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  TrendingUp,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const inputBase =
  "w-full bg-white border rounded-xl px-4 py-3 pl-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200";
const inputNormal =
  "border-slate-200 focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20";
const inputError =
  "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200";

const FieldError = ({ message }) =>
  message ? (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
      <span className="inline-block h-1 w-1 flex-shrink-0 rounded-full bg-red-400" />
      {message}
    </p>
  ) : null;

const GridBg = () => (
  <svg
    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="hero-grid"
        width="48"
        height="48"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 48 0 L 0 0 0 48"
          fill="none"
          stroke="#023e7d"
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hero-grid)" />
  </svg>
);

const trustBadges = [
  { icon: BadgeCheck, text: "5,000+ Traders" },
  { icon: TrendingUp, text: "90%+ Accuracy" },
  { icon: Clock, text: "Real-Time Calls" },
  { icon: ShieldCheck, text: "Risk Managed Strategy" },
];

const fallbackTodaysResults = [
  { label: "NIFTY", points: "+45 pts", note: "+45 pts ↗" },
  { label: "BANKNIFTY", points: "+80 pts", note: "+80 pts ↗" },
  { label: "SENSEX", points: "+120 pts", note: "+120 pts ↗" },
];

const planOptions = [
  "Bank Nifty Options Plan",
  "Sensex Option plan",
  "Nifty Futures Plan",
  "Bank Nifty Futures Plan",
  "Sensex futures plan",
  "Nifty option plan",
  "Unlisted",
  "Demat account",
];

const WHATSAPP_LINK =
  "https://wa.me/919216180043?text=Hi%20IndexMoney%2C%20I%20want%20today%27s%20free%20call.";

const Hero = () => {
  const navigate = useNavigate();
  const [todaysResults, setTodaysResults] = React.useState(fallbackTodaysResults);

  React.useEffect(() => {
    const controller = new AbortController();

    const loadHomepageContent = async () => {
      try {
        const response = await fetch(`${API_BASE}/homepage`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const payload = await response.json();
        const latestResults = payload?.data?.todaysResults;

        if (Array.isArray(latestResults) && latestResults.length) {
          setTodaysResults(latestResults);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setTodaysResults(fallbackTodaysResults);
        }
      }
    };

    loadHomepageContent();

    return () => controller.abort();
  }, []);

  const openWhatsApp = () => {
    window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer");
  };

  const goToPastPerformance = () => {
    navigate("/past-performance");
  };

  return (
    <section className="relative flex min-h-screen items-start overflow-hidden py-16 lg:min-h-[92vh] lg:py-20">
      <GridBg />

      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[700px] w-[700px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, #7d8597 0%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 -left-20 h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #5c677d 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-10 px-5 md:px-8 lg:grid-cols-1 lg:max-w-4xl lg:mx-auto lg:gap-14">
        <div className="flex flex-col gap-6 lg:items-center lg:text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0353a4]">
              <span className="h-[2px] w-6 bg-[#0353a4]" />
              SHARING INDIA'S UNLISTED SHARES INFORMATION • SINCE 2018
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-[#1e293b] sm:text-5xl md:text-6xl lg:text-[4.2rem]">
              Your clear view of India's <br />
              <span className="italic text-[#0353a4]">unlisted</span> & pre-IPO shares.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="max-w-2xl text-lg leading-relaxed text-slate-600 lg:mx-auto"
          >
            India's Most Trusted Platform for Unlisted & Pre-IPO Shares
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22 }}
            className="flex items-center gap-2 text-base font-medium text-amber-700"
          >
            <Clock className="h-4.5 w-4.5 text-amber-500" strokeWidth={2.2} />
            <span>Today&apos;s calls already running. Join before market closes.</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="flex flex-wrap gap-3 lg:justify-center"
          >
            {trustBadges.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"
              >
                <Icon className="h-3.5 w-3.5 text-[#0353a4]" strokeWidth={2} />
                {text}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex flex-col gap-3 sm:flex-row lg:justify-center"
          >
            <motion.button
              onClick={openWhatsApp}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 32px rgba(3,83,164,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #0353a4, #023e7d)",
              }}
            >
              <MessageCircle className="h-4 w-4" />
              Get Free Call on WhatsApp
            </motion.button>

            <motion.button
              onClick={goToPastPerformance}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#5c677d] px-7 py-3.5 text-sm font-bold text-[#023e7d] transition-all duration-200 hover:border-[#0466c8] hover:bg-[#7d8597]/30"
            >
              <BarChart3 className="h-4 w-4" />
              View Today&apos;s Performance
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="max-w-md overflow-hidden rounded-[26px] border border-white/80 bg-white/85 shadow-lg shadow-slate-200/40 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <p className="text-lg font-bold text-slate-800">Today&apos;s Results</p>
                <p className="text-xs text-slate-500">
                  Latest intraday performance snapshot
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-200 text-[10px]">
                  ⊙
                </span>
                Positive moves
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {todaysResults.map(({ label, points, note }) => (
                <div
                  key={label}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-3.5 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold tracking-wide text-slate-600">
                      {label}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-600">{points}</div>
                    <div className="text-xs font-medium text-slate-400">
                      {note}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between bg-slate-50/70 px-5 py-3">
              <span className="text-xs font-medium text-slate-500">
                Updated with live market snapshots
              </span>
              <a
                href="#performance-section"
                onClick={(event) => {
                  event.preventDefault();
                  goToPastPerformance();
                }}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#023e7d] transition-colors duration-200 hover:text-[#0353a4]"
              >
                See full details
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
