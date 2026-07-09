import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useAuthStore } from "../../stores/authStore";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useAuthStore((s) => s.setSession);

  const identifier = location.state?.email;
  const isEmail = !!location.state?.email;

  useEffect(() => {
    if (!identifier) {
      navigate("/login");
    }
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [identifier, navigate]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Allow pasting
    if (value.length > 1) {
      const pastedData = value.slice(0, 6).split("");
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      // Focus last filled input
      const lastFilledIndex = Math.min(pastedData.length, 5);
      if (inputRefs.current[lastFilledIndex]) {
        inputRefs.current[lastFilledIndex].focus();
      }
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const payload = { otp: otpValue };
      if (isEmail) payload.email = identifier;

      const response = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid OTP");
      }

      // Success
      setSession(data.data, data.token);
      
      // Always redirect to home page, nav bar handles dashboard access
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
        <button
          onClick={() => navigate("/login")}
          className="text-sm text-white/60 hover:text-white mb-6 flex items-center gap-1 transition-colors"
        >
          &lt; Back
        </button>

        <h2 className="text-3xl font-serif font-bold mb-3">Enter the OTP</h2>
        <p className="text-sm text-white/70 mb-8 leading-relaxed">
          We sent a 6-digit code to <span className="font-semibold text-[#48cae4]">{identifier}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={6} // allow paste
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 bg-[#001233] border border-white/10 rounded-xl text-center text-xl text-white font-bold focus:outline-none focus:border-[#48cae4] focus:ring-1 focus:ring-[#48cae4] transition-colors"
              />
            ))}
          </div>

          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading || otp.join("").length !== 6}
            className="w-full bg-gradient-to-r from-[#0466c8] to-[#0353a4] hover:opacity-90 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed mb-6"
          >
            {isLoading ? "Verifying..." : "Verify & continue"}
          </button>
        </form>

        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Didn't get it?</span>
          <button className="text-[#48cae4] font-semibold hover:underline">
            Resend
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyOtpPage;
