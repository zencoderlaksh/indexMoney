import React from "react";
import { AlertTriangle } from "lucide-react";

const Disclaimer = () => {
  return (
    <section className="pb-16 pt-10">
      <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7F7F5] text-[#023e7d]">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Important Disclaimer
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600 md:text-sm">
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
