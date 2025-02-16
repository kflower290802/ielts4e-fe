import { Route } from "@/constant/route";
import HomeUser from "@/features/HomeUser";
import { Exam } from "@/features/Exam";
import Layout from "@/layout/appLayout";
import ExerciseLayout from "@/layout/exerciseLayout";
import ReadingTest from "@/features/ReadingTest";

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
