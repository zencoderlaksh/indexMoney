import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  User,
  Phone,
  ShieldCheck,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema } from "../../../schemas/enquirySchema";
import { useEnquiryStore } from "../../../stores/enquiryStore";

/* ── Shared form styles ────────────────────────────────────────────────────── */
const inputBase =
  "w-full bg-white border rounded-xl px-4 py-3 pl-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200";
const inputNormal =
  "border-slate-200 focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20";
const inputError =
  "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200";

const FieldError = ({ message }) =>
  message ?
    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
      <span className="inline-block w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
      {message}
    </p>
  : null;

/* ── Hero grid background ─────────────────────────────────────────────────── */
const GridBg = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none"
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

/* ── Hero ──────────────────────────────────────────────────────────────────── */
const Hero = () => {
  const navigate = useNavigate();

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

  return (
    <section className="relative min-h-screen lg:min-h-[92vh] flex items-center overflow-hidden py-16 lg:py-20">
      <GridBg />

      {/* Soft radial glow */}
      <div
        className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle, #C8E6E2 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #9ED5D1 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
        {/* ── Left: Content ── */}
        <div className="flex flex-col gap-7">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 bg-[#C8E6E2]/60 border border-[#9ED5D1] text-[#105F68] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#63C1BB] animate-pulse" />
              Professional Index & F&O Advisory
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-slate-900 leading-[1.08] tracking-tight">
              Invest with clarity.
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #3A9295, #105F68)",
                }}
              >
                Build confidence.
              </span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-slate-500 text-lg leading-relaxed max-w-lg"
          >
            Professional advisory on Nifty, Bank Nifty & Sensex — powered by
            structured technical analysis with defined SL & targets.
          </motion.p>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: ShieldCheck, text: "Risk Managed Strategy" },
              { icon: TrendingUp, text: "10+ Years Experience" },
              { icon: Clock, text: "Real-time Calls" },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm"
              >
                <Icon className="w-3.5 h-3.5 text-[#3A9295]" strokeWidth={2} />
                {text}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <motion.button
              onClick={scrollToPlans}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 12px 32px rgba(58,146,149,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #3A9295, #105F68)",
              }}
            >
              View Subscription Plans <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              onClick={() => navigate("/webinar")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 text-[#105F68] font-bold text-sm px-7 py-3.5 rounded-xl border-2 border-[#9ED5D1] hover:border-[#63C1BB] hover:bg-[#C8E6E2]/30 transition-all duration-200"
            >
              Webinar
            </motion.button>
          </motion.div>
        </div>

        {/* ── Right: Enquiry form ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-slate-200/60 border border-white p-6">
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Free Trial
              </p>
              <p className="text-2xl font-extrabold text-slate-800 mt-0.5">
                Get in touch
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Share your details and we’ll reach out with the next steps.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              noValidate
            >
              {serverError && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                  {serverError}
                </div>
              )}
              {successMessage && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-emerald-700 text-sm">
                  {successMessage}
                </div>
              )}
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
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

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
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

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Phone number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
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

              {/* Plan selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Choose your plan
                </label>
                <select
                  {...register("planType")}
                  className={`${inputBase} ${errors.planType ? inputError : inputNormal}`}
                >
                  <option value="">Select plan</option>
                  <option value="Bank Nifty Options Plan">
                    Bank Nifty Options Plan
                  </option>
                  <option value="Sensex Option plan">Sensex Option plan</option>
                  <option value="Nifty Futures Plan">Nifty Futures Plan</option>
                  <option value="Bank Nifty Futures Plan">
                    Bank Nifty Futures Plan
                  </option>
                  <option value="Sensex futures plan">
                    Sensex futures plan
                  </option>
                  <option value="Nifty option plan">Nifty option plan</option>
                  <option value="Unlisted">Unlisted</option>
                  <option value="Demat account">Demat account</option>
                </select>
                <FieldError message={errors.planType?.message} />
              </div>

              {/* Agree policy */}
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
                className="mt-2 w-full flex items-center justify-center gap-2 bg-[#63C1BB] text-white font-semibold text-sm py-3.5 rounded-xl shadow-md shadow-[#63C1BB]/25 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ?
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
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
                    Sending…
                  </span>
                : <>
                    Send Free Trial Request <ArrowRight className="w-4 h-4" />
                  </>
                }
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
