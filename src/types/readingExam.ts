import { EQuestionType } from "./exam";
import { IExcerciseDetail } from "./excercise";

export interface ExamPassage {
  id: string;
  exam: IExcerciseDetail;
  passage: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  questions: ReadingQuestion[];
  type: EQuestionType;
  blankPassage?: string;
}
export interface ReadingQuestion {
  id: string;
  examPassage: ExamPassage;
  question: string;
  type: EQuestionType;
  createdAt: string;
  updatedAt: string;
  answer: string;
  answers: { id: string; answer: string; question: { id: string } }[];
}
export interface ReadingAnswer {
  id: string;
  examPassageQuestion: {
    id: string;
  };
  answer: string;
}
