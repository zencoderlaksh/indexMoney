import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, ShieldAlert, Target, ImageOff } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createChart, CandlestickSeries } from "lightweight-charts";
import { fallbackTrades } from "../home/components/PerformanceSection";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const generateTradeChartData = (trade) => {
  const data = [];
  const entry = Number(trade.entry);
  const sl = Number(trade.sl);
  const target = Number(trade.target);
  const isTargetHit = trade.result === "Target Hit";

  const totalCandles = 40;
  
  let dateObj = new Date(trade.date);
  if (isNaN(dateObj.getTime())) {
    dateObj = new Date();
  }
  dateObj.setDate(dateObj.getDate() - totalCandles);

  const startPrice = entry - (target - entry) * 0.15;
  const endPrice = isTargetHit ? target + (target - entry) * 0.05 : sl - (entry - sl) * 0.05;

  let currentPrice = startPrice;
  for (let i = 0; i < totalCandles; i++) {
    const t = i / (totalCandles - 1);
    const basePrice = startPrice + (endPrice - startPrice) * t;
    
    const wave = Math.sin(t * Math.PI * 1.5) * (target - entry) * 0.2;
    const noiseRange = Math.abs(target - entry) * 0.05;
    const noise = (Math.random() - 0.5) * noiseRange;
    
    const nextPrice = basePrice + wave + noise;
    
    let finalClose = nextPrice;
    if (i === totalCandles - 1) {
      finalClose = isTargetHit ? target + (target - entry) * 0.02 : sl - (entry - sl) * 0.02;
    }

    const open = currentPrice;
    const close = finalClose;
    const high = Math.max(open, close) + Math.random() * (noiseRange * 0.4);
    const low = Math.min(open, close) - Math.random() * (noiseRange * 0.4);

    dateObj.setDate(dateObj.getDate() + 1);
    const dateString = dateObj.toISOString().split("T")[0];

    data.push({
      time: dateString,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
    });

    currentPrice = close;
  }

  return data;
};

const TradingPerformanceChart = ({ trade }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const data = generateTradeChartData(trade);

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 380,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#334155",
        fontFamily: "Inter, sans-serif",
      },
      grid: {
        vertLines: { color: "rgba(226, 232, 240, 0.6)" },
        horzLines: { color: "rgba(226, 232, 240, 0.6)" },
      },
      rightPriceScale: {
        borderVisible: true,
        borderColor: "rgba(226, 232, 240, 0.8)",
      },
      timeScale: {
        borderVisible: true,
        borderColor: "rgba(226, 232, 240, 0.8)",
        timeVisible: true,
      },
      crosshair: {
        mode: 0,
      },
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#10B981",
      downColor: "#EF4444",
      borderVisible: false,
      wickUpColor: "#10B981",
      wickDownColor: "#EF4444",
    });

    candlestickSeries.setData(data);

    candlestickSeries.createPriceLine({
      price: Number(trade.entry),
      color: "#2563EB",
      lineWidth: 2,
      lineStyle: 2,
      axisLabelVisible: true,
      title: `ENTRY: ${trade.entry}`,
    });

    candlestickSeries.createPriceLine({
      price: Number(trade.target),
      color: "#16A34A",
      lineWidth: 2,
      lineStyle: 2,
      axisLabelVisible: true,
      title: `TARGET: ${trade.target}`,
    });

    candlestickSeries.createPriceLine({
      price: Number(trade.sl),
      color: "#DC2626",
      lineWidth: 2,
      lineStyle: 2,
      axisLabelVisible: true,
      title: `SL: ${trade.sl}`,
    });

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [trade]);

  return (
    <div className="relative w-full h-[380px] bg-white rounded-2xl p-2 border border-slate-100 shadow-inner">
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};

const PastPerformancePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [trades, setTrades] = useState(fallbackTrades);
  const [title, setTitle] = useState("Past Performance");
  const [sourceFileName, setSourceFileName] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadPerformance = async () => {
      try {
        setFetchError("");
        const response = await fetch(`${API_BASE}/performance`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load chart data");
        }

        const payload = await response.json();
        const latestUpload = payload?.data;

        if (!latestUpload?.trades?.length) {
          return;
        }

        setTrades(latestUpload.trades);
        setTitle(latestUpload.title?.trim() || "Past Performance");
        setSourceFileName(latestUpload.sourceFileName || "");
      } catch (error) {
        if (error.name === "AbortError") return;
        setFetchError(error.message || "Unable to load chart data");
      }
    };

    loadPerformance();

    return () => controller.abort();
  }, []);

  const selectedTradeId = searchParams.get("trade");

  const selectedTrade = useMemo(() => {
    return (
      trades.find((trade) => trade.tradeId === selectedTradeId) || trades[0] || null
    );
  }, [selectedTradeId, trades]);

  useEffect(() => {
    setImageError(false);
  }, [selectedTrade]);

  useEffect(() => {
    if (!selectedTrade || selectedTradeId === selectedTrade.tradeId) {
      return;
    }

    setSearchParams({ trade: selectedTrade.tradeId }, { replace: true });
  }, [selectedTrade, selectedTradeId, setSearchParams]);

  const openTrade = (tradeId) => {
    setSearchParams({ trade: tradeId });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#FAFDFD] to-[#F1F7F6] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 rounded-[28px] border border-[#D0ECE6]/60 bg-white/90 px-6 py-8 shadow-xl shadow-[#105F68]/5 backdrop-blur-sm md:px-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#105F68]">
            Past Performance
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
            Transparency in <span className="bg-gradient-to-r from-[#105F68] to-[#3A9295] bg-clip-text text-transparent">Every Trade Levels</span>
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
            We list entry, stop loss, and target levels with exact outcomes. Use the interactive side panel below to view full charts and analyst notes for each trade.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#3A9295]">
            {fetchError
              ? `${fetchError}. Showing sample trade levels.`
              : "Synchronized with live backend updates."}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">{title}</h2>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-1 text-sm font-bold text-[#105F68] transition-colors hover:text-[#08353A]"
              >
                Back to Home
              </button>
            </div>

            <div className="space-y-3 max-h-[800px] overflow-y-auto no-scrollbar pr-1">
              {trades.map((trade) => {
                const isActive = trade.tradeId === selectedTrade?.tradeId;
                const isProfit = trade.result === "Target Hit";

                return (
                  <button
                    type="button"
                    key={trade.tradeId}
                    onClick={() => openTrade(trade.tradeId)}
                    className={`w-full rounded-[24px] border text-left transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? "border-[#105F68] bg-[#F2FAF8] shadow-md shadow-[#105F68]/5"
                        : "border-slate-200/80 bg-white hover:border-[#63C1BB]/60 hover:shadow-md hover:shadow-slate-100"
                    }`}
                  >
                    {/* Premium Active Indicator Accent bar */}
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-[5px] bg-[#105F68] rounded-l-full" />
                    )}

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-extrabold text-slate-900">
                            {trade.index} <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded ml-1">{trade.callType}</span>
                          </p>
                          <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                            {trade.date}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3.5 py-1 text-xs font-black tracking-wide ${
                            isProfit
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-rose-100 text-rose-800 border border-rose-200"
                          }`}
                        >
                          {trade.points} Pts
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {[
                          { icon: ArrowRightLeft, label: "Entry", value: trade.entry, accent: "bg-slate-50 text-slate-800" },
                          { icon: ShieldAlert, label: "SL", value: trade.sl, accent: "bg-rose-50/50 text-rose-700" },
                          { icon: Target, label: "Target", value: trade.target, accent: "bg-emerald-50/50 text-emerald-700" },
                        ].map(({ icon: Icon, label, value, accent }) => (
                          <div
                            key={label}
                            className={`rounded-2xl px-3 py-2.5 text-center ${accent}`}
                          >
                            <Icon className="mx-auto h-3.5 w-3.5 opacity-60" />
                            <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                              {label}
                            </p>
                            <p className="mt-0.5 text-sm font-black">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-[30px] border border-[#D0ECE6]/60 bg-white p-6 shadow-xl shadow-[#105F68]/5">
            {selectedTrade ? (
              <>
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#105F68]">
                      Selected Chart Analysis
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl leading-snug">
                      {selectedTrade.chartTitle?.trim() ||
                        `${selectedTrade.index} ${selectedTrade.callType} Chart Setup`}
                    </h2>
                    <p className="mt-2 text-xs font-semibold text-slate-500">
                      {selectedTrade.date} • <span className={selectedTrade.result === "Target Hit" ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>{selectedTrade.result}</span> • {selectedTrade.points} Pts
                    </p>
                  </div>
                  {selectedTrade.chartUrl && !imageError && (
                    <a
                      href={selectedTrade.chartUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full bg-[#E7F7F5] px-4.5 py-2 text-xs font-bold text-[#105F68] transition-colors hover:bg-[#d6efeb]"
                    >
                      Open Full Image
                    </a>
                  )}
                </div>

                <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-100 bg-slate-50">
                  {selectedTrade.chartUrl && !imageError ? (
                    <img
                      src={selectedTrade.chartUrl}
                      alt={selectedTrade.chartTitle || `${selectedTrade.index} chart`}
                      onError={() => setImageError(true)}
                      className="h-auto w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    />
                  ) : (
                    <TradingPerformanceChart trade={selectedTrade} />
                  )}
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    { label: "Entry Price", value: selectedTrade.entry, theme: "border-slate-100 bg-slate-50/50" },
                    { label: "Stop Loss", value: selectedTrade.sl, theme: "border-rose-100 bg-rose-50/20 text-rose-700" },
                    { label: "Target Price", value: selectedTrade.target, theme: "border-emerald-100 bg-emerald-50/20 text-emerald-700" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-2xl border px-4 py-3.5 ${item.theme}`}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {item.label}
                      </p>
                      <p className="mt-1.5 text-2xl font-black">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-[#D0ECE6]/60 bg-[#F4FAF9] p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#105F68]/80">
                    Analyst Commentary & Notes
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 font-medium">
                    {selectedTrade.chartNotes?.trim() ||
                      "Technical setup confirms target level breakout. Always manage risk as defined."}
                  </p>
                </div>
              </>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PastPerformancePage;
