import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BadgeIndianRupee,
  Building2,
  CheckCircle2,
  FileText,
  Landmark,
  ShieldAlert,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

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

const UnlistedShareDetailPage = () => {
  const { code, slug } = useParams();
  const [opportunities, setOpportunities] = useState(fallbackOpportunities);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadShare = async () => {
      try {
        const response = await fetch(`${API_BASE}/unlisted/opportunities`, {
          signal: controller.signal,
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

    loadShare();

    return () => controller.abort();
  }, []);

  const share = opportunities.find((item) => {
    const itemCode = createSlug(item.code || item.company);
    const itemSlug = createSlug(item.slug || item.company);
    return itemCode === createSlug(code) && itemSlug === createSlug(slug);
  });

  const fundamentals = share ?
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

  if (!share && !isLoading) {
    return (
      <main className="min-h-screen bg-[#F7FEFC] px-5 py-20">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-[#D7ECE7] bg-white p-8 text-center shadow-[0_14px_38px_rgba(16,95,104,0.08)]">
          <h1 className="text-3xl font-bold text-slate-800">
            Share not found
          </h1>
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

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
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

            <aside className="rounded-[32px] border border-[#CBE7E1] bg-gradient-to-br from-[#105F68] to-[#0A7F73] p-7 text-white shadow-[0_18px_42px_rgba(16,95,104,0.18)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                Quick Inquiry
              </p>
              <h2 className="mt-3 text-2xl font-black">Check availability</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/78">
                Our team will confirm availability, indicative price, and
                documentation steps before any transaction.
              </p>
              <a
                href={`https://wa.me/919216180043?text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-[#105F68]"
              >
                Connect on WhatsApp
              </a>
              <a
                href="#unlisted-share-details"
                className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-white/30 px-5 py-3 text-sm font-bold text-white"
              >
                View fundamentals
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section id="unlisted-share-details" className="relative px-5 pb-16 md:px-8">
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
                    {(strengths.length ? strengths : ["Upload strengths separated by | in the sheet."]).map((item) => (
                      <p key={item} className="flex gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-amber-700">Risks</p>
                  <div className="mt-3 space-y-2">
                    {(weaknesses.length ? weaknesses : ["Upload weaknesses separated by | in the sheet."]).map((item) => (
                      <p key={item} className="flex gap-2 text-sm text-slate-600">
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
