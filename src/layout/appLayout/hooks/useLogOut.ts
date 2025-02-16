import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { logOut } from "@/api/auth";
import { removeLocalStorage } from "@/utils/storage";
import { validateError } from "@/utils/validate";
import { useNavigate } from "react-router-dom";
import { Route } from "@/constant/route";
import { useAuthStore } from "@/store/auth";

export const useLogout = () => {
  const { setAuthStatus } = useAuthStore();
  const nav = useNavigate();
  return useMutation({
    mutationFn: () => logOut(),
    async onSuccess() {
      removeLocalStorage();
      setAuthStatus(false);
      toast.success("Log out Success!");
      nav(Route.Login);
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
