import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, SearchX } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const MotionArticle = motion.article;

const fallbackVideos = [
  {
    title: "Zepto IPO 2026: Should you buy at 40?",
    slug: "zepto-ipo-2026-should-you-buy-at-40",
    description: "Detailed analysis of Zepto's unlisted valuation, revenue growth, and potential listing gains for the 2026 IPO candidacy.",
    youtubeId: "dQw4w9WgXcQ",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    publishedAt: new Date().toISOString(),
  },
  {
    title: "How to Invest in Unlisted Shares: A Beginner's Guide",
    slug: "how-to-invest-in-unlisted-shares-beginners-guide",
    description: "Learn the step-by-step process of buying unlisted shares, transfer of equity to demat account, and mitigating risks.",
    youtubeId: "dQw4w9WgXcQ",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    publishedAt: new Date().toISOString(),
  },
];

const LearnPage = () => {
  const { slug } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/videos`);
        if (!response.ok) throw new Error("Failed to load video articles.");
        const payload = await response.json();
        if (payload?.data?.length) {
          setVideos(payload.data);
        } else {
          setVideos(fallbackVideos);
        }
      } catch {
        setVideos(fallbackVideos);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    if (slug && videos.length) {
      const found = videos.find((v) => v.slug === slug);
      setActiveVideo(found || null);
    } else {
      setActiveVideo(null);
    }
  }, [slug, videos]);

  if (slug) {
    return (
      <main className="bg-slate-50 dark:bg-[#001233] px-5 py-12 md:px-8 md:py-20 min-h-screen pt-24 md:pt-28">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/learn"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#023e7d] dark:text-[#0466c8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Videos
          </Link>

          {loading ? (
            <div className="rounded-[28px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-10 text-center text-slate-500">
              Loading video...
            </div>
          ) : !activeVideo ? (
            <div className="rounded-[28px] border border-amber-200 bg-white dark:bg-[#001845] p-10 text-center text-amber-700">
              Video not found.
            </div>
          ) : (
            <article>
              <header className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0353a4] dark:text-[#0466c8]">
                  VIDEO LEARNING
                </p>
                <h1 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-slate-100 md:text-5xl">
                  {activeVideo.title}
                </h1>
                <p className="mt-3 text-xs text-slate-400">
                  Published:{" "}
                  {new Date(activeVideo.publishedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </header>

              {/* Video Player */}
              <div className="overflow-hidden rounded-[28px] border border-slate-200 dark:border-white/10 bg-black shadow-lg aspect-video mb-8">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}`}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="rounded-[28px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                  About Video & Transcript Summary
                </h2>
                <p className="text-sm leading-8 text-slate-600 dark:text-slate-300 whitespace-pre-line">
                  {activeVideo.description}
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
          Learn & Guides
        </p>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-900 dark:text-slate-100 md:text-6xl">
          Video Knowledge Center
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
          Visual guides, Pre-IPO breakdowns, and updates from the private equity market.
        </p>
      </section>

      <section className="mx-auto max-w-7xl">
        {loading ? (
          <div className="rounded-[28px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-10 text-center text-slate-500">
            Loading video playlist...
          </div>
        ) : videos.length === 0 ? (
          <div className="rounded-[28px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] p-10 text-center">
            <SearchX className="mx-auto h-10 w-10 text-slate-300" />
            <h2 className="mt-4 text-xl font-bold text-slate-800 dark:text-slate-100">
              No videos available yet
            </h2>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <MotionArticle
                key={video.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden rounded-[24px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#001845] shadow-[0_10px_30px_rgba(2,62,125,0.02)] hover:shadow-[0_20px_40px_rgba(2,62,125,0.06)] hover:border-[#0466c8] transition-all duration-300 flex flex-col group cursor-pointer"
              >
                <Link to={`/learn/${video.slug}`} className="relative block aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center text-[#0353a4] shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-200">
                      <Play className="h-5 w-5 fill-current" />
                    </div>
                  </div>
                </Link>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-[10px] font-bold text-[#0466c8] uppercase tracking-widest">
                    Video Guide
                  </span>
                  <h3 className="mt-3 text-lg font-bold leading-tight text-slate-800 dark:text-slate-100 line-clamp-2 hover:text-[#0353a4] transition-colors">
                    <Link to={`/learn/${video.slug}`}>{video.title}</Link>
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400 flex-1">
                    {video.description}
                  </p>
                  <Link
                    to={`/learn/${video.slug}`}
                    className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#023e7d] dark:text-[#0466c8]"
                  >
                    Watch Now <ArrowLeft className="h-3 w-3 rotate-180" />
                  </Link>
                </div>
              </MotionArticle>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default LearnPage;
