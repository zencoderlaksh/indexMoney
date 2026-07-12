import React, { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Boxes, ArrowRight, ArrowLeft, Send } from "lucide-react";
import WhatsAppModal from "../../components/WhatsAppModal";

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
        <div className="mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0466c8]">
            {selectedSector ? "SECTOR PROFILE" : "EXPLORE BY INDUSTRY"}
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-800 dark:text-slate-100 sm:text-4xl">
            {selectedSector ? selectedSector : "Industries Driving India's Growth"}
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            {selectedSector
              ? `Browse unlisted and pre-IPO shares categorized under the ${selectedSector} industry.`
              : "Discover Unlisted & Pre-IPO companies across India's fastest-growing sectors. Explore investment opportunities by industry and identify businesses shaping tomorrow's economy."}
          </p>
        </div>

        {/* Page Content */}
        {selectedSector ? (
          <div>
            {filteredShares.length > 0 ? (
              <div className="grid min-w-0 gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredShares.map((item, index) => (
                  <MotionArticle
                    key={item.code || index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="group flex min-w-0 flex-col rounded-[24px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-5 shadow-[0_10px_30px_rgba(2,62,125,0.02)] hover:shadow-[0_20px_40px_rgba(2,62,125,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0466c8]"
                  >
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
                  </MotionArticle>
                ))}
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
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sectorsData.map((sec, index) => (
              <motion.div
                key={sec.name}
                onClick={() => setSearchParams({ sector: sec.name })}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-5 shadow-[0_4px_12px_rgba(0,18,51,0.02)] hover:shadow-[0_16px_32px_rgba(0,18,51,0.06)] hover:border-[#0466c8] transition-all duration-300 flex items-center justify-between"
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
              </motion.div>
            ))}
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
