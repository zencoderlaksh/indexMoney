import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, TrendingUp, CheckCircle2 } from "lucide-react";
import LoginForm from "../../components/auth/LoginForm";
import { useNavigate, useLocation } from "react-router-dom";

/* ── Background decoration ─────────────────────────────────────────────────── */
const BgDecor = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8E6E2]/40 via-white to-[#9ED5D1]/30" />
        <div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-25"
            style={{ background: "radial-gradient(circle, #63C1BB 0%, transparent 70%)" }}
        />
        <div
            className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #3A9295 0%, transparent 70%)" }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#105F68" strokeWidth="1" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    </div>
);

/* ── LoginPage ──────────────────────────────────────────────────────────────── */
const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Success msg passed via router state (from future flows if needed)
    const [successMsg, setSuccessMsg] = useState(location.state?.successMsg || "");
    useEffect(() => {
        if (!successMsg) return;
        const t = setTimeout(() => setSuccessMsg(""), 4000);
        return () => clearTimeout(t);
    }, [successMsg]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
            <BgDecor />

            <AnimatePresence>
                {successMsg && (
                    <motion.div
                        key="toast"
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#105F68] text-white text-sm font-medium px-5 py-3.5 rounded-2xl shadow-xl shadow-[#105F68]/25 max-w-sm w-full"
                    >
                        <CheckCircle2 className="w-5 h-5 text-[#9ED5D1] flex-shrink-0" />
                        {successMsg}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-100 overflow-hidden"
            >
                {/* Brand strip */}
                <div className="bg-gradient-to-r from-[#105F68] to-[#3A9295] px-8 py-6 text-center">
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
                        Welcome back
                    </p>
                    <p className="text-white/60 text-xs">
                        Sign in to access your trading dashboard
                    </p>
                </div>

                <div className="px-7 pt-6 pb-7">
                    <LoginForm />

                    <p className="text-center text-xs text-slate-400 mt-6">
                        Don't have an account?{" "}
                        <button
                            onClick={() => navigate("/signup")}
                            className="text-[#3A9295] font-semibold hover:text-[#105F68] transition-colors"
                        >
                            Sign Up
                        </button>
                    </p>

                    <div className="flex items-center justify-center gap-1.5 mt-4">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#63C1BB]" strokeWidth={2} />
                        <p className="text-[11px] text-slate-400">Your data is securely encrypted.</p>
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

export default LoginPage;
