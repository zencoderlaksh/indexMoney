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

      <section className="mt-14">
        <div className="mb-8 max-w-3xl">
          <h3 className="text-3xl font-extrabold text-slate-900">
            Why traders trust Index Money
          </h3>
          <p className="mt-3 text-base text-slate-600">
            Trust comes from transparent trade plans, accountable performance,
            and responsive support.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
          {[
            {
              title: "Strategy-Based Trading",
              description:
                "Data-driven trade plans built on index structure and risk-managed entries.",
            },
            {
              title: "Transparent Communication",
              description:
                "Trade updates and alerts are shared in real-time with clear reasoning.",
            },
            {
              title: "No Unrealistic Claims",
              description:
                "We focus on repeatable process performance, not shortcuts or hype.",
            },
            {
              title: "Dedicated Support",
              description:
                "Live assistance and strategy reviews to keep traders aligned and confident.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#B9E3DD] bg-gradient-to-br from-[#E7F7F5] via-[#CAEDF0] to-white p-5 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mb-3 inline-flex items-center justify-center rounded-full bg-[#63C1BB]/15 p-3 text-[#105F68]">
                <Zap className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h4>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};

export default ProcessSection;
