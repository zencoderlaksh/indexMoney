import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  BarChart2,
  Activity,
  CheckCircle2,
  Zap,
  Shield,
  Clock,
  ChevronRight,
  Home,
  ArrowRight,
  User,
  Phone,
  Sparkles,
  PartyPopper,
} from "lucide-react";
import { useAuthStore } from "../../stores/authStore";

// ─── Shared features ──────────────────────────────────────────────────────────
const planFeatures = [
  { icon: Zap, text: "Technical analysis research" },
  { icon: Shield, text: "Entry, SL & target provided" },
  { icon: Clock, text: "Real-time market updates" },
  { icon: CheckCircle2, text: "Trade management guidance" },
];

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
const Breadcrumb = () => (
  <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-8">
    <Link
      to="/"
      className="flex items-center gap-1 hover:text-[#105F68] transition-colors"
    >
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
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">
              Selected Plan
            </p>
            <h3 className="text-white font-extrabold text-lg leading-tight">
              {plan.title}
            </h3>
          </div>
        </div>

        {/* Price */}
        <div className="bg-white/10 rounded-xl p-4 flex items-baseline gap-1.5">
          <span className="text-white text-3xl font-extrabold">
            {plan.price}
          </span>
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
        <Shield
          className="w-5 h-5 text-[#105F68] mt-0.5 flex-shrink-0"
          strokeWidth={2}
        />
        <div>
          <p className="text-[#105F68] font-bold text-sm">
            7-Day Money-Back Guarantee
          </p>
          <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
            Not satisfied? Get a full refund within 7 days — no questions asked.
          </p>
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
          <div
            key={label}
            className="bg-white border border-slate-100 rounded-xl p-3 text-center shadow-sm"
          >
            <p className="text-[#105F68] font-extrabold text-lg">{val}</p>
            <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide mt-0.5">
              {label}
            </p>
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
    const t = setTimeout(() => {
      navigate("/dashboard");
    }, 3200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
      }}
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
          style={{
            background: "radial-gradient(circle, #C8E6E2 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, #9ED5D1 0%, transparent 70%)",
          }}
        />

        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
            delay: 0.15,
          }}
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
  const user = useAuthStore((state) => state.user);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // Plan from router state, with sensible fallback
  const plan = location.state?.plan ?? {
    title: "Bank Nifty Option Plan",
    price: "₹2,499",
    iconName: "BarChart2",
  };

  // Prefill from auth store (logged-in user)
  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    mobile: user?.mobileNumber || "",
    planName: plan.title,
    txnId: "",
    screenshot: null,
  });

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.mobile.trim()) errs.mobile = "Mobile number is required";
    if (!form.planName.trim()) errs.planName = "Please select a plan";
    if (!form.txnId.trim()) errs.txnId = "Transaction ID is required";
    if (!form.screenshot)
      errs.screenshot = "Please upload a payment screenshot";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 1700);
  };

  const inputBase =
    "w-full text-sm text-slate-700 bg-white border rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#63C1BB]/40 focus:border-[#63C1BB] placeholder-slate-400";
  const labelBase =
    "block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide";

  const whatsappLink = "https://wa.me/911234567890"; // Replace with your WhatsApp number

  return (
    <>
      <AnimatePresence>
        {success && (
          <SuccessModal plan={plan} onClose={() => setSuccess(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-[#C8E6E2]/20 via-white to-[#9ED5D1]/10">
        {/* ── Top bar ── */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #105F68, #3A9295)",
                }}
              >
                <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-bold text-slate-800 text-sm">
                Index<span className="text-[#3A9295]">Money</span>
              </span>
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
              Complete Your Subscription Payment
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 text-sm"
            >
              Secure your plan by completing the payment using the details
              below.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 items-start">
            {/* Plan Summary */}
            <PlanSummary plan={plan} />

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Payment Details
                  </h2>
                  <span className="text-xs font-semibold text-[#105F68] bg-[#C8E6E2]/40 px-3 py-1 rounded-full">
                    {plan.title}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Use the details below to complete the payment. Once done,
                  upload the screenshot or share it via WhatsApp.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">
                      Bank Transfer Details
                    </h3>
                    <dl className="text-sm text-slate-600 space-y-2">
                      <div>
                        <dt className="font-semibold text-slate-800">
                          Account Name
                        </dt>
                        <dd>INDEX MONEY</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-800">
                          Bank Name
                        </dt>
                        <dd>XXXXX Bank</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-800">
                          Account Number
                        </dt>
                        <dd>XXXXXXXX</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-800">
                          IFSC Code
                        </dt>
                        <dd>XXXXXXXX</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-800">
                          Account Type
                        </dt>
                        <dd>Current</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">
                      UPI / QR Code
                    </h3>
                    <p className="text-sm text-slate-600">
                      UPI ID:{" "}
                      <span className="font-semibold text-slate-800">
                        indexmoney@upi
                      </span>
                    </p>

                    <div className="mt-4 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-5 shadow-inner border border-slate-100">
                        <div className="w-40 h-40 rounded-xl bg-gradient-to-br from-[#C8E6E2] to-[#9ED5D1] flex items-center justify-center text-sm font-semibold text-slate-600">
                          QR Code
                        </div>
                        <p className="text-xs text-slate-500 text-center">
                          Scan & pay using any UPI app (Google Pay / PhonePe /
                          Paytm)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Option 1 — Upload Screenshot (Recommended)
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Submit your payment details so we can verify and activate your
                  subscription quickly.
                </p>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-6 space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className={labelBase}>Full Name</label>
                      <input
                        name="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={form.fullName}
                        onChange={handleChange}
                        className={`${inputBase} ${errors.fullName ? "border-red-400 ring-1 ring-red-200" : "border-slate-200"}`}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={labelBase}>Mobile Number</label>
                      <input
                        name="mobile"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.mobile}
                        onChange={handleChange}
                        className={`${inputBase} ${errors.mobile ? "border-red-400 ring-1 ring-red-200" : "border-slate-200"}`}
                      />
                      {errors.mobile && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={labelBase}>Plan Name</label>
                      <select
                        name="planName"
                        value={form.planName}
                        onChange={handleChange}
                        className={`${inputBase} appearance-none ${errors.planName ? "border-red-400" : "border-slate-200"}`}
                      >
                        {[
                          "Nifty Option Plan",
                          "Bank Nifty Option Plan",
                          "Sensex Option Plan",
                          "Nifty Futures Plan",
                          "Bank Nifty Futures Plan",
                          "Sensex Futures Plan",
                        ].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.planName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.planName}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className={labelBase}>Transaction ID</label>
                      <input
                        name="txnId"
                        type="text"
                        placeholder="Enter transaction/reference ID"
                        value={form.txnId}
                        onChange={handleChange}
                        className={`${inputBase} ${errors.txnId ? "border-red-400 ring-1 ring-red-200" : "border-slate-200"}`}
                      />
                      {errors.txnId && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.txnId}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className={labelBase}>
                        Upload Payment Screenshot
                      </label>
                      <input
                        name="screenshot"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setForm((p) => ({
                            ...p,
                            screenshot: e.target.files?.[0],
                          }));
                          setErrors((p) => ({ ...p, screenshot: "" }));
                        }}
                        className="w-full text-sm text-slate-700 file:border-0 file:bg-[#C8E6E2]/50 file:px-3 file:py-2 file:rounded-lg file:text-sm file:font-semibold file:text-[#105F68]"
                      />
                      {errors.screenshot && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.screenshot}
                        </p>
                      )}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={processing}
                    whileHover={!processing ? { scale: 1.02 } : {}}
                    whileTap={!processing ? { scale: 0.98 } : {}}
                    className="w-full py-3 rounded-xl text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-80"
                    style={{
                      background: "linear-gradient(135deg, #3A9295, #105F68)",
                    }}
                  >
                    {processing ?
                      <>
                        <svg
                          className="animate-spin w-5 h-5 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Submitting…
                      </>
                    : <>
                        Submit Screenshot <ArrowRight className="w-4 h-4" />
                      </>
                    }
                  </motion.button>
                </form>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Option 2 — Share on WhatsApp
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  You can also send your payment screenshot directly via
                  WhatsApp.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#105F68] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0e7b6c]"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="w-5 h-5"
                  />
                  Send Screenshot on WhatsApp
                </a>
              </div>

              <div className="rounded-2xl border border-[#C8E6E2] bg-[#E7F7F5]/60 p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Activation Timeline
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Once payment is verified, your subscription will be activated
                  within 10–30 minutes during market hours.
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  <span className="font-semibold text-slate-800">
                    Support Timing:
                  </span>{" "}
                  8:00 AM – 10:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
