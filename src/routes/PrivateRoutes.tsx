import { Navigate, Outlet } from "react-router-dom";
import { useContextAuth } from "@/context/AuthContext";

export const PrivateRoutes = () => {
  const { isAuthenticated } = useContextAuth();

  console.log(isAuthenticated);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
