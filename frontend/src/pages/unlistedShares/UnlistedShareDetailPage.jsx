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
} from "lucide-react";

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
          color: "#3A9295",
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
      color: "#105F68",
      lineWidth: 3,
      lastValueVisible: false,
      priceLineVisible: false,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 6,
      crosshairMarkerBorderColor: "#ffffff",
      crosshairMarkerBackgroundColor: "#105F68",
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
    <div className="rounded-[30px] border border-[#D7ECE7] bg-white/95 p-5 shadow-[0_14px_38px_rgba(16,95,104,0.08)] md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-3xl font-black text-slate-950 md:text-4xl">
              {formatCurrency(latestValue)}
            </p>
            <p className="text-sm font-bold text-emerald-600 md:text-base">
              +{formatCurrency(Math.max(1, latestValue - firstValue))} ({gain}%)
            </p>
            <span className="text-sm font-semibold text-slate-500">
              {activeRange}
            </span>
            <Info className="h-4 w-4 text-slate-400" />
          </div>
        </div>

        <span className="rounded-md bg-[#EAF8F4] px-3 py-2 text-xs font-bold text-[#105F68]">
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
              className="pointer-events-none absolute h-4 w-4 rounded-full border-[3px] border-white bg-[#105F68] shadow-[0_6px_16px_rgba(16,95,104,0.28)]"
              style={{
                left: hoverPoint.x,
                top: hoverPoint.y,
                transform: "translate(-50%, -50%)",
              }}
            />
            <div
              className="pointer-events-none absolute rounded-md border border-[#D7ECE7] bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-[0_10px_22px_rgba(15,23,42,0.12)]"
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
                "bg-[#D7ECE7] text-[#105F68]"
              : "text-slate-700 hover:bg-[#F4FBF9]"
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
        <div className="mx-auto max-w-3xl rounded-[28px] border border-[#D7ECE7] bg-white p-8 text-center shadow-[0_14px_38px_rgba(16,95,104,0.08)]">
          <h1 className="text-3xl font-bold text-slate-800">Share not found</h1>
          <p className="mt-3 text-slate-500">
            Upload this company in the unlisted shares sheet, then try again.
          </p>
          <Link
            to="/unlisted-shares"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#105F68] px-5 py-3 text-sm font-bold text-white"
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
            className="inline-flex items-center gap-2 text-sm font-bold text-[#105F68]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Unlisted Shares
          </Link>

          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_330px]">
            <div className="space-y-6">
              <div className="rounded-[32px] border border-[#D7ECE7] bg-white/90 p-7 shadow-[0_18px_42px_rgba(16,95,104,0.09)] backdrop-blur-sm md:p-9">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl border border-[#CBE7E1] bg-[#F4FBF9] text-2xl font-black text-[#105F68]">
                    {share?.logoUrl ?
                      <img
                        src={share.logoUrl}
                        alt={`${share.company} logo`}
                        className="h-full w-full object-cover"
                      />
                    : getInitials(share?.company)}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#3A9295]">
                      {share?.sector || "Unlisted Share"}
                    </p>
                    <h1 className="mt-2 text-3xl font-black leading-tight text-slate-800 md:text-5xl">
                      {share?.company}
                    </h1>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500">
                      {share?.description ||
                        `${share?.company} unlisted shares information sourced from the latest Index Money upload.`}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl bg-[#F4FBF9] p-5">
                    <BadgeIndianRupee className="h-5 w-5 text-[#3A9295]" />
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      Price
                    </p>
                    <p className="mt-2 text-2xl font-black text-[#105F68]">
                      {share?.price}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#F4FBF9] p-5">
                    <Building2 className="h-5 w-5 text-[#3A9295]" />
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      Minimum
                    </p>
                    <p className="mt-2 text-lg font-black text-slate-800">
                      {share?.minimumInvestment}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#F4FBF9] p-5">
                    <Landmark className="h-5 w-5 text-[#3A9295]" />
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      Status
                    </p>
                    <p className="mt-2 text-lg font-black text-slate-800">
                      {share?.status}
                    </p>
                  </div>
                </div>
              </div>



              <PriceHistoryChart price={share?.price} />
            </div>

            <aside className="sticky top-24 rounded-[24px] border border-[#D7ECE7] bg-white p-6 shadow-[0_16px_34px_rgba(15,23,42,0.12)]">
              <h2 className="text-lg font-black leading-snug text-slate-900">
                {share?.company}
              </h2>
              <div className="my-6 border-t border-dashed border-slate-200" />

              <div className="space-y-5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">Price per unit</span>
                  <span className="font-bold text-slate-950">
                    {formatCurrency(pricePerUnit)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    Settlement period
                    <Info className="h-3.5 w-3.5 text-slate-400" />
                  </span>
                  <span className="font-bold text-slate-800">29 Jun 2026</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">Min. units</span>
                  <span className="font-bold text-slate-800">
                    {minimumUnits}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-dashed border-slate-200 pb-4">
                  <span className="text-slate-500">No. of units to buy</span>
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
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors duration-200 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-6 text-center font-bold text-slate-800">
                      {selectedUnits}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setUnits(
                          (current) => Math.max(minimumUnits, current) + 1,
                        )
                      }
                      aria-label="Increase units"
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors duration-200 hover:bg-slate-50"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">Final amount</span>
                  <span className="text-xl font-black text-slate-950">
                    {formatCurrency(finalAmount)}
                  </span>
                </div>
              </div>

              <a
                href={`https://wa.me/919216180043?text=${investText}`}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#3A9295] to-[#105F68] px-5 py-3.5 text-sm font-black text-white shadow-[0_12px_22px_rgba(16,95,104,0.22)] transition duration-200 hover:-translate-y-0.5"
              >
                Invest Now
              </a>
              <a
                href={`https://wa.me/919216180043?text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[#CBE7E1] px-5 py-3 text-sm font-bold text-[#105F68] transition-colors duration-200 hover:bg-[#F4FBF9]"
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
          <div className="rounded-[30px] border border-[#D7ECE7] bg-white/90 p-7 shadow-[0_14px_38px_rgba(16,95,104,0.08)]">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-[#3A9295]" />
              <h2 className="text-2xl font-black text-slate-800">
                Fundamentals
              </h2>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {fundamentals.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[#E1F1EE] bg-[#FBFEFD] p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg font-black text-slate-800">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[30px] border border-[#D7ECE7] bg-white/90 p-7 shadow-[0_14px_38px_rgba(16,95,104,0.08)]">
              <h2 className="text-2xl font-black text-slate-800">
                About Company
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {share?.aboutCompany ||
                  "Add an About Company column in the uploaded sheet to show a richer company profile here."}
              </p>
            </div>

            <div className="rounded-[30px] border border-[#D7ECE7] bg-white/90 p-7 shadow-[0_14px_38px_rgba(16,95,104,0.08)]">
              <h2 className="text-2xl font-black text-slate-800">
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
                        className="flex gap-2 text-sm text-slate-600"
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
                        className="flex gap-2 text-sm text-slate-600"
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
      </section>
    </main>
  );
};

export default UnlistedShareDetailPage;
