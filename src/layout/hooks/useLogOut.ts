import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { logOut } from "@/api/auth";
import { removeLocalStorage } from "@/utils/storage";
import { validateError } from "@/utils/validate";
import { useNavigate } from "react-router-dom";
import { Route } from "@/constant/route";
import { useAuthStore } from "@/store/auth";
import { ESubcription } from "@/types/auth";

export const useLogout = () => {
  const { setAuthStatus } = useAuthStore();
  const nav = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logOut(),
    async onSuccess() {
      removeLocalStorage();
      queryClient.invalidateQueries();
      setAuthStatus({
        isAuthenticated: false,
        role: "Learner",
        subscription: ESubcription.Free,
      });
      toast.success("Log out Success!");
      nav(Route.Login);
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
