import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { ESubcription } from "@/types/auth";
import { upgradeSub } from "@/api/store";
export const useUpgradeSub = () => {
  return useMutation({
    mutationFn: (data: { plan: ESubcription }) => upgradeSub(data),
    onSuccess() {
      toast.success("Upgrade Subscription Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
