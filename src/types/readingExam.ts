import { IExcerciseDetail } from "./excercise";

export interface ExamPassage {
    id: string;
    exam: IExcerciseDetail;
    passage: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    questions: ReadingQuestion[];
  }
export interface ReadingQuestion {
  id: string;
  examPassage: ExamPassage;
  question: string;
  type: string
  createdAt: string;
  updatedAt: string;
  answer: string;
}
export interface ReadingAnswer {
  id: string;
  examPassageQuestion: {
    id: string;
  }
  answer: string;
}