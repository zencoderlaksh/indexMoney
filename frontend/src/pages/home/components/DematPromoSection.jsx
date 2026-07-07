import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Wallet, Zap, Headphones, ArrowRight } from "lucide-react";
import dematAccountReference from "../../../assets/demat-account-reference.svg";

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

const DematPromoSection = () => {
  const navigate = useNavigate();

  return (
    <section id="demat-account" className="scroll-mt-24 overflow-hidden bg-transparent py-16 md:py-20">
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

            <motion.div variants={itemVariants}>
              <motion.button
                onClick={() => navigate("/signup")}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 30px rgba(13,148,136,0.30)",
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-4 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-teal-700"
              >
                Start Demat Journey <ArrowRight className="h-4 w-4" />
              </motion.button>
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
                    Preview
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-800">
                    Demat Dashboard
                  </p>
                </div>
                <div className="rounded-full bg-teal-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                  Rs. 0 Opening Fee
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                <img
                  src={dematAccountReference}
                  alt="Reference screenshot for demat account"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DematPromoSection;
