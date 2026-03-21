import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import SignupPage from "../pages/auth/SignupPage";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import SubscriptionPage from "../pages/subscription/SubscriptionPage";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";
import Disclaimer from "../pages/legal/Disclaimer";
import TermsAndConditions from "../pages/legal/TermsAndConditions";
import ContactPage from "../pages/contact/ContactPage";
import UnlistedSharesPage from "../pages/unlistedShares/UnlistedSharesPage";
import ServicesPage from "../pages/services/ServicesPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public — with header/footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/unlisted-shares" element={<UnlistedSharesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Route>

      {/* Subscription checkout — no header, standalone page */}
      <Route path="/pay-now" element={<SubscriptionPage />} />

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
