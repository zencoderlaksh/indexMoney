import React from "react";
import { useLocation } from "react-router-dom";
import UnlistedSharesPage from "../unlistedShares/UnlistedSharesPage";

const Home = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.slice(1);
    window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);
  }, [location.hash]);

  return <UnlistedSharesPage />;
};

export default Home;
