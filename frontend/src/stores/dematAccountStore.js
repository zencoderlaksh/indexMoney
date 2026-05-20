import { create } from "zustand";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export const useDematAccountStore = create((set) => ({
  isSubmitting: false,
  serverError: "",
  successMessage: "",

  submitDematAccount: async (payload) => {
    set({ isSubmitting: true, serverError: "", successMessage: "" });

    try {
      const res = await fetch(`${API_BASE}/demat-accounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json?.error || "Unable to submit demat account request");
      }

      set({
        successMessage:
          json?.message || "Thanks! We received your demat account request.",
        isSubmitting: false,
      });
      return true;
    } catch (err) {
      set({
        serverError: err.message || "Something went wrong. Please try again.",
        isSubmitting: false,
      });
      return false;
    }
  },

  reset: () =>
    set({ serverError: "", successMessage: "", isSubmitting: false }),
}));
