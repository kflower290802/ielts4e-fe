import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { ICreatePracticeListeningQuestion } from "@/types/admin";
import { createListeningPracticeQuestion } from "@/api/AdminAPI/practice";
export const useCreateListeningPracticeQuestion = () => {
  return useMutation({
    mutationFn: (data: ICreatePracticeListeningQuestion) => createListeningPracticeQuestion(data),
    onSuccess() {
      toast.success("Create Question Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
