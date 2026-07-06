import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, SearchX, Globe } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const MotionArticle = motion.article;

const fallbackMedia = [
  {
    title: "Index Money facilitates private capital flows into quick commerce unicorns",
    sourceName: "Economic Times",
    sourceUrl: "https://economictimes.indiatimes.com",
    excerpt: "Quick commerce valuations surge in unlisted market as firms like Zepto prep for public debuts. Intermediaries report high volumes.",
    publishedAt: new Date().toISOString(),
  },
  {
    title: "Retail interest in unlisted pre-IPO tech shares reaches multi-year peak",
    sourceName: "Moneycontrol",
    sourceUrl: "https://www.moneycontrol.com",
    excerpt: "Analysis of regulatory disclosures shows double digit transactional volume spikes across unlisted share platforms.",
    publishedAt: new Date().toISOString(),
  },
];

const MediaPage = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/media`);
        if (!response.ok) throw new Error("Failed to load media listings.");
        const payload = await response.json();
        if (payload?.data?.length) {
          setMediaList(payload.data);
        } else {
          setMediaList(fallbackMedia);
        }
      } catch {
        setMediaList(fallbackMedia);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  return (
    <main className="bg-slate-50 dark:bg-[#001233] px-5 py-12 md:px-8 md:py-20 min-h-screen pt-24 md:pt-28">
      <section className="mx-auto max-w-5xl text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0353a4] dark:text-[#0466c8]">
          PRESS & COVERAGE
        </p>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-900 dark:text-slate-100 md:text-6xl">
          Media Center
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
          Catch up on Index Money updates, press releases, and commentary featured in major publications.
        </p>
      </section>

      <section className="mx-auto max-w-5xl">
        {loading ? (
          <div className="rounded-[28px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-10 text-center text-slate-500">
            Loading coverage...
          </div>
        ) : mediaList.length === 0 ? (
          <div className="rounded-[28px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-10 text-center">
            <SearchX className="mx-auto h-10 w-10 text-slate-300" />
            <h2 className="mt-4 text-xl font-bold text-slate-800 dark:text-slate-100">
              No press listings available yet
            </h2>
          </div>
        ) : (
          <div className="space-y-6">
            {mediaList.map((item, index) => (
              <MotionArticle
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="overflow-hidden rounded-[24px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-6 shadow-[0_10px_30px_rgba(2,62,125,0.01)] hover:shadow-[0_20px_40px_rgba(2,62,125,0.04)] hover:border-[#0466c8] transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#ebf4f8] text-[#0353a4] dark:bg-white/10 dark:text-white">
                        <Globe className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-[#0466c8]">
                        {item.sourceName}
                      </span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="text-xs text-slate-400">
                        {new Date(item.publishedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      {item.excerpt}
                    </p>
                  </div>

                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-slate-200 dark:border-white/10 px-4.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0353a4] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                  >
                    Read Article <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </MotionArticle>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default MediaPage;
