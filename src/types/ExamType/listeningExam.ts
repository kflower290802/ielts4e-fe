import { EQuestionType } from "./ExamType/exam";
import { IExcerciseDetail } from "./excercise";

export interface ExamSection {
  id: string;
  exam: IExcerciseDetail;
  createdAt: string;
  updatedAt: string;
  types: TypesListening[];
}
export interface TypesListening {
  id: string;
  type: EQuestionType;
  content: string;
  questions: ListeningQuestion[];
}
export interface ListeningQuestion {
  id: string;
  examListenType: {
    id: string;
  };
  question: string;
  createdAt: string;
  updatedAt: string;
  answers: ListeningAnswer[];
  answer: string;
}
export interface ListeningAnswer {
  id: string;
  examListenQuestion: {
    id: string;
  };
  answer: string;
}
