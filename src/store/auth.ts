import { ESubcription } from "@/types/auth";
import { getStorage } from "@/utils/storage";
import { create } from "zustand";
interface AuthState {
  isAuthenticated: boolean;
  role: string;
  subscription: ESubcription;
  setAuthStatus: (auth: {
    isAuthenticated: boolean;
    role: string;
    subscription: ESubcription;
  }) => void;
}
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!getStorage("token"),
  subscription: getStorage("subscription") as ESubcription || ESubcription.Free,
  role: getStorage("role") || "Learner",
  setAuthStatus: (auth: {
    isAuthenticated: boolean;
    role: string;
    subscription: ESubcription;
  }) =>
    set({
      isAuthenticated: auth.isAuthenticated,
      role: auth.role,
      subscription: auth.subscription,
    }),
}));
