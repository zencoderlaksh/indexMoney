import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "./AuthLayout";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const SignupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Pre-fill from login page if available
  const initialEmail = location.state?.email || "";
  const initialMobile = location.state?.mobile || "";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: initialEmail,
    // mobileNumber: initialMobile,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      // Success, redirect to verify OTP
      navigate("/verify-otp", { 
        state: { 
          email: form.email, 
          // mobile: form.mobileNumber 
        } 
      });
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

        <h2 className="text-3xl font-serif font-bold mb-3">A few details</h2>
        <p className="text-sm text-white/70 mb-8 leading-relaxed">
          We'll create your account as a new lead and our team will help you get started.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-white/80 mb-2">First name</label>
              <input
                type="text"
                name="firstName"
                required
                value={form.firstName}
                onChange={handleChange}
              className="w-full bg-[#001233] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#48cae4] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-white/80 mb-2">Last name</label>
            <input
              type="text"
              name="lastName"
              required
              value={form.lastName}
              onChange={handleChange}
              className="w-full bg-[#001233] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#48cae4] transition-colors"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-white/80 mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full bg-[#001233] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#48cae4] transition-colors"
          />
        </div>

        {/* Mobile removed
        <div className="mb-6">
          <label className="block text-sm text-white/80 mb-2">Mobile (optional)</label>
          <input
            type="tel"
            name="mobileNumber"
            value={form.mobileNumber}
            onChange={handleChange}
            placeholder="10-digit mobile"
            className="w-full bg-[#001233] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#48cae4] transition-colors"
          />
        </div>
        */}

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={isLoading || !form.firstName || !form.lastName || !form.email}
          className="w-full bg-gradient-to-r from-[#0466c8] to-[#0353a4] hover:opacity-90 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Please wait..." : "Send verification OTP"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-white/60">
        Already a user?{" "}
        <button onClick={() => navigate("/login")} className="text-[#48cae4] font-semibold hover:underline">
          Log in
        </button>
      </p>

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
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
