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
export interface ICreateType {
  examPassageId: string;
  type: string;
  content: string;
  image: FileList;
}
export interface IExamDetail extends IDetailExcercise {
  examPassage: ExamPassage[]
}
