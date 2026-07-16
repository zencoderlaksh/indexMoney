import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const contacts = [
  { name: "Index Money", number: "919216180043", display: "+91 92161 80043", initial: "I" },
];

const WhatsAppIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 32 32"
    aria-hidden="true"
    focusable="false"
    className={className}
    fill="currentColor"
  >
    <path d="M16.01 3.2c-7.05 0-12.78 5.72-12.78 12.77 0 2.25.59 4.45 1.72 6.38L3.13 29l6.8-1.78a12.75 12.75 0 0 0 6.08 1.55h.01c7.05 0 12.78-5.72 12.78-12.77S23.07 3.2 16.01 3.2Zm0 23.4a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.03 1.06 1.08-3.93-.25-.4a10.55 10.55 0 0 1-1.63-5.65c0-5.85 4.76-10.6 10.62-10.6 2.83 0 5.5 1.1 7.5 3.1a10.52 10.52 0 0 1 3.11 7.5c0 5.85-4.76 10.62-10.61 10.62Zm5.82-7.94c-.32-.16-1.88-.93-2.17-1.03-.29-.1-.5-.16-.72.16-.21.32-.82 1.03-1.01 1.24-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.15-.15.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.28c.16.21 2.24 3.42 5.43 4.79.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z" />
  </svg>
);

const WhatsAppModal = ({ isOpen, onClose, companyName = "" }) => {
  if (!isOpen) return null;

  const getWhatsAppLink = (number) => {
    const message = companyName 
      ? `Hi, I am interested in ${companyName} unlisted shares.`
      : `Hi, I am interested in unlisted shares.`;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-[24px] bg-white p-6 shadow-2xl dark:bg-[#001845]"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-400 dark:hover:bg-white/20 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30">
                <WhatsAppIcon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Chat with our team
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Pick a specialist to start a conversation on WhatsApp.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-1">
              {contacts.map((contact) => (
                <a
                  key={contact.number}
                  href={getWhatsAppLink(contact.number)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-[#25D366] hover:shadow-md dark:border-white/10 dark:bg-[#001233] dark:hover:border-[#25D366]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0353a4] text-lg font-bold text-white">
                      {contact.initial}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#0353a4] dark:group-hover:text-blue-400 transition-colors">
                        {contact.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {contact.display}
                      </p>
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <WhatsAppIcon className="h-5 w-5" />
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6 text-center text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              Opens WhatsApp. Starting a conversation with our team is not an order.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppModal;
