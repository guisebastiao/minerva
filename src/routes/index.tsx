import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "@/routes/PrivateRoutes";
import { PublicRoutes } from "@/routes/PublicRoutes";

import { NotFound } from "@/pages/NotFound";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { Home } from "@/pages/Home";
import { Community } from "@/pages/Community";
import { AppLayout } from "./AppLayout";
import { Collection } from "@/pages/Collection";
import { Setting } from "@/pages/Setting";
import { CreateCollection } from "@/pages/CreateCollection";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <PublicRoutes />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "/community",
            element: <Community />,
          },
          {
            path: "/collections",
            element: <Collection />,
          },
          {
            path: "/settings",
            element: <Setting />,
          },
          {
            path: "/create-collection",
            element: <CreateCollection />,
          },
        ],
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
