import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "@/routes/PrivateRoutes";
import { PublicRoutes } from "@/routes/PublicRoutes";

import { NotFound } from "@/pages/NotFound";
import { Login } from "@/pages/Login";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { ResetPassword } from "@/pages/ResetPassword";
import { Register } from "@/pages/Register";
import { Home } from "@/pages/Home";
import { Community } from "@/pages/Community";
import { AppLayout } from "./AppLayout";
import { Collection } from "@/pages/Collection";
import { Setting } from "@/pages/Setting";
import { CreateCollection } from "@/pages/CreateCollection";
import { UpdateCollection } from "@/pages/UpdateCollection";
import StudyCollection from "@/pages/StudyCollection";
import { Shared } from "@/pages/Shared";

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
          {
            path: "/forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "/reset-password/:token",
            element: <ResetPassword />,
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
          {
            path: "/update-collection/:deckId",
            element: <UpdateCollection />,
          },
          {
            path: "/shared/:deckId",
            element: <Shared />,
          },
          {
            path: "/study-collection/:deckId",
            element: <StudyCollection />,
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
