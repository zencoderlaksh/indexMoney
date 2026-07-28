import React, { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Boxes, ArrowRight, ArrowLeft, Send, Landmark, HeartPulse, Cpu, Zap, ShoppingCart, Shield, Factory, Building2, Flame, Plane, Tv, Briefcase } from "lucide-react";
import WhatsAppModal from "../../components/WhatsAppModal";
import ShareButton from "../../components/ShareButton";

const getSectorIcon = (sectorName) => {
  const s = String(sectorName || "").toLowerCase();
  if (s.includes("finance") || s.includes("bank") || s.includes("nbfc") || s.includes("exchange") || s.includes("capital")) return Landmark;
  if (s.includes("health") || s.includes("medical") || s.includes("pharma")) return HeartPulse;
  if (s.includes("tech") || s.includes("software") || s.includes("it") || s.includes("computer")) return Cpu;
  if (s.includes("energy") || s.includes("power") || s.includes("oil") || s.includes("gas") || s.includes("green")) return Zap;
  if (s.includes("consumer") || s.includes("retail") || s.includes("ecommerce")) return ShoppingCart;
  if (s.includes("insurance") || s.includes("security")) return Shield;
  if (s.includes("manufacturing") || s.includes("industry")) return Factory;
  if (s.includes("real estate") || s.includes("infrastructure") || s.includes("construction") || s.includes("infra")) return Building2;
  if (s.includes("chemical") || s.includes("material")) return Flame;
  if (s.includes("aero") || s.includes("aviation") || s.includes("airport") || s.includes("logistics")) return Plane;
  if (s.includes("media") || s.includes("entertainment") || s.includes("sports") || s.includes("game")) return Tv;
  return Briefcase;
};

