import { matchPath, Outlet, useLocation } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const IGNORE_PATHS = [
  "/login",
  "/register",
  "/reset-password/:token",
  "/forgot-password",
];

export const AppLayout = () => {
  const location = useLocation();

  const shouldIgnore = !IGNORE_PATHS.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  return (
    <>
      {shouldIgnore && <Header />}
      <Outlet />
      {shouldIgnore && <Footer />}
    </>
  );
};
