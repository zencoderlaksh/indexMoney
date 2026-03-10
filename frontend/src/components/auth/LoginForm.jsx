import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { loginSchema } from "../../schemas/authSchema";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

/* ── Shared styles ─────────────────────────────────────────────────────────── */
const inputBase =
  "w-full bg-white border rounded-xl px-4 py-3 pl-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200";
const inputNormal =
  "border-slate-200 focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20";
const inputError =
  "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200";

const FieldError = ({ message }) =>
  message ?
    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
      <span className="inline-block w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
      {message}
    </p>
  : null;

/* ── LoginForm ──────────────────────────────────────────────────────────────── */
const LoginForm = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, isSubmitting, error } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      const user = await login(data);
      if (onSuccess) onSuccess(user);
      navigate("/dashboard", { replace: true });
    } catch {
      // error is handled in the store
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      noValidate
    >
      {/* Global auth error banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
        >
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-600 font-medium">{error}</p>
        </motion.div>
      )}

      {/* Email */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email")}
            className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
          />
        </div>
        <FieldError message={errors.email?.message} />
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            {...register("password")}
            className={`${inputBase} pr-10 ${errors.password ? inputError : inputNormal}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ?
              <EyeOff className="w-4 h-4" />
            : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <FieldError message={errors.password?.message} />
      </div>

      {/* Forgot password */}
      <div className="flex justify-end -mt-2">
        <button
          type="button"
          className="text-xs text-[#3A9295] hover:text-[#105F68] font-medium transition-colors"
        >
          Forgot password?
        </button>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02, backgroundColor: "#3A9295" }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 bg-[#63C1BB] text-white font-semibold text-sm py-3.5 rounded-xl shadow-md shadow-[#63C1BB]/25 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ?
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Logging in…
          </span>
        : <>
            Login to Dashboard
            <ArrowRight className="w-4 h-4" />
          </>
        }
      </motion.button>
    </form>
  );
};

export default LoginForm;
