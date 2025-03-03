import { ReadingQuestion } from "./readingExam";
import { IUserExam } from "./user";

export interface IExam<T> {
  exam: T[];
  remainingTime: number;
}
export interface IExamResult {
  summary: [{
    questionId: string;
    isCorrect: boolean;
    userAnswer: string;
  }]
  score: number;
}
export interface IUserAnswer {
  examId: string;
  examPassageQuestionId: string;
  answer: string;
}
export interface IUserListenAnswer {
  userExamId: string;
  examPassageQuestionId: string;
  answer: string;
}
export interface IExamAnswerSubmit {
  questionId: string;
  answer: string;
}

export interface IExamResponse<T> {
  id: string;
  userExam: IUserExam;
  examPassageQuestion: T;
  answer: string;
  createdAt: string;
  updatedAt: string;
}
