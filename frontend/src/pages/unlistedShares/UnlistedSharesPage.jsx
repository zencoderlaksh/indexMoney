import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
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
  Loader2,
} from "lucide-react";

import WhatsAppModal from "../../components/WhatsAppModal";
import ShareButton from "../../components/ShareButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const MotionArticle = motion.article;

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[3px] h-[0.9em] bg-current ml-1 -mb-[0.1em] align-baseline rounded-full"
      />
    </span>
  );
};

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
  {
    title: "Explore & Enquire",
    description: "Choose the company you're interested in and submit your enquiry.",
  },
  {
    title: "Confirm Price & Availability",
    description: "Our experts verify the latest availability and indicative pricing.",
  },
  {
    title: "Complete Documentation & Payment",
    description: "Finish the required documentation and make a secure payment.",
  },
  {
    title: "Receive Shares in Your Demat Account",
    description: "The shares are transferred to your Demat account after successful processing.",
  },
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
  const { user } = useAuthStore();
  const isVerifiedPartner = user?.isPartner && (user?.partnerStatus === "verified" || user?.partnerStatus === "pending");

  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllNewArrivals, setShowAllNewArrivals] = useState(false);
  const [blogs, setBlogs] = useState([]);
  
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [hoveredCardId, setHoveredCardId] = useState(null);

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
        setIsLoading(true);
        const response = await fetch(`${API_BASE}/unlisted/opportunities`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const payload = await response.json();
        const latestUpload = payload?.data;

        if (latestUpload?.opportunities?.length) {
          setOpportunities(latestUpload.opportunities);
        } else {
          setOpportunities([]);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setOpportunities([]);
        }
      } finally {
        setIsLoading(false);
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
        <section className="relative px-5 pb-10 pt-32 md:px-8 md:pt-40">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1fr_420px] xl:grid-cols-[1.1fr_480px] items-center">
            
            {/* Left Column */}
            <div className="text-left">
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, delay: 0.08 }}
                className="mt-6 text-4xl font-extrabold leading-[1.1] text-slate-800 dark:text-slate-100 md:text-5xl lg:text-6xl lg:leading-[1.15]"
              >
                <TypewriterText text="India's Growth. Your Opportunity." />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.14 }}
                className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg"
              >
                Be part of India's next generation of successful companies by investing before they go public.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#opportunities-grid"
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0466c8] to-[#0353a4] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#0353a4]/30 transition-all hover:scale-[1.03] flex items-center gap-2 group"
                >
                  <span className="relative z-10">Explore unlisted shares</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <motion.div
                    className="absolute inset-0 z-0 bg-white/20 w-1/2"
                    initial={{ x: "-200%", skewX: -20 }}
                    animate={{ x: "300%" }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
                  />
                </a>
              </motion.div>
            </div>

            {/* Right Column (Preview Card) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.2 },
                scale: { duration: 0.6, delay: 0.2, type: "spring" },
                y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.6 }
              }}
              className="relative rounded-[32px] p-[2px] group w-full shadow-[0_20px_50px_rgba(4,102,200,0.15)] hover:shadow-[0_20px_60px_rgba(4,102,200,0.25)] transition-shadow duration-500"
            >
              {/* Animated Gradient Border */}
              <div className="absolute inset-0 z-0 overflow-hidden rounded-[32px]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#0466c8_360deg)] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              {/* Card Inner */}
              <div className="relative z-10 rounded-[30px] bg-white/95 dark:bg-[#001233]/95 backdrop-blur-xl flex flex-col overflow-hidden h-full">
                
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 px-6 py-5 bg-slate-50/50 dark:bg-white/5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0353a4]">
                    Live Indicative Prices
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-400 bg-white dark:bg-[#001845] px-2 py-1 rounded-md border border-slate-100 dark:border-white/5">
                  REF • {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                </span>
              </div>
              
              <div className="flex flex-col">
                {isLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-6 w-6 animate-spin text-[#0353a4]" />
                  </div>
                ) : newArrivals.length === 0 ? (
                  <div className="flex items-center justify-center p-8 text-xs text-slate-500">
                    No opportunities available.
                  </div>
                ) : (
                  newArrivals.slice(0, 3).map((item, idx) => (
                    <motion.div 
                      key={item.code || idx} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(4,102,200,0.04)" }}
                      transition={{ delay: 0.3 + (idx * 0.15), type: "spring", stiffness: 300 }}
                      className="group/item flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-white/5 last:border-b-0 cursor-pointer"
                    >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-10 w-10 shrink-0 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] shadow-sm flex items-center justify-center overflow-hidden p-1 group-hover/item:border-[#0466c8]/40 group-hover/item:shadow-md transition-all">
                        {item.logoUrl ? (
                          <img src={item.logoUrl} alt={item.company} className="h-full w-full object-contain transform group-hover/item:scale-110 transition-transform duration-300" />
                        ) : (
                          <span className="text-[10px] font-bold text-[#023e7d]">{getInitials(item.company)}</span>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0 pr-2">
                        <span className="text-[13px] font-bold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover/item:text-[#0466c8] transition-colors">{item.company}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{item.sector}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0 pl-2 border-l border-slate-100 dark:border-white/5">
                      <div className="flex flex-col items-end">
                        {isVerifiedPartner && item.originalPrice && (
                          <span className="text-[11px] font-bold text-slate-400 line-through mb-0.5">{item.originalPrice}</span>
                        )}
                        <span className="text-[15px] font-bold text-slate-800 dark:text-slate-100">{item.price}</span>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#0466c8] group-hover/item:text-[#023e7d] transition-colors">
                        Indicative
                      </span>
                    </div>
                    </motion.div>
                )))}
              </div>

              <Dialog>
                <div className="bg-slate-50 dark:bg-[#001233] px-6 py-4 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 z-10">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Rates are indicative, not an offer to deal.
                  </span>
                  <DialogTrigger asChild>
                    <button className="text-[12px] font-semibold text-[#0353a4] hover:text-[#023e7d] flex items-center gap-1 group shrink-0 bg-[#0466c8]/10 hover:bg-[#0466c8]/20 px-3 py-1.5 rounded-full transition-colors">
                      See full list 
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </button>
                  </DialogTrigger>
                </div>
                <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Latest Indicative Prices</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col mt-4">
                    {newArrivals.map((item, idx) => (
                      <div key={`modal-${item.code || idx}`} className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-white/5 last:border-b-0 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
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
                        <div className="flex flex-col items-end shrink-0 pl-2">
                          <div className="flex flex-col items-end">
                            {isVerifiedPartner && item.originalPrice && (
                              <span className="text-[11px] font-bold text-slate-400 line-through mb-0.5">{item.originalPrice}</span>
                            )}
                            <span className="text-[15px] font-bold text-slate-800 dark:text-slate-100">{item.price}</span>
                          </div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#0466c8]">Indicative</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              </div>
            </motion.div>

          </div>
        </section>
      )}

      <section id="opportunities-grid" className={`relative px-3 pb-4 sm:px-5 md:px-8 ${isCatalogPage ? "pt-24 md:pt-28" : ""}`}>
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[22px] border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#001845]/90 90 shadow-[0_14px_38px_rgba(2,62,125,0.04)] backdrop-blur-sm sm:rounded-[30px]">
          
          <div className="border-b border-slate-100 dark:border-white/5 px-6 py-6 sm:px-8 flex flex-col items-center justify-center text-center gap-4">
            <div className="flex flex-col items-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0466c8]">
                {isCatalogPage ? "INVESTMENT OPPORTUNITIES" : "CURATED FOR INVESTORS"}
              </p>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-[#0353a4] to-slate-800 dark:from-white dark:via-[#0466c8] dark:to-slate-300 drop-shadow-sm">
                {isCatalogPage ? "India's Largest Collection of Unlisted Shares" : "Discover India's Most Promising Unlisted Companies"}
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl text-center">
                {isCatalogPage 
                  ? "Browse verified investment opportunities across India's private market. Compare indicative share prices, research companies, and invest with confidence before they go public." 
                  : "Access exclusive investment opportunities in high-potential private companies across fintech, technology, infrastructure, healthcare, and more."
                }
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-[#0353a4] mb-4" />
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Fetching opportunities...</p>
            </div>
          ) : displayedOpportunities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">No opportunities available.</p>
            </div>
          ) : (
            <div className="grid min-w-0 gap-6 p-4 sm:p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" key={currentPage}>
              {displayedOpportunities.map((item, index) => {
                const cardId = `opp-${item.company}-${item.sector}`;
              return (
                <div 
                  key={cardId}
                  onMouseEnter={() => setHoveredCardId(cardId)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className={`transition-all duration-500 h-full relative ${hoveredCardId !== null && hoveredCardId !== cardId ? 'opacity-40 blur-[2px] scale-[0.98] pointer-events-none' : 'scale-100'} ${hoveredCardId === cardId ? 'z-50' : 'z-10'}`}
                >
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  perspective={1000}
                  scale={1.05}
                  transitionSpeed={2000}
                  glareEnable={true}
                  glareMaxOpacity={0.12}
                  glareColor="#ffffff"
                  glarePosition="all"
                  glareBorderRadius="24px"
                  className="h-full"
                >
                <motion.article
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 200, damping: 20 }}
                  className="group relative flex h-full min-w-0 flex-col rounded-[24px] border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#001845]/80 backdrop-blur-md p-5 shadow-sm hover:shadow-[0_20px_50px_rgba(4,102,200,0.12)] transition-all duration-500 hover:border-[#0466c8]/50 overflow-hidden"
                >
                  {/* Subtle hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0466c8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  {/* Top Row: Logo, Name, Sector */}
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="h-12 w-12 shrink-0 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] shadow-sm flex items-center justify-center overflow-hidden p-1.5 group-hover:border-[#0466c8]/30 group-hover:shadow-md transition-all duration-300">
                      {item.logoUrl ? (
                        <img src={item.logoUrl} alt={item.company} className="h-full w-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
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
                      {isVerifiedPartner && item.originalPrice && (
                        <span className="text-sm font-bold text-slate-400 line-through mb-0.5">{item.originalPrice}</span>
                      )}
                      <span className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-[#0353a4] transition-colors duration-300">{item.price}</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#0466c8] mt-0.5">
                        Indicative
                      </span>
                    </div>
                    <span className="rounded-full bg-slate-100 dark:bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                      {item.faceValue && item.faceValue !== "Upload face value" ? `FV ${item.faceValue}` : "15D"}
                    </span>
                  </div>

                  {/* Bottom Row: Enquire & Details Buttons */}
                  <div className="mt-6 flex items-center gap-3 pt-2 relative z-10">
                    <button
                      onClick={() => {
                        setSelectedCompany(item.company);
                        setIsWhatsAppModalOpen(true);
                      }}
                      className="flex-1 py-2.5 text-center text-xs font-bold text-white bg-[#002855] hover:bg-[#0353a4] rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      Enquire
                    </button>
                    <Link
                      to={getDetailPath(item)}
                      className="px-4 py-2.5 text-center text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0353a4] border border-slate-200 dark:border-white/10 hover:border-[#0353a4] bg-white dark:bg-[#001845] rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    >
                      Details
                    </Link>
                    <ShareButton link={getDetailPath(item)} />
                  </div>
                </motion.article>
                </Tilt>
                </div>
              );
            })}
          </div>
          )}

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
            
            <div className="border-b border-slate-100 dark:border-white/5 px-6 py-6 sm:px-8 flex flex-col items-center justify-center text-center gap-4">
              <div className="flex flex-col items-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0466c8]">
                  NEW ON INDEXMONEY
                </p>
                <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-[#0353a4] to-slate-800 dark:from-white dark:via-[#0466c8] dark:to-slate-300 drop-shadow-sm">
                  Fresh Investment Opportunities
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl text-center">
                  Discover newly available unlisted companies from high-growth sectors across India. Research, compare, and invest with confidence.
                </p>
              </div>
              
              <button 
                onClick={() => setShowAllNewArrivals(!showAllNewArrivals)}
                className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] px-4 py-2 text-xs font-semibold text-[#0353a4] hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#001233] transition-colors"
              >
                {showAllNewArrivals ? "Show less" : "View all"} <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-[#0353a4] mb-4" />
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Fetching new arrivals...</p>
              </div>
            ) : newArrivals.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">No new arrivals available.</p>
              </div>
            ) : (
              <div className="grid min-w-0 gap-6 p-4 sm:p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {(showAllNewArrivals ? newArrivals : newArrivals.slice(0, 4)).map((item, index) => {
                  const cardId = `new-${item.company}-${item.sector}`;
                return (
                  <div 
                    key={cardId}
                    onMouseEnter={() => setHoveredCardId(cardId)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    className={`transition-all duration-500 h-full relative ${hoveredCardId !== null && hoveredCardId !== cardId ? 'opacity-40 blur-[2px] scale-[0.98] pointer-events-none' : 'scale-100'} ${hoveredCardId === cardId ? 'z-50' : 'z-10'}`}
                  >
                  <Tilt
                    tiltMaxAngleX={8}
                    tiltMaxAngleY={8}
                    perspective={1000}
                    scale={1.05}
                    transitionSpeed={2000}
                    glareEnable={true}
                    glareMaxOpacity={0.12}
                    glareColor="#ffffff"
                    glarePosition="all"
                    glareBorderRadius="24px"
                    className="h-full"
                  >
                  <motion.article
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 200, damping: 20 }}
                    className="group relative flex h-full min-w-0 flex-col rounded-[24px] border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#001845]/80 backdrop-blur-md p-5 shadow-sm hover:shadow-[0_20px_50px_rgba(4,102,200,0.12)] transition-all duration-500 hover:border-[#0466c8]/50 overflow-hidden"
                  >
                    {/* Subtle hover gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0466c8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    {/* Top Row: Logo, Name, Sector */}
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="h-12 w-12 shrink-0 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] shadow-sm flex items-center justify-center overflow-hidden p-1.5 group-hover:border-[#0466c8]/30 group-hover:shadow-md transition-all duration-300">
                        {item.logoUrl ? (
                          <img src={item.logoUrl} alt={item.company} className="h-full w-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
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
                        {isVerifiedPartner && item.originalPrice && (
                          <span className="text-sm font-bold text-slate-400 line-through mb-0.5">{item.originalPrice}</span>
                        )}
                        <span className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-[#0353a4] transition-colors duration-300">{item.price}</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#0466c8] mt-0.5">
                          Indicative
                        </span>
                      </div>
                      <span className="rounded-full bg-slate-100 dark:bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                        {item.faceValue && item.faceValue !== "Upload face value" ? `FV ${item.faceValue}` : "15D"}
                      </span>
                    </div>

                    {/* Bottom Row: Enquire & Details Buttons */}
                    <div className="mt-6 flex items-center gap-3 pt-2 relative z-10">
                      <button
                        onClick={() => {
                          setSelectedCompany(item.company);
                          setIsWhatsAppModalOpen(true);
                        }}
                        className="flex-1 py-2.5 text-center text-xs font-bold text-white bg-[#002855] hover:bg-[#0353a4] rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      >
                        Enquire
                      </button>
                      <Link
                        to={getDetailPath(item)}
                        className="px-4 py-2.5 text-center text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0353a4] border border-slate-200 dark:border-white/10 hover:border-[#0353a4] bg-white dark:bg-[#001845] rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                      >
                        Details
                      </Link>
                      <ShareButton link={getDetailPath(item)} />
                    </div>
                  </motion.article>
                  </Tilt>
                  </div>
                );
              })}
            </div>
            )}

            {!showAllNewArrivals && newArrivals.length > 4 && (
              <div className="pb-8 flex justify-center">
                <button
                  onClick={() => setShowAllNewArrivals(true)}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0466c8] to-[#0353a4] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#0353a4]/30 transition-all hover:scale-[1.03] flex items-center gap-2 group"
                >
                  <span className="relative z-10">View All New Arrivals</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <motion.div
                    className="absolute inset-0 z-0 bg-white/20 w-1/2"
                    initial={{ x: "-200%", skewX: -20 }}
                    animate={{ x: "300%" }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
                  />
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
            
            <div className="border-b border-slate-100 dark:border-white/5 px-6 py-6 sm:px-8 flex flex-col items-center justify-center text-center gap-4">
              <div className="flex flex-col items-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0466c8]">
                  MARKET SECTORS
                </p>
                <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-[#0353a4] to-slate-800 dark:from-white dark:via-[#0466c8] dark:to-slate-300 drop-shadow-sm">
                  Invest Across India's Fastest-Growing Industries
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl text-center">
                  From emerging technologies to established industries, explore sector-wise investment opportunities in India's unlisted market.
                </p>
              </div>
              
              <Link 
                to="/sectors"
                className="group relative inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#001845]/50 px-5 py-2.5 text-xs font-bold text-[#0353a4] dark:text-[#4895ef] backdrop-blur-sm transition-all hover:border-[#0466c8]/30 hover:bg-[#0466c8]/5 hover:shadow-[0_8px_20px_rgba(4,102,200,0.1)]"
              >
                <span className="relative z-10">Explore All Sectors</span>
                <ArrowRight className="h-3.5 w-3.5 relative z-10 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid min-w-0 gap-5 p-5 sm:p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sectorsData.map((sec, index) => {
                return (
                  <motion.div
                    key={`home-sec-${sec.name}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link
                      to={`/sectors?sector=${encodeURIComponent(sec.name)}`}
                      className="group relative flex items-center justify-between rounded-[20px] border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#001845]/80 p-5 shadow-[0_4px_12px_rgba(0,18,51,0.02)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#0466c8]/40 hover:shadow-[0_20px_40px_rgba(4,102,200,0.08)] overflow-hidden"
                    >
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0466c8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="flex items-center gap-4 min-w-0 relative z-10">
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-slate-50 dark:bg-[#001233] text-[#0353a4] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#0466c8] group-hover:text-white shadow-sm group-hover:shadow-md">
                          <Boxes className="h-5 w-5 transition-transform duration-500 group-hover:rotate-12" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate transition-colors duration-300 group-hover:text-[#0353a4]">
                            {sec.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 opacity-75 animate-pulse"></span>
                            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                              {sec.count} {sec.count === 1 ? "opportunity" : "opportunities"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 dark:bg-white/5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-[#0466c8]/10 group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4 text-[#0466c8]" />
                      </div>
                    </Link>
                  </motion.div>
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
                <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-[#0353a4] to-slate-800 dark:from-white dark:via-[#0466c8] dark:to-slate-300 drop-shadow-sm">
                  Unlisted shares, explained
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                  Research, IPO buzz and market notes — from our research team. For information only, not advice.
                </p>
              </div>
              
              <Link 
                to="/knowledge-center"
                className="group relative inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#001845]/50 px-5 py-2.5 text-xs font-bold text-[#0353a4] dark:text-[#4895ef] backdrop-blur-sm transition-all hover:border-[#0466c8]/30 hover:bg-[#0466c8]/5 hover:shadow-[0_8px_20px_rgba(4,102,200,0.1)]"
              >
                <span className="relative z-10">View all articles</span>
                <ArrowRight className="h-3.5 w-3.5 relative z-10 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid min-w-0 gap-6 p-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <MotionArticle
                  key={blog.id || blog.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group relative overflow-hidden rounded-[24px] border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#001845]/80 shadow-sm backdrop-blur-md hover:shadow-[0_20px_50px_rgba(4,102,200,0.12)] transition-all duration-500 hover:-translate-y-1 hover:border-[#0466c8]/50 flex flex-col"
                >
                  {/* Subtle hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0466c8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
                  
                  <div className="relative overflow-hidden h-56 z-10">
                    {blog.coverImageUrl ? (
                      <img
                        src={blog.coverImageUrl}
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#ebf4f8] to-[#7d8597]/20 px-6 text-center transition-transform duration-700 group-hover:scale-105">
                        <span className="text-base font-bold text-[#023e7d]">{blog.title}</span>
                      </div>
                    )}
                    {/* Image overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col relative z-10">
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      <span>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span>•</span>
                      <span className="text-[#0466c8]">{blog.category || "RESEARCH"}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight text-slate-800 dark:text-slate-100 line-clamp-2 transition-colors duration-300 group-hover:text-[#0353a4]">
                      <Link to={`/knowledge-center/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400 flex-1">
                      {blog.excerpt}
                    </p>
                    <Link
                      to={`/knowledge-center/${blog.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#023e7d] transition-colors hover:text-[#0466c8]"
                    >
                      Read Article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
              YOUR INVESTMENT JOURNEY
            </p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-[#0353a4] to-slate-800 dark:from-white dark:via-[#0466c8] dark:to-slate-300 drop-shadow-sm pb-1">
              Your Journey to India's Private Market
            </h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              A secure, transparent, and hassle-free investment experience designed for every Indian investor.
            </p>
            <WhatsAppModal 
              isOpen={isWhatsAppModalOpen} 
              onClose={() => setIsWhatsAppModalOpen(false)} 
              companyName={selectedCompany} 
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                className="group relative h-72 w-full [perspective:1000px]"
              >
                <div className="absolute inset-0 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-[0_12px_34px_rgba(2,62,125,0.07)] hover:shadow-[0_24px_48px_rgba(4,102,200,0.15)] rounded-[26px]">
                  
                  {/* Front Side */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[26px] border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#001845]/90 p-6 text-center backdrop-blur-sm [backface-visibility:hidden]">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#0353a4] to-[#023e7d] shadow-lg shadow-[#0353a4]/30 text-3xl font-black text-white mb-6 group-hover:scale-110 transition-transform duration-500">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold leading-tight text-slate-800 dark:text-slate-100 px-4">
                      {step.title}
                    </h3>
                    <div className="absolute bottom-5 flex items-center justify-center opacity-50 group-hover:opacity-0 transition-opacity duration-300">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#0466c8]">Hover to read</span>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[26px] border border-[#0466c8]/30 bg-gradient-to-br from-[#f8fbff] to-white dark:from-[#001845] dark:to-[#001233] p-8 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0466c8]/10 text-[#0466c8] mb-4 shadow-inner">
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-bold leading-tight text-slate-800 dark:text-slate-100 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {step.description}
                    </p>
                  </div>
                  
                </div>
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
