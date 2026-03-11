import { create } from "zustand";

const STORAGE_USER_KEY = "im_user";
const STORAGE_TOKEN_KEY = "im_token";

// Use a relative path by default so the app works behind HTTPS hosts (Netlify/Render/etc).
// Override via VITE_API_BASE_URL in your environment for custom backends.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isSubmitting: false,
  error: "",

  loadFromStorage: () => {
    try {
      const user = JSON.parse(localStorage.getItem(STORAGE_USER_KEY) || "null");
      const token = localStorage.getItem(STORAGE_TOKEN_KEY);
      set({ user, token });
    } catch {
      set({ user: null, token: null });
    }
  },

  signup: async (payload) => {
    set({ isSubmitting: true, error: "" });
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let json;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        json = await res.json();
      } else {
        const text = await res.text();
        json = { error: text };
      }

      if (!res.ok) {
        throw new Error(json?.error || "Signup failed");
      }

      const { data: user, token } = json;
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      localStorage.setItem(STORAGE_TOKEN_KEY, token);

      set({ user, token, isSubmitting: false });
      return user;
    } catch (err) {
      set({ error: err.message || "Unable to signup", isSubmitting: false });
      throw err;
    }
  },

  login: async (payload) => {
    set({ isSubmitting: true, error: "" });
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let json;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        json = await res.json();
      } else {
        const text = await res.text();
        json = { error: text };
      }

      if (!res.ok) {
        throw new Error(json?.error || "Login failed");
      }

      const { data: user, token } = json;
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      localStorage.setItem(STORAGE_TOKEN_KEY, token);

      set({ user, token, isSubmitting: false });
      return user;
    } catch (err) {
      set({ error: err.message || "Unable to login", isSubmitting: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem(STORAGE_USER_KEY);
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    set({ user: null, token: null });
  },
}));
