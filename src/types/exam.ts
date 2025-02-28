import { IExcerciseDetail } from "./excercise";
import { IUserExam } from "./user";

export interface IExam {
  exam: ExamPassage[];
}
export interface IExamResult {
  summary: [{
    questionId: string;
    isCorrect: boolean;
    userAnswer: string;
  }]
  score: number;
}
export interface ExamPassage {
  id: string;
  exam: IExcerciseDetail;
  passage: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
}

export interface Question {
  id: string;
  examPassage: ExamPassage;
  question: string;
  createdAt: string;
  updatedAt: string;
  answer: string;
}
export interface Answer {
  id: string;
  examPassageQuestion: {
    id: string;
  }
  answer: string;
}
export interface IUserAnswer {
  examId: string;
  examPassageQuestionId: string;
  answer: string;
}
export interface IExamAnswerSubmit {
  questionId: string;
  answer: string;
}

export interface IExamResponse {
  id: string;
  userExam: IUserExam;
  examPassageQuestion: Question;
  answer: string;
  createdAt: string;
  updatedAt: string;
}
