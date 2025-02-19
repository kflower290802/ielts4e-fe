import { Route } from "@/constant/route";
import Authentication from "@/features/Authentication";
import Login from "@/features/Authentication/components/Login";
import SignUpForm from "@/features/Authentication/components/SignUp";
import Home from "@/features/Home";
import Layout from "@/layout";

export const publicRoutes = [
  {
    element: <Layout />,
    children: [
      {
        element: <Home />,
        path: Route.Home,
      },
      {
        element: <Authentication />,
        children: [
          {
            element: <Login />,
            path: Route.Login,
          },
          {
            element: <SignUpForm />,
            path: Route.SignUp,
          },
        ],
      },
    ],
  },
];
