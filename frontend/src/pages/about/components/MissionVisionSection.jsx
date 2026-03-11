import React from "react";
import { TrendingUp, Shield, Target, Zap } from "lucide-react";

const expertise = [
  {
    title: "Technical Chart Analysis",
    description:
      "Chart patterns, trend structure, and support/resistance levels guide our setups.",
    icon: TrendingUp,
  },
  {
    title: "Price Action Strategy",
    description:
      "We focus on clean price action signals to time entries and exits.",
    icon: Target,
  },
  {
    title: "Defined Risk Management",
    description:
      "Every trade starts with predefined stop-loss and target levels.",
    icon: Shield,
  },
  {
    title: "Structured Trading Framework",
    description: "No random calls — only calculated, high-probability setups.",
    icon: Zap,
  },
];

const MissionVisionSection = () => {
  return (
    <section className="pt-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Our Mission & Vision
          </h2>
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Our Mission
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>Provide structured and risk-managed trading strategies</li>
                <li>Help traders develop disciplined decision-making</li>
                <li>Promote transparency in market research</li>
                <li>Support long-term trading consistency</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Our Vision
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                To become a trusted and transparent name in index and F&O
                advisory services by maintaining ethical practices and
                consistent research standards. We focus on long-term
                credibility, not short-term hype.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between gap-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Our Expertise
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Experience, structure, and a risk-first mindset power every
                recommendation.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {expertise.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7F7F5] text-[#105F68]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
