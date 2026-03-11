import React from "react";
import { Check, Sparkles } from "lucide-react";

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
    "1–2 Setups (Market Based)",
    "1–2 Setups (Market Based)",
    "1–2 Setups (Market Based)",
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
    "1–2 Setups (Market Based)",
    "1–2 Setups (Market Based)",
    "1–2 Setups (Market Based)",
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

const PlansSection = () => {
  return (
    <section className="pt-16">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Index Option Advisory Plans
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          Professional option trading services for Nifty, Bank Nifty, and Sensex
          with a focus on disciplined risk management.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 rounded-2xl border border-slate-100 bg-white shadow-sm">
          <thead className="bg-slate-50">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {optionPlans.map(([feature, ...values]) => (
              <tr key={feature} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-800">
                  {feature}
                </td>
                {values.map((value, idx) => (
                  <td key={idx} className="px-4 py-4">
                    {renderCell(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Professional Index Future Trading Services Plan
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          Futures advisory for Nifty, Bank Nifty and Sensex aiming for
          high-probability setups with strict risk controls.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 rounded-2xl border border-slate-100 bg-white shadow-sm">
          <thead className="bg-slate-50">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {futurePlans.map(([feature, ...values]) => (
              <tr key={feature} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-800">
                  {feature}
                </td>
                {values.map((value, idx) => (
                  <td key={idx} className="px-4 py-4">
                    {renderCell(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex items-center gap-3 text-sm text-slate-600">
        <Sparkles className="h-4 w-4 text-[#105F68]" />
        <span>
          Want a custom package? Reach out and we will tailor a plan to your
          trading style.
        </span>
      </div>
    </section>
  );
};

export default PlansSection;
