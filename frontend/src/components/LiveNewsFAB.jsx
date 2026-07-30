import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, ExternalLink, ChevronRight, Loader2 } from "lucide-react";
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

const FloatingWidgets = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadLiveNews();
    }
  }, [isOpen]);

  const loadLiveNews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/live-news`);
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.data) {
        setNewsItems(json.data);
      }
    } catch (error) {
      console.error("Failed to load live news:", error);
    } finally {
      setLoading(false);
    }
  };

  const whatsappLink = "https://wa.me/919216180043";

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors"
          title="Chat with us on WhatsApp"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </motion.a>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors ${
            isOpen ? "bg-slate-800 text-white" : "bg-[#0466c8] text-white hover:bg-[#0353a4]"
          }`}
          title="Live Market News"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 -mr-1 -mt-1 flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500 border-2 border-white"></span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-20 right-0 w-[340px] origin-bottom-right rounded-2xl bg-white shadow-2xl ring-1 ring-slate-100 sm:w-[380px] overflow-hidden flex flex-col max-h-[600px]"
            >
              <div className="bg-gradient-to-r from-[#023e7d] to-[#0466c8] p-5 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">Live Market News</h3>
                    <p className="text-xs text-white/80">Stay updated with latest trends</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-2 bg-slate-50/50">
                {loading ? (
                  <div className="flex flex-col items-center justify-center p-8 text-slate-500">
                    <Loader2 className="h-8 w-8 animate-spin text-[#0466c8] mb-3" />
                    <p className="text-sm">Fetching latest news...</p>
                  </div>
                ) : newsItems.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {newsItems.map((news, idx) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={news.id || news._id}
                        className="group flex flex-col rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100 hover:shadow-md transition-all"
                      >
                        <h4 className="font-bold text-slate-800 leading-tight mb-1">{news.title}</h4>
                        <p className="text-sm text-slate-600 mb-3">{news.content}</p>
                        <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-3">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                            {new Date(news.createdAt).toLocaleDateString()}
                          </span>
                          {news.referenceUrl && (
                            <a
                              href={news.referenceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0466c8] hover:text-[#023e7d] group-hover:underline"
                            >
                              Read More
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="mb-3 rounded-full bg-slate-100 p-3">
                      <Bell className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-600">No active news</p>
                    <p className="mt-1 text-xs text-slate-400">Check back later for updates</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FloatingWidgets;
