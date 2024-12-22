// hooks/protectedRoute.tsx

import { useAuth } from "@/context/authContext";
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: string; // Optional requiredRole prop
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, role } = useAuth(); // Get the role from the AuthContext

  // If the user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // If a required role is provided, check if the user's role matches
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" replace />; // Redirect to a different page or dashboard if the role doesn't match
  }

  return children; // If everything is fine, render the children
};
