import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sun, Moon, Search } from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import { useThemeStore } from "../stores/themeStore";
import { IMAGES } from "../constants/images";
import GlobalSearch from "../components/GlobalSearch";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/unlisted-shares", label: "Unlisted Shares" },
  { to: "/sectors", label: "Sectors" },
  { to: "/drhp-filed", label: "DRHP Filed" },
  { to: "/learn", label: "Learn" },
  { to: "/research", label: "Research" },
  { to: "/media", label: "Media" },
  { to: "/knowledge-center", label: "Blogs" },
];

const moreLinks = [];

/* ── Magnetic Component Wrapper ─────────────────────────────────────────────── */
const MagneticItem = ({ children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
};

/* ── Animated Nav Link with Hover Pill ──────────────────────────────────────── */
const NavLink = ({ to, children, isHovered, setHovered }) => {
  return (
    <Link
      to={to}
      onMouseEnter={() => setHovered(to)}
      className="relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 z-10 text-slate-300 hover:text-white"
    >
      {children}
      {isHovered === to && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 bg-white/10 rounded-full -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  );
};

/* ── Header ─────────────────────────────────────────────────────────────────── */
const Header = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = Boolean(user && token);
  const isAdmin = Boolean(user?.isAdmin);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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

  // Stagger variants for initial load
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 flex justify-center ${
          scrolled ? "px-4 py-3 bg-transparent" : "px-0 py-0 bg-[#001233] border-b border-white/10"
        }`}
      >
        <motion.div
          className={`w-full max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 border ${
            scrolled
              ? "bg-[#001233]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,18,51,0.3)] border-white/10 rounded-2xl px-5 h-16"
              : "bg-transparent border-transparent rounded-none px-5 md:px-8 h-24"
          }`}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex items-center justify-between w-full"
          >
            {/* Logo */}
            <motion.div variants={itemVariants}>
              <Link to="/" className="flex items-center group flex-shrink-0">
                <motion.img
                  src={IMAGES.logo}
                  alt="Index Money"
                  className={`h-auto object-contain object-left origin-left transition-all duration-300 ${
                    scrolled ? "w-32 md:w-36" : "w-40 md:w-48"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                />
              </Link>
            </motion.div>

            {/* Desktop nav */}
            <motion.nav 
              variants={itemVariants}
              className="hidden lg:flex items-center gap-2"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((l) => (
                <NavLink 
                  key={l.to} 
                  to={l.to} 
                  isHovered={hoveredLink} 
                  setHovered={setHoveredLink}
                >
                  {l.label}
                </NavLink>
              ))}
            </motion.nav>

            {/* CTA buttons — desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  {isAdmin && (
                    <motion.div variants={itemVariants}>
                      <motion.button
                        onClick={() => navigate("/admin")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-sm font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/10 px-4 py-2 rounded-full transition-colors duration-200"
                      >
                        Admin
                      </motion.button>
                    </motion.div>
                  )}
                  <motion.div variants={itemVariants}>
                    <motion.button
                      onClick={() => navigate("/dashboard")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm font-semibold text-[#0353a4] bg-white border border-white/20 hover:bg-slate-100 px-4 py-2 rounded-full transition-colors duration-200"
                    >
                      Dashboard
                    </motion.button>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <motion.button
                      onClick={handleLogout}
                      whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(3,83,164,0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 text-sm font-semibold text-white bg-gradient-to-r from-[#0466c8] to-[#0353a4] px-4 py-2 rounded-full shadow-sm transition-all duration-200"
                    >
                      Logout <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </motion.div>
                </>
              ) : (
                <motion.div variants={itemVariants}>
                  <MagneticItem>
                    <button
                      onClick={openDematForm}
                      className="text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2 rounded-full transition-colors duration-200 backdrop-blur-sm"
                    >
                      Get Started
                    </button>
                  </MagneticItem>
                </motion.div>
              )}

              {/* Search Toggle — Desktop */}
              <motion.div variants={itemVariants}>
                <MagneticItem>
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 ml-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Search"
                  >
                    <Search className="w-4.5 h-4.5" />
                  </button>
                </MagneticItem>
              </motion.div>

              {/* Theme Toggle — Desktop */}
              <motion.div variants={itemVariants}>
                <MagneticItem>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center overflow-hidden relative"
                    aria-label="Toggle theme"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={theme}
                        initial={{ y: -20, opacity: 0, rotate: -90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: 20, opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        {theme === "light" ? (
                          <Moon className="w-4.5 h-4.5" />
                        ) : (
                          <Sun className="w-4.5 h-4.5 text-amber-400" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </MagneticItem>
              </motion.div>
            </div>

            {/* Theme & Search Toggle — Mobile shortcut */}
            <div className="flex items-center gap-1 lg:hidden">
              <motion.button
                onClick={() => setSearchOpen(true)}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full text-slate-300 hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full text-slate-300 hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
              </motion.button>

              <motion.button
                className="p-2 rounded-full text-slate-300 hover:bg-white/10 transition-colors ml-1"
                onClick={() => setMobileOpen(true)}
                whileTap={{ scale: 0.9 }}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%", transition: { ease: "circIn", duration: 0.3 } }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-[320px] bg-white dark:bg-[#001233] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-24 border-b border-slate-100 dark:border-white/10">
                <motion.img
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  src={IMAGES.logo}
                  alt="Index Money"
                  className="w-36 h-auto object-contain object-left invert hue-rotate-180 dark:invert-0 dark:hue-rotate-0"
                />
                <motion.button
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <motion.nav 
                className="flex flex-col px-6 py-8 gap-3 flex-1 overflow-y-auto"
                variants={{
                  show: {
                    transition: { staggerChildren: 0.06, delayChildren: 0.1 }
                  },
                  hidden: {}
                }}
                initial="hidden"
                animate="show"
              >
                {[...navLinks, ...moreLinks].map((l) => (
                  <motion.div
                    key={l.to}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300 } }
                    }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setMobileOpen(false)}
                      className="block text-lg font-semibold text-slate-800 dark:text-slate-200 hover:text-[#0353a4] dark:hover:text-white py-2"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div 
                className="p-6 border-t border-slate-100 dark:border-white/10 flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {isLoggedIn ? (
                  <>
                    {isAdmin && (
                      <button
                        onClick={() => { navigate("/admin"); setMobileOpen(false); }}
                        className="w-full py-3 text-sm font-semibold text-[#0353a4] dark:text-white border border-slate-200 dark:border-white/20 rounded-full hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
                      >
                        Admin Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => { navigate("/dashboard"); setMobileOpen(false); }}
                      className="w-full py-3 text-sm font-semibold text-[#0353a4] dark:text-white border border-slate-200 dark:border-white/20 rounded-full hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#0466c8] to-[#0353a4] rounded-full shadow-md"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={openDematForm}
                    className="w-full py-3 text-sm font-semibold text-[#0353a4] dark:text-white border border-slate-200 dark:border-white/20 rounded-full hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
                  >
                    Get Started
                  </button>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
