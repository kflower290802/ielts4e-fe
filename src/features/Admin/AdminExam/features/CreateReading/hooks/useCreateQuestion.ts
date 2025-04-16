import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { ICreateQuestion } from "@/types/admin";
import { createQuestion } from "@/api/AdminAPI/exam";
export const useCreateQuestion = () => {
  return useMutation({
    mutationFn: (data: ICreateQuestion) => createQuestion(data),
    onSuccess() {
      toast.success("Create Question Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
