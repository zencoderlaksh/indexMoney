import React, { useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import { Edit2, ShieldCheck, QrCode, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [paymentRef, setPaymentRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ kind: "", text: "" });

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!paymentRef.trim()) {
      setStatus({ kind: "error", text: "Please enter a valid payment reference." });
      return;
    }

    try {
      setLoading(true);
      setStatus({ kind: "", text: "" });
      const token = useAuthStore.getState().token;
      
      const res = await fetch(`${API_BASE}/partners/submit-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ paymentRef }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to submit payment");

      setStatus({ kind: "success", text: "Payment submitted successfully. Awaiting admin verification." });
      // Update local user state
      setUser({ ...user, partnerStatus: "pending", partnerPaymentRef: paymentRef });
    } catch (error) {
      setStatus({ kind: "error", text: error.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#48cae4] mb-2">
          Your Account
        </p>
        <h1 className="text-4xl font-serif font-bold text-white">Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details Card */}
        <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Personal details</h2>
            <button className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/5 transition-colors">
              <Edit2 className="h-4 w-4" />
              Edit
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between border-b border-white/5 pb-4">
              <span className="text-white/60 text-sm">Name</span>
              <span className="font-semibold text-white">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            
            <div className="flex justify-between border-b border-white/5 pb-4">
              <span className="text-white/60 text-sm">Email</span>
              <span className="font-semibold text-white">{user?.email}</span>
            </div>

            <div className="flex justify-between border-b border-white/5 pb-4">
              <span className="text-white/60 text-sm">Mobile</span>
              <span className="font-semibold text-white">{user?.mobileNumber || "-"}</span>
            </div>

            <div className="flex justify-between border-b border-white/5 pb-4">
              <span className="text-white/60 text-sm">PAN</span>
              <span className="font-semibold text-white">{user?.pan || "-"}</span>
            </div>
          </div>
        </div>

        {/* Sign-in & Security Card */}
        <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-2">Sign-in & security</h2>
            <p className="text-sm text-white/60 leading-relaxed">
              Your account is protected by <span className="font-semibold text-white">one-time passwords (OTP)</span> sent to your email — there's no password to remember or leak.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between border-b border-white/5 pb-4">
              <span className="text-white/60 text-sm">Sign-in method</span>
              <span className="font-semibold text-white">Email OTP</span>
            </div>

            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-white/60 text-sm">KYC status</span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Partner Program Card */}
        <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6 lg:p-8 md:col-span-1 lg:col-span-2">
          <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#48cae4]" />
                Partner Program
              </h2>
              <p className="text-sm text-white/60 leading-relaxed max-w-2xl">
                Upgrade your account to become an IndexMoney Partner. Gain access to bulk pricing, exclusive features, and a dedicated partner dashboard.
              </p>
            </div>
            <div>
              {user?.partnerStatus === "verified" ? (
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 flex items-center gap-2 whitespace-nowrap">
                  <CheckCircle2 className="h-4 w-4" />
                  Active Partner
                </span>
              ) : user?.partnerStatus === "pending" ? (
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-400 whitespace-nowrap">
                  Verification Pending
                </span>
              ) : (
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/60 whitespace-nowrap">
                  Not a partner
                </span>
              )}
            </div>
          </div>

          {(!user?.partnerStatus || user?.partnerStatus === "none" || user?.partnerStatus === "rejected") && (
            <div className="rounded-xl border border-white/5 bg-white/5 p-6 mt-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 bg-white p-4 rounded-xl text-center">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=IndexMoneyDummyQR" 
                    alt="Payment QR Code"
                    className="w-32 h-32 object-contain"
                  />
                  <p className="text-xs font-semibold text-slate-800 mt-2">Scan to Pay</p>
                </div>
                
                <div className="flex-1 w-full">
                  <h3 className="text-lg font-bold text-white mb-2">Complete your partner registration</h3>
                  <p className="text-sm text-white/60 mb-6">
                    Scan the QR code to make the partner registration payment. Once completed, enter the UTR / Transaction reference number below to verify your payment.
                  </p>
                  
                  {status.text && (
                    <div className={`mb-6 flex items-start gap-3 rounded-xl px-4 py-3 text-sm border ${
                      status.kind === "success" 
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : "border-red-500/20 bg-red-500/10 text-red-400"
                    }`}>
                      {status.kind === "success" ? (
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      )}
                      <span>{status.text}</span>
                    </div>
                  )}

                  <form onSubmit={handlePaymentSubmit} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <QrCode className="h-5 w-5 text-white/40" />
                      </div>
                      <input
                        type="text"
                        value={paymentRef}
                        onChange={(e) => setPaymentRef(e.target.value)}
                        placeholder="Enter UTR or Reference Number"
                        className="w-full rounded-xl border border-white/10 bg-[#000d26] pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#48cae4] focus:ring-1 focus:ring-[#48cae4] transition-all"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#48cae4] px-6 py-3 text-sm font-bold text-[#001233] transition-all hover:bg-[#48cae4]/90 disabled:opacity-70 whitespace-nowrap"
                    >
                      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                      Submit Payment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