const MotionArticle = motion.article;

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const fallbackOpportunities = [
  { company: "ABC Ltd", code: "ABC", slug: "abc-ltd", sector: "Fintech", price: "Rs850", minimumInvestment: "100 Shares", status: "Available", badge: "Available" },
  { company: "XYZ Pvt Ltd", code: "XYZ", slug: "xyz-pvt-ltd", sector: "Technology", price: "Rs1200", minimumInvestment: "50 Shares", status: "Limited", badge: "Limited" },
  { company: "Prime Infra Tech", code: "PIT", slug: "prime-infra-tech", sector: "Infrastructure", price: "Rs640", minimumInvestment: "150 Shares", status: "Available", badge: "Available" },
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

const getDetailPath = (item) => {
  const code = createSlug(item.code || item.company);
  const slug = createSlug(item.slug || item.company);
  return `/unlisted-shares/${code}/${slug}`;
};

const SectorsPage = () => {
  const [opportunities, setOpportunities] = useState(fallbackOpportunities);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSector = searchParams.get("sector");
  
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    interestedCompany: "",
    investmentAmount: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ kind: "", text: "" });

  useEffect(() => {
    const controller = new AbortController();
    const loadUnlistedOpportunities = async () => {
      try {
        const response = await fetch(`${API_BASE}/unlisted/opportunities`, {
          signal: controller.signal,
        });
        if (!response.ok) return;
        const payload = await response.json();
        const latestUpload = payload?.data;
        if (latestUpload?.opportunities?.length) {
          setOpportunities(latestUpload.opportunities);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setOpportunities(fallbackOpportunities);
        }
      }
    };
    loadUnlistedOpportunities();
    return () => controller.abort();
  }, []);

  const sectorsData = useMemo(() => {
    const map = {};
    opportunities.forEach((o) => {
      const sec = o.sector || "Other Sectors";
      if (!map[sec]) map[sec] = [];
      map[sec].push(o);
    });
    return Object.entries(map).map(([name, items]) => ({
      name,
      count: items.length,
      items,
    })).sort((a, b) => b.count - a.count);
  }, [opportunities]);

  const filteredShares = useMemo(() => {
    if (!selectedSector) return [];
    const found = sectorsData.find((s) => s.name.toLowerCase() === selectedSector.toLowerCase());
    return found ? found.items : [];
  }, [selectedSector, sectorsData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus({ kind: "", text: "" });
    try {
      setIsSubmitting(true);
      const response = await fetch(`${API_BASE}/unlisted/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload?.error || "Unable to submit inquiry");
      setForm({ fullName: "", mobileNumber: "", email: "", interestedCompany: "", investmentAmount: "", message: "" });
      setSubmitStatus({
        kind: "success",
        text: payload?.message || "Inquiry submitted successfully. Our team will get back to you soon.",
      });
    } catch (error) {
      setSubmitStatus({ kind: "error", text: error.message || "Unable to submit inquiry" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] px-4 py-3 text-sm text-slate-700 dark:text-slate-200 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/25";

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#001233]/50 pb-20 pt-10">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Navigation / Header */}
        <div className="mb-10">
          {selectedSector ? (
            <button
              onClick={() => setSearchParams({})}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0353a4] hover:text-[#023e7d] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to all sectors
            </button>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0353a4] hover:text-[#023e7d] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          )}
        </div>

        {/* Hero Section */}
        <div className="mb-14 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-[#0466c8]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0466c8] mb-4">
              {selectedSector ? "SECTOR PROFILE" : "EXPLORE BY INDUSTRY"}
            </span>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-[#0353a4] to-slate-800 dark:from-white dark:via-[#0466c8] dark:to-slate-300 drop-shadow-sm pb-2">
              {selectedSector ? selectedSector : "Industries Driving India's Growth"}
            </h1>
            <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
              {selectedSector
                ? `Browse unlisted and pre-IPO shares categorized under the ${selectedSector} industry. Discover the next big opportunity.`
                : "Discover Unlisted & Pre-IPO companies across India's fastest-growing sectors. Explore investment opportunities by industry and identify businesses shaping tomorrow's economy."}
            </p>
          </motion.div>
        </div>

        {/* Page Content */}
        {selectedSector ? (
          <div>
            {filteredShares.length > 0 ? (
              <div className="grid min-w-0 gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 [perspective:1000px]">
                {filteredShares.map((item, index) => {
                  const Icon = getSectorIcon(item.sector);
                  return (
                  <MotionArticle
                    key={item.code || index}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={{
                      hidden: { opacity: 0, rotateY: -30, x: -30, scale: 0.9 },
                      visible: { opacity: 1, rotateY: 0, x: 0, scale: 1, transition: { type: "spring", stiffness: 150, damping: 15, delay: index * 0.05 } },
                      hover: { y: -8, scale: 1.02, transition: { duration: 0.3 } }
                    }}
                    className="group relative flex min-w-0 flex-col rounded-[28px] border border-white/50 dark:border-white/10 bg-gradient-to-br from-white/80 to-white/30 dark:from-[#001845]/80 dark:to-[#001845]/30 p-5 shadow-[0_10px_30px_rgba(2,62,125,0.03)] backdrop-blur-xl hover:shadow-[0_20px_50px_rgba(4,102,200,0.15)] transition-shadow hover:border-[#0466c8]/50 overflow-hidden"
                  >
                    {/* Animated diagonal shine effect */}
                    <motion.div 
                      variants={{
                        hidden: { x: "-150%", skewX: -25 },
                        visible: { x: "-150%", skewX: -25 },
                        hover: { x: "150%", transition: { duration: 1, ease: "easeOut" } }
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-20"
                    />

                    <div className="flex items-start gap-4 min-w-0 relative z-10">
                      <div className="relative h-14 w-14 shrink-0 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001233] shadow-md flex items-center justify-center overflow-hidden p-2 group-hover:scale-105 transition-transform duration-500">
                        {item.logoUrl ? (
                          <img src={item.logoUrl} alt={item.company} className="h-full w-full object-contain" />
                        ) : (
                          <Icon className="h-6 w-6 text-[#0466c8]" />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0 flex-1 pt-1">
                        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-tight group-hover:text-[#0353a4] transition-colors">
                          {item.company}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          <Icon className="h-3 w-3" />
                          <span className="line-clamp-1">{item.sector}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-white/5 flex items-end justify-between relative z-10">
                      <div className="flex flex-col">
                        <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-[#0353a4] dark:from-white dark:to-[#0466c8]">
                          {item.price}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#0466c8] mt-0.5 opacity-80">
                          Indicative Price
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="rounded-full bg-gradient-to-r from-[#0353a4]/10 to-[#0466c8]/10 px-3 py-1.5 text-[10px] font-extrabold text-[#0353a4] shadow-inner">
                          {item.faceValue && item.faceValue !== "Upload face value" ? `FV ${item.faceValue}` : "15D"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-3 relative z-10">
                      <button
                        onClick={() => {
                          setSelectedCompany(item.company);
                          setIsWhatsAppModalOpen(true);
                        }}
                        className="flex-1 py-2.5 text-center text-xs font-bold text-white bg-gradient-to-r from-[#0353a4] to-[#0466c8] hover:shadow-[0_8px_20px_rgba(4,102,200,0.3)] rounded-xl transition-shadow"
                      >
                        Enquire Now
                      </button>
                      <Link
                        to={getDetailPath(item)}
                        className="px-5 py-2.5 text-center text-xs font-bold text-[#0353a4] bg-[#0466c8]/5 hover:bg-[#0466c8]/10 hover:shadow-inner rounded-xl transition-colors border border-[#0466c8]/10"
                      >
                        Details
                      </Link>
                      <ShareButton link={getDetailPath(item)} className="p-2.5 hover:bg-[#0466c8]/5 rounded-xl transition-colors border border-transparent hover:border-[#0466c8]/10 text-slate-400 hover:text-[#0466c8]" />
                    </div>
                  </MotionArticle>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 rounded-[24px] border border-dashed border-slate-300 bg-white">
                <p className="text-slate-500 dark:text-slate-400">No unlisted shares found in this sector.</p>
              </div>
            )}

            {/* In-page Inquiry Form for Sector Shares */}
            <div id="inquiry-form" className="mt-16 max-w-2xl mx-auto rounded-[30px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-7 shadow-lg md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0353a4]">
                Inquiry Form
              </p>
              <h2 className="mt-3 text-2xl font-bold text-slate-800 dark:text-slate-100">
                Tell Us Your Interest
              </h2>
              {submitStatus.text && (
                <div className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${submitStatus.kind === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}>
                  {submitStatus.text}
                </div>
              )}
              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input name="fullName" type="text" required value={form.fullName} onChange={handleChange} className={inputBase} placeholder="Full Name" />
                  <input name="mobileNumber" type="tel" required value={form.mobileNumber} onChange={handleChange} className={inputBase} placeholder="Mobile Number" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <input name="email" type="email" required value={form.email} onChange={handleChange} className={inputBase} placeholder="Email" />
                  <input name="interestedCompany" type="text" value={form.interestedCompany} onChange={handleChange} className={inputBase} placeholder="Interested Company" />
                </div>
                <input name="investmentAmount" type="text" value={form.investmentAmount} onChange={handleChange} className={inputBase} placeholder="Investment Amount" />
                <textarea name="message" rows={4} value={form.message} onChange={handleChange} className={`${inputBase} resize-none`} placeholder="Message" />
                <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0353a4] hover:bg-[#023e7d] px-5 py-3 text-sm font-bold text-white shadow-md disabled:opacity-75">
                  Submit Inquiry
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 [perspective:1000px]">
            {sectorsData.map((sec, index) => {
              const Icon = getSectorIcon(sec.name);
              return (
              <motion.div
                key={sec.name}
                onClick={() => setSearchParams({ sector: sec.name })}
                initial={{ opacity: 0, rotateX: 30, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group cursor-pointer relative rounded-[28px] bg-gradient-to-br from-white/60 to-white/10 dark:from-[#001845]/60 dark:to-[#001845]/10 p-6 shadow-[0_8px_32px_rgba(0,18,51,0.04)] backdrop-blur-xl border border-white/40 dark:border-white/10 hover:shadow-[0_24px_48px_rgba(4,102,200,0.12)] hover:border-[#0466c8]/50 transition-all duration-300 flex flex-col items-start overflow-hidden"
              >
                {/* Animated glowing orb behind icon */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#0466c8]/20 to-emerald-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0466c8]/10 to-[#023e7d]/10 text-[#0353a4] mb-4 group-hover:bg-[#0466c8] group-hover:text-white transition-colors duration-500 shadow-inner group-hover:shadow-[0_8px_16px_rgba(4,102,200,0.4)]">
                  <Icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" />
                </div>
                
                <div className="relative z-10 w-full mt-2">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-[#0353a4] transition-colors duration-300">
                    {sec.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {sec.count} {sec.count === 1 ? "opportunity" : "opportunities"}
                      </p>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-[#0466c8]/10">
                      <ArrowRight className="h-4 w-4 text-[#0466c8]" />
                    </div>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
        )}

        <WhatsAppModal 
          isOpen={isWhatsAppModalOpen} 
          onClose={() => setIsWhatsAppModalOpen(false)} 
          companyName={selectedCompany} 
        />
      </div>
    </div>
  );
};

export default SectorsPage;
