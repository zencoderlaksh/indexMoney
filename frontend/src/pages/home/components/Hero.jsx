import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Clock,
  ExternalLink,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  TrendingUp,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema } from "../../../schemas/enquirySchema";
import { useEnquiryStore } from "../../../stores/enquiryStore";

const inputBase =
  "w-full bg-white border rounded-xl px-4 py-3 pl-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200";
const inputNormal =
  "border-slate-200 focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20";
const inputError =
  "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200";

const FieldError = ({ message }) =>
  message ? (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
      <span className="inline-block h-1 w-1 flex-shrink-0 rounded-full bg-red-400" />
      {message}
    </p>
  ) : null;

const GridBg = () => (
  <svg
    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="hero-grid"
        width="48"
        height="48"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 48 0 L 0 0 0 48"
          fill="none"
          stroke="#105F68"
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hero-grid)" />
  </svg>
);

const trustBadges = [
  { icon: BadgeCheck, text: "5,000+ Traders" },
  { icon: TrendingUp, text: "90%+ Accuracy" },
  { icon: Clock, text: "Real-Time Calls" },
  { icon: ShieldCheck, text: "Risk Managed Strategy" },
];

const todaysResults = [
  { label: "NIFTY", points: "+45 pts", note: "+45 pts ↗" },
  { label: "BANKNIFTY", points: "+80 pts", note: "+80 pts ↗" },
  { label: "SENSEX", points: "+120 pts", note: "+120 pts ↗" },
];

const planOptions = [
  "Bank Nifty Options Plan",
  "Sensex Option plan",
  "Nifty Futures Plan",
  "Bank Nifty Futures Plan",
  "Sensex futures plan",
  "Nifty option plan",
  "Unlisted",
  "Demat account",
];

const Hero = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(enquirySchema) });

  const { isSubmitting, serverError, successMessage, submitEnquiry } =
    useEnquiryStore();

  const onSubmit = async (data) => {
    await submitEnquiry(data);
    reset();
  };

  const scrollToPlans = () => {
    document
      .getElementById("plans-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPerformance = () => {
    document
      .getElementById("performance-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-16 lg:min-h-[92vh] lg:py-20">
      <GridBg />

      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[700px] w-[700px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, #C8E6E2 0%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 -left-20 h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #9ED5D1 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#9ED5D1] bg-[#C8E6E2]/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#105F68]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#63C1BB]" />
              Professional Index & F&O Advisory
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.06] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[3.9rem]">
              <span className="mr-2">🎯</span>
              Daily Nifty, BankNifty & Sensex Calls with{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #3A9295, #105F68)",
                }}
              >
                Proper SL & Targets
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="max-w-2xl text-lg leading-relaxed text-slate-600"
          >
            Get high-probability trades based on technical analysis with proper
            risk management. Join 5,000+ traders using our real-time Nifty,
            BankNifty & Sensex calls.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22 }}
            className="flex items-center gap-2 text-base font-medium text-amber-700"
          >
            <Clock className="h-4.5 w-4.5 text-amber-500" strokeWidth={2.2} />
            <span>⏳ Today&apos;s Calls Already Running - Join Before Market Closes</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="flex flex-wrap gap-3"
          >
            {trustBadges.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"
              >
                <Icon className="h-3.5 w-3.5 text-[#3A9295]" strokeWidth={2} />
                {text}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <motion.button
              onClick={scrollToPlans}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 32px rgba(58,146,149,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #3A9295, #105F68)",
              }}
            >
              <MessageCircle className="h-4 w-4" />
              🚀 Get Free Call on WhatsApp
            </motion.button>

            <motion.button
              onClick={scrollToPerformance}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#9ED5D1] px-7 py-3.5 text-sm font-bold text-[#105F68] transition-all duration-200 hover:border-[#63C1BB] hover:bg-[#C8E6E2]/30"
            >
              <BarChart3 className="h-4 w-4" />
              📊 View Today&apos;s Performance
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="max-w-md overflow-hidden rounded-[26px] border border-white/80 bg-white/85 shadow-lg shadow-slate-200/40 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <p className="text-lg font-bold text-slate-800">Today&apos;s Results</p>
                <p className="text-xs text-slate-500">
                  Latest intraday performance snapshot
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-200 text-[10px]">
                  ⊙
                </span>
                Positive moves
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {todaysResults.map(({ label, points, note }) => (
                <div
                  key={label}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-3.5 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold tracking-wide text-slate-600">
                      {label}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-600">{points}</div>
                    <div className="text-xs font-medium text-slate-400">
                      {note}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between bg-slate-50/70 px-5 py-3">
              <span className="text-xs font-medium text-slate-500">
                Updated with live market snapshots
              </span>
              <a
                href="#performance-section"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToPerformance();
                }}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#105F68] transition-colors duration-200 hover:text-[#3A9295]"
              >
                See full details
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative rounded-3xl border border-white bg-white/85 p-6 shadow-2xl shadow-slate-200/60 backdrop-blur-md">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Free Trial
              </p>
              <p className="mt-0.5 text-2xl font-extrabold text-slate-800">
                Start Your Free Trial - Get Today&apos;s Live Call on WhatsApp
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Fill your details below to unlock instant WhatsApp access to
                today&apos;s live market call.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              noValidate
            >
              {serverError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {serverError}
                </div>
              )}

              {successMessage && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMessage}
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    {...register("name")}
                    className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                  />
                </div>
                <FieldError message={errors.name?.message} />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...register("email")}
                    className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                  />
                </div>
                <FieldError message={errors.email?.message} />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Phone number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="10-digit number"
                    autoComplete="tel"
                    maxLength={10}
                    {...register("phone")}
                    className={`${inputBase} ${errors.phone ? inputError : inputNormal}`}
                  />
                </div>
                <FieldError message={errors.phone?.message} />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Choose your plan
                </label>
                <select
                  {...register("planType")}
                  className={`${inputBase} ${errors.planType ? inputError : inputNormal}`}
                >
                  <option value="">Select plan</option>
                  {planOptions.map((plan) => (
                    <option key={plan} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.planType?.message} />
              </div>

              <label className="flex items-start gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  {...register("agreePolicy")}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#3A9295] focus:ring-[#3A9295]"
                />
                <span>
                  I agree to the{" "}
                  <span className="font-semibold text-[#105F68]">
                    privacy policy
                  </span>
                  .
                </span>
              </label>
              <FieldError message={errors.agreePolicy?.message} />

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, backgroundColor: "#3A9295" }}
                whileTap={{ scale: 0.98 }}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#63C1BB] py-3.5 text-sm font-semibold text-white shadow-md shadow-[#63C1BB]/25 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
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
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    Get Free Call Now 🚀 <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>

              <p className="-mt-1 text-center text-xs text-slate-500">
                Instant WhatsApp Access | No Spam
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
