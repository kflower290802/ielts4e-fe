export interface IPractice<T> {
  exam: T[];
  remainingTime: number;
  audio: string;
}
export interface IPracticeResult {
  score: number;
  summary: ISummary[];
}
export interface ISummary {
  questionId: string;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string[];
}
export interface IWritingSummary {
  score: number,
  taskResponse: number,
  coherenceAndCohesion: number,
  lexicalResource: number,
  grammaticalRangeAndAccuracy: number,
}
export interface IUserAnswer {
  examId: string;
  examPassageQuestionId: string;
  answer: string | string[];
}
export interface IPracticeAnswerSubmit {
  questionId: string;
  answer: string;
}
