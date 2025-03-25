export interface IExcercise {
  data: IExcerciseDetail[];
  pages?: number;
  page?: number;
  limit?: 10;
  total?: number;
}
export interface IExcerciseDetail {
  id: string;
  name: string;
  type: string;
  time: number;
  image: string;
  year: number;
  createdAt: string;
  include: true;
  topic: {
    id: string;
  };
  updatedAt: string;
  status: StatusExcercise;
}
export enum TypeExcercise {
  Reading = "reading",
  Listening = "listening",
  Writing = "writing",
  Speaking = "speaking",
  Grammar = "grammar",
  Vocabulary = "vocabulary",
}
export enum StatusExcercise {
  NotStarted = "not-started",
  InProgress = "in-progress",
  Completed = "completed",
}
export interface IPracticeTopic {
  id: string;
  name: string;
}
export interface IRequestExcercise {
  page?: number;
  limit?: number;
  type?: TypeExcercise;
  status?: StatusExcercise;
  year?: string;
}
export interface IRequestExcercisePractice {
  page?: number;
  limit?: number;
  type?: TypeExcercise;
  status?: StatusExcercise;
  topic?: string;
  questionType?: string;
}
