import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, CheckCircle2, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";
const PAYMENT_UPI_ID = "9270069221@kotakbank";
const PAYMENT_PAYEE = "NEHA SONI PARWAL";
const PAYMENT_UPI_LINK = `upi://pay?pa=${PAYMENT_UPI_ID}&pn=${encodeURIComponent(PAYMENT_PAYEE)}&cu=INR&am=3000`;
const PAYMENT_QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(PAYMENT_UPI_LINK)}`;

const PartnerPaymentModal = ({ isOpen, user, onClose, authHeaders }) => {
  const navigate = useNavigate();
  const [paymentRef, setPaymentRef] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/partners/submit-payment`, {
        method: "POST",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentRef }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit payment");

      setSuccess(true);
      
      // Update local storage user state to 'pending' to stop showing the modal
      const localUser = JSON.parse(localStorage.getItem("user") || "{}");
      localUser.partnerStatus = "pending";
      localStorage.setItem("user", JSON.stringify(localUser));

      setTimeout(() => {
        onClose();
        navigate("/dashboard");
        window.location.reload();
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col md:flex-row h-full">
            {/* Left side: QR Code */}
            <div className="bg-slate-50 p-8 md:w-5/12 border-r border-slate-100 flex flex-col items-center justify-center text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0353a4]/10 text-[#0353a4] text-xs font-bold uppercase tracking-wider mb-6">
                <Shield className="h-4 w-4" />
                Secure Payment
              </div>
              
              <h3 className="font-bold text-xl text-slate-800 mb-2">Partner Onboarding</h3>
              <p className="text-sm text-slate-500 mb-6">
                Please complete the payment of <span className="font-bold text-slate-900">₹3,000</span> to activate your partner account.
              </p>

              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6">
                <img src={PAYMENT_QR_SRC} alt="UPI QR Code" className="w-48 h-48 mx-auto" />
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <p>UPI ID: <span className="font-mono font-medium text-slate-700">{PAYMENT_UPI_ID}</span></p>
                <p>Payee: <span className="font-medium text-slate-700">{PAYMENT_PAYEE}</span></p>
              </div>
            </div>

            {/* Right side: Form */}
            <div className="p-8 md:w-7/12 flex flex-col justify-center">
              {success ? (
                <div className="text-center py-8">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Payment Submitted!</h3>
                  <p className="text-slate-600">
                    Thank you. We are verifying your payment. You will be redirected to the dashboard shortly.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Submit Payment Details</h3>
                    <p className="text-sm text-slate-500">
                      Once you have made the payment, enter the UTR/Reference number below.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        UTR / Transaction Reference No. <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentRef}
                        onChange={(e) => setPaymentRef(e.target.value)}
                        placeholder="e.g. 123456789012"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#0353a4] focus:outline-none focus:ring-1 focus:ring-[#0353a4]"
                      />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                      type="submit"
                      disabled={isLoading || !paymentRef}
                      className="w-full rounded-xl bg-[#0353a4] px-4 py-3 text-sm font-bold text-white hover:bg-[#023e7d] transition-colors disabled:opacity-70 flex items-center justify-center gap-2 mt-4"
                    >
                      {isLoading ? "Submitting..." : (
                        <>
                          <Upload className="h-4 w-4" />
                          Submit for Verification
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PartnerPaymentModal;
