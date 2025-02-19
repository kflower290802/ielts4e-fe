import { Route } from "@/constant/route";
import HomeUser from "@/features/HomeUser";
import { Exam } from "@/features/Exam";
import { Practice } from "@/features/Practice";
import Learn from "@/features/Learn";
import Exercise from "@/features/Exercise";
import Layout from "@/layout";

export const privateRoutes = [
  {
    element: <Layout />,
    children: [
      {
        element: <HomeUser />,
        path: Route.Home,
      },
      {
        element: <Exam />,
        path: Route.Exam,
      },
      {
        element: <Practice />,
        path: Route.Practice,
      },
      {
        element: <Learn />,
        path: Route.Learn,
      },
    ],
  },
  {
    element: <Exercise />,
    path: `${Route.Exercise}/:id`,
  },
];
