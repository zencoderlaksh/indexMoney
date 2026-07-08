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
      if (!user || !token) {
        localStorage.removeItem(STORAGE_USER_KEY);
        localStorage.removeItem(STORAGE_TOKEN_KEY);
        set({ user: null, token: null });
        return;
      }

      set({ user, token });
    } catch {
      localStorage.removeItem(STORAGE_USER_KEY);
      localStorage.removeItem(STORAGE_TOKEN_KEY);
      set({ user: null, token: null });
    }
  },

  refreshProfile: async () => {
    const token = localStorage.getItem(STORAGE_TOKEN_KEY);
    if (!token) {
      return null;
    }

    try {
      const res = await fetch(`${API_BASE}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Unable to refresh session");
      }

      const json = await res.json().catch(() => ({}));
      const user = json?.data;

      if (!user) {
        throw new Error("Missing user profile");
      }

      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      set({ user, token });
      return user;
    } catch {
      localStorage.removeItem(STORAGE_USER_KEY);
      localStorage.removeItem(STORAGE_TOKEN_KEY);
      set({ user: null, token: null });
      return null;
    }
  },

  setSession: (user, token) => {
    if (!user || !token) return;
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
    localStorage.setItem(STORAGE_TOKEN_KEY, token);
    set({ user, token, error: "", isSubmitting: false });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_USER_KEY);
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    set({ user: null, token: null });
  },
}));
