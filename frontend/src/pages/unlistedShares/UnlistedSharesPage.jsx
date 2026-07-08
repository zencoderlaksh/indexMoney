import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeIndianRupee,
  Boxes,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Landmark,
  MessageCircle,
  Send,
  ShieldAlert,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import WhatsAppModal from "../../components/WhatsAppModal";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const MotionArticle = motion.article;

const WhatsAppIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 32 32"
    aria-hidden="true"
    focusable="false"
    className={className}
    fill="currentColor"
  >
    <path d="M16.01 3.2c-7.05 0-12.78 5.72-12.78 12.77 0 2.25.59 4.45 1.72 6.38L3.13 29l6.8-1.78a12.75 12.75 0 0 0 6.08 1.55h.01c7.05 0 12.78-5.72 12.78-12.77S23.07 3.2 16.01 3.2Zm0 23.4a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.03 1.06 1.08-3.93-.25-.4a10.55 10.55 0 0 1-1.63-5.65c0-5.85 4.76-10.6 10.62-10.6 2.83 0 5.5 1.1 7.5 3.1a10.52 10.52 0 0 1 3.11 7.5c0 5.85-4.76 10.62-10.61 10.62Zm5.82-7.94c-.32-.16-1.88-.93-2.17-1.03-.29-.1-.5-.16-.72.16-.21.32-.82 1.03-1.01 1.24-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.15-.15.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.28c.16.21 2.24 3.42 5.43 4.79.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z" />
  </svg>
);

// const bulletPoints = [
//   "Pre-IPO Companies",
//   "Private Limited Companies",
//   "Growth Stage Businesses",
// ];

// const serviceCards = [
//   {
//     icon: Building2,
//     title: "Share Availability Assistance",
//     description:
//       "We help you discover live seller-side availability across select private market opportunities.",
//   },
//   {
//     icon: BadgeIndianRupee,
//     title: "Transparent Indicative Pricing",
//     description:
//       "Indicative rates are shared clearly so you can evaluate opportunities with realistic expectations.",
//   },
//   {
//     icon: FileCheck2,
//     title: "Documentation Support",
//     description:
//       "From onboarding to transaction paperwork, we guide you through the required documentation flow.",
//   },
//   {
//     icon: ClipboardCheck,
//     title: "Transfer Coordination",
//     description:
//       "We coordinate the operational steps involved in completing eligible off-market share transfers.",
//   },
// ];

const fallbackOpportunities = [
  {
    company: "ABC Ltd",
    code: "ABC",
    slug: "abc-ltd",
    sector: "Fintech",
    price: "Rs850",
    minimumInvestment: "100 Shares",
    status: "Available",
    badge: "Available",
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
    badge: "Limited",
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
    badge: "Available",
    marketCap: "Upload market cap",
    isin: "Upload ISIN",
    faceValue: "Upload face value",
  },
];

const steps = [
  "Submit Inquiry",
  "Confirm Availability & Pricing",
  "Complete Documentation & Payment",
  "Share Transfer to Demat",
];

const inputBase =
  "w-full rounded-2xl border border-[#7d8597] dark:border-white/10 bg-white dark:bg-[#001845] dark:bg-[#001233] px-4 py-3 text-sm text-slate-700 dark:text-slate-200 dark:text-slate-100 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/25";

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

const getDetailPath = (item) => {
  const code = createSlug(item.code || item.company);
  const slug = createSlug(item.slug || item.company);
  return `/unlisted-shares/${code}/${slug}`;
};

// const getFundamentalPreview = (item) =>
//   [
//     { label: "Market Cap", value: item.marketCap },
//     { label: "ISIN", value: item.isin },
//     { label: "Face Value", value: item.faceValue },
//   ].filter((detail) => detail.value);

