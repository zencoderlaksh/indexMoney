import React from "react";
import AppRoutes from "./appRoutes/AppRoutes";
import BottomConsultationBar from "./components/BottomConsultationBar";

const App = () => {
  return (
    <div>
      <AppRoutes />
      <BottomConsultationBar />
    </div>
  );
};

export default App;
