import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRightLeft,
  ShieldAlert,
  Target,
  TrendingUp,
  TrendingDown,
  BarChart2,
  LineChart,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export const fallbackTrades = [
  {
    tradeId: "nifty-ce-01",
    date: "02 Jan 2025",
    index: "Nifty",
    callType: "CE",
    entry: 210,
    sl: 190,
    target: 255,
    result: "Target Hit",
    points: "+45",
    chartUrl:
      "https://dummyimage.com/1200x700/e6f7f5/105f68&text=Nifty+CE+Chart",
    chartTitle: "Nifty CE breakout chart",
    chartNotes: "Breakout from morning range with target confirmation.",
  },
  {
    tradeId: "banknifty-pe-02",
    date: "08 Jan 2025",
    index: "Bank Nifty",
    callType: "PE",
    entry: 380,
    sl: 400,
    target: 320,
    result: "Target Hit",
    points: "+60",
    chartUrl:
      "https://dummyimage.com/1200x700/eafbf1/105f68&text=Bank+Nifty+PE+Chart",
    chartTitle: "Bank Nifty PE momentum move",
    chartNotes: "Downside continuation after support breakdown.",
  },
  {
    tradeId: "sensex-ce-03",
    date: "15 Jan 2025",
    index: "Sensex",
    callType: "CE",
    entry: 145,
    sl: 130,
    target: 175,
    result: "SL Hit",
    points: "-15",
    chartUrl:
      "https://dummyimage.com/1200x700/f0fdfa/105f68&text=Sensex+CE+Chart",
    chartTitle: "Sensex reversal attempt",
    chartNotes: "Setup invalidated after losing support, so stop loss was hit.",
  },
];

const indexColors = {
  Nifty: "bg-teal-50 text-teal-700 border border-teal-100",
  "Bank Nifty": "bg-emerald-50 text-emerald-700 border border-emerald-100",
  Sensex: "bg-cyan-50 text-cyan-700 border border-cyan-100",
};

const buildSummaryStats = (trades) => {
  const totalCalls = trades.length;
  const targetHit = trades.filter((trade) => trade.result === "Target Hit").length;
  const slHit = trades.filter((trade) => trade.result === "SL Hit").length;
  const accuracy = totalCalls ? Math.round((targetHit / totalCalls) * 100) : 0;

  return [
    { label: "Calls Uploaded", value: String(totalCalls), icon: BarChart2 },
    { label: "Target Hit", value: String(targetHit), icon: TrendingUp },
    { label: "SL Hit", value: String(slHit), icon: TrendingDown },
    { label: "Accuracy", value: `${accuracy}%`, icon: LineChart },
  ];
};

