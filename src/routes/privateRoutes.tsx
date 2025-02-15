import { Route } from "@/constant/route";
import Home from "@/features/Home";
import HomeUser from "@/features/HomeUser";
import Layout from "@/layout";

export const privateRoutes = [
  {
    element: <Layout />,
    children: [
      {
        element: <HomeUser />,
        path: Route.Home,
      },
    ],
  },
  ];
  