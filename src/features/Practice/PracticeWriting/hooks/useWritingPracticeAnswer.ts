import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { userPracticeWritingAnswers } from "@/api/PracticeAPI/writingExam";
import { IPracticeWritingAnswer } from "@/types/PracticeType/writingPractice";
export const useWritingPracticeAnswers = () => {
  return useMutation({
    mutationFn: (values: IPracticeWritingAnswer[]) => userPracticeWritingAnswers(values),
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