const UnlistedSharesPage = () => {
  const location = useLocation();
  const isCatalogPage = location.pathname === "/unlisted-shares";

  const [opportunities, setOpportunities] = useState(fallbackOpportunities);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllNewArrivals, setShowAllNewArrivals] = useState(false);
  const [blogs, setBlogs] = useState([]);
  
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");

  const itemsPerPage = 12;
  const totalPages = Math.ceil(opportunities.length / itemsPerPage);
  const displayedOpportunities = React.useMemo(() => {
    return opportunities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [opportunities, currentPage]);

  const newArrivals = React.useMemo(() => {
    return opportunities.slice().reverse();
  }, [opportunities]);

  const sectorsData = React.useMemo(() => {
    const map = {};
    opportunities.forEach((o) => {
      const sec = o.sector || "Other Sectors";
      if (!map[sec]) map[sec] = [];
      map[sec].push(o);
    });
    return Object.entries(map).map(([name, items]) => ({
      name,
      count: items.length,
    })).sort((a, b) => b.count - a.count).slice(0, 8); // Top 8 sectors for home
  }, [opportunities]);

  // const [sheetMeta, setSheetMeta] = useState({
  //   title: "Indicative Opportunities Snapshot",
  //   sourceFileName: "",
  // });
  const whatsappLink = "https://wa.me/919216180043";

  useEffect(() => {
    const controller = new AbortController();

    const loadUnlistedOpportunities = async () => {
      try {
        const response = await fetch(`${API_BASE}/unlisted/opportunities`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const payload = await response.json();
        const latestUpload = payload?.data;

        if (latestUpload?.opportunities?.length) {
          setOpportunities(latestUpload.opportunities);
          // setSheetMeta({
          //   title:
          //     latestUpload.title?.trim() || "Indicative Opportunities Snapshot",
          //   sourceFileName: latestUpload.sourceFileName || "",
          // });
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setOpportunities(fallbackOpportunities);
        }
      }
    };

    const loadBlogs = async () => {
      try {
        const response = await fetch(`${API_BASE}/blogs`, {
          signal: controller.signal,
        });
        if (!response.ok) return;
        const payload = await response.json();
        if (payload?.data) {
          setBlogs(Array.isArray(payload.data) ? payload.data.slice(0, 3) : []);
        }
      } catch {
        // ignore
      }
    };

    loadUnlistedOpportunities();
    loadBlogs();

    return () => controller.abort();
  }, []);

  return (
    <div className="relative overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(4,102,200,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(3,83,164,0.10),transparent_34%)]" />

      {!isCatalogPage && (
        <section className="relative px-5 pb-10 pt-14 md:px-8 md:pt-18">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1fr_420px] xl:grid-cols-[1.1fr_480px] items-center">
            
            {/* Left Column */}
            <div className="text-left">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#023e7d]"
              >
                <div className="h-[2px] w-6 bg-[#0466c8]" />
                Sharing India's Unlisted Shares Information • Since 2018
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, delay: 0.08 }}
                className="mt-6 text-4xl font-extrabold leading-[1.1] text-slate-800 dark:text-slate-100 md:text-5xl lg:text-6xl lg:leading-[1.15]"
              >
                Your clear view of India's{" "}
                <span className="italic text-[#023e7d]">unlisted</span> & pre-IPO shares.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.14 }}
                className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg"
              >
                Browse India's widest list of unlisted, pre-IPO and ESOP shares, with
                researched company data and indicative prices. When you're ready,
                we help connect buyers and sellers.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#opportunities-grid"
                  className="rounded-2xl bg-[#0353a4] hover:bg-[#023e7d] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0353a4]/20 transition-all hover:scale-[1.02]"
                >
                  Explore unlisted shares
                </a>
              </motion.div>
            </div>

            {/* Right Column (Preview Card) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="rounded-[30px] border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#001845]/90 90 shadow-[0_16px_42px_rgba(2,62,125,0.06)] backdrop-blur-sm"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 px-6 py-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0353a4]">
                  Today's Indicative Prices
                </span>
                <span className="text-[10px] font-medium text-slate-400">
                  REF • {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                </span>
              </div>
              
              <div className="flex flex-col">
                {opportunities.slice(0, 3).map((item, idx) => (
                  <div key={item.code || idx} className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-white/5 last:border-b-0 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#001233] transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-10 w-10 shrink-0 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] shadow-sm flex items-center justify-center overflow-hidden p-1">
                        {item.logoUrl ? (
                          <img src={item.logoUrl} alt={item.company} className="h-full w-full object-contain" />
                        ) : (
                          <span className="text-[10px] font-bold text-[#023e7d]">{getInitials(item.company)}</span>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0 pr-2">
                        <span className="text-[13px] font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{item.company}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{item.sector}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0 pl-2 border-l border-slate-100 dark:border-white/5">
                      <span className="text-[15px] font-bold text-slate-800 dark:text-slate-100">{item.price}</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#0466c8]">
                        Indicative
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 dark:bg-[#001233] px-6 py-4 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Rates are indicative, not an offer to deal.
                </span>
                <button 
                  onClick={() => {
                    document.getElementById("opportunities-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="text-[12px] font-semibold text-[#0353a4] hover:text-[#023e7d] flex items-center gap-1 group shrink-0"
                >
                  See full list 
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>

          </div>
        </section>
      )}

      <section id="opportunities-grid" className={`relative px-3 pb-4 sm:px-5 md:px-8 ${isCatalogPage ? "pt-24 md:pt-28" : ""}`}>
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[22px] border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#001845]/90 90 shadow-[0_14px_38px_rgba(2,62,125,0.04)] backdrop-blur-sm sm:rounded-[30px]">
          
          <div className="border-b border-slate-100 dark:border-white/5 px-6 py-6 sm:px-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0466c8]">
                {isCatalogPage ? "ALL SHARES" : "TOP PICKS"}
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-800 dark:text-slate-100 sm:text-3xl">
                {isCatalogPage ? "Unlisted & pre-IPO shares" : "Popular unlisted shares"}
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                {isCatalogPage 
                  ? `${opportunities.length} companies tracked. Prices shown are indicative and for information only.` 
                  : "The most-followed names with investors this month. Prices shown are indicative and for information only."
                }
              </p>
            </div>
          </div>

          <div className="grid min-w-0 gap-6 p-4 sm:p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" key={currentPage}>
            {displayedOpportunities.map((item, index) => {
              return (
                <motion.article
                  key={`${item.company}-${item.sector}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="group flex min-w-0 flex-col rounded-[24px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-5 shadow-[0_10px_30px_rgba(2,62,125,0.03)] hover:shadow-[0_20px_40px_rgba(2,62,125,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0466c8]"
                >
                  {/* Top Row: Logo, Name, Sector */}
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="h-12 w-12 shrink-0 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] shadow-sm flex items-center justify-center overflow-hidden p-1.5">
                      {item.logoUrl ? (
                        <img src={item.logoUrl} alt={item.company} className="h-full w-full object-contain" />
                      ) : (
                        <span className="text-sm font-bold text-[#023e7d]">{getInitials(item.company)}</span>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-[#0353a4] transition-colors">
                        {item.company}
                      </h3>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{item.sector}</span>
                    </div>
                  </div>

                  {/* Middle Row: Price & 15D pill */}
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/5 flex items-end justify-between">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{item.price}</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#0466c8] mt-0.5">
                        Indicative
                      </span>
                    </div>
                    <span className="rounded-full bg-slate-100 dark:bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                      {item.faceValue && item.faceValue !== "Upload face value" ? `FV ${item.faceValue}` : "15D"}
                    </span>
                  </div>

                  {/* Bottom Row: Enquire & Details Buttons */}
                  <div className="mt-6 flex items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setSelectedCompany(item.company);
                        setIsWhatsAppModalOpen(true);
                      }}
                      className="flex-1 py-2.5 text-center text-xs font-bold text-white bg-[#002855] hover:bg-[#001233] rounded-xl transition-colors duration-200"
                    >
                      Enquire
                    </button>
                    <Link
                      to={getDetailPath(item)}
                      className="px-4 py-2.5 text-center text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0353a4] border border-slate-200 dark:border-white/10 hover:border-[#0353a4] bg-white dark:bg-[#001845] rounded-xl transition-colors duration-200"
                    >
                      Details
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="border-t border-slate-100 dark:border-white/5 py-6 flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  document.getElementById("opportunities-grid")?.scrollIntoView({ behavior: "smooth" });
                }}
                disabled={currentPage === 1}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001233] hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 transition-colors"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    document.getElementById("opportunities-grid")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-9 h-9 text-xs font-bold rounded-xl transition-all ${
                    currentPage === page
                      ? "bg-[#0353a4] text-white shadow-md shadow-[#0353a4]/20 border border-[#0353a4]"
                      : "border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001233] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  document.getElementById("opportunities-grid")?.scrollIntoView({ behavior: "smooth" });
                }}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001233] hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 transition-colors"
              >
                Next
              </button>
            </div>
          )}

          <div className="border-t border-slate-100 dark:border-white/5 px-4 py-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:px-6 sm:text-sm">
            *Prices and fundamentals are indicative and will be updated from the
            backend upload.
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      {!isCatalogPage && (
        <section id="new-arrivals-grid" className="relative px-3 pb-4 sm:px-5 md:px-8 mt-12">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[22px] border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#001845]/90 90 shadow-[0_14px_38px_rgba(2,62,125,0.04)] backdrop-blur-sm sm:rounded-[30px]">
            
            <div className="border-b border-slate-100 dark:border-white/5 px-6 py-6 sm:px-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0466c8]">
                  FRESH ADDITIONS
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-800 dark:text-slate-100 sm:text-3xl">
                  New arrivals
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                  Recently added names. Research the company, then contact us when you're ready.
                </p>
              </div>
              
              <button 
                onClick={() => setShowAllNewArrivals(!showAllNewArrivals)}
                className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] px-4 py-2 text-xs font-semibold text-[#0353a4] hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#001233] transition-colors"
              >
                {showAllNewArrivals ? "Show less" : "View all"} <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="grid min-w-0 gap-6 p-4 sm:p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {(showAllNewArrivals ? newArrivals : newArrivals.slice(0, 4)).map((item, index) => {
                return (
                  <motion.article
                    key={`new-${item.company}-${item.sector}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="group flex min-w-0 flex-col rounded-[24px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-5 shadow-[0_10px_30px_rgba(2,62,125,0.03)] hover:shadow-[0_20px_40px_rgba(2,62,125,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0466c8]"
                  >
                    {/* Top Row: Logo, Name, Sector */}
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="h-12 w-12 shrink-0 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] shadow-sm flex items-center justify-center overflow-hidden p-1.5">
                        {item.logoUrl ? (
                          <img src={item.logoUrl} alt={item.company} className="h-full w-full object-contain" />
                        ) : (
                          <span className="text-sm font-bold text-[#023e7d]">{getInitials(item.company)}</span>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-[#0353a4] transition-colors">
                          {item.company}
                        </h3>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{item.sector}</span>
                      </div>
                    </div>

                    {/* Middle Row: Price & 15D pill */}
                    <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/5 flex items-end justify-between">
                      <div className="flex flex-col">
                        <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{item.price}</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#0466c8] mt-0.5">
                          Indicative
                        </span>
                      </div>
                      <span className="rounded-full bg-slate-100 dark:bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                        {item.faceValue && item.faceValue !== "Upload face value" ? `FV ${item.faceValue}` : "15D"}
                      </span>
                    </div>

                    {/* Bottom Row: Enquire & Details Buttons */}
                    <div className="mt-6 flex items-center gap-3 pt-2">
                      <button
                      onClick={() => {
                        setSelectedCompany(item.company);
                        setIsWhatsAppModalOpen(true);
                      }}
                      className="flex-1 py-2.5 text-center text-xs font-bold text-white bg-[#002855] hover:bg-[#001233] rounded-xl transition-colors duration-200"
                    >
                      Enquire
                      </button>
                      <Link
                        to={getDetailPath(item)}
                        className="px-4 py-2.5 text-center text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0353a4] border border-slate-200 dark:border-white/10 hover:border-[#0353a4] bg-white dark:bg-[#001845] rounded-xl transition-colors duration-200"
                      >
                        Details
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {!showAllNewArrivals && newArrivals.length > 4 && (
              <div className="pb-8 flex justify-center">
                <button
                  onClick={() => setShowAllNewArrivals(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0353a4] hover:bg-[#023e7d] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02]"
                >
                  View All New Arrivals
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Top Sectors Section */}
      {!isCatalogPage && (
        <section id="homepage-sectors" className="relative px-3 pb-4 sm:px-5 md:px-8 mt-12">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[22px] border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#001845]/90 90 shadow-[0_14px_38px_rgba(2,62,125,0.04)] backdrop-blur-sm sm:rounded-[30px]">
            
            <div className="border-b border-slate-100 dark:border-white/5 px-6 py-6 sm:px-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0466c8]">
                  EXPLORE
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-800 dark:text-slate-100 sm:text-3xl">
                  Top sectors in the unlisted market
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                  Navigate the corners of the private market shaping India's next listings.
                </p>
              </div>
              
              <Link 
                to="/sectors"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] px-4 py-2 text-xs font-semibold text-[#0353a4] hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#001233] transition-colors"
              >
                All sectors <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid min-w-0 gap-5 p-5 sm:p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sectorsData.map((sec) => {
                return (
                  <Link
                    key={`home-sec-${sec.name}`}
                    to={`/sectors?sector=${encodeURIComponent(sec.name)}`}
                    className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-5 shadow-[0_4px_12px_rgba(0,18,51,0.02)] hover:shadow-[0_16px_32px_rgba(0,18,51,0.05)] hover:border-[#0466c8] transition-all duration-300 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-[#001233] text-[#0353a4] group-hover:bg-[#0466c8]/10 group-hover:text-[#0466c8] transition-all">
                        <Boxes className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-[#0353a4] transition-colors">
                          {sec.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {sec.count} {sec.count === 1 ? "share" : "shares"}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-[#0466c8] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Knowledge Center Section */}
      {!isCatalogPage && blogs.length > 0 && (
        <section id="homepage-knowledge-center" className="relative px-3 pb-4 sm:px-5 md:px-8 mt-12">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[22px] border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#001845]/90 90 shadow-[0_14px_38px_rgba(2,62,125,0.04)] backdrop-blur-sm sm:rounded-[30px]">
            
            <div className="border-b border-slate-100 dark:border-white/5 px-6 py-6 sm:px-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0466c8]">
                  KNOWLEDGE CENTRE
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-800 dark:text-slate-100 sm:text-3xl">
                  Unlisted shares, explained
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                  Research, IPO buzz and market notes — from our research team. For information only, not advice.
                </p>
              </div>
              
              <Link 
                to="/knowledge-center"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] px-4 py-2 text-xs font-semibold text-[#0353a4] hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#001233] transition-colors"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid min-w-0 gap-6 p-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <MotionArticle
                  key={blog.id || blog.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden rounded-[24px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] shadow-[0_10px_30px_rgba(2,62,125,0.02)] hover:shadow-[0_20px_40px_rgba(2,62,125,0.06)] hover:border-[#0466c8] transition-all duration-300 flex flex-col"
                >
                  {blog.coverImageUrl ? (
                    <img
                      src={blog.coverImageUrl}
                      alt={blog.title}
                      className="h-56 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-56 items-center justify-center bg-gradient-to-br from-[#ebf4f8] to-[#7d8597]/20 px-6 text-center">
                      <span className="text-base font-bold text-[#023e7d]">{blog.title}</span>
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      <span>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span>•</span>
                      <span className="text-[#0466c8]">{blog.category || "RESEARCH"}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight text-slate-800 dark:text-slate-100 line-clamp-2 hover:text-[#0353a4] transition-colors">
                      <Link to={`/knowledge-center/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400 flex-1">
                      {blog.excerpt}
                    </p>
                    <Link
                      to={`/knowledge-center/${blog.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#023e7d] hover:text-[#0353a4]"
                    >
                      Read Article <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </MotionArticle>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative px-5 py-8 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0353a4]">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-800 dark:text-slate-100 md:text-4xl">
              Simple Process, Guided Support

      <WhatsAppModal 
        isOpen={isWhatsAppModalOpen} 
        onClose={() => setIsWhatsAppModalOpen(false)} 
        companyName={selectedCompany} 
      />
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-[26px] border border-[#5c677d] bg-white/90 dark:bg-[#001845]/90 85 p-6 text-center shadow-[0_12px_34px_rgba(2,62,125,0.07)] backdrop-blur-sm"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0353a4] to-[#023e7d] text-base font-bold text-white">
                  {index + 1}
                </div>
                <p className="mt-4 text-base font-semibold leading-relaxed text-slate-800 dark:text-slate-100">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-16 pt-8 md:px-8 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-6xl rounded-[28px] border border-[#F2D6C8] bg-gradient-to-br from-white to-[#FFF6F1] p-7 shadow-[0_14px_38px_rgba(164,98,60,0.08)]"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#FFF0E8] text-[#C66B3D]">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Disclaimer</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
                Index Money provides facilitation support in unlisted share
                transactions. We do not guarantee listing, returns, or price
                appreciation. Investments in unlisted securities carry higher
                risk and lower liquidity.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default UnlistedSharesPage;
