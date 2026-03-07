import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute
 * Wraps a component and redirects to /login if the user is not logged in.
 * Usage:  <ProtectedRoute><DashboardPage /></ProtectedRoute>
 */
const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
