import React from "react";
import { Activity, BarChart2, Clock, ClipboardList, Zap } from "lucide-react";

const steps = [
  {
    title: "Market Analysis",
    description:
      "We analyze index structure, technical levels, and overall market sentiment.",
    icon: BarChart2,
  },
  {
    title: "Strategy Planning",
    description:
      "We select high-probability setups with proper risk-reward ratios.",
    icon: ClipboardList,
  },
  {
    title: "Trade Execution Levels",
    description: "You receive clear entry, stop-loss, and target levels.",
    icon: Activity,
  },
  {
    title: "Continuous Monitoring",
    description:
      "Live updates and structured trade management guidance throughout the session.",
    icon: Clock,
  },
];

const ProcessSection = () => {
  return (
    <section className="pt-16">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Our Working Process
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          We follow a consistent process to keep every trade plan transparent
          and actionable.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {steps.map(({ title, description, icon: Icon }, idx) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7F7F5] text-[#105F68]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{description}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#C8E6E2] text-[#105F68]">
                {idx + 1}
              </span>
              <span>Step {idx + 1}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-[#C8E6E2] bg-[#E7F7F5]/50 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Why traders trust Index Money
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Trust is built through consistency and discipline — not marketing
              promises.
            </p>
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            {[
              "Strategy-Based Trading",
              "Transparent Communication",
              "No Unrealistic Profit Claims",
              "Dedicated Support System",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#105F68] shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
