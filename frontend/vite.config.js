import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Transpile to ES2015 so older mobile Chrome browsers can parse the bundles.
    // Without this, Vite defaults to 'esnext' which can silently fail on
    // older Android Chrome versions and produce a blank white screen.
    target: "es2015",
  },
});
