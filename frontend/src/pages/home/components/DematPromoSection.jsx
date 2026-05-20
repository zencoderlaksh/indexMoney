import React from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  Zap,
  Headphones,
  CheckCircle2,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dematAccountReference from "../../../assets/demat-account-reference.svg";
import { dematAccountSchema } from "../../../schemas/dematAccountSchema";
import { useDematAccountStore } from "../../../stores/dematAccountStore";

const benefits = [
  {
    icon: Wallet,
    title: "Zero Account Opening Charges",
    desc: "Start your trading journey with no upfront cost. Open completely free.",
  },
  {
    icon: Zap,
    title: "Fast Activation Process",
    desc: "Get your demat account activated within minutes with minimal documentation.",
  },
  {
    icon: Headphones,
    title: "Dedicated Assistance Support",
    desc: "Our experts guide you through every step of the account setup process.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 pl-10 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400";
const inputNormal =
  "border-teal-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20";
const inputError =
  "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200";

const FieldError = ({ message }) =>
  message ? <p className="mt-1.5 text-xs text-red-500">{message}</p> : null;

const DematPromoSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(dematAccountSchema) });
  const { isSubmitting, serverError, successMessage, submitDematAccount } =
    useDematAccountStore();

  const onSubmit = async (data) => {
    const submitted = await submitDematAccount(data);
    if (submitted) reset();
  };

  return (
    <section className="overflow-hidden bg-transparent py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-8"
          >
            <motion.div variants={itemVariants}>
              <span className="mb-3 inline-block rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-600">
                Free to Start
              </span>
              <h2 className="text-2xl font-bold leading-tight text-slate-800 sm:text-3xl md:text-4xl lg:text-[2.6rem]">
                Open Free Demat Account and{" "}
                <span className="text-teal-600">Get Special Benefits</span>
              </h2>
            </motion.div>

            <div className="flex flex-col gap-5">
              {benefits.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal-100 bg-teal-50">
                    <Icon className="h-5 w-5 text-teal-600" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-500">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className="rounded-3xl border border-teal-100 bg-white p-5 shadow-sm"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      {...register("fullName")}
                      className={`${inputBase} ${errors.fullName ? inputError : inputNormal}`}
                      placeholder="Enter full name"
                    />
                  </div>
                  <FieldError message={errors.fullName?.message} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        {...register("mobileNumber")}
                        className={`${inputBase} ${errors.mobileNumber ? inputError : inputNormal}`}
                        placeholder="10 digit mobile number"
                      />
                    </div>
                    <FieldError message={errors.mobileNumber?.message} />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                      Email ID
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        {...register("email")}
                        className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                        placeholder="Enter email address"
                      />
                    </div>
                    <FieldError message={errors.email?.message} />
                  </div>
                </div>

                {serverError ? (
                  <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {serverError}
                  </p>
                ) : null}
                {successMessage ? (
                  <p className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {successMessage}
                  </p>
                ) : null}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{
                    scale: isSubmitting ? 1 : 1.03,
                    boxShadow: "0 8px 30px rgba(13,148,136,0.30)",
                  }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-teal-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative mt-4 lg:mt-0"
          >
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Reference Preview
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-800">
                    Demat Account Creation Screen
                  </p>
                </div>
                <div className="rounded-full bg-teal-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                  Rs. 0 Opening Fee
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                <img
                  src={dematAccountReference}
                  alt="Reference screenshot for demat account opening page"
                  className="h-auto w-full object-cover"
                />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Users are redirected straight to the demat account creation page when they click the CTA.",
                  "The chart visual has been removed and replaced with a clean screenshot-style reference.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 rounded-2xl bg-[#F7FBFB] px-4 py-3 text-sm text-slate-600"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DematPromoSection;
