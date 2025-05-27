import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const IGNORE_PATHS = ["/login", "/register", "/reset-password"];

export const AppLayout = () => {
  const location = useLocation();
  const shouldRender = !IGNORE_PATHS.includes(location.pathname);

  return (
    <>
      {shouldRender && <Header />}
      <Outlet />
      {shouldRender && <Footer />}
    </>
  );
};
