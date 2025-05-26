import { Navigate, Outlet } from "react-router-dom";
import { useContextAuth } from "@/context/AuthContext";

export const PublicRoutes = () => {
  const { isAuthenticated } = useContextAuth();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
