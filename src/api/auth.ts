import { api } from "@/lib/api";
import { IUserSignIn, IUserSignInResponse, IUserSignUp } from "@/types/auth";

export const signUp = (user: IUserSignUp) => api.post('/auth/register', user);
export const signIn = (user: IUserSignIn): Promise<IUserSignInResponse> =>
  api.post('/auth/login', user);
