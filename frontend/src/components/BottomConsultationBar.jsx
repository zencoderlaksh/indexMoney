import React, { useState } from "react";
import { X } from "lucide-react";
import WhatsAppModal from "./WhatsAppModal";

const BottomConsultationBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] border-t border-[#5c677d]/40 bg-gradient-to-r from-[#001233] via-[#023e7d] to-[#0353a4] px-4 py-4 shadow-[0_-12px_35px_rgba(3,83,164,0.22)] sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 pr-10 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <p className="text-sm font-semibold text-white sm:text-base">
          Get personalized guidance for your Unlisted Share investments.
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex w-fit items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-bold text-[#023e7d] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#f1f5f9]"
        >
          Book now
        </button>
      </div>

      <button
        type="button"
        onClick={() => setIsVisible(false)}
        aria-label="Close consultation bar"
        className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition duration-200 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/70 sm:right-8"
      >
        <X className="h-5 w-5" />
      </button>
      
      <WhatsAppModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default BottomConsultationBar;
