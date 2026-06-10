import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
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
  Sparkles,
  PartyPopper,
} from "lucide-react";
import { useAuthStore } from "../../stores/authStore";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";
const PAYMENT_UPI_ID = "9270069221@kotakbank";
const PAYMENT_PAYEE = "NEHA SONI PARWAL";
const PAYMENT_UPI_LINK = `upi://pay?pa=${PAYMENT_UPI_ID}&pn=${encodeURIComponent(
  PAYMENT_PAYEE
)}&cu=INR`;
const PAYMENT_QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
  PAYMENT_UPI_LINK
)}`;

const PLAN_OPTIONS = [
  {
    title: "Nifty Option Plan",
    price: "Rs11,999",
    iconName: "TrendingUp",
    description: "Intraday option setups for Nifty with defined risk levels.",
  },
  {
    title: "Bank Nifty Option Plan",
    price: "Rs9,999",
    iconName: "BarChart2",
    description: "Fast-moving Bank Nifty options plan with market-hour updates.",
  },
  {
    title: "Sensex Option Plan",
    price: "Rs14,999",
    iconName: "Activity",
    description: "Sensex option setups with disciplined trade structure.",
  },
  {
    title: "Nifty Futures Plan",
    price: "Rs9,999",
    iconName: "TrendingUp",
    description: "Nifty futures plan for structured intraday opportunities.",
  },
  {
    title: "Bank Nifty Futures Plan",
    price: "Rs7,999",
    iconName: "BarChart2",
    description: "Bank Nifty futures advisory with live trade management.",
  },
  {
    title: "Sensex Futures Plan",
    price: "Rs12,999",
    iconName: "Activity",
    description: "Sensex futures setups focused on clarity and execution discipline.",
  },
];

const planFeatures = [
  { icon: Zap, text: "Technical analysis research" },
  { icon: Shield, text: "Entry, SL and target provided" },
  { icon: Clock, text: "Real-time market updates" },
  { icon: CheckCircle2, text: "Trade management guidance" },
];

const Breadcrumb = () => (
  <nav className="mb-8 flex items-center gap-1.5 text-xs text-slate-400">
    <Link
      to="/"
      className="flex items-center gap-1 transition-colors hover:text-[#105F68]"
    >
      <Home className="h-3 w-3" /> Home
    </Link>
    <ChevronRight className="h-3 w-3" />
    <span className="text-slate-400">Subscription</span>
    <ChevronRight className="h-3 w-3" />
    <span className="font-semibold text-[#105F68]">Checkout</span>
  </nav>
);

const EmptyPlanSummary = () => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.55, ease: "easeOut" }}
    className="flex flex-col gap-6"
  >
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Select a Plan
      </p>
      <h3 className="mt-3 text-xl font-extrabold text-slate-900">
        No plan selected yet
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Choose any plan from the dropdown to see its price and summary here
        before submitting the payment screenshot.
      </p>
    </div>
  </motion.div>
);

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
      <div
        className="flex flex-col gap-5 rounded-2xl p-6 shadow-xl"
        style={{ background: "linear-gradient(135deg, #105F68, #3A9295)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/15">
            <Icon className="h-6 w-6 text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Selected Plan
            </p>
            <h3 className="text-lg font-extrabold leading-tight text-white">
              {plan.title}
            </h3>
          </div>
        </div>

        <div className="flex items-baseline gap-1.5 rounded-xl bg-white/10 p-4">
          <span className="text-3xl font-extrabold text-white">{plan.price}</span>
          <span className="text-sm text-white/60">/ month</span>
        </div>

        <p className="text-sm leading-relaxed text-white/85">{plan.description}</p>

        <ul className="flex flex-col gap-3">
          {planFeatures.map(({ icon: FIcon, text }, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-white/15">
                <FIcon className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-sm text-white/90">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-[#9ED5D1] bg-[#C8E6E2]/50 p-4">
        <Shield
          className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#105F68]"
          strokeWidth={2}
        />
        <div>
          <p className="text-sm font-bold text-[#105F68]">
            7-Day Money-Back Guarantee
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
            Not satisfied? Get a full refund within 7 days.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

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
        className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-8 text-center shadow-2xl"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full"
          style={{
            background: "radial-gradient(circle, #C8E6E2 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full"
          style={{
            background: "radial-gradient(circle, #9ED5D1 0%, transparent 70%)",
          }}
        />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
            delay: 0.15,
          }}
          className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "linear-gradient(135deg, #3A9295, #105F68)" }}
        >
          <PartyPopper className="h-9 w-9 text-white" strokeWidth={2} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-2 text-xl font-extrabold text-slate-800"
        >
          Submission Received
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-1 text-sm text-slate-500"
        >
          Your payment proof was submitted for
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-5 text-base font-bold text-[#105F68]"
        >
          {plan?.title}
        </motion.p>

        <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #63C1BB, #105F68)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </div>

        <p className="text-xs text-slate-400">Redirecting to dashboard...</p>
      </motion.div>
    </motion.div>
  );
};

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const initialPlanName = location.state?.plan?.title || "";

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    mobile: user?.mobileNumber || "",
    planName: initialPlanName,
    txnId: "",
    screenshot: null,
  });

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const selectedPlan = useMemo(
    () => PLAN_OPTIONS.find((item) => item.title === form.planName) || null,
    [form.planName],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
    setServerError("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      setProcessing(true);
      setServerError("");

      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("mobile", form.mobile);
      formData.append("planName", form.planName);
      formData.append("txnId", form.txnId);
      formData.append("screenshot", form.screenshot);

      const response = await fetch(`${API_BASE}/subscriptions`, {
        method: "POST",
        body: formData,
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.error || "Unable to submit payment proof");
      }

      setProcessing(false);
      setSuccess(true);
    } catch (error) {
      setProcessing(false);
      setServerError(error.message || "Unable to submit payment proof");
    }
  };

  const inputBase =
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 placeholder-slate-400 focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/40";
  const labelBase =
    "mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600";

  const whatsappLink = "https://wa.me/919216180043";

  return (
    <>
      <AnimatePresence>
        {success && selectedPlan ? (
          <SuccessModal plan={selectedPlan} onClose={() => setSuccess(false)} />
        ) : null}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-[#C8E6E2]/20 via-white to-[#9ED5D1]/10">
        <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 shadow-sm backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
            <Link to="/" className="flex items-center gap-2">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #105F68, #3A9295)",
                }}
              >
                <TrendingUp className="h-4 w-4 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-sm font-bold text-slate-800">
                Index<span className="text-[#3A9295]">Money</span>
              </span>
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-[#9ED5D1] bg-[#C8E6E2]/60 px-3 py-1.5 text-xs font-bold text-[#105F68]">
              <Sparkles className="h-3.5 w-3.5" />
              Secure Checkout
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
          <Breadcrumb />

          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-1 text-2xl font-extrabold text-slate-800 md:text-3xl"
            >
              Complete Your Subscription Payment
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-slate-500"
            >
              Select a plan first, then complete the payment proof submission.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[360px_1fr]">
            {selectedPlan ? <PlanSummary plan={selectedPlan} /> : <EmptyPlanSummary />}

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Payment Details
                  </h2>
                  <span className="rounded-full bg-[#C8E6E2]/40 px-3 py-1 text-xs font-semibold text-[#105F68]">
                    {selectedPlan ? selectedPlan.title : "Select a plan"}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Use the details below to complete the payment. Once done,
                  upload the screenshot or share it via WhatsApp.
                </p>

                {selectedPlan ? (
                  <div className="mt-4 rounded-2xl border border-[#CBE7E1] bg-[#F5FCFB] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3A9295]">
                      Selected Plan Summary
                    </p>
                    <p className="mt-2 text-lg font-bold text-slate-900">
                      {selectedPlan.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {selectedPlan.description}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-[#105F68]">
                      Price: {selectedPlan.price} / month
                    </p>
                  </div>
                ) : null}

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <h3 className="mb-3 text-sm font-semibold text-slate-900">
                      Bank Transfer Details
                    </h3>
                    <dl className="space-y-2 text-sm text-slate-600">
                      <div>
                        <dt className="font-semibold text-slate-800">Account Name</dt>
                        <dd>Neha Soni Parwal</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-800">Bank Name</dt>
                        <dd>Kotak Mahindra Bank</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-800">Account Number</dt>
                        <dd>0547365150</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-800">IFSC Code</dt>
                        <dd>KKBK0002049</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-800">Home Branch</dt>
                        <dd>DHULE</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <h3 className="mb-3 text-sm font-semibold text-slate-900">
                      UPI / QR Code
                    </h3>

                    <div className="mt-4 flex items-center justify-center">
                      <div className="w-full max-w-[230px] rounded-[24px] bg-black p-3 shadow-xl">
                        <div className="overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#d6003d_0%,#c3154f_28%,#1a1630_68%,#0c1025_100%)] px-3.5 pb-4 pt-5 text-white">
                          <div className="flex items-center justify-center gap-1.5 text-lg font-extrabold tracking-tight">
                            <span>kotak</span>
                            <span className="flex gap-0.5">
                              <span className="h-5 w-1.5 rounded-full bg-white"></span>
                              <span className="h-5 w-1.5 rounded-full bg-white"></span>
                              <span className="h-5 w-1.5 rounded-full bg-white"></span>
                            </span>
                          </div>
                          <p className="mt-7 text-center text-[10px] font-medium">
                            Scan to pay with any UPI app
                          </p>

                          <div className="mt-9 rounded-[14px] bg-white p-2.5 shadow-md">
                            <img
                              src={PAYMENT_QR_SRC}
                              alt={`UPI QR code for ${PAYMENT_PAYEE}`}
                              className="aspect-square w-full rounded-md object-contain"
                              loading="lazy"
                            />
                          </div>

                          <p className="mt-3 text-xs font-semibold uppercase">
                            {PAYMENT_PAYEE}
                          </p>
                        </div>
                        <div className="-mt-3 mx-auto flex w-[72%] items-center justify-center gap-1 rounded-b-xl bg-black/85 pb-2 pt-4 text-[7px] font-semibold text-white">
                          <span className="grid h-4 w-4 place-items-center rounded-full border border-white/50 text-[6px]">
                            811
                          </span>
                          <span>811 Super</span>
                        </div>
                        <p className="mt-3 text-center text-xs text-slate-100">
                          Scan and pay using any UPI app.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Option 1 - Upload Screenshot
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Submit your payment details to the backend so we can verify and
                  activate your subscription quickly.
                </p>

                {serverError ? (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {serverError}
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className={labelBase}>Full Name</label>
                      <input
                        name="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={form.fullName}
                        onChange={handleChange}
                        className={`${inputBase} ${
                          errors.fullName ? "border-red-400 ring-1 ring-red-200" : "border-slate-200"
                        }`}
                      />
                      {errors.fullName ? (
                        <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                      ) : null}
                    </div>

                    <div>
                      <label className={labelBase}>Mobile Number</label>
                      <input
                        name="mobile"
                        type="tel"
                        placeholder="Enter mobile number"
                        value={form.mobile}
                        onChange={handleChange}
                        className={`${inputBase} ${
                          errors.mobile ? "border-red-400 ring-1 ring-red-200" : "border-slate-200"
                        }`}
                      />
                      {errors.mobile ? (
                        <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>
                      ) : null}
                    </div>

                    <div>
                      <label className={labelBase}>Plan Name</label>
                      <select
                        name="planName"
                        value={form.planName}
                        onChange={handleChange}
                        className={`${inputBase} appearance-none ${
                          errors.planName ? "border-red-400" : "border-slate-200"
                        }`}
                      >
                        <option value="">Select a plan</option>
                        {PLAN_OPTIONS.map((option) => (
                          <option key={option.title} value={option.title}>
                            {option.title}
                          </option>
                        ))}
                      </select>
                      {errors.planName ? (
                        <p className="mt-1 text-xs text-red-500">{errors.planName}</p>
                      ) : null}
                    </div>

                    <div className="sm:col-span-2">
                      <label className={labelBase}>Transaction ID</label>
                      <input
                        name="txnId"
                        type="text"
                        placeholder="Enter transaction/reference ID"
                        value={form.txnId}
                        onChange={handleChange}
                        className={`${inputBase} ${
                          errors.txnId ? "border-red-400 ring-1 ring-red-200" : "border-slate-200"
                        }`}
                      />
                      {errors.txnId ? (
                        <p className="mt-1 text-xs text-red-500">{errors.txnId}</p>
                      ) : null}
                    </div>

                    <div className="sm:col-span-2">
                      <label className={labelBase}>Upload Payment Screenshot</label>
                      <input
                        name="screenshot"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setForm((p) => ({
                            ...p,
                            screenshot: e.target.files?.[0] || null,
                          }));
                          setErrors((p) => ({ ...p, screenshot: "" }));
                          setServerError("");
                        }}
                        className="w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-[#C8E6E2]/50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#105F68]"
                      />
                      {errors.screenshot ? (
                        <p className="mt-1 text-xs text-red-500">{errors.screenshot}</p>
                      ) : null}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={processing}
                    whileHover={!processing ? { scale: 1.02 } : {}}
                    whileTap={!processing ? { scale: 0.98 } : {}}
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-extrabold text-white transition-all duration-200 disabled:opacity-80"
                    style={{
                      background: "linear-gradient(135deg, #3A9295, #105F68)",
                    }}
                  >
                    {processing ? (
                      <>
                        <svg
                          className="h-5 w-5 animate-spin text-white"
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
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Screenshot <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Option 2 - Share on WhatsApp
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  You can also send your payment screenshot directly via WhatsApp.
                </p>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#9ED5D1] bg-white px-5 py-3 text-sm font-bold text-[#105F68] transition-colors duration-200 hover:bg-[#EAF8F4]"
                >
                  Share on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
