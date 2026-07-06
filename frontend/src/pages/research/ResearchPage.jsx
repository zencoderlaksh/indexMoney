import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, SearchX, Download } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const MotionArticle = motion.article;

const fallbackResearch = [
  {
    title: "Zepto Valuation & Financial Analysis Report",
    slug: "zepto-valuation-financial-analysis-report",
    excerpt: "Comprehensive evaluation of Zepto's quick commerce business model, delivery economics, customer acquisition metrics, and pre-IPO pricing indices.",
    content: "This report covers quick commerce economics in India, specifically evaluating Zepto's H1 2026 trajectory. We analyze the dark store profitability metrics, typical basket sizes, logistics costs, and active monthly customer bases that substantiate their current private valuation indicators.",
    pdfUrl: "#",
    publishedAt: new Date().toISOString(),
  },
  {
    title: "India Private Equities & Unlisted Space H1 2026",
    slug: "india-private-equities-unlisted-space-h1-2026",
    excerpt: "A macro view of the private market ecosystem, listing candidate volumes, regulatory guidelines, and average valuation multiple shifts.",
    content: "During the first half of 2026, the Indian unlisted market experienced notable activity driven by technology candidates filing draft documents. This report details liquidity trends, major sector multiples, and transactional volumes observed across private platforms.",
    pdfUrl: "#",
    publishedAt: new Date().toISOString(),
  },
];

const ResearchPage = () => {
  const { slug } = useParams();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeReport, setActiveReport] = useState(null);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/research`);
        if (!response.ok) throw new Error("Failed to load research articles.");
        const payload = await response.json();
        if (payload?.data?.length) {
          setReports(payload.data);
        } else {
          setReports(fallbackResearch);
        }
      } catch {
        setReports(fallbackResearch);
      } finally {
        setLoading(false);
      }
    };
    fetchResearch();
  }, []);

  useEffect(() => {
    if (slug && reports.length) {
      const found = reports.find((r) => r.slug === slug);
      setActiveReport(found || null);
    } else {
      setActiveReport(null);
    }
  }, [slug, reports]);

  if (slug) {
    return (
      <main className="bg-slate-50 dark:bg-[#001233] px-5 py-12 md:px-8 md:py-20 min-h-screen pt-24 md:pt-28">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/research"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#023e7d] dark:text-[#0466c8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Research Reports
          </Link>

          {loading ? (
            <div className="rounded-[28px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-10 text-center text-slate-500">
              Loading report...
            </div>
          ) : !activeReport ? (
            <div className="rounded-[28px] border border-amber-200 bg-white dark:bg-[#001845] p-10 text-center text-amber-700">
              Report not found.
            </div>
          ) : (
            <article>
              <header className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0353a4] dark:text-[#0466c8]">
                  RESEARCH DESK
                </p>
                <h1 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-slate-100 md:text-5xl">
                  {activeReport.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs text-slate-400">
                    Published:{" "}
                    {new Date(activeReport.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  {activeReport.pdfUrl && (
                    <a
                      href={activeReport.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0353a4] hover:bg-[#023e7d] px-4.5 py-2 rounded-xl transition-all shadow-md"
                    >
                      <Download className="w-3.5 h-3.5" /> Download PDF Report
                    </a>
                  )}
                </div>
              </header>

              <div className="rounded-[28px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-6 md:p-10 leading-8 text-slate-700 dark:text-slate-300">
                <p className="whitespace-pre-line text-base leading-8">
                  {activeReport.content}
                </p>
              </div>
            </article>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 dark:bg-[#001233] px-5 py-12 md:px-8 md:py-20 min-h-screen pt-24 md:pt-28">
      <section className="mx-auto max-w-5xl text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0353a4] dark:text-[#0466c8]">
          REPORTS & DATA
        </p>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-900 dark:text-slate-100 md:text-6xl">
          Research Desk
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
          In-depth financial models, equity reports, and comprehensive valuation analysis on leading private companies.
        </p>
      </section>

      <section className="mx-auto max-w-7xl">
        {loading ? (
          <div className="rounded-[28px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-10 text-center text-slate-500">
            Loading reports...
          </div>
        ) : reports.length === 0 ? (
          <div className="rounded-[28px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-10 text-center">
            <SearchX className="mx-auto h-10 w-10 text-slate-300" />
            <h2 className="mt-4 text-xl font-bold text-slate-800 dark:text-slate-100">
              No reports published yet
            </h2>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {reports.map((report) => (
              <MotionArticle
                key={report.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden rounded-[24px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-6 shadow-[0_10px_30px_rgba(2,62,125,0.02)] hover:shadow-[0_20px_40px_rgba(2,62,125,0.06)] hover:border-[#0466c8] transition-all duration-300 flex flex-col group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ebf4f8] text-[#0353a4] dark:bg-white/15 dark:text-white">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#0466c8] uppercase tracking-widest">
                      Report
                    </span>
                    <h3 className="mt-2 text-lg font-bold leading-tight text-slate-800 dark:text-slate-100 line-clamp-2 hover:text-[#0353a4] transition-colors">
                      <Link to={`/research/${report.slug}`}>{report.title}</Link>
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {report.excerpt}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 dark:border-white/5 pt-4">
                      <span className="text-xs text-slate-400">
                        {new Date(report.publishedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <Link
                        to={`/research/${report.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#023e7d] dark:text-[#0466c8] hover:text-[#0353a4]"
                      >
                        Read Report <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                      </Link>
                    </div>
                  </div>
                </div>
              </MotionArticle>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default ResearchPage;
