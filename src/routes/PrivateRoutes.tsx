import { Navigate, Outlet } from "react-router-dom";
import { useContextAuth } from "@/context/AuthContext";

export const PrivateRoutes = () => {
  const { isAuthenticated } = useContextAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
