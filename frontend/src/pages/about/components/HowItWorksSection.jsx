import React from "react";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";

const steps = [
  {
    title: "Choose Your Plan",
    description:
      "Pick the plan that aligns with your trading focus — Nifty, Bank Nifty, or Sensex.",
    icon: CheckCircle2,
  },
  {
    title: "Join WhatsApp Broadcast",
    description:
      "Get real-time trade updates delivered directly to your phone.",
    icon: MessageCircle,
  },
  {
    title: "Receive Structured Trade Levels",
    description: "We send entry, stop-loss, and target levels for every setup.",
    icon: CheckCircle2,
  },
  {
    title: "Trade with Defined SL & Target",
    description:
      "Follow the plan, manage risk, and stay disciplined through every trade.",
    icon: Phone,
  },
];

const HowItWorksSection = () => {
  return (
    <section className="pt-16">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-extrabold text-slate-900">How It Works</h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          A simple, repeatable process to receive structured market guidance and
          trade with confidence.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {steps.map(({ title, description, icon: Icon }, idx) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7F7F5] text-[#105F68]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{description}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#C8E6E2] text-[#105F68]">
                {idx + 1}
              </span>
              <span>Step {idx + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
