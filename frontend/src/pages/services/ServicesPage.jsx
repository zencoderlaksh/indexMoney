import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

const tableHeaders = ["Feature / Service", "Nifty", "Bank Nifty", "Sensex"];

const optionPlans = [
  [
    "Research Base",
    "Technical Analysis",
    "Technical Analysis",
    "Technical Analysis",
  ],
  ["Call Type", "Intraday Options", "Intraday Options", "Intraday Options"],
  ["Call Ratio", "5:2", "5:2", "5:2"],
  ["Accuracy Level", "96%", "96%", "96%"],
  [
    "Daily Trade Opportunities",
    "1-2 Setups (Market Based)",
    "1-2 Setups (Market Based)",
    "1-2 Setups (Market Based)",
  ],
  ["Entry Level Provided", true, true, true],
  ["Stop-Loss Level", "Clearly Defined", "Clearly Defined", "Clearly Defined"],
  ["Target Level", "Clearly Defined", "Clearly Defined", "Clearly Defined"],
  ["Real-Time Updates", true, true, true],
  ["Trade Management Guidance", true, true, true],
  ["Support During Market Hours", true, true, true],
  ["Communication Channel", "WhatsApp", "WhatsApp", "WhatsApp"],
  ["Monthly Subscription Fee", "₹1,999", "₹1,999", "₹1,999"],
];

const futurePlans = [
  [
    "Research Base",
    "Technical Analysis",
    "Technical Analysis",
    "Technical Analysis",
  ],
  ["Call Type", "Intraday Future", "Intraday Future", "Intraday Future"],
  ["Call Ratio", "5:2", "5:2", "5:2"],
  ["Accuracy Level", "96%", "96%", "96%"],
  [
    "Daily Trade Opportunities",
    "1-2 Setups (Market Based)",
    "1-2 Setups (Market Based)",
    "1-2 Setups (Market Based)",
  ],
  ["Entry Level Provided", true, true, true],
  ["Stop-Loss Level", "Clearly Defined", "Clearly Defined", "Clearly Defined"],
  ["Target Level", "Clearly Defined", "Clearly Defined", "Clearly Defined"],
  ["Real-Time Updates", true, true, true],
  ["Trade Management Guidance", true, true, true],
  ["Support During Market Hours", true, true, true],
  ["Communication Channel", "WhatsApp", "WhatsApp", "WhatsApp"],
  ["Monthly Subscription Fee", "₹3,999", "₹2,999", "₹4,999"],
];

const trustPoints = [
  {
    icon: Shield,
    title: "Structured Risk Management",
    description:
      "Every setup is shared with defined entry, stop-loss, and target levels.",
  },
  {
    icon: MessageCircle,
    title: "Real-Time WhatsApp Delivery",
    description:
      "Trade updates and management guidance arrive quickly during market hours.",
  },
  {
    icon: Clock,
    title: "Daily Market-Focused Opportunities",
    description:
      "We focus on actionable setups rather than noisy overtrading.",
  },
  {
    icon: TrendingUp,
    title: "Index-Centric Expertise",
    description:
      "Dedicated focus on Nifty, Bank Nifty, and Sensex trading services.",
  },
];

const steps = [
  {
    icon: CheckCircle2,
    title: "Choose Your Plan",
    description:
      "Select the index segment and product type that fits your trading style.",
  },
  {
    icon: MessageCircle,
    title: "Join WhatsApp Broadcast",
    description:
      "Receive calls, updates, and market guidance through a familiar channel.",
  },
  {
    icon: Zap,
    title: "Get Structured Trade Levels",
    description:
      "Every call includes entry, stop-loss, and target with a disciplined framework.",
  },
  {
    icon: Phone,
    title: "Manage Trades with Support",
    description:
      "Stay aligned with live updates and support during active market sessions.",
  },
];

const renderCell = (value) => {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#105F68]">
        <Check className="h-4 w-4" /> Yes
      </span>
    );
  }

  return <span className="text-sm text-slate-700">{value}</span>;
};