const TradeCard = ({ trade, cardIndex, onViewDetails }) => {
  const isProfit = trade.result === "Target Hit";

  return (
    <motion.div
      custom={cardIndex}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: cardIndex * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6, boxShadow: "0 22px 44px rgba(0,0,0,0.10)" }}
      className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-md transition-colors duration-300 hover:border-teal-200"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${indexColors[trade.index] || "border border-slate-200 bg-slate-50 text-slate-700"}`}
            >
              {trade.index}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
              {trade.callType}
            </span>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
            {trade.date}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isProfit
              ? "border border-teal-200 bg-teal-50 text-teal-700"
              : "border border-red-200 bg-red-50 text-red-600"
          }`}
        >
          {trade.points} pts
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { icon: ArrowRightLeft, label: "Entry", value: trade.entry },
          { icon: ShieldAlert, label: "SL", value: trade.sl },
          { icon: Target, label: "Target", value: trade.target },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-4 text-center"
          >
            <Icon className="mx-auto h-4 w-4 text-slate-400" strokeWidth={2} />
            <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
              {label}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-800">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Trade Outcome
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            {trade.result}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onViewDetails(trade)}
          className="inline-flex items-center gap-1 rounded-full bg-[#E7F7F5] px-4 py-2 text-xs font-semibold text-[#105F68] transition-colors hover:bg-[#d6efeb]"
        >
          View Full Details
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
};

const PerformanceSection = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [trades, setTrades] = useState(fallbackTrades);
  const [summaryTitle, setSummaryTitle] = useState("Monthly Performance Summary");
  const [sourceFileName, setSourceFileName] = useState("");
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadPerformance = async () => {
      try {
        setFetchError("");
        const response = await fetch(`${API_BASE}/performance`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load performance data");
        }

        const payload = await response.json();
        const latestUpload = payload?.data;

        if (!latestUpload?.trades?.length) {
          return;
        }

        setTrades(latestUpload.trades);
        setSummaryTitle(
          latestUpload.title?.trim() || "Latest Uploaded Performance",
        );
        setSourceFileName(latestUpload.sourceFileName || "");
      } catch (error) {
        if (error.name === "AbortError") return;
        setFetchError(error.message || "Unable to load performance data");
      }
    };

    loadPerformance();

    return () => controller.abort();
  }, []);

  const stats = buildSummaryStats(trades);

  const onViewDetails = useCallback(() => {
    navigate("/past-performance");
  }, [navigate]);

  useEffect(() => {
    if (!scrollRef.current) return;

    let rafId;
    const step = 0.8;

    const autoScroll = () => {
      const el = scrollRef.current;
      if (!el) return;

      if (!isPaused) {
        const { scrollWidth, offsetWidth, scrollLeft } = el;
        const maxScroll = scrollWidth - offsetWidth;

        let currentDirection = direction;
        if (scrollLeft >= maxScroll - 1) {
          currentDirection = -1;
          setDirection(-1);
        } else if (scrollLeft <= 0) {
          currentDirection = 1;
          setDirection(1);
        }

        el.scrollLeft += currentDirection * step;
      }

      rafId = requestAnimationFrame(autoScroll);
    };

    rafId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(rafId);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [direction, isPaused]);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.offsetWidth || 0;
    const gap = 24;
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(Math.max(index, 0), Math.max(trades.length - 1, 0)));
  }, [trades.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateActiveIndex);
    return () => el.removeEventListener("scroll", updateActiveIndex);
  }, [updateActiveIndex]);

  const manualScroll = useCallback((scrollFn) => {
    const el = scrollRef.current;
    if (!el) return;

    setIsPaused(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    scrollFn(el);

    scrollTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  }, []);

  const scrollByCard = useCallback(
    (dir) => {
      manualScroll((el) => {
        const cardWidth = el.firstElementChild?.offsetWidth || 0;
        const gap = 24;
        const distance = cardWidth + gap;
        const newDirection = dir === "next" ? 1 : -1;
        setDirection(newDirection);
        el.scrollBy({ left: newDirection * distance, behavior: "smooth" });
      });
    },
    [manualScroll],
  );

  const scrollToCard = useCallback(
    (index) => {
      manualScroll((el) => {
        const cardWidth = el.firstElementChild?.offsetWidth || 0;
        const gap = 24;
        const targetScroll = index * (cardWidth + gap);
        setDirection(targetScroll > el.scrollLeft ? 1 : -1);
        el.scrollTo({ left: targetScroll, behavior: "smooth" });
      });
    },
    [manualScroll],
  );

  return (
    <section id="performance-section" className="bg-transparent py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-800 md:text-4xl lg:text-5xl">
            Transparency in <span className="text-teal-600">Performance</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-500 md:text-lg">
            The homepage stays lightweight and focused: every card shows the
            backend-driven entry, stop loss and target, while the full past
            performance table is opened only when the user asks for it.
          </p>
        </motion.div>

        <div className="relative mb-6">
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
              scrollTimeoutRef.current = setTimeout(() => setIsPaused(false), 1000);
            }}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-2 scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {trades.map((trade, i) => (
              <div
                key={`${trade.tradeId}-${i}`}
                className="w-[90vw] shrink-0 snap-start md:w-[60vw] lg:w-[34vw]"
              >
                <TradeCard
                  trade={trade}
                  cardIndex={i}
                  onViewDetails={onViewDetails}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByCard("prev")}
            className="absolute left-[-1rem] top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-lg transition-colors hover:bg-white"
            aria-label="Previous trade"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard("next")}
            className="absolute right-[-1rem] top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-lg transition-colors hover:bg-white"
            aria-label="Next trade"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-8 flex items-center justify-center gap-2">
          {trades.map((_, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => scrollToCard(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-4 bg-teal-600"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to trade ${idx + 1}`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-8 shadow-xl"
        >
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-white/80">
            {summaryTitle}
          </p>
          <p className="mb-6 text-center text-xs font-medium text-white/70">
            {sourceFileName
              ? `Source file: ${sourceFileName}`
              : fetchError
                ? `${fetchError}. Showing sample data.`
                : "Showing sample data until a backend sheet is uploaded."}
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="flex flex-col items-center gap-2 rounded-xl bg-white/10 p-4 text-white backdrop-blur-sm"
              >
                <Icon className="h-5 w-5 text-white/70" strokeWidth={2} />
                <span className="text-2xl font-bold">{value}</span>
                <span className="text-center text-xs text-white/70">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PerformanceSection;
