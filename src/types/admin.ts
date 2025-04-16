import { ExamPassage } from "./ExamType/exam";
import { IDetailExcercise, TypeExcercise } from "./excercise";

export interface ICreateExam {
  name: string;
  type: TypeExcercise;
  file: FileList;
  audio?: FileList;
  year: number;
  time: number;
}
export interface ICreatePassage {
  examId: string;
  title: string;
  passage: string;
}
export interface ICreateListeningType {
  examSectionId: string;
  type: string;
  content: string;
}
export interface ICreateQuestion {
  question: string;
  examReadingTypeId: string;
  answers: IAnswer[]
}
export interface ICreateListeningQuestion {
  question: string;
  examListenTypeId: string;
  answers: IAnswer[]
}
export interface IAnswer {
  answer: string;
  isCorrect: boolean;
}
export interface IExamDetail extends IDetailExcercise {
  examPassage: ExamPassage[]
}
