import { Route } from "@/constant/route";
import HomeUser from "@/features/HomeUser";
import { Exam } from "@/features/Exam";
import Layout from "@/layout/appLayout";
import ExerciseLayout from "@/layout/exerciseLayout";
import ReadingTest from "@/features/ReadingTest";
import { Practice } from "@/features/Practice";
import Learn from "@/features/Learn";

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
    element: <ExerciseLayout />,
    children: [
      {
        element: <ReadingTest />,
        path: Route.ReadingTest,
      },
    ],
  },

];
