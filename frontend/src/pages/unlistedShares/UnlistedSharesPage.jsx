import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeIndianRupee,
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

const bulletPoints = [
  "Pre-IPO Companies",
  "Private Limited Companies",
  "Growth Stage Businesses",
];

const serviceCards = [
  {
    icon: Building2,
    title: "Share Availability Assistance",
    description:
      "We help you discover live seller-side availability across select private market opportunities.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Transparent Indicative Pricing",
    description:
      "Indicative rates are shared clearly so you can evaluate opportunities with realistic expectations.",
  },
  {
    icon: FileCheck2,
    title: "Documentation Support",
    description:
      "From onboarding to transaction paperwork, we guide you through the required documentation flow.",
  },
  {
    icon: ClipboardCheck,
    title: "Transfer Coordination",
    description:
      "We coordinate the operational steps involved in completing eligible off-market share transfers.",
  },
];

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
  "w-full rounded-2xl border border-[#D7ECE7] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/25";

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

const getFundamentalPreview = (item) =>
  [
    { label: "Market Cap", value: item.marketCap },
    { label: "ISIN", value: item.isin },
    { label: "Face Value", value: item.faceValue },
  ].filter((detail) => detail.value);

const UnlistedSharesPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    interestedCompany: "",
    investmentAmount: "",
    message: "",
  });
  const [opportunities, setOpportunities] = useState(fallbackOpportunities);
  const [sheetMeta, setSheetMeta] = useState({
    title: "Indicative Opportunities Snapshot",
    sourceFileName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    kind: "",
    text: "",
  });

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
          setSheetMeta({
            title:
              latestUpload.title?.trim() || "Indicative Opportunities Snapshot",
            sourceFileName: latestUpload.sourceFileName || "",
          });
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

      if (!response.ok) {
        throw new Error(payload?.error || "Unable to submit inquiry");
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
        text:
          payload?.message ||
          "Inquiry submitted successfully. Our team will get back to you soon.",
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,230,226,0.42),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(158,213,209,0.20),transparent_34%)]" />

      <section className="relative px-5 pb-10 pt-14 md:px-8 md:pt-18">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#BEE3DC] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#105F68] shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Unlisted Shares
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.08 }}
            className="mt-5 text-4xl font-extrabold leading-tight text-slate-800 md:text-5xl lg:text-6xl"
          >
            Invest in Unlisted and{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #3A9295, #105F68)",
              }}
            >
              Pre-IPO Opportunities
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600"
          >
            Private Market Investment Assistance and Facilitation
          </motion.p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#unlisted-inquiry-form"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#3A9295] to-[#105F68] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_28px_rgba(58,146,149,0.22)]"
            >
              Submit Inquiry
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-2xl border border-[#9ED5D1] bg-white px-5 py-3 text-sm font-bold text-[#105F68] transition-colors duration-200 hover:bg-[#EAF8F4]"
            >
              Contact Now
            </Link>
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-4 md:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[30px] border border-[#CBE7E1] bg-white/90 shadow-[0_14px_38px_rgba(16,95,104,0.08)] backdrop-blur-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3A9295]">
              Available Opportunities
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-800">
              {sheetMeta.title}
            </h2>
            {sheetMeta.sourceFileName ?
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                Source file: {sheetMeta.sourceFileName}
              </p>
            : null}
          </div>

          <div className="grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">
            {opportunities.map((item, index) => {
              const whatsappText = encodeURIComponent(
                `Hi Index Money, I want to buy shares in ${item.company}. Please connect me.`,
              );
              const whatsappRowLink = `${whatsappLink}?text=${whatsappText}`;
              const fundamentals = getFundamentalPreview(item);

              return (
                <motion.article
                  key={`${item.company}-${item.sector}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="group flex min-h-[360px] flex-col rounded-[28px] border border-[#D7ECE7] bg-gradient-to-br from-white via-[#FBFEFD] to-[#EFFAF7] p-5 shadow-[0_14px_34px_rgba(16,95,104,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#91D8CD] hover:shadow-[0_20px_44px_rgba(16,95,104,0.14)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#CBE7E1] bg-white text-lg font-black text-[#105F68] shadow-sm">
                        {item.logoUrl ?
                          <img
                            src={item.logoUrl}
                            alt={`${item.company} logo`}
                            className="h-full w-full object-cover"
                          />
                        : getInitials(item.company)}
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3A9295]">
                          {item.sector}
                        </p>
                        <h3 className="mt-1 line-clamp-2 text-lg font-bold leading-snug text-slate-800">
                          {item.company}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                        item.status === "Available" ?
                          "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {item.badge || item.status}
                    </span>
                  </div>

                  {item.description ?
                    <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  : null}

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-[#E1F1EE] bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        Indicative Price
                      </p>
                      <p className="mt-2 text-xl font-black text-[#105F68]">
                        {item.price}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#E1F1EE] bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        Minimum
                      </p>
                      <p className="mt-2 text-sm font-bold text-slate-800">
                        {item.minimumInvestment}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 min-h-[92px] rounded-2xl bg-[#F4FBF9] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#3A9295]">
                      Fundamentals
                    </p>
                    {fundamentals.length ?
                      <div className="mt-3 space-y-2">
                        {fundamentals.map((detail) => (
                          <div
                            key={detail.label}
                            className="flex items-center justify-between gap-3 text-xs"
                          >
                            <span className="text-slate-500">
                              {detail.label}
                            </span>
                            <span className="max-w-[58%] truncate font-bold text-slate-800">
                              {detail.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    : <p className="mt-3 text-sm leading-relaxed text-slate-500">
                        Upload fundamentals columns to show market cap, ISIN,
                        face value and more.
                      </p>
                    }
                  </div>

                  <div className="mt-auto flex items-center gap-3 pt-5">
                    <Link
                      to={getDetailPath(item)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#3A9295] to-[#105F68] px-4 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(58,146,149,0.18)] transition duration-200 hover:-translate-y-0.5"
                    >
                      View details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href={whatsappRowLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Chat with Index Money about ${item.company} on WhatsApp`}
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#63C1BB] bg-[#EAF8F4] text-[#105F68] transition-colors duration-200 hover:bg-[#d4f0ea]"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
            *Prices and fundamentals are indicative and will be updated from the
            backend upload.
          </div>
        </div>
      </section>

      <section className="relative px-5 py-8 md:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="relative overflow-hidden rounded-[32px] border border-[#CBE7E1] bg-gradient-to-br from-[#F6FEFC] via-white to-[#E9F7F3] p-8 shadow-[0_18px_42px_rgba(16,95,104,0.08)]"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-52 w-52 rounded-full bg-[#C8E6E2]/45 blur-3xl" />
            <div className="relative">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#105F68] to-[#3A9295] text-white shadow-lg">
                <Landmark className="h-6 w-6" strokeWidth={2.1} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/80 bg-white/80 p-5 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3A9295]">
                    Private Market
                  </p>
                  <p className="mt-2 text-lg font-bold text-slate-800">
                    Access curated off-market opportunities
                  </p>
                </div>
                <div className="rounded-2xl border border-white/80 bg-white/80 p-5 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3A9295]">
                    Investor Support
                  </p>
                  <p className="mt-2 text-lg font-bold text-slate-800">
                    Coordinated assistance through each step
                  </p>
                </div>
              </div>
              <div className="mt-4 rounded-3xl border border-[#D9ECE8] bg-[#0F2830] p-6 text-white">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-[#8DD4CC]" />
                  <p className="text-sm font-semibold text-[#D7F4EE]">
                    Select private opportunities may become future public market
                    candidates.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3A9295]">
              What Are Unlisted Shares?
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-800 md:text-4xl">
              What Are Unlisted Shares?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
              Unlisted shares are equity shares of companies that are not traded
              on public stock exchanges. These may include pre-IPO businesses,
              private companies, and growth-stage firms where transactions
              typically happen through private market facilitation and
              off-market transfer processes.
            </p>

            <div className="mt-6 space-y-3">
              {bulletPoints.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF8F4] text-[#3A9295]">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <span className="font-medium text-slate-700">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 py-8 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3A9295]">
              Our Services
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-800 md:text-4xl">
              End-to-End Assistance for Private Market Transactions
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {serviceCards.map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-[28px] border border-[#CBE7E1] bg-white/85 p-6 shadow-[0_14px_38px_rgba(16,95,104,0.08)] backdrop-blur-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C8E6E2] to-[#63C1BB] text-[#105F68]">
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-8 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3A9295]">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-800 md:text-4xl">
              Simple Process, Guided Support
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
                className="rounded-[26px] border border-[#CBE7E1] bg-white/85 p-6 text-center shadow-[0_12px_34px_rgba(16,95,104,0.07)] backdrop-blur-sm"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3A9295] to-[#105F68] text-base font-bold text-white">
                  {index + 1}
                </div>
                <p className="mt-4 text-base font-semibold leading-relaxed text-slate-800">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="unlisted-inquiry-form"
        className="relative px-5 py-8 md:px-8"
      >
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_320px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-[30px] border border-[#CBE7E1] bg-white/90 p-7 shadow-[0_16px_42px_rgba(16,95,104,0.08)] backdrop-blur-sm md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3A9295]">
              Inquiry Form
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-800">
              Tell Us Your Interest
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Share your requirement and our team will respond with available
              options, indicative pricing, and next steps.
            </p>

            {submitStatus.text ?
              <div
                className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
                  submitStatus.kind === "success" ?
                    "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-amber-200 bg-amber-50 text-amber-700"
                }`}
              >
                {submitStatus.text}
              </div>
            : null}

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
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#3A9295] to-[#105F68] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_28px_rgba(58,146,149,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                Submit Inquiry
                <Send className="h-4 w-4" />
              </button>

              <p className="text-xs text-slate-500">
                This inquiry is now saved separately in MongoDB for the Unlisted
                Shares page.
              </p>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-[30px] border border-[#9FE2B3] bg-gradient-to-br from-[#1F905A] to-[#0E7A52] p-7 text-white shadow-[0_16px_42px_rgba(16,125,82,0.24)]"
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
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-[#107D52]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chat on WhatsApp
            </a>

            <div className="mt-6 rounded-2xl bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Support Window
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                Market days: 9:00 AM - 6:00 PM
              </p>
            </div>

            <div className="mt-4 rounded-2xl bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Best Use Case
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                Quick availability checks and next-step coordination
              </p>
            </div>
          </motion.div>
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
              <h2 className="text-2xl font-bold text-slate-800">Disclaimer</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
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
