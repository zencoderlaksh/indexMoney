import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, Sun, Moon } from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import { useThemeStore } from "../stores/themeStore";
import { IMAGES } from "../constants/images";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/unlisted-shares", label: "Unlisted Shares" },
  { to: "/sectors", label: "Sectors" },
  { to: "/drhp-filed", label: "DRHP Filed" },
  { to: "/learn", label: "Learn" },
  { to: "/research", label: "Research" },
  { to: "/media", label: "Media" },
];

const moreLinks = [
  // { label: "Blogs", to: "/blogs" },
  // { label: "Gallery", to: "/gallery" },
  // { label: "Career", to: "/career" },
];

/* ── Animated underline nav link ────────────────────────────────────────────── */
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative group py-1 text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium"
  >
    {children}
    <motion.span
      className="absolute bottom-0 left-0 h-[2px] rounded-full bg-white origin-left"
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{ width: "100%" }}
    />
  </Link>
);

/* ── Header ─────────────────────────────────────────────────────────────────── */
const Header = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = Boolean(user && token);
  const isAdmin = Boolean(user?.isAdmin);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/", { replace: true });
  };

  const openDematForm = () => {
    setMobileOpen(false);
    navigate("/signup");
  };

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ?
            "bg-[#001233] shadow-lg shadow-[#001233]/40 border-b border-white/10"
          : "bg-[#001233] border-b border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center group flex-shrink-0"
          >
            <motion.img
              src={IMAGES.logo}
              alt="Index Money"
              className="h-12 w-36 object-contain object-left brightness-0 invert"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to}>
                {l.label}
              </NavLink>
            ))}

            {/* More dropdown - Hidden because all items are commented out */}
            {/* 
            <div className="relative" onMouseLeave={() => setMoreOpen(false)}>
              <button
                onMouseEnter={() => setMoreOpen(true)}
                className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#0353a4] transition-colors duration-200 py-1"
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
                        className="block px-4 py-2 text-sm text-slate-600 hover:text-[#0353a4] hover:bg-slate-100 transition-colors duration-150"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            */}
          </nav>

          {/* CTA buttons — desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                {isAdmin ? (
                  <motion.button
                    onClick={() => navigate("/admin")}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="text-sm font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/10 px-4 py-2 rounded-xl transition-colors duration-200"
                  >
                    Admin Dashboard
                  </motion.button>
                ) : null}
                <motion.button
                  onClick={() => navigate("/dashboard")}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-sm font-semibold text-[#0353a4] bg-white border border-white/20 hover:bg-slate-100 px-4 py-2 rounded-xl transition-colors duration-200"
                >
                  Dashboard
                </motion.button>
                <motion.button
                  onClick={handleLogout}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 6px 20px rgba(3,83,164,0.2)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-1.5 text-sm font-semibold text-white bg-gradient-to-r from-[#0466c8] to-[#0353a4] px-4 py-2 rounded-xl shadow-sm transition-all duration-200"
                >
                  Logout <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  onClick={openDematForm}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-sm font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/10 px-4 py-2 rounded-xl transition-colors duration-200"
                >
                  Open Free Demat
                </motion.button>
              </>
            )}

            {/* Theme Toggle — Desktop */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl text-slate-300 hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5 text-amber-400" />}
            </motion.button>
          </div>

          {/* Theme Toggle — Mobile shortcut (visible next to hamburger) */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.93 }}
              className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-300 hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5 text-amber-400" />}
            </motion.button>

            {/* Mobile hamburger */}
            <motion.button
              className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-300 hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(true)}
              whileTap={{ scale: 0.93 }}
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </div>
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
              <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 dark:border-white/10 bg-white dark:bg-[#001845]">
                <img
                  src={IMAGES.logo}
                  alt="Index Money"
                  className="h-11 w-32 object-contain object-left dark:brightness-0 dark:invert"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="flex flex-col px-4 py-4 gap-1 flex-1 overflow-y-auto bg-white dark:bg-[#001845]">
                {[...navLinks, ...moreLinks].filter(l => l.label === "Home" || l.label === "Unlisted Shares" || l.label === "Sectors" || l.label === "DRHP Filed" || l.label === "Learn" || l.label === "Research" || l.label === "Media").map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#0353a4] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-colors duration-150"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-slate-100 dark:border-white/10 flex flex-col gap-3 bg-white dark:bg-[#001845]">
                {isLoggedIn ? (
                  <>
                    {isAdmin ? (
                      <button
                        onClick={() => {
                          navigate("/admin");
                          setMobileOpen(false);
                        }}
                        className="w-full py-2.5 text-sm font-semibold text-[#0353a4] dark:text-white border border-[#7d8597] dark:border-white/20 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors duration-200"
                      >
                        Admin Dashboard
                      </button>
                    ) : null}
                    <button
                      onClick={() => {
                        navigate("/dashboard");
                        setMobileOpen(false);
                      }}
                      className="w-full py-2.5 text-sm font-semibold text-[#0353a4] dark:text-white border border-[#7d8597] dark:border-white/20 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors duration-200"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#0466c8] to-[#0353a4] rounded-xl"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={openDematForm}
                      className="w-full py-2.5 text-sm font-semibold text-[#0353a4] dark:text-white border border-[#7d8597] dark:border-white/20 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors duration-200"
                    >
                      Open Free Demat
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
