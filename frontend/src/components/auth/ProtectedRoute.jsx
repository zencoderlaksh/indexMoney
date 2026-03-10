import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

/**
 * ProtectedRoute
 * Wraps a component and redirects to /login if the user is not logged in.
 * Usage:  <ProtectedRoute><DashboardPage /></ProtectedRoute>
 */
const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
