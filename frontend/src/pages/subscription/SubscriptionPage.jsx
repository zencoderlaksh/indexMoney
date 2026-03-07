import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingUp, BarChart2, Activity, CheckCircle2, Zap, Shield, Clock,
    ChevronRight, CreditCard, Smartphone, Building2, Home, ArrowRight,
    User, Mail, Phone, Globe, MapPin, Sparkles, X, PartyPopper,
} from "lucide-react";

// ─── Shared features ──────────────────────────────────────────────────────────
const planFeatures = [
    { icon: Zap, text: "Technical analysis research" },
    { icon: Shield, text: "Entry, SL & target provided" },
    { icon: Clock, text: "Real-time market updates" },
    { icon: CheckCircle2, text: "Trade management guidance" },
];

// ─── Country/City helpers ─────────────────────────────────────────────────────
const countries = ["India", "USA", "UK", "Canada", "Australia", "Singapore", "UAE"];
const citiesByCountry = {
    India: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"],
    USA: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    UK: ["London", "Manchester", "Birmingham", "Glasgow", "Leeds"],
    Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    Singapore: ["Singapore City"],
    UAE: ["Dubai", "Abu Dhabi", "Sharjah"],
};

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
const Breadcrumb = () => (
    <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-8">
        <Link to="/" className="flex items-center gap-1 hover:text-[#105F68] transition-colors">
            <Home className="w-3 h-3" /> Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-400">Subscription</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#105F68] font-semibold">Checkout</span>
    </nav>
);

