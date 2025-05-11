import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { createSpeakingQuestion } from "@/api/AdminAPI/exam";
export const useCreateSpeakingQuestion = () => {
  return useMutation({
    mutationFn: (data: FormData) => createSpeakingQuestion(data),
    onSuccess() {
      toast.success("Create Question Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
