import { Route } from "@/constant/route";
import HomeUser from "@/features/HomeUser";
import { Exam } from "@/features/Exam";
import { Practice } from "@/features/Practice";
import Learn from "@/features/Learn";
import Layout from "@/layout";
import ListeningTest from "@/features/ExamExercise/ListeningTest";
import PracticeReading from "@/features/Practice/PracticeReading";
import ReadingResult from "@/features/ExamExercise/ReadingTest/components/ReadingResult";
import MicrophoneTest from "@/features/ExamExercise/SpeakingTest/MicrophoneTest";
import SpeakingTest from "@/features/ExamExercise/SpeakingTest/SpeakingTest";
import WritingTest from "@/features/ExamExercise/WritingTest";
import WritingTestResult from "@/features/ExamExercise/WritingTest/WritingTestResult";
import ListeningTestResult from "@/features/ExamExercise/ListeningTest/components/ListeningResult";
import ListeningPractice from "@/features/Practice/PracticeListening";
import ReadingTest from "@/features/ExamExercise/ReadingTest/Reading";

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
        path: `${Route.PracticeReading}/:id`,
      },
      {
        element: <ListeningPractice />,
        path: `${Route.PracticeListening}/:id`,
      },
      {
        element: <PracticeReading />,
        path: `${Route.PracticeSpeaking}/:id`,
      },
    ],
  },
  {
    element: <ReadingTest />,
    path: `${Route.ExamReading}/:id`,
  },
  {
    element: <ReadingResult />,
    path: `${Route.ExamReadingResult}/:id/:idResult`,
  },
  {
    element: <ListeningTest />,
    path: `${Route.ExamListening}/:id`,
  },
  {
    element: <ListeningTestResult />,
    path: `${Route.ExamListeningResult}/:id/:idResult`,
  },
  {
    element: <MicrophoneTest />,
    path: `${Route.ExamSpeaking}/:id`,
  },
  {
    element: <SpeakingTest />,
    path: `${Route.ExamSpeakingStart}/:id`,
  },
  {
    element: <WritingTest />,
    path: `${Route.ExamWriting}/:id`,
  },
  {
    element: <WritingTestResult />,
    path: `${Route.ExamWritingResult}/:id`,
  }
];
