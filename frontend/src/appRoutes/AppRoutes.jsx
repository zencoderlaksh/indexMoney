import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import SignupPage from "../pages/auth/SignupPage";
import LoginPage from "../pages/auth/LoginPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import AdminDashboardPage from "../pages/dashboard/AdminDashboardPage";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import ProfilePage from "../pages/dashboard/ProfilePage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import SubscriptionPage from "../pages/subscription/SubscriptionPage";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";
import Disclaimer from "../pages/legal/Disclaimer";
import TermsAndConditions from "../pages/legal/TermsAndConditions";
import ContactPage from "../pages/contact/ContactPage";
import UnlistedSharesPage from "../pages/unlistedShares/UnlistedSharesPage";
import UnlistedShareDetailPage from "../pages/unlistedShares/UnlistedShareDetailPage";
import SectorsPage from "../pages/unlistedShares/SectorsPage";
import DrhpFiledPage from "../pages/unlistedShares/DrhpFiledPage";
import LearnPage from "../pages/learn/LearnPage";
import ResearchPage from "../pages/research/ResearchPage";
import MediaPage from "../pages/media/MediaPage";
import ServicesPage from "../pages/services/ServicesPage";
import PastPerformancePage from "../pages/pastPerformance/PastPerformancePage";
import BlogsPage from "../pages/blogs/BlogsPage";
import PartnerPage from "../pages/partner/PartnerPage";
import OfficialBankAccountsPage from "../pages/legal/OfficialBankAccountsPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public — with header/footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/services" element={<ServicesPage />} /> */}
        <Route path="/unlisted-shares" element={<UnlistedSharesPage />} />
        <Route path="/unlisted-shares/:code/:slug" element={<UnlistedShareDetailPage />} />
        <Route path="/sectors" element={<SectorsPage />} />
        <Route path="/drhp-filed" element={<DrhpFiledPage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/learn/:slug" element={<LearnPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/research/:slug" element={<ResearchPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/past-performance" element={<PastPerformancePage />} /> */}
        <Route path="/knowledge-center" element={<BlogsPage />} />
        <Route path="/knowledge-center/:slug" element={<BlogsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/partner" element={<PartnerPage />} />
        <Route path="/official-bank-accounts" element={<OfficialBankAccountsPage />} />
      </Route>

      {/* Subscription checkout — no header, standalone page */}
      {/* <Route path="/pay-now" element={<SubscriptionPage />} /> */}

      {/* Auth pages — no header/footer */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />

      {/* Admin dashboard */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />

      {/* User Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="profile" replace />} />
        {/* We will add more tabs later (overview, portfolio, kyc) */}
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Legacy /auth redirect */}
      <Route path="/auth" element={<Navigate to="/signup" replace />} />
      <Route path="/auth/signup" element={<Navigate to="/signup" replace />} />
      <Route path="/auth/login" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
