import { create } from "zustand";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";
const isRelativeApiBase = API_BASE.startsWith("/");
const PRODUCTION_API_BASE = "https://indexmoney-api.onrender.com/api";

const postDematAccount = async (apiBase, payload) => {
  const res = await fetch(`${apiBase}/demat-accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json?.error || "Unable to submit demat account request");
  }

  return json;
};

export const useDematAccountStore = create((set) => ({
  isSubmitting: false,
  serverError: "",
  successMessage: "",

  submitDematAccount: async (payload) => {
    set({ isSubmitting: true, serverError: "", successMessage: "" });

    try {
      let json;

      try {
        json = await postDematAccount(API_BASE, payload);
      } catch (error) {
        const canTryProduction =
          isRelativeApiBase && import.meta.env.DEV && /Failed to fetch|Unable to submit/i.test(error.message);

        if (!canTryProduction) {
          throw error;
        }

        json = await postDematAccount(PRODUCTION_API_BASE, payload);
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
