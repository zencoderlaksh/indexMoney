import React from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../../constants/images";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#001233] text-white">
      {/* Left Pane (Branding) */}
      <div className="hidden lg:flex w-1/2 flex-col px-16 py-12 justify-center border-r border-white/10 relative">
        <div className="absolute top-12 left-16">
          <Link to="/">
            <img src={IMAGES.logo} alt="Index Money" className="h-10 w-auto brightness-0 invert" />
          </Link>
        </div>
        

        <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-tight mb-8">
          Your unlisted <br />
          portfolio, in focus.
        </h1>
        <p className="text-base text-white/80 max-w-md mb-12 leading-relaxed">
          Track your confirmed holdings and indicative values, view your KYC, and raise a buy or sell enquiry — all in one private, secure dashboard.
        </p>
        <div className="flex gap-12 mt-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Indicative Portfolio</h3>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Secure sign in</h3>
          </div>
        </div>

        <div className="absolute bottom-12 left-16 text-xs text-white/50">
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
