import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Services/Auth"; // Adjust the import based on your file structure

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
