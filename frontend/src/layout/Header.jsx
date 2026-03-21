import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Menu, X, ChevronDown, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Unlisted Shares", to: "/unlisted-shares" },
  { label: "Services", to: "/services" },
  { label: "Past Performance", to: "/performance" },
  { label: "Pay Now", to: "/pay-now" },
  { label: "Contact", to: "/contact" },
];

const moreLinks = [
  { label: "Blogs", to: "/blogs" },
  { label: "Gallery", to: "/gallery" },
  { label: "Career", to: "/career" },
];

/* ── Animated underline nav link ────────────────────────────────────────────── */
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative group py-1 text-slate-600 hover:text-[#105F68] transition-colors duration-200 text-sm font-medium"
  >
    {children}
    <motion.span
      className="absolute bottom-0 left-0 h-[2px] rounded-full bg-[#63C1BB] origin-left"
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{ width: "100%" }}
    />
  </Link>
);

/* ── Header ─────────────────────────────────────────────────────────────────── */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ?
            "backdrop-blur-lg bg-white/90 shadow-md shadow-slate-200/60 border-b border-slate-100"
          : "backdrop-blur-md bg-white/70 border-b border-slate-100/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            <motion.span
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#105F68] to-[#3A9295] shadow-md"
            >
              <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
            </motion.span>
            <span className="font-bold text-lg tracking-tight text-slate-800">
              Index<span className="text-[#3A9295]">Money</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to}>
                {l.label}
              </NavLink>
            ))}

            {/* More dropdown */}
            <div className="relative" onMouseLeave={() => setMoreOpen(false)}>
              <button
                onMouseEnter={() => setMoreOpen(true)}
                className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#105F68] transition-colors duration-200 py-1"
              >
                More{" "}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-2 w-40 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-100 py-1.5 overflow-hidden"
                  >
                    {moreLinks.map((l) => (
                      <Link
                        key={l.to}
                        to={l.to}
                        className="block px-4 py-2 text-sm text-slate-600 hover:text-[#105F68] hover:bg-[#C8E6E2]/30 transition-colors duration-150"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* CTA buttons — desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="text-sm font-semibold text-[#105F68] border border-[#9ED5D1] hover:border-[#63C1BB] hover:bg-[#C8E6E2]/30 px-4 py-2 rounded-xl transition-colors duration-200"
            >
              Open Free Demat
            </motion.button>
            <motion.button
              onClick={() => navigate("/partner-with-us")}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 6px 20px rgba(58,146,149,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 text-sm font-semibold text-white bg-gradient-to-r from-[#3A9295] to-[#105F68] px-4 py-2 rounded-xl shadow-sm transition-all duration-200"
            >
              Partner with us <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors duration-150"
            onClick={() => setMobileOpen(true)}
            whileTap={{ scale: 0.93 }}
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white shadow-xl flex flex-col"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100">
                <span className="font-bold text-slate-800">
                  Index<span className="text-[#3A9295]">Money</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="flex flex-col px-4 py-4 gap-1 flex-1 overflow-y-auto">
                {[...navLinks, ...moreLinks].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-[#105F68] hover:bg-[#C8E6E2]/30 rounded-xl transition-colors duration-150"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-slate-100 flex flex-col gap-3">
                <button className="w-full py-2.5 text-sm font-semibold text-[#105F68] border border-[#9ED5D1] rounded-xl hover:bg-[#C8E6E2]/30 transition-colors duration-200">
                  Open Free Demat
                </button>
                <button
                  onClick={() => {
                    navigate("/partner-with-us");
                    setMobileOpen(false);
                  }}
                  className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#3A9295] to-[#105F68] rounded-xl"
                >
                  Partner with us
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
