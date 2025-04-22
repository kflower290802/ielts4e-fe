import { ExamPassage } from "./ExamType/exam";
import { IDetailExcercise, TypeExcercise } from "./excercise";
import { TypesReading } from "./PracticeType/readingPractice";

export interface ICreateExam {
  name: string;
  type: TypeExcercise;
  file: FileList;
  audio?: FileList;
  year: number;
}
export interface ICreatePractice {
  topicId: string;
  name: string;
  image: FileList;
  type: string;
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
  answers: IAnswer[];
}
export interface ICreateListeningQuestion {
  question: string;
  examListenTypeId: string;
  answers: IAnswer[];
}
export interface IAnswer {
  answer: string;
  isCorrect: boolean;
}
export interface IExamDetail extends IDetailExcercise {
  examPassage: ExamPassage[];
}
export interface IPracticeDetail {
  id: string;
  content: string;
  image: string;
  audio: string;
  question: string
  practice: {
    id: string;
  };
  title: string;
  createdAt: string;
  updatedAt: string;
  types: TypesReading[];
}
export interface ICreatePracticePassage {
  practiceId: string;
  content: string;
  image: File;
  title: string;
}
export interface ICreateReadingPracticeQuestion {
  question: string;
  practiceReadingTypeId: string;
  answers: IAnswer[];
}
export interface ICreatePracticeListeningType {
  practiceListenId: string;
  type: string;
  content: string;
}
export interface ICreatePracticeListeningQuestion {
  question: string;
  typeId: string;
  answers: IAnswer[];
}