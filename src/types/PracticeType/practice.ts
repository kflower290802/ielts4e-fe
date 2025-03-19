import { IUserExam } from "../user";

export interface IPractice<T> {
  exam: T[];
  remainingTime: number;
  audio: string;
}
export interface IPracticeResult {
  summary: [
    {
      questionId: string;
      isCorrect: boolean;
      userAnswer: string;
      correctAnswer: string;
    }
  ];
  score: number;
}
export interface IUserAnswer {
  examId: string;
  examPassageQuestionId: string;
  answer: string | string[];
}
export interface IPractieAnswerSubmit {
  questionId: string;
  answer: string;
}

export interface IPractieResponse<T> {
  id: string;
  userExam: IUserExam;
  examPassageQuestion: T;
  answer: string;
  createdAt: string;
  updatedAt: string;
}
