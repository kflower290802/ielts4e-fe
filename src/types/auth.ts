import { IUser } from "./user";

export interface IUserSignUp {
  name: string;
  email: string;
  password: string;
}
export interface IUserSignIn {
  email: string;
  password: string;
}
export interface IUserSignInResponse {
  user: IUser;
  token: string;
  refreshToken: string;
  tokenExpires: number;
}
