import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./appRoutes/AppRoutes";
import ErrorBoundary from "./components/ErrorBoundary";
import { useAuthStore } from "./stores/authStore";
import "./index.css";

// Load persisted auth state from localStorage before app render
useAuthStore.getState().loadFromStorage();

try {
  const rootEl = document.getElementById("root");

  if (!rootEl) {
    throw new Error("Root element #root not found in DOM.");
  }

  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>,
  );
} catch (err) {
  // Last-resort fallback: if React itself cannot bootstrap,
  // inject a plain HTML message so the user never sees a blank page.
  console.error("[main] Fatal bootstrap error:", err);
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `
      <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;
                  justify-content:center;font-family:sans-serif;padding:24px;text-align:center">
        <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#0d9488,#14b8a6);
                    display:flex;align-items:center;justify-content:center;margin-bottom:20px">
          <span style="color:#fff;font-size:24px;font-weight:700">&#8377;</span>
        </div>
        <h1 style="font-size:22px;font-weight:700;color:#111827;margin:0 0 10px">Unable to load IndexMoney</h1>
        <p style="color:#6b7280;margin:0 0 24px;max-width:320px;line-height:1.6">
          Please try refreshing the page. If the problem persists, try clearing your browser cache.
        </p>
        <button onclick="window.location.reload()"
          style="background:linear-gradient(135deg,#0d9488,#14b8a6);color:#fff;border:none;
                 border-radius:10px;padding:12px 28px;font-size:15px;font-weight:600;cursor:pointer">
          Reload
        </button>
      </div>
    `;
  }
}
