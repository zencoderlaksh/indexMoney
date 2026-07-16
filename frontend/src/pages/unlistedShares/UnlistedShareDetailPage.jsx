import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createChart, LineSeries } from "lightweight-charts";
import {
  ArrowLeft,
  BadgeIndianRupee,
  Building2,
  CheckCircle2,
  FileText,
  Info,
  Landmark,
  Minus,
  Plus,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

import { useAuthStore } from "../../stores/authStore";

const fallbackOpportunities = [
  {
    company: "ABC Ltd",
    code: "ABC",
    slug: "abc-ltd",
    sector: "Fintech",
    price: "Rs850",
    minimumInvestment: "100 Shares",
    status: "Available",
    marketCap: "Upload market cap",
    isin: "Upload ISIN",
    faceValue: "Upload face value",
  },
  {
    company: "XYZ Pvt Ltd",
    code: "XYZ",
    slug: "xyz-pvt-ltd",
    sector: "Technology",
    price: "Rs1200",
    minimumInvestment: "50 Shares",
    status: "Limited",
    marketCap: "Upload market cap",
    isin: "Upload ISIN",
    faceValue: "Upload face value",
  },
  {
    company: "Prime Infra Tech",
    code: "PIT",
    slug: "prime-infra-tech",
    sector: "Infrastructure",
    price: "Rs640",
    minimumInvestment: "150 Shares",
    status: "Available",
    marketCap: "Upload market cap",
    isin: "Upload ISIN",
    faceValue: "Upload face value",
  },
];

const createSlug = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getInitials = (value) =>
  String(value || "IM")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("") || "IM";

const splitList = (value) =>
  String(value || "")
    .split(/\||\n|;/)
    .map((item) => item.trim())
    .filter(Boolean);

const chartRanges = ["1 M", "3 M", "1 Y", "2 Y", "3 Y", "All"];

const dummyPriceDataByRange = {
  "1 M": [250, 250, 251, 251, 252, 254, 253, 255, 256, 258, 257, 260],
  "3 M": [218, 218, 220, 220, 224, 224, 229, 229, 235, 241, 238, 246, 250, 250],
  "1 Y": [
    189, 189, 189, 189, 189, 189, 189, 189, 189, 189, 196, 196, 210, 210, 210,
    210, 218, 218, 226, 242, 235, 235, 240, 240, 232, 249, 277, 258, 255, 242,
    236, 248, 250, 253, 247, 251, 251, 251, 239, 239, 247, 247,
  ],
  "2 Y": [
    164, 164, 169, 172, 172, 181, 178, 190, 186, 198, 206, 203, 219, 211, 235,
    227, 251, 247, 265,
  ],
  "3 Y": [
    132, 135, 137, 145, 142, 154, 160, 158, 172, 169, 184, 190, 188, 205, 218,
    214, 236, 249, 265,
  ],
  All: [
    76, 82, 81, 92, 96, 104, 116, 111, 128, 141, 138, 156, 174, 168, 191, 207,
    224, 219, 241, 265,
  ],
};

const rangeStepDays = {
  "1 M": 3,
  "3 M": 7,
  "1 Y": 9,
  "2 Y": 38,
  "3 Y": 58,
  All: 110,
};

const parseCurrencyValue = (value) => {
  const parsed = Number(String(value || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 277;
};

const parseUnits = (value) => {
  const parsed = Number(String(value || "").match(/\d+/)?.[0]);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const formatChartDate = (date) => date.toISOString().slice(0, 10);

const createChartData = (range) => {
  const values = dummyPriceDataByRange[range] || dummyPriceDataByRange["1 Y"];
  const step = rangeStepDays[range] || 9;
  const endDate = new Date(Date.UTC(2026, 5, 22));
  const startDate = new Date(endDate);

  startDate.setUTCDate(endDate.getUTCDate() - step * (values.length - 1));

  return values.map((value, index) => {
    const date = new Date(startDate);
    date.setUTCDate(startDate.getUTCDate() + index * step);

    return {
      time: formatChartDate(date),
      value,
    };
  });
};

const formatDisplayDate = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00Z`));

const PriceHistoryChart = ({ price }) => {
  const [activeRange, setActiveRange] = useState("1 Y");
  const chartRef = useRef(null);
  const wrapperRef = useRef(null);
  const seriesRef = useRef(null);
  const [hoverPoint, setHoverPoint] = useState(null);
  const [chartWidth, setChartWidth] = useState(0);
  const data = useMemo(() => createChartData(activeRange), [activeRange]);
  const firstValue = data[0]?.value || parseCurrencyValue(price);
  const latestValue = parseCurrencyValue(price);
  const gain = Math.max(
    1,
    Math.round(((latestValue - firstValue) / firstValue) * 1000) / 10,
  );

  useEffect(() => {
    if (!chartRef.current) return undefined;

    const chart = createChart(chartRef.current, {
      height: 270,
      layout: {
        background: { color: "transparent" },
        textColor: "#64748B",
        fontFamily: "DM Sans, sans-serif",
      },
      rightPriceScale: {
        visible: false,
        borderVisible: false,
      },
      leftPriceScale: {
        visible: false,
      },
      timeScale: {
        borderVisible: false,
        visible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "rgba(203, 231, 225, 0.55)" },
      },
      crosshair: {
        mode: 0,
        vertLine: {
          color: "#0353a4",
          width: 1,
          style: 3,
          labelVisible: false,
        },
        horzLine: {
          color: "rgba(58, 146, 149, 0.28)",
          width: 1,
          style: 3,
          labelVisible: false,
        },
      },
      handleScroll: false,
      handleScale: false,
    });

    const series = chart.addSeries(LineSeries, {
      color: "#023e7d",
      lineWidth: 3,
      lastValueVisible: false,
      priceLineVisible: false,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 6,
      crosshairMarkerBorderColor: "#ffffff",
      crosshairMarkerBackgroundColor: "#023e7d",
      crosshairMarkerBorderWidth: 3,
    });

    seriesRef.current = series;
    series.setData(data);
    chart.timeScale().fitContent();

    const handleCrosshairMove = (param) => {
      if (!param.point || !param.time || !seriesRef.current) {
        setHoverPoint(null);
        return;
      }

      const pointData = param.seriesData.get(seriesRef.current);
      const value = pointData?.value;
      const y = seriesRef.current.priceToCoordinate(value);

      if (!value || y === null) {
        setHoverPoint(null);
        return;
      }

      setHoverPoint({
        x: param.point.x,
        y,
        value,
        date: String(param.time),
      });
    };

    chart.subscribeCrosshairMove(handleCrosshairMove);

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const width = Math.floor(entry.contentRect.width);

      chart.applyOptions({
        width,
      });
      setChartWidth(width);
      chart.timeScale().fitContent();
    });

    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.unsubscribeCrosshairMove(handleCrosshairMove);
      chart.remove();
      seriesRef.current = null;
    };
  }, [data]);

  return (
    <div className="rounded-[30px] border border-[#7d8597] bg-white/90 dark:bg-[#001845]/90 95 p-5 shadow-[0_14px_38px_rgba(2,62,125,0.08)] md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-3xl font-black text-slate-950 md:text-4xl">
              {formatCurrency(latestValue)}
            </p>
            <p className="text-sm font-bold text-emerald-600 md:text-base">
              +{formatCurrency(Math.max(1, latestValue - firstValue))} ({gain}%)
            </p>
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              {activeRange}
            </span>
            <Info className="h-4 w-4 text-slate-400" />
          </div>
        </div>

        <span className="rounded-md bg-[#f1f5f9] px-3 py-2 text-xs font-bold text-[#023e7d]">
          Hot Right Now
        </span>
      </div>

      <div ref={wrapperRef} className="relative mt-5 h-[270px] overflow-hidden">
        <div
          ref={chartRef}
          aria-label="Indicative dummy price history chart"
          className="h-full w-full"
        />
        {hoverPoint ?
          <>
            <div
              className="pointer-events-none absolute h-4 w-4 rounded-full border-[3px] border-white bg-[#023e7d] shadow-[0_6px_16px_rgba(2,62,125,0.28)]"
              style={{
                left: hoverPoint.x,
                top: hoverPoint.y,
                transform: "translate(-50%, -50%)",
              }}
            />
            <div
              className="pointer-events-none absolute rounded-md border border-[#7d8597] bg-white dark:bg-[#001845] px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-[0_10px_22px_rgba(15,23,42,0.12)]"
              style={{
                left: Math.min(
                  Math.max(hoverPoint.x + 12, 8),
                  Math.max(chartWidth - 178, 8),
                ),
                top: Math.max(hoverPoint.y - 44, 6),
              }}
            >
              {formatCurrency(hoverPoint.value)} |{" "}
              {formatDisplayDate(hoverPoint.date)}
            </div>
          </>
        : null}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-5">
        {chartRanges.map((range) => (
          <button
            key={range}
            type="button"
            onClick={() => setActiveRange(range)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors duration-200 ${
              activeRange === range ?
                "bg-[#7d8597] text-[#023e7d]"
              : "text-slate-700 dark:text-slate-200 hover:bg-[#f1f5f9]"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};

const UnlistedShareDetailPage = () => {
  const { code, slug } = useParams();
  const [opportunities, setOpportunities] = useState(fallbackOpportunities);
  const [isLoading, setIsLoading] = useState(true);
  const [units, setUnits] = useState(1);
  const [aiInsights, setAiInsights] = useState(null);
  const [isAILoading, setIsAILoading] = useState(false);

  const token = useAuthStore((s) => s.token);

  const fetchOpportunities = async (signal) => {
    try {
      const response = await fetch(`${API_BASE}/unlisted/opportunities`, {
        signal,
      });
      if (!response.ok) return;

      const payload = await response.json();
      const rows = payload?.data?.opportunities;

      if (rows?.length) {
        setOpportunities(rows);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setOpportunities(fallbackOpportunities);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAIInsights = async () => {
    if (!share?.company) return;
    setIsAILoading(true);
    try {
      const res = await fetch(`${API_BASE}/ai/insights`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company: share.company }),
      });
      const data = await res.json();
      if (data?.data?.insights) {
        setAiInsights(data.data.insights);
      } else if (data?.error) {
        setAiInsights(`Error: ${data.error}`);
      } else {
        setAiInsights("Failed to fetch insights.");
      }
    } catch (err) {
      setAiInsights("Error loading AI insights.");
    } finally {
      setIsAILoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchOpportunities(controller.signal);
    return () => controller.abort();
  }, []);

  const share = opportunities.find((item) => {
    const itemCode = createSlug(item.code || item.company);
    const itemSlug = createSlug(item.slug || item.company);
    return itemCode === createSlug(code) && itemSlug === createSlug(slug);
  });

  const pricePerUnit = parseCurrencyValue(share?.price);
  const minimumUnits = parseUnits(share?.minimumInvestment);
  const selectedUnits = Math.max(units, minimumUnits);
  const finalAmount = selectedUnits * pricePerUnit;

  const fundamentals =
    share ?
      [
        { label: "Current Price", value: share.price },
        { label: "Market Cap", value: share.marketCap },
        { label: "ISIN", value: share.isin },
        { label: "Face Value", value: share.faceValue },
        { label: "EPS", value: share.eps },
        { label: "P/B Ratio", value: share.pbRatio },
        { label: "Book Value", value: share.bookValue },
        { label: "Debt / Equity", value: share.debtEquityRatio },
      ].filter((item) => item.value)
    : [];

  const strengths = splitList(share?.strengths);
  const weaknesses = splitList(share?.weaknesses);
  const whatsappText = encodeURIComponent(
    `Hi Index Money, I want to know more about ${share?.company || "this unlisted share"}. Please connect me.`,
  );
  const investText = encodeURIComponent(
    `Hi Index Money, I want to invest in ${share?.company || "this unlisted share"}. Quantity: ${selectedUnits} units. Please connect me.`,
  );



  useEffect(() => {
    if (share) {
      setUnits(parseUnits(share.minimumInvestment));
    }
  }, [share]);

  if (!share && !isLoading) {
    return (
      <main className="min-h-screen bg-[#F7FEFC] px-5 py-20">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-[#7d8597] bg-white dark:bg-[#001845] p-8 text-center shadow-[0_14px_38px_rgba(2,62,125,0.08)]">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Share not found</h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Upload this company in the unlisted shares sheet, then try again.
          </p>
          <Link
            to="/unlisted-shares"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#023e7d] px-5 py-3 text-sm font-bold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Unlisted Shares
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,230,226,0.42),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(158,213,209,0.18),transparent_34%)]" />

      <section className="relative px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/unlisted-shares"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#023e7d]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Unlisted Shares
          </Link>

          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_330px]">
            <div className="space-y-6">
              <div className="rounded-[32px] border border-[#7d8597] bg-white/90 dark:bg-[#001845]/90 90 p-7 shadow-[0_18px_42px_rgba(2,62,125,0.09)] backdrop-blur-sm md:p-9">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl border border-[#5c677d] bg-[#f1f5f9] text-2xl font-black text-[#023e7d]">
                    {share?.logoUrl ?
                      <img
                        src={share.logoUrl}
                        alt={`${share.company} logo`}
                        className="h-full w-full object-cover"
                      />
                    : getInitials(share?.company)}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0353a4]">
                      {share?.sector || "Unlisted Share"}
                    </p>
                    <h1 className="mt-2 text-3xl font-black leading-tight text-slate-800 dark:text-slate-100 md:text-5xl">
                      {share?.company}
                    </h1>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
                      {share?.description ||
                        `${share?.company} unlisted shares information sourced from the latest Index Money upload.`}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl bg-[#f1f5f9] p-5">
                    <BadgeIndianRupee className="h-5 w-5 text-[#0353a4]" />
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      Price
                    </p>
                    <p className="mt-2 text-2xl font-black text-[#023e7d]">
                      {share?.price}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#f1f5f9] p-5">
                    <Building2 className="h-5 w-5 text-[#0353a4]" />
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      Minimum
                    </p>
                    <p className="mt-2 text-lg font-black text-slate-800 dark:text-slate-100">
                      {share?.minimumInvestment}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#f1f5f9] p-5">
                    <Landmark className="h-5 w-5 text-[#0353a4]" />
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      Status
                    </p>
                    <p className="mt-2 text-lg font-black text-slate-800 dark:text-slate-100">
                      {share?.status}
                    </p>
                  </div>
                </div>
              </div>



              <PriceHistoryChart price={share?.price} />
            </div>

            <aside className="sticky top-24 rounded-[24px] border border-[#7d8597] bg-white dark:bg-[#001845] p-6 shadow-[0_16px_34px_rgba(15,23,42,0.12)]">
              <h2 className="text-lg font-black leading-snug text-slate-900">
                {share?.company}
              </h2>
              <div className="my-6 border-t border-dashed border-slate-200 dark:border-white/10" />

              <div className="space-y-5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500 dark:text-slate-400">Price per unit</span>
                  <span className="font-bold text-slate-950">
                    {formatCurrency(pricePerUnit)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    Settlement period
                    <Info className="h-3.5 w-3.5 text-slate-400" />
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">29 Jun 2026</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500 dark:text-slate-400">Min. units</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">
                    {minimumUnits}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-dashed border-slate-200 dark:border-white/10 pb-4">
                  <span className="text-slate-500 dark:text-slate-400">No. of units to buy</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setUnits((current) =>
                          Math.max(minimumUnits, current - 1),
                        )
                      }
                      disabled={selectedUnits <= minimumUnits}
                      aria-label="Decrease units"
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#001233] disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <input
                      type="number"
                      min={minimumUnits}
                      value={units}
                      onChange={(e) => setUnits(e.target.value === "" ? "" : parseInt(e.target.value, 10) || "")}
                      onBlur={() => setUnits(Math.max(minimumUnits, parseInt(units, 10) || minimumUnits))}
                      className="w-16 text-center font-bold text-slate-800 dark:text-slate-100 bg-transparent border-b border-transparent focus:border-slate-300 dark:focus:border-white/30 focus:outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setUnits(
                          (current) => Math.max(minimumUnits, current) + 1,
                        )
                      }
                      aria-label="Increase units"
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#001233]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500 dark:text-slate-400">Final amount</span>
                  <span className="text-xl font-black text-slate-950">
                    {formatCurrency(finalAmount)}
                  </span>
                </div>
              </div>

              <a
                href={`https://wa.me/919216180043?text=${investText}`}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#0353a4] to-[#023e7d] px-5 py-3.5 text-sm font-black text-white shadow-[0_12px_22px_rgba(2,62,125,0.22)] transition duration-200 hover:-translate-y-0.5"
              >
                Invest Now
              </a>
              <a
                href={`https://wa.me/919216180043?text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[#5c677d] px-5 py-3 text-sm font-bold text-[#023e7d] transition-colors duration-200 hover:bg-[#f1f5f9]"
              >
                Ask a Question
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section
        id="unlisted-share-details"
        className="relative px-5 pb-16 md:px-8"
      >
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[30px] border border-[#7d8597] bg-white/90 dark:bg-[#001845]/90 90 p-7 shadow-[0_14px_38px_rgba(2,62,125,0.08)]">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-[#0353a4]" />
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
                Fundamentals
              </h2>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {fundamentals.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[#7d8597] bg-[#f8fafc] p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg font-black text-slate-800 dark:text-slate-100">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[30px] border border-[#7d8597] bg-white/90 dark:bg-[#001845]/90 90 p-7 shadow-[0_14px_38px_rgba(2,62,125,0.08)]">
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
                About Company
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {share?.aboutCompany ||
                  "Add an About Company column in the uploaded sheet to show a richer company profile here."}
              </p>
            </div>

            <div className="rounded-[30px] border border-[#7d8597] bg-white/90 dark:bg-[#001845]/90 90 p-7 shadow-[0_14px_38px_rgba(2,62,125,0.08)]">
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
                Strengths & Risks
              </h2>
              <div className="mt-5 grid gap-5">
                <div>
                  <p className="font-bold text-emerald-700">Strengths</p>
                  <div className="mt-3 space-y-2">
                    {(strengths.length ? strengths : (
                      ["Upload strengths separated by | in the sheet."]
                    )
                    ).map((item) => (
                      <p
                        key={item}
                        className="flex gap-2 text-sm text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-amber-700">Risks</p>
                  <div className="mt-3 space-y-2">
                    {(weaknesses.length ? weaknesses : (
                      ["Upload weaknesses separated by | in the sheet."]
                    )
                    ).map((item) => (
                      <p
                        key={item}
                        className="flex gap-2 text-sm text-slate-600 dark:text-slate-300"
                      >
                        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Insights Section */}
        <div className="mx-auto max-w-6xl mt-6">
          <div className="rounded-[30px] border border-[#7d8597] bg-gradient-to-br from-white/90 to-blue-50/90 dark:from-[#001845]/90 dark:to-[#001233]/90 p-7 shadow-[0_14px_38px_rgba(2,62,125,0.08)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sparkles className="w-48 h-48 text-[#0353a4]" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0353a4]/10 p-2.5 rounded-xl">
                    <Sparkles className="h-6 w-6 text-[#0353a4] dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      AI Insights
                      <span className="text-[10px] uppercase tracking-wider font-bold bg-[#0353a4] text-white px-2 py-0.5 rounded-full">Gemini</span>
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Latest analysis and information powered by Google Gemini</p>
                  </div>
                </div>
                {!aiInsights && !isAILoading && (
                  <button 
                    onClick={fetchAIInsights}
                    className="flex items-center gap-2 bg-[#0353a4] text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-[#023e7d] transition-colors shadow-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate Insights
                  </button>
                )}
              </div>

              {isAILoading && (
                <div className="flex flex-col items-center justify-center py-10 gap-4">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-[#0353a4]"></div>
                  <p className="text-sm font-semibold text-slate-500 animate-pulse">Analyzing latest market data...</p>
                </div>
              )}

              {aiInsights && !isAILoading && (
                <div className="prose prose-sm sm:prose-base dark:prose-invert prose-blue max-w-none prose-headings:font-bold prose-headings:text-slate-800 dark:prose-headings:text-slate-100 prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-li:text-slate-600 dark:prose-li:text-slate-300">
                  <ReactMarkdown>{aiInsights}</ReactMarkdown>
                </div>
              )}
              
              {!aiInsights && !isAILoading && (
                <div className="bg-white/50 dark:bg-black/20 border border-dashed border-slate-300 dark:border-white/20 rounded-2xl p-8 text-center">
                  <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Click the button above to generate a real-time summary, recent news, and key metrics about {share?.company} using AI.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UnlistedShareDetailPage;
