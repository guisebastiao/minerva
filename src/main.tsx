import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QueryProvider } from "./context/QueryContext";
import { Toaster } from "@/components/Toaster";
import "@/styles/index.css";
import { router } from "@/routes";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <QueryProvider>
      <RouterProvider router={router} />
      <Toaster />
    </QueryProvider>
  </AuthProvider>
);
