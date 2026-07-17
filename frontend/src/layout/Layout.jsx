import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import Header from "./Header";
import Footer from "./Footer";
import PartnerPaymentModal from "../components/PartnerPaymentModal";

const Layout = () => {
  const { user, token } = useAuthStore();
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  useEffect(() => {
    // Show modal if user is a partner but status is 'none', 'rejected', or undefined
    if (user && user.isPartner) {
      const status = user.partnerStatus;
      if (!status || status === "none" || status === "rejected") {
        setShowPartnerModal(true);
      } else {
        setShowPartnerModal(false);
      }
    } else {
      setShowPartnerModal(false);
    }
  }, [user]);

  const authHeaders = {
    Authorization: `Bearer ${token}`,
  };

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {user && (
        <PartnerPaymentModal 
          isOpen={showPartnerModal}
          user={user}
          onClose={() => setShowPartnerModal(false)}
          authHeaders={authHeaders}
        />
      )}
    </>
  );
};

export default Layout;
