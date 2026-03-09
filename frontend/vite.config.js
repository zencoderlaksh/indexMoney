import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    legacy({
      // Support older Android browsers (WebView/Chrome) by generating a legacy build.
      // Adjust the targets as needed based on the devices you need to support.
      targets: ["Android >= 4.4", "iOS >= 10"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    react(),
    tailwindcss(),
  ],
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