// ─── Plan Summary Card ────────────────────────────────────────────────────────
const PlanSummary = ({ plan }) => {
    const iconMap = { TrendingUp, BarChart2, Activity };
    const Icon = iconMap[plan.iconName] ?? TrendingUp;

    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="flex flex-col gap-6"
        >
            {/* Card */}
            <div
                className="rounded-2xl p-6 flex flex-col gap-5 shadow-xl"
                style={{ background: "linear-gradient(135deg, #105F68, #3A9295)" }}
            >
                {/* Icon + Name */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">Selected Plan</p>
                        <h3 className="text-white font-extrabold text-lg leading-tight">{plan.title}</h3>
                    </div>
                </div>

                {/* Price */}
                <div className="bg-white/10 rounded-xl p-4 flex items-baseline gap-1.5">
                    <span className="text-white text-3xl font-extrabold">{plan.price}</span>
                    <span className="text-white/60 text-sm">/ month</span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3">
                    {planFeatures.map(({ icon: FIcon, text }, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                                <FIcon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                            </span>
                            <span className="text-white/90 text-sm">{text}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Guarantee badge */}
            <div className="flex items-start gap-3 bg-[#C8E6E2]/50 border border-[#9ED5D1] rounded-xl p-4">
                <Shield className="w-5 h-5 text-[#105F68] mt-0.5 flex-shrink-0" strokeWidth={2} />
                <div>
                    <p className="text-[#105F68] font-bold text-sm">7-Day Money-Back Guarantee</p>
                    <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">Not satisfied? Get a full refund within 7 days — no questions asked.</p>
                </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
                {[
                    { val: "96%", label: "Accuracy Rate" },
                    { val: "10+", label: "Years Experience" },
                    { val: "5K+", label: "Active Subscribers" },
                    { val: "1–2", label: "Daily Calls" },
                ].map(({ val, label }) => (
                    <div key={label} className="bg-white border border-slate-100 rounded-xl p-3 text-center shadow-sm">
                        <p className="text-[#105F68] font-extrabold text-lg">{val}</p>
                        <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide mt-0.5">{label}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

// ─── Success Modal ─────────────────────────────────────────────────────────────
const SuccessModal = ({ plan, onClose }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => { navigate("/dashboard"); }, 3200);
        return () => clearTimeout(t);
    }, [navigate]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
        >
            <motion.div
                initial={{ scale: 0.75, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 340, damping: 28 }}
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center relative overflow-hidden"
            >
                {/* BG decoration */}
                <div
                    className="absolute -top-16 -right-16 w-40 h-40 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, #C8E6E2 0%, transparent 70%)" }}
                />
                <div
                    className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, #9ED5D1 0%, transparent 70%)" }}
                />

                {/* Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.15 }}
                    className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-5 relative"
                    style={{ background: "linear-gradient(135deg, #3A9295, #105F68)" }}
                >
                    <PartyPopper className="w-9 h-9 text-white" strokeWidth={2} />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl font-extrabold text-slate-800 mb-2"
                >
                    Subscription Activated!
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-500 text-sm mb-1"
                >
                    You're now subscribed to
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="text-[#105F68] font-bold text-base mb-5"
                >
                    {plan?.title}
                </motion.p>

                {/* Animated bar */}
                <div className="bg-slate-100 rounded-full h-1.5 overflow-hidden mb-5">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #63C1BB, #105F68)" }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3, ease: "linear" }}
                    />
                </div>

                <p className="text-slate-400 text-xs">Redirecting to dashboard…</p>
            </motion.div>
        </motion.div>
    );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────
const SubscriptionPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Plan from router state, with sensible fallback
    const plan = location.state?.plan ?? {
        title: "Bank Nifty Option Plan",
        price: "₹2,499",
        iconName: "BarChart2",
    };

    // Prefill from localStorage session
    const session = JSON.parse(localStorage.getItem("im_session") || "{}");

    const [form, setForm] = useState({
        fullName: session.fullName || "",
        email: session.email || "",
        mobile: session.mobileNumber || "",
        country: session.country || "India",
        city: session.city || "",
    });

    const cities = citiesByCountry[form.country] ?? [];
    const [paymentMethod, setPaymentMethod] = useState("upi");
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value, ...(name === "country" ? { city: "" } : {}) }));
        setErrors((p) => ({ ...p, [name]: "" }));
    };

    const validate = () => {
        const errs = {};
        if (!form.fullName.trim()) errs.fullName = "Full name is required";
        if (!form.email.trim()) errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
        if (!form.mobile.trim()) errs.mobile = "Mobile number is required";
        if (!form.country) errs.country = "Select a country";
        if (!form.city) errs.city = "Select a city";
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setSuccess(true);
        }, 1800);
    };

    const paymentMethods = [
        { id: "upi", icon: Smartphone, label: "UPI" },
        { id: "card", icon: CreditCard, label: "Credit / Debit Card" },
        { id: "netbank", icon: Building2, label: "Net Banking" },
    ];

    const inputBase =
        "w-full text-sm text-slate-700 bg-white border rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#63C1BB]/40 focus:border-[#63C1BB] placeholder-slate-400";
    const labelBase = "block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide";

    return (
        <>
            <AnimatePresence>
                {success && <SuccessModal plan={plan} onClose={() => setSuccess(false)} />}
            </AnimatePresence>

            <div className="min-h-screen bg-gradient-to-br from-[#C8E6E2]/20 via-white to-[#9ED5D1]/10">
                {/* ── Top bar ── */}
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
                    <div className="max-w-6xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-xl flex items-center justify-center"
                                style={{ background: "linear-gradient(135deg, #105F68, #3A9295)" }}>
                                <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
                            </span>
                            <span className="font-bold text-slate-800 text-sm">Index<span className="text-[#3A9295]">Money</span></span>
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-[#105F68] font-bold bg-[#C8E6E2]/60 border border-[#9ED5D1] px-3 py-1.5 rounded-full">
                            <Sparkles className="w-3.5 h-3.5" />
                            Secure Checkout
                        </div>
                    </div>
                </header>

                <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
                    <Breadcrumb />

                    <div className="mb-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45 }}
                            className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-1"
                        >
                            Complete Your Subscription
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-500 text-sm"
                        >
                            You're one step away from professional trading advisory.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">

                        {/* ── LEFT: Plan Summary ── */}
                        <PlanSummary plan={plan} />

                        {/* ── RIGHT: Form + Payment ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.1 }}
                            className="flex flex-col gap-6"
                        >
                            {/* User Info Form */}
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
                                    <h2 className="text-base font-extrabold text-slate-800 mb-5 flex items-center gap-2">
                                        <User className="w-4 h-4 text-[#3A9295]" /> Your Information
                                    </h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Full Name */}
                                        <div className="sm:col-span-2">
                                            <label className={labelBase}>Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    name="fullName" type="text" placeholder="John Doe"
                                                    value={form.fullName} onChange={handleChange}
                                                    className={`${inputBase} pl-10 ${errors.fullName ? "border-red-400 ring-1 ring-red-200" : "border-slate-200"}`}
                                                />
                                            </div>
                                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className={labelBase}>Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    name="email" type="email" placeholder="you@email.com"
                                                    value={form.email} onChange={handleChange}
                                                    className={`${inputBase} pl-10 ${errors.email ? "border-red-400 ring-1 ring-red-200" : "border-slate-200"}`}
                                                />
                                            </div>
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        </div>

                                        {/* Mobile */}
                                        <div>
                                            <label className={labelBase}>Mobile Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    name="mobile" type="tel" placeholder="+91 98765 43210"
                                                    value={form.mobile} onChange={handleChange}
                                                    className={`${inputBase} pl-10 ${errors.mobile ? "border-red-400 ring-1 ring-red-200" : "border-slate-200"}`}
                                                />
                                            </div>
                                            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                                        </div>

                                        {/* Country */}
                                        <div>
                                            <label className={labelBase}>Country</label>
                                            <div className="relative">
                                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <select
                                                    name="country" value={form.country} onChange={handleChange}
                                                    className={`${inputBase} pl-10 appearance-none ${errors.country ? "border-red-400" : "border-slate-200"}`}
                                                >
                                                    <option value="">Select country</option>
                                                    {countries.map((c) => <option key={c}>{c}</option>)}
                                                </select>
                                            </div>
                                            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                                        </div>

                                        {/* City */}
                                        <div>
                                            <label className={labelBase}>City</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <select
                                                    name="city" value={form.city} onChange={handleChange}
                                                    className={`${inputBase} pl-10 appearance-none ${errors.city ? "border-red-400" : "border-slate-200"}`}
                                                    disabled={!form.country}
                                                >
                                                    <option value="">Select city</option>
                                                    {cities.map((c) => <option key={c}>{c}</option>)}
                                                </select>
                                            </div>
                                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
                                    <h2 className="text-base font-extrabold text-slate-800 mb-5 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4 text-[#3A9295]" /> Payment Method
                                    </h2>

                                    <div className="flex flex-col gap-3">
                                        {paymentMethods.map(({ id, icon: PMIcon, label }) => (
                                            <motion.button
                                                key={id}
                                                type="button"
                                                onClick={() => setPaymentMethod(id)}
                                                whileTap={{ scale: 0.98 }}
                                                className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${paymentMethod === id
                                                        ? "border-[#63C1BB] bg-[#C8E6E2]/30"
                                                        : "border-slate-100 hover:border-[#9ED5D1]"
                                                    }`}
                                            >
                                                <span className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${paymentMethod === id ? "bg-[#105F68]" : "bg-slate-100"
                                                    }`}>
                                                    <PMIcon className={`w-4 h-4 ${paymentMethod === id ? "text-white" : "text-slate-500"}`} strokeWidth={2} />
                                                </span>
                                                <span className={`text-sm font-semibold ${paymentMethod === id ? "text-[#105F68]" : "text-slate-600"}`}>
                                                    {label}
                                                </span>
                                                {paymentMethod === id && (
                                                    <motion.span
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="ml-auto w-5 h-5 rounded-full bg-[#105F68] flex items-center justify-center"
                                                    >
                                                        <CheckCircle2 className="w-3 h-3 text-white" />
                                                    </motion.span>
                                                )}
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* UPI hint */}
                                    {paymentMethod === "upi" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4"
                                        >
                                            <input
                                                type="text" placeholder="Enter UPI ID (e.g. name@bank)"
                                                className={`${inputBase} border-slate-200`}
                                            />
                                        </motion.div>
                                    )}
                                </div>

                                {/* Order Summary Row */}
                                <div className="bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 flex items-center justify-between mb-5">
                                    <div>
                                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Total Due Today</p>
                                        <p className="text-[#105F68] text-2xl font-extrabold">{plan.price}</p>
                                        <p className="text-slate-400 text-xs">Billed monthly · Cancel anytime</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                                            7-Day Refund Guarantee
                                        </p>
                                    </div>
                                </div>

                                {/* Submit */}
                                <motion.button
                                    type="submit"
                                    disabled={processing}
                                    whileHover={!processing ? { scale: 1.02, boxShadow: "0 12px 32px rgba(58,146,149,0.38)" } : {}}
                                    whileTap={!processing ? { scale: 0.98 } : {}}
                                    className="w-full py-4 rounded-xl text-white font-extrabold text-base flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-80"
                                    style={{ background: "linear-gradient(135deg, #3A9295, #105F68)" }}
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Processing Payment…
                                        </>
                                    ) : (
                                        <>Proceed to Payment <ArrowRight className="w-5 h-5" /></>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubscriptionPage;
