import { IExcerciseDetail } from "./excercise";

export interface IUserExam {
  id: string;
  user: IUser;
  exam: IExcerciseDetail;
  score: number;
  progress: number;
  createdAt: string;
  updatedAt: string;
}
export interface IUser {
  id: string;
  email: string;
  name: string;
  account: IAccount;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
export interface IAccount {
  id: string;
  username: string;
  password: string;
  role: string;
  subscriptions: string[];
  createdAt: string;
  updatedAt: string;
}
