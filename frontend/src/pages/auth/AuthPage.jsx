import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, TrendingUp, CheckCircle2 } from "lucide-react";
import LoginForm from "../../components/auth/LoginForm";
import SignupForm from "../../components/auth/SignupForm";
import { useNavigate } from "react-router-dom";

/* ── Background decoration ───────────────────────────────────────────────────── */
const BackgroundDecor = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8E6E2]/40 via-white to-[#9ED5D1]/30" />
        <div
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #63C1BB 0%, transparent 70%)" }}
        />
        <div
            className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
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

/* ── Tab button ──────────────────────────────────────────────────────────────── */
const TabButton = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`relative flex-1 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 ${active ? "text-[#105F68]" : "text-slate-400 hover:text-slate-600"
            }`}
    >
        {active && (
            <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 bg-white rounded-xl shadow-sm"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
        )}
        <span className="relative z-10">{children}</span>
    </button>
);

/* ── Form slide variants ─────────────────────────────────────────────────────── */
const formVariants = {
    enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

/* ── AuthPage ────────────────────────────────────────────────────────────────── */
const AuthPage = () => {
    const [activeTab, setActiveTab] = useState("login");
    const [direction, setDirection] = useState(1);
    const [successMsg, setSuccessMsg] = useState(""); // toast message
    const navigate = useNavigate();

    const switchTab = (tab) => {
        if (tab === activeTab) return;
        setDirection(tab === "signup" ? 1 : -1);
        setActiveTab(tab);
        setSuccessMsg("");
    };

    /* Auto-dismiss toast after 4 seconds */
    useEffect(() => {
        if (!successMsg) return;
        const t = setTimeout(() => setSuccessMsg(""), 4000);
        return () => clearTimeout(t);
    }, [successMsg]);

    /* Called by SignupForm on successful registration */
    const handleSignupSuccess = (user) => {
        setSuccessMsg(`Account created for ${user.fullName}! Please log in.`);
        setDirection(-1);
        setActiveTab("login");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
            <BackgroundDecor />

            {/* Success toast */}
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

            {/* Auth card */}
            <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-[440px] bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 overflow-hidden"
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
                    <p className="text-white/65 text-xs mt-2">
                        {activeTab === "login"
                            ? "Welcome back — sign in to your account"
                            : "Create your free trading account today"}
                    </p>
                </div>

                <div className="px-7 pt-6 pb-8">
                    {/* Tabs */}
                    <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6">
                        <TabButton active={activeTab === "login"} onClick={() => switchTab("login")}>
                            Login
                        </TabButton>
                        <TabButton active={activeTab === "signup"} onClick={() => switchTab("signup")}>
                            Sign Up
                        </TabButton>
                    </div>

                    {/* Animated form */}
                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={activeTab}
                                custom={direction}
                                variants={formVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.28, ease: "easeInOut" }}
                            >
                                {activeTab === "login" ? (
                                    <LoginForm />
                                ) : (
                                    <SignupForm onSuccess={handleSignupSuccess} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Switch link */}
                    <p className="text-center text-xs text-slate-400 mt-6">
                        {activeTab === "login" ? (
                            <>
                                Don't have an account?{" "}
                                <button
                                    onClick={() => switchTab("signup")}
                                    className="text-[#3A9295] font-semibold hover:text-[#105F68] transition-colors"
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button
                                    onClick={() => switchTab("login")}
                                    className="text-[#3A9295] font-semibold hover:text-[#105F68] transition-colors"
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </p>

                    {/* Security note */}
                    <div className="flex items-center justify-center gap-1.5 mt-5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#63C1BB]" strokeWidth={2} />
                        <p className="text-[11px] text-slate-400">Your data is securely encrypted.</p>
                    </div>
                </div>
            </motion.div>

            {/* Back link */}
            <button
                onClick={() => navigate("/")}
                className="mt-6 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
                ← Back to Index Money
            </button>
        </div>
    );
};

export default AuthPage;
