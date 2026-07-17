import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

const PartnerLoginPage = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
        <p className="text-xs font-bold tracking-widest text-[#48cae4] uppercase mb-4">
          Partner Portal
        </p>
        <h2 className="text-3xl font-serif font-bold mb-3">Coming Soon</h2>
        <p className="text-sm text-white/70 mb-8 leading-relaxed">
          The dedicated partner journey and dashboard are currently under development. 
          Please check back later or contact support if you need immediate assistance.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md"
        >
          Back to User Login
        </button>
      </div>
    </AuthLayout>
  );
};

export default PartnerLoginPage;
