import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone, Globe, MapPin, ArrowRight, AlertCircle } from "lucide-react";
import { signupSchema } from "../../schemas/authSchema";

/* ── Country → Cities map ──────────────────────────────────────────────────── */
const COUNTRY_CITIES = {
    India: ["Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad"],
    USA: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "San Francisco", "Seattle"],
    UK: ["London", "Manchester", "Birmingham", "Liverpool", "Leeds", "Bristol", "Edinburgh"],
    Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton", "Quebec City"],
    Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Canberra", "Gold Coast"],
};

const COUNTRIES = Object.keys(COUNTRY_CITIES);

/* ── Shared styles ─────────────────────────────────────────────────────────── */
const inputBase =
    "w-full bg-white border rounded-xl px-4 py-3 pl-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200";
const inputNormal = "border-slate-200 focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20";
const inputError = "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200";
const selectBase =
    "w-full bg-white border rounded-xl px-4 py-3 pl-10 text-sm text-slate-800 outline-none transition-all duration-200 appearance-none cursor-pointer";

const FieldError = ({ message }) =>
    message ? (
        <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
            {message}
        </p>
    ) : null;

/* ── SignupForm ─────────────────────────────────────────────────────────────── */
const SignupForm = ({ onSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [cities, setCities] = useState([]);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(signupSchema) });

    const selectedCountry = watch("country");

    /* Update city list whenever country changes */
    useEffect(() => {
        const list = COUNTRY_CITIES[selectedCountry] || [];
        setCities(list);
        setValue("city", ""); // reset city when country changes
    }, [selectedCountry, setValue]);

    const onSubmit = async (data) => {
        setServerError("");
        await new Promise((r) => setTimeout(r, 700));

        // Check if email already registered
        const existing = JSON.parse(localStorage.getItem("im_users") || "[]");
        const alreadyExists = existing.some((u) => u.email === data.email);
        if (alreadyExists) {
            setServerError("An account with this email already exists. Please log in.");
            return;
        }

        // Save user to localStorage array
        const newUser = {
            fullName: data.fullName,
            email: data.email,
            mobileNumber: data.mobileNumber,
            country: data.country,
            city: data.city,
            password: data.password, // demo only — never do this in production
        };
        localStorage.setItem("im_users", JSON.stringify([...existing, newUser]));

        if (onSuccess) onSuccess(newUser);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            {/* Server-side error banner */}
            {serverError && (
                <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
                >
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-600 font-medium">{serverError}</p>
                </motion.div>
            )}
            {/* Full Name */}
            <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Full Name</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="John Doe"
                        autoComplete="name"
                        {...register("fullName")}
                        className={`${inputBase} ${errors.fullName ? inputError : inputNormal}`}
                    />
                </div>
                <FieldError message={errors.fullName?.message} />
            </div>

            {/* Email */}
            <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Email Address</label>
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

            {/* Mobile Number */}
            <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Mobile Number</label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="tel"
                        placeholder="10-digit number"
                        autoComplete="tel"
                        maxLength={10}
                        {...register("mobileNumber")}
                        className={`${inputBase} ${errors.mobileNumber ? inputError : inputNormal}`}
                    />
                </div>
                <FieldError message={errors.mobileNumber?.message} />
            </div>

            {/* Country + City row */}
            <div className="grid grid-cols-2 gap-3">
                {/* Country */}
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Country</label>
                    <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                        <select
                            {...register("country")}
                            className={`${selectBase} ${errors.country ? inputError : inputNormal}`}
                        >
                            <option value="">Select</option>
                            {COUNTRIES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 20 20">
                                <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <FieldError message={errors.country?.message} />
                </div>

                {/* City */}
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">City</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                        <select
                            {...register("city")}
                            disabled={cities.length === 0}
                            className={`${selectBase} ${errors.city ? inputError : inputNormal} ${cities.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <option value="">{cities.length === 0 ? "— pick country first —" : "Select"}</option>
                            {cities.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 20 20">
                                <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <FieldError message={errors.city?.message} />
                </div>
            </div>

            {/* Password */}
            <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Min 8 chars + 1 number"
                        autoComplete="new-password"
                        {...register("password")}
                        className={`${inputBase} pr-10 ${errors.password ? inputError : inputNormal}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                <FieldError message={errors.password?.message} />
            </div>

            {/* Confirm Password */}
            <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Confirm Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        {...register("confirmPassword")}
                        className={`${inputBase} pr-10 ${errors.confirmPassword ? inputError : inputNormal}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        tabIndex={-1}
                    >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                <FieldError message={errors.confirmPassword?.message} />
            </div>

            {/* Submit */}
            <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, backgroundColor: "#3A9295" }}
                whileTap={{ scale: 0.98 }}
                className="mt-1 w-full flex items-center justify-center gap-2 bg-[#63C1BB] text-white font-semibold text-sm py-3.5 rounded-xl shadow-md shadow-[#63C1BB]/25 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Creating account…
                    </span>
                ) : (
                    <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
            </motion.button>
        </form>
    );
};

export default SignupForm;
