import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

const ShareButton = ({ link, className }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const fullUrl = `${window.location.origin}${link}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center justify-center p-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-[#0353a4] hover:text-[#0353a4] transition-all duration-300 hover:shadow-md bg-white dark:bg-[#001845] hover:-translate-y-0.5 ${copied ? 'text-green-500 hover:text-green-600 border-green-500 hover:border-green-600' : 'text-slate-500'} ${className || ''}`}
      title="Share link"
    >
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
    </button>
  );
};

export default ShareButton;
