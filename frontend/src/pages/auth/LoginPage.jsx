import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const LoginPage = () => {
  const [method, setMethod] = useState("email"); // forced to email
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const payload = {};
      if (method === "email") {
        payload.email = identifier;
      }
      // Mobile logic removed:
      // else {
      //   payload.mobileNumber = identifier;
      // }

      const response = await fetch(`${API_BASE}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          // User not found, redirect to signup
          navigate("/signup", { state: { [method]: identifier } });
          return;
        }
        throw new Error(data.error || "Failed to send OTP");
      }

      // Success, redirect to verify OTP
      navigate("/verify-otp", { state: { [method]: identifier } });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <p className="text-xs font-bold tracking-widest text-[#48cae4] uppercase mb-4">
          Get Started
        </p>
        <h2 className="text-3xl font-serif font-bold mb-3">Create your account</h2>
        <p className="text-sm text-white/70 mb-8 leading-relaxed">
          Enter your email or mobile. If you're already an Index Money customer, we'll link your existing portfolio.
        </p>

        {/* Mobile toggle removed for now
        <div className="flex bg-white/5 rounded-xl p-1 mb-6 border border-white/10">
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
              method === "email" ? "bg-[#0353a4] text-white shadow-sm" : "text-white/70 hover:text-white"
            }`}
            onClick={() => {
              setMethod("email");
              setIdentifier("");
              setError("");
            }}
          >
            Email
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
              method === "mobile" ? "bg-[#0353a4] text-white shadow-sm" : "text-white/70 hover:text-white"
            }`}
            onClick={() => {
              setMethod("mobile");
              setIdentifier("");
              setError("");
            }}
          >
            Mobile
          </button>
        </div>
        */}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm text-white/80 mb-2">
              Email address
            </label>
            <input
              type="email"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#001233] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00f5ff] transition-colors"
            />
          </div>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            disabled={isLoading || !identifier}
            className="w-full bg-gradient-to-r from-[#0466c8] to-[#0353a4] hover:opacity-90 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Please wait..." : "Continue"}
          </button>
          
          <div className="mt-6 text-center border-t border-white/10 pt-6">
            <p className="text-sm text-white/70">
              Are you a Partner?{" "}
              <button
                type="button"
                onClick={() => navigate("/partner/login")}
                className="text-[#00f5ff] font-semibold hover:underline"
              >
                Login here
              </button>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
