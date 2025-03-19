import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { IUserAnswer } from "@/types/ExamType/exam";
import { userPracticeAnswers } from "@/api/PracticeAPI/readingPractice";
export const usePracticeAnswers = () => {
  return useMutation({
    mutationFn: (values: IUserAnswer[]) => userPracticeAnswers(values),
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
