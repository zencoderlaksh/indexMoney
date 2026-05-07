import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, ShieldAlert, Target, ImageOff } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fallbackTrades } from "../home/components/PerformanceSection";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const PastPerformancePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [trades, setTrades] = useState(fallbackTrades);
  const [title, setTitle] = useState("Past Performance");
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
    if (!selectedTrade || selectedTradeId === selectedTrade.tradeId) {
      return;
    }

    setSearchParams({ trade: selectedTrade.tradeId }, { replace: true });
  }, [selectedTrade, selectedTradeId, setSearchParams]);

  const openTrade = (tradeId) => {
    setSearchParams({ trade: tradeId });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 rounded-[28px] border border-white/80 bg-white/85 px-6 py-8 shadow-xl shadow-slate-200/40 backdrop-blur-sm md:px-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">
            Past Performance
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Backend-managed charts with focused trade levels on the homepage
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
            The homepage cards now show only entry, stop loss and target. This
            page is where the full chart image or chart link from the backend is
            displayed.
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
            {sourceFileName
              ? `Source file: ${sourceFileName}`
              : fetchError
                ? `${fetchError}. Showing sample chart data.`
                : "Showing latest available chart data."}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">{title}</h2>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-sm font-semibold text-teal-700 transition-colors hover:text-teal-900"
              >
                Back to Home
              </button>
            </div>

            {trades.map((trade) => {
              const isActive = trade.tradeId === selectedTrade?.tradeId;

              return (
                <button
                  type="button"
                  key={trade.tradeId}
                  onClick={() => openTrade(trade.tradeId)}
                  className={`w-full rounded-3xl border p-5 text-left shadow-sm transition-all ${
                    isActive
                      ? "border-teal-300 bg-[#f4fbfa] shadow-md"
                      : "border-slate-200 bg-white hover:border-teal-200 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {trade.index} {trade.callType}
                      </p>
                      <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                        {trade.date}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        trade.result === "Target Hit"
                          ? "border border-teal-200 bg-teal-50 text-teal-700"
                          : "border border-red-200 bg-red-50 text-red-600"
                      }`}
                    >
                      {trade.points} pts
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      { icon: ArrowRightLeft, label: "Entry", value: trade.entry },
                      { icon: ShieldAlert, label: "SL", value: trade.sl },
                      { icon: Target, label: "Target", value: trade.target },
                    ].map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="rounded-2xl bg-slate-50 px-3 py-3 text-center"
                      >
                        <Icon className="mx-auto h-4 w-4 text-slate-400" />
                        <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                          {label}
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-800">{value}</p>
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </section>

          <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/40">
            {selectedTrade ? (
              <>
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">
                      Selected Chart
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                      {selectedTrade.chartTitle?.trim() ||
                        `${selectedTrade.index} ${selectedTrade.callType} chart`}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      {selectedTrade.date} • {selectedTrade.result} • {selectedTrade.points} pts
                    </p>
                  </div>
                  {selectedTrade.chartUrl ? (
                    <a
                      href={selectedTrade.chartUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full bg-[#E7F7F5] px-4 py-2 text-sm font-semibold text-[#105F68] transition-colors hover:bg-[#d6efeb]"
                    >
                      Open Full Image
                    </a>
                  ) : null}
                </div>

                <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-100 bg-slate-50">
                  {selectedTrade.chartUrl ? (
                    <img
                      src={selectedTrade.chartUrl}
                      alt={selectedTrade.chartTitle || `${selectedTrade.index} chart`}
                      className="h-auto w-full object-cover"
                    />
                  ) : (
                    <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
                      <ImageOff className="h-10 w-10 text-slate-300" />
                      <p className="mt-4 text-lg font-semibold text-slate-700">
                        No chart image uploaded for this trade yet
                      </p>
                      <p className="mt-2 max-w-md text-sm text-slate-500">
                        Add a <code>chartUrl</code> column in the backend Excel
                        sheet if you want the full chart to appear here.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    { label: "Entry", value: selectedTrade.entry },
                    { label: "Stop Loss", value: selectedTrade.sl },
                    { label: "Target", value: selectedTrade.target },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        {item.label}
                      </p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-slate-100 bg-[#f8fcfb] px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Backend Chart Notes
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {selectedTrade.chartNotes?.trim() ||
                      "No notes were provided for this chart. The backend can optionally send chartNotes for extra context."}
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
