import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QueryProvider } from "./context/QueryContext";
import { Toaster } from "@/components/Toaster";
import { router } from "@/routes";
import "@/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <QueryProvider>
      <RouterProvider router={router} />
      <Toaster />
    </QueryProvider>
  </AuthProvider>
);
