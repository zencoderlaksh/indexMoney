import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeIndianRupee,
  Building2,
  Send,
  ShieldAlert,
  MessageCircle,
} from "lucide-react";

import WhatsAppModal from "../../components/WhatsAppModal";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

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

const inputBase =
  "w-full rounded-2xl border border-[#7d8597] dark:border-white/10 bg-white dark:bg-[#001233] px-4 py-3 text-sm text-slate-700 dark:text-slate-100 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/25";

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

const MotionArticle = motion.article;

const fallbackOpportunities = [
  { company: "Tata Technologies", sector: "Automotive Tech", price: "₹820", faceValue: "10", badge: "DRHP Filed" },
  { company: "Ola Electric", sector: "EV Manufacturer", price: "₹120", faceValue: "10", badge: "DRHP Filed" },
  { company: "FirstCry", sector: "E-Commerce", price: "₹450", faceValue: "2", badge: "DRHP Filed" },
  { company: "Unicommerce", sector: "SaaS Enterprise", price: "₹280", faceValue: "1", badge: "DRHP Filed" },
];

const DrhpFiledPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    interestedCompany: "",
    investmentAmount: "",
    message: "",
  });
  const [opportunities, setOpportunities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ kind: "", text: "" });
  
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");

  const whatsappLink = "https://wa.me/919216180043";

  useEffect(() => {
    const controller = new AbortController();

    const loadOpportunities = async () => {
      try {
        const response = await fetch(`${API_BASE}/unlisted/opportunities`, {
          signal: controller.signal,
        });
        if (!response.ok) return;
        const payload = await response.json();
        if (payload?.data?.opportunities?.length) {
          setOpportunities(payload.data.opportunities);
        } else {
          setOpportunities(fallbackOpportunities);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setOpportunities(fallbackOpportunities);
        }
      }
    };

    loadOpportunities();
    return () => controller.abort();
  }, []);

  // Filter DRHP filed opportunities
  const drhpOpportunities = useMemo(() => {
    const filtered = opportunities.filter(
      (o) =>
        (o.status && o.status.toLowerCase().includes("drhp")) ||
        (o.badge && o.badge.toLowerCase().includes("drhp")) ||
        (o.sector && o.sector.toLowerCase().includes("drhp"))
    );
    // If no records in database are tagged with DRHP, mock/fallback to showing some opportunities tagged with "DRHP Filed"
    if (filtered.length === 0 && opportunities.length > 0) {
      return opportunities.slice(0, 8).map((o) => ({
        ...o,
        badge: "DRHP Filed",
      }));
    }
    return filtered;
  }, [opportunities]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(drhpOpportunities.length / itemsPerPage);
  const displayedOpportunities = useMemo(() => {
    return drhpOpportunities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [drhpOpportunities, currentPage]);

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

      if (!response.ok) {
        throw new Error("Failed to submit inquiry.");
      }

      setForm({
        fullName: "",
        mobileNumber: "",
        email: "",
        interestedCompany: "",
        investmentAmount: "",
        message: "",
      });
      setSubmitStatus({
        kind: "success",
        text: "Your inquiry has been submitted. Our team will contact you shortly.",
      });
    } catch (error) {
      setSubmitStatus({
        kind: "error",
        text: error.message || "Unable to submit inquiry",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(4,102,200,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(3,83,164,0.10),transparent_34%)]" />

      {/* Catalog Header */}
      <section id="drhp-grid" className="relative px-3 pb-4 sm:px-5 md:px-8 pt-24 md:pt-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[22px] border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#001845]/90 shadow-[0_14px_38px_rgba(2,62,125,0.04)] backdrop-blur-sm sm:rounded-[30px]">
          
          <div className="border-b border-slate-100 dark:border-white/5 px-6 py-6 sm:px-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0466c8]">
                IPO WATCH
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-800 dark:text-slate-100 sm:text-3xl">
                DRHP Filed Companies
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                Check out the unlisted shares which have filed Draft Red Herring Prospectus (DRHP) with SEBI for their IPO.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#001233] px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              {drhpOpportunities.length} Companies Tracked
            </span>
          </div>

          {/* Catalog Grid */}
          <div className="grid min-w-0 gap-6 p-4 sm:p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" key={currentPage}>
            {displayedOpportunities.map((item, index) => {
              return (
                <MotionArticle
                  key={`${item.company}-${item.sector}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="group flex min-w-0 flex-col rounded-[24px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-5 shadow-[0_10px_30px_rgba(2,62,125,0.03)] hover:shadow-[0_20px_40px_rgba(2,62,125,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0466c8]"
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
                      {item.badge || (item.faceValue && item.faceValue !== "Upload face value" ? `FV ${item.faceValue}` : "DRHP Filed")}
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
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-slate-100 dark:border-white/5 py-6 flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  document.getElementById("drhp-grid")?.scrollIntoView({ behavior: "smooth" });
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
                    document.getElementById("drhp-grid")?.scrollIntoView({ behavior: "smooth" });
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
                  document.getElementById("drhp-grid")?.scrollIntoView({ behavior: "smooth" });
                }}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001233] hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 transition-colors"
              >
                Next
              </button>
            </div>
          )}

          <div className="border-t border-slate-100 dark:border-white/5 px-4 py-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:px-6 sm:text-sm">
            *Information is compiled from draft prospectuses and subject to change. Rates shown are indicative.
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section
        id="unlisted-inquiry-form"
        className="relative px-5 py-8 md:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_320px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-[30px] border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#001845]/90 shadow-[0_16px_42px_rgba(2,62,125,0.08)] backdrop-blur-sm md:p-8 p-7"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0353a4]">
              Inquiry Form
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-800 dark:text-slate-100">
              Tell Us Your Interest
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Share your requirement and our team will respond with available
              options, indicative pricing, and next steps.
            </p>

            {submitStatus.text ? (
              <div
                className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
                  submitStatus.kind === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
                }`}
              >
                {submitStatus.text}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="fullName"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  className={inputBase}
                  placeholder="Full Name"
                />
                <input
                  name="mobileNumber"
                  type="tel"
                  required
                  value={form.mobileNumber}
                  onChange={handleChange}
                  className={inputBase}
                  placeholder="Mobile Number"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={inputBase}
                  placeholder="Email"
                />
                <input
                  name="interestedCompany"
                  type="text"
                  value={form.interestedCompany}
                  onChange={handleChange}
                  className={inputBase}
                  placeholder="Interested Company"
                />
              </div>

              <input
                name="investmentAmount"
                type="text"
                value={form.investmentAmount}
                onChange={handleChange}
                className={inputBase}
                placeholder="Investment Amount"
              />

              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className={`${inputBase} resize-none`}
                placeholder="Message"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0353a4] to-[#023e7d] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_28px_rgba(3,83,164,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                Submit Inquiry
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-[30px] border border-[#0466c8] bg-gradient-to-br from-[#0353a4] to-[#023e7d] p-7 text-white shadow-[0_16px_42px_rgba(4,102,200,0.24)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <MessageCircle className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-2xl font-bold">WhatsApp Quick Connect</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Need faster coordination? Connect with our support team directly
              on WhatsApp for inquiry assistance.
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-[#023e7d]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="relative px-5 pb-16 pt-8 md:px-8 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-7xl rounded-[28px] border border-[#F2D6C8] dark:border-amber-500/20 bg-gradient-to-br from-white to-[#FFF6F1] dark:from-[#001845] dark:to-[#001845] p-7 shadow-[0_14px_38px_rgba(164,98,60,0.08)]"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#FFF0E8] dark:bg-white/5 text-[#C66B3D]">
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

      <WhatsAppModal 
        isOpen={isWhatsAppModalOpen} 
        onClose={() => setIsWhatsAppModalOpen(false)} 
        companyName={selectedCompany} 
      />
    </div>
  );
};

export default DrhpFiledPage;