const ServicesTable = ({ title, description, rows }) => (
  <section className="pt-10">
    <div className="max-w-3xl">
      <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
        {description}
      </p>
    </div>

    <div className="mt-8 overflow-x-auto rounded-[28px] border border-[#CBE7E1] bg-white/90 shadow-[0_14px_38px_rgba(16,95,104,0.08)] backdrop-blur-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-[#F4FBF9]">
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {rows.map(([feature, ...values]) => (
            <tr key={feature} className="hover:bg-slate-50/80">
              <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-800">
                {feature}
              </td>
              {values.map((value, idx) => (
                <td key={`${feature}-${idx}`} className="px-4 py-4">
                  {renderCell(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

const ServicesPage = () => {
  return (
    <div className="relative overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,230,226,0.42),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(158,213,209,0.20),transparent_32%)]" />

      <section className="relative px-5 pb-10 pt-14 md:px-8 md:pt-18">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#BEE3DC] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#105F68] shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Services
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.08 }}
            className="mt-5 text-4xl font-extrabold leading-tight text-slate-800 md:text-5xl lg:text-6xl"
          >
            Index Advisory Services Built for{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #3A9295, #105F68)",
              }}
            >
              Disciplined Traders
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600"
          >
            Explore our Nifty, Bank Nifty, and Sensex advisory plans with
            structured trade levels, market-hours support, and a process built
            around clarity rather than guesswork.
          </motion.p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/pay-now"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#3A9295] to-[#105F68] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_28px_rgba(58,146,149,0.22)]"
            >
              View Payment Page
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-2xl border border-[#9ED5D1] bg-white px-5 py-3 text-sm font-bold text-[#105F68] transition-colors duration-200 hover:bg-[#EAF8F4]"
            >
              Contact for Custom Package
            </Link>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-8 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3A9295]">
              Why Choose Us
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-800 md:text-4xl">
              More Than Calls, A Structured Trading Support System
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {trustPoints.map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: index * 0.07 }}
                className="rounded-[28px] border border-[#CBE7E1] bg-white/85 p-6 shadow-[0_14px_38px_rgba(16,95,104,0.08)] backdrop-blur-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C8E6E2] to-[#63C1BB] text-[#105F68]">
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-8 md:px-8">
        <div className="mx-auto max-w-6xl">
          <ServicesTable
            title="Index Option Advisory Plans"
            description="Professional option trading services for Nifty, Bank Nifty, and Sensex with a focus on disciplined risk management."
            rows={optionPlans}
          />

          <ServicesTable
            title="Professional Index Future Trading Services Plan"
            description="Futures advisory for Nifty, Bank Nifty, and Sensex aiming for high-probability setups with strict risk controls."
            rows={futurePlans}
          />
        </div>
      </section>

      <section className="relative px-5 py-8 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3A9295]">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-800 md:text-4xl">
              Simple Flow, Clear Execution
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-[26px] border border-[#CBE7E1] bg-white/85 p-6 shadow-[0_12px_34px_rgba(16,95,104,0.07)] backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#E7F7F5] text-[#105F68]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#C8E6E2] text-[#105F68]">
                    {index + 1}
                  </span>
                  <span>Step {index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-16 pt-8 md:px-8 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.42 }}
          className="mx-auto max-w-6xl rounded-[30px] border border-[#CBE7E1] bg-white/85 px-6 py-8 shadow-[0_16px_42px_rgba(16,95,104,0.08)] backdrop-blur-sm md:px-10"
        >
          <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3A9295]">
                Next Step
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-800">
                Ready to Start with the Right Plan?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                If you want help choosing between option and futures services,
                reach out and we’ll guide you to the most suitable setup.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#9ED5D1] bg-white px-5 py-3 text-sm font-bold text-[#105F68] transition-colors duration-200 hover:bg-[#EAF8F4]"
              >
                Talk to Support
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#3A9295] to-[#105F68] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_28px_rgba(58,146,149,0.22)]"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ServicesPage;
