import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { updateTarget } from "@/api/report";
export const useUpdateUserTarget = (id: string) => {
  return useMutation({
    mutationFn: (data: {target: number}) =>
      updateTarget(id, data),
    onSuccess() {
      toast.success("Update Target Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
