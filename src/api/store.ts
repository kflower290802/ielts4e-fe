import { api } from "@/lib/api";
import { ESubcription, IUserSignInResponse } from "@/types/auth";

export const upgradeSub = (data: { plan: ESubcription }): Promise<IUserSignInResponse> =>
  api.post(`/subscriptions/`, data);
