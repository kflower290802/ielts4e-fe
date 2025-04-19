import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { createPart } from "@/api/AdminAPI/exam";
export const useCreatePart = () => {
  return useMutation({
    mutationFn: (data: FormData) => createPart(data),
    onSuccess() {
      toast.success("Create Part Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
