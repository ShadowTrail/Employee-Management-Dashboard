// src/components/ProtectedRoute.tsx

import React from "react";
import { Navigate } from "react-router-dom";

// Define the props for ProtectedRoute
interface ProtectedRouteProps {
  children: JSX.Element;
}

// Create the ProtectedRoute component without extending RouteProps
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check if token exists

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child components (protected pages)
  return children;
};

export default ProtectedRoute;

