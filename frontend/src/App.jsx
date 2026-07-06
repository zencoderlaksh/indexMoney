import React, { useEffect } from "react";
import AppRoutes from "./appRoutes/AppRoutes";
import BottomConsultationBar from "./components/BottomConsultationBar";
import { useThemeStore } from "./stores/themeStore";
import Lenis from "lenis";

const App = () => {
  const initTheme = useThemeStore((state) => state.initTheme);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div>
      <AppRoutes />
      <BottomConsultationBar />
    </div>
  );
};

export default App;
