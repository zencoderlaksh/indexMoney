import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ShieldCheck, TrendingUp } from "lucide-react";
import { IMAGES } from "../../constants/images";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#001233] text-white">
      {/* Left Pane (Branding) */}
      <div className="hidden lg:flex w-1/2 flex-col px-16 py-12 border-r border-white/10">
        {/* Top: Logo */}
        <div className="mb-auto">
          <Link to="/">
            <img src={IMAGES.logo} alt="Index Money" className="h-5 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        {/* Middle: Content */}
        <div className="my-12">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold leading-tight mb-6">
            Your Gateway to <br />
            India's Private Market.
          </h1>
          <p className="text-sm text-white/80 max-w-md mb-8 leading-relaxed">
            Join thousands of investors exploring India's most promising Unlisted & Pre-IPO companies. Manage your enquiries, track investments, and access exclusive private market opportunities—all from one secure dashboard.
          </p>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-white/90">
              <CheckCircle2 className="h-5 w-5 text-blue-400" />
              <h3 className="text-base font-medium">Verified Opportunities</h3>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <ShieldCheck className="h-5 w-5 text-blue-400" />
              <h3 className="text-base font-medium">Secure Dashboard</h3>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <h3 className="text-base font-medium">Expert Guidance</h3>
            </div>
          </div>
        </div>

        {/* Bottom: Footer */}
        <div className="mt-auto text-[11px] text-white/40">
          Not a SEBI-recognised platform. Values are indicative only. © IndexMoney
        </div>
      </div>

      {/* Right Pane (Forms) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 bg-[#001845] relative">
        <div className="w-full max-w-sm">
          <div className="lg:hidden absolute top-8 left-8">
            <Link to="/">
              <img src={IMAGES.logo} alt="Index Money" className="h-8 w-auto brightness-0 invert" />
            </Link>
          </div>
          
          <div className="lg:hidden mb-12 mt-12 flex justify-center">
             <img src={IMAGES.logo} alt="Index Money" className="h-10 w-auto brightness-0 invert" />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
