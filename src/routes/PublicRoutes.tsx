import { Navigate, Outlet } from "react-router-dom";
import { useContextAuth } from "@/context/AuthContext";

export const PublicRoutes = () => {
  const { isAuthenticated } = useContextAuth();

  if (isAuthenticated === null) {
    return null;
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to="/collections" />;
};
