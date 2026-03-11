import React from "react";
import { AlertTriangle } from "lucide-react";

const Disclaimer = () => {
  return (
    <section className="pt-16 pb-24">
      <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7F7F5] text-[#105F68]">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Important Disclaimer
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Index Money provides market research and analysis based on
              technical study. We do not guarantee profits. Investments in
              securities markets are subject to market risks. Please read all
              related documents carefully before investing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Disclaimer;
