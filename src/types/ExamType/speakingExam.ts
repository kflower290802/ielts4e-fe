import { IUserExam } from "./user";

export interface ExamQuestion {
  id: string;
  audio: string;
  exam: {
    id: string;
    name: string;
    type: string;
    time: number;
    image: string;
    year: number;
  };
  createdAt: string;
  updatedAt: string;
  questions: string;
  answer: string;
}
export interface IExamSpeakResponse {
  id: string;
  userExam: IUserExam;
  examSpeak: ExamQuestion;
  answer: string;
  createdAt: string;
  updatedAt: string;
}
