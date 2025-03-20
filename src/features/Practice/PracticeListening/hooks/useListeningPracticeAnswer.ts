import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { userListeningPracticeAnswers } from "@/api/PracticeAPI/listeningExam";
import { IUserAnswer } from "@/types/PracticeType/practice";
export const useListeningPracticeAnswers = () => {
  return useMutation({
    mutationFn: (values: IUserAnswer[]) => userListeningPracticeAnswers(values),
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
