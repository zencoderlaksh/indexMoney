import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const createSlug = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const GlobalSearch = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100);
      fetchOpportunities();
    }
  }, [isOpen]);

  const fetchOpportunities = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/unlisted/opportunities`);
      if (response.ok) {
        const payload = await response.json();
        const rows = payload?.data?.opportunities || [];
        setOpportunities(rows);
      }
    } catch (error) {
      console.error("Failed to fetch opportunities for search", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = opportunities.filter((item) => {
    if (!searchQuery) return false;
    const query = searchQuery.toLowerCase();
    return (
      (item.company && item.company.toLowerCase().includes(query)) ||
      (item.code && item.code.toLowerCase().includes(query)) ||
      (item.sector && item.sector.toLowerCase().includes(query))
    );
  }).slice(0, 6); // Limit results to top 6

  const handleSelect = (item) => {
    const code = createSlug(item.code || item.company);
    const slug = createSlug(item.slug || item.company);
    onClose();
    navigate(`/unlisted-shares/${code}/${slug}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#001845] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10"
          >
            <div className="relative flex items-center px-4 py-4 border-b border-slate-100 dark:border-white/10">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search unlisted & pre-IPO shares..."
                className="flex-1 bg-transparent border-none outline-none px-4 text-lg text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
              />
              {isLoading && <Loader2 className="w-5 h-5 text-slate-400 animate-spin shrink-0 mr-2" />}
              <button
                onClick={onClose}
                className="flex items-center justify-center px-2 py-1 ml-2 text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-white/10 dark:text-slate-400 rounded-md hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {!searchQuery && !isLoading && (
                <div className="px-4 py-10 text-center text-slate-500 dark:text-slate-400">
                  <TrendingUp className="w-10 h-10 mx-auto mb-3 opacity-20" />
                  <p className="text-sm">Type to search by company name, symbol, or sector</p>
                </div>
              )}

              {searchQuery && filteredResults.length > 0 && (
                <ul className="space-y-1">
                  {filteredResults.map((item, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => handleSelect(item)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group text-left"
                      >
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#0353a4] dark:group-hover:text-blue-400 transition-colors">
                            {item.company}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {item.sector || "Unlisted Share"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-800 dark:text-slate-100">{item.price}</p>
                          {item.minimumInvestment && (
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Min: {item.minimumInvestment}</p>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {searchQuery && !isLoading && filteredResults.length === 0 && (
                <div className="px-4 py-10 text-center text-slate-500 dark:text-slate-400">
                  <p className="text-sm">No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GlobalSearch;
