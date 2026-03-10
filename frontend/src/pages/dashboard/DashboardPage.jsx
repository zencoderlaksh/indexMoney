import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  LogOut,
  User,
  Mail,
  Globe,
  MapPin,
  BarChart2,
  TrendingDown,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

/* ── Stat card ──────────────────────────────────────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, sub, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white rounded-2xl shadow-sm border border-slate-100 px-5 py-4 flex items-center gap-4"
  >
    <span
      className="flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0"
      style={{ backgroundColor: `${color}18` }}
    >
      <Icon className="w-5 h-5" style={{ color }} strokeWidth={2} />
    </span>
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-lg font-bold text-slate-800 leading-snug">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  </motion.div>
);

/* ── Info row ───────────────────────────────────────────────────────────────── */
const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0">
    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#C8E6E2]/40 flex-shrink-0">
      <Icon className="w-4 h-4 text-[#3A9295]" strokeWidth={2} />
    </span>
    <div>
      <p className="text-xs text-slate-400 font-medium">{label}</p>
      <p className="text-sm font-semibold text-slate-700">{value || "—"}</p>
    </div>
  </div>
);

/* ── DashboardPage ──────────────────────────────────────────────────────────── */
const DashboardPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  React.useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C8E6E2]/20 via-white to-[#9ED5D1]/15">
      {/* ── Top nav bar ── */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 border-b border-slate-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 group"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#105F68] to-[#3A9295]">
              <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
            </span>
            <span className="font-bold text-slate-800 text-sm tracking-tight">
              Index Money
            </span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#63C1BB]" />
              Logged in as{" "}
              <strong className="text-slate-700">
                {user.fullName || user.email}
              </strong>
            </span>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.04, backgroundColor: "#105F68" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 bg-[#3A9295] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors duration-200 shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" strokeWidth={2.5} />
              Logout
            </motion.button>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <main className="max-w-5xl mx-auto px-5 py-10">
        {/* Welcome banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative bg-gradient-to-r from-[#105F68] to-[#3A9295] rounded-2xl px-8 py-7 mb-8 overflow-hidden shadow-lg shadow-[#105F68]/20"
        >
          {/* Decorative chart lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
            viewBox="0 0 700 140"
            preserveAspectRatio="none"
          >
            <polyline
              points="0,110 120,80 240,95 360,50 480,30 600,15 700,5"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <polyline
              points="0,130 120,110 240,120 360,80 480,60 600,50 700,35"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="5 4"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
                Dashboard
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                Welcome back,{" "}
                <span className="text-[#9ED5D1]">
                  {user.fullName || "Trader"}
                </span>{" "}
                👋
              </h1>
              <p className="text-white/60 text-sm mt-1.5">
                Here's a snapshot of your trading profile.
              </p>
            </div>
            <motion.button
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex-shrink-0 flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors duration-200"
            >
              Explore Market <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon={BarChart2}
            label="Portfolio"
            value="Active"
            sub="Ready to track"
            color="#3A9295"
            delay={0.1}
          />
          <StatCard
            icon={TrendingUp}
            label="Win Rate"
            value="96%"
            sub="Historical avg"
            color="#63C1BB"
            delay={0.18}
          />
          <StatCard
            icon={TrendingDown}
            label="Max Drawdown"
            value="4%"
            sub="Controlled risk"
            color="#105F68"
            delay={0.26}
          />
        </div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#63C1BB] to-[#3A9295]">
              <User className="w-5 h-5 text-white" strokeWidth={2} />
            </span>
            <div>
              <p className="font-bold text-slate-800 text-sm">
                Account Profile
              </p>
              <p className="text-xs text-slate-400">
                Your registered information
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-50">
            <InfoRow icon={User} label="Full Name" value={user.fullName} />
            <InfoRow icon={Mail} label="Email Address" value={user.email} />
            <InfoRow icon={Globe} label="Country" value={user.country} />
            <InfoRow icon={MapPin} label="City" value={user.city} />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;
