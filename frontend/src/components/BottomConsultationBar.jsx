import React, { useState } from "react";
import { X } from "lucide-react";

const SCHEDULER_URL = "https://scheduler.zoom.us/neha-soni-agquvd";

const BottomConsultationBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] border-t border-[#8FE2D5]/40 bg-gradient-to-r from-[#0B3F45] via-[#08786F] to-[#0A9B88] px-4 py-4 shadow-[0_-12px_35px_rgba(8,120,111,0.22)] sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 pr-10 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <p className="text-sm font-semibold text-white sm:text-base">
          Book a free consultation with our experts
        </p>

        <a
          href={SCHEDULER_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-bold text-[#105F68] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#EAF8F4]"
        >
          Book now
        </a>
      </div>

      <button
        type="button"
        onClick={() => setIsVisible(false)}
        aria-label="Close consultation bar"
        className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition duration-200 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/70 sm:right-8"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default BottomConsultationBar;
