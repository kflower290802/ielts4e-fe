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
  score: number;
  overallBandScore: number;
  taskResponse: number;
  taskResponseDetails: string;
  coherenceAndCohesion: number;
  coherenceAndCohesionDetails: string;
  lexicalResource: number;
  lexicalResourceDetails: string;
  grammaticalRangeAndAccuracy: number;
  grammaticalRangeAndAccuracyDetails: string;
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
