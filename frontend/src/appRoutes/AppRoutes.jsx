import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import SignupPage from "../pages/auth/SignupPage";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import SubscriptionPage from "../pages/subscription/SubscriptionPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public — with header/footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Subscription checkout — no header, standalone page */}
      <Route path="/subscribe" element={<SubscriptionPage />} />

      {/* Auth pages — no header/footer */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Legacy /auth redirect */}
      <Route path="/auth" element={<Navigate to="/signup" replace />} />
      <Route path="/auth/signup" element={<Navigate to="/signup" replace />} />
      <Route path="/auth/login" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
