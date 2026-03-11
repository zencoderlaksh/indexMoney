import { create } from "zustand";

// Use a relative path by default so the app works behind HTTPS hosts (Netlify/Render/etc).
// Override via VITE_API_BASE_URL in your environment for custom backends.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export const useEnquiryStore = create((set) => ({
  isSubmitting: false,
  serverError: "",
  successMessage: "",

  submitEnquiry: async (payload) => {
    set({ isSubmitting: true, serverError: "", successMessage: "" });

    try {
      const res = await fetch(`${API_BASE}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || "Unable to submit enquiry");
      }

      set({
        successMessage:
          "Thanks! We received your enquiry and will get back to you soon.",
        isSubmitting: false,
      });
    } catch (err) {
      set({
        serverError: err.message || "Something went wrong. Please try again.",
        isSubmitting: false,
      });
    }
  },

  reset: () =>
    set({ serverError: "", successMessage: "", isSubmitting: false }),
}));
