import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { userExamSpeakAnswers } from "@/api/ExamAPI/speakingExam";
export const useSpeakingExamAnswers = () => {
  return useMutation({
    mutationFn: (values: FormData) => userExamSpeakAnswers(values),
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
