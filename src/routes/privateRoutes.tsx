import { Route } from "@/constant/route";
import HomeUser from "@/features/HomeUser";
import { Exam } from "@/features/Exam";
import { Practice } from "@/features/Practice";
import Learn from "@/features/Learn";
import Layout from "@/layout";
import ReadingTest from "@/features/Exercise/ReadingTest";
import ListeningTest from "@/features/Exercise/ListeningTest";
import SpeakingTest from "@/features/Exercise/SpeakingTest";
import PracticeReading from "@/features/Practice/PracticeReading";

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
      {
        element: <PracticeReading />,
        path: `${Route.PracticeReading}`,
      },
    ],
  },
  {
    element: <ReadingTest />,
    path: `${Route.ExamReading}/:id`,
  },
  {
    element: <ListeningTest />,
    path: `${Route.ExamListening}/:id`,
  },
  {
    element: <SpeakingTest />,
    path: `${Route.ExamSpeaking}/:id`,
  },
];
