import { IUserExam } from "../user";

export interface IExam<T> {
  exam: T[];
  remainingTime: number;
  audio: string;
}
export interface IExamResult {
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

export enum EQuestionType {
  TextBox = "textbox",
  MultipleChoice = "multiple-choice",
  SingleChoice = "single-choice",
  TexBoxPosition = "textbox-position",
  HeadingPosition = "heading-position",
  BlankPassageDrag = "blank-passage-drag",
  BlankPassageTextbox = "blank-passage-textbox",
}
