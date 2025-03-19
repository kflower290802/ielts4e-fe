import { IExcerciseDetail } from "../excercise";
import { EQuestionType } from "./exam";

export interface ExamPassage {
  id: string;
  exam: IExcerciseDetail;
  passage: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  types: TypesReading[];
  // blankPassage?: string;
}
export interface TypesReading {
  id: string;
  examPassage: {
    id: string;
  };
  type: EQuestionType;
  content: string;
  createdAt: string;
  updatedAt: string;
  questions: ReadingQuestion[];
}
export interface ReadingQuestion {
  id: string;
  examReadingType: {
    id: string;
  };
  question: string;
  createdAt: string;
  updatedAt: string;
  answers: ReadingAnswer[];
  answer: string;
}
export interface ReadingAnswer {
  id: string;
  question: {
    id: string;
  };
  answer: string;
}
