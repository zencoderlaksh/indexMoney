import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, CheckCircle2, Circle } from "lucide-react";
import SignupForm from "../../components/auth/SignupForm";
import { useNavigate } from "react-router-dom";

/* ── Background decoration ─────────────────────────────────────────────────── */
const BgDecor = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-[#C8E6E2]/40 via-white to-[#9ED5D1]/30" />
    <div
      className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full opacity-25"
      style={{
        background: "radial-gradient(circle, #63C1BB 0%, transparent 70%)",
      }}
    />
    <div
      className="absolute -bottom-40 -right-40 w-[640px] h-[640px] rounded-full opacity-15"
      style={{
        background: "radial-gradient(circle, #3A9295 0%, transparent 70%)",
      }}
    />
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.03]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="#105F68"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

/* ── 3-step progress indicator ─────────────────────────────────────────────── */
const steps = ["Create Account", "Verify Email", "Start Trading"];

const ProgressSteps = ({ current = 0 }) => (
  <div className="flex items-center justify-center mt-5 mb-1 select-none">
    {steps.map((label, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center gap-1">
            <div
              className={`flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-300 ${
                done ? "bg-[#63C1BB] border-[#63C1BB]"
                : active ? "bg-white border-[#63C1BB]"
                : "bg-white border-white/40"
              }`}
            >
              {done ?
                <CheckCircle2
                  className="w-4 h-4 text-white"
                  strokeWidth={2.5}
                />
              : <Circle
                  className={`w-3 h-3 ${active ? "text-[#63C1BB]" : "text-white/40"}`}
                  strokeWidth={2.5}
                  fill={active ? "#63C1BB" : "none"}
                />
              }
            </div>
            <span
              className={`text-[10px] font-semibold tracking-wide ${active ? "text-white" : "text-white/50"}`}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-[2px] mx-2 mb-5 rounded-full transition-all duration-300 ${
                i < current ? "bg-[#63C1BB]" : "bg-white/20"
              }`}
              style={{ minWidth: 32 }}
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

/* ── SignupPage ─────────────────────────────────────────────────────────────── */
const SignupPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Redirect straight to dashboard after successful signup
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <BgDecor />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-[460px] bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-100 overflow-hidden"
      >
        {/* Brand strip */}
        <div className="bg-gradient-to-r from-[#105F68] to-[#3A9295] px-8 pt-6 pb-5 text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 group"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/15 border border-white/25">
              <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-white font-bold text-xl tracking-tight group-hover:opacity-90 transition-opacity">
              Index Money
            </span>
          </button>

          <p className="text-white font-semibold text-base mt-3 mb-0.5">
            Create your free account
          </p>
          <p className="text-white/60 text-xs">
            Join 5,000+ traders making smarter decisions
          </p>

          <ProgressSteps current={0} />
        </div>

        {/* Form body */}
        <div className="px-7 pt-5 pb-7">
          <SignupForm onSuccess={handleSuccess} />

          <p className="text-center text-xs text-slate-400 mt-6">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#3A9295] font-semibold hover:text-[#105F68] transition-colors"
            >
              Login
            </button>
          </p>

          <div className="flex items-center justify-center gap-1.5 mt-4">
            <ShieldCheck
              className="w-3.5 h-3.5 text-[#63C1BB]"
              strokeWidth={2}
            />
            <p className="text-[11px] text-slate-400">
              Your data is securely encrypted.
            </p>
          </div>
        </div>
      </motion.div>

      <button
        onClick={() => navigate("/")}
        className="mt-5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
      >
        ← Back to Index Money
      </button>
    </div>
  );
};

export default SignupPage;
