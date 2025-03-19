import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { IExamAnswerSubmit } from "@/types/ExamType/exam";
import { practiceReadingSubmit } from "@/api/PracticeAPI/readingPractice";
export const usePracticeReadingSubmit = (id: string) => {
  return useMutation({
    mutationFn: (values: IExamAnswerSubmit[]) =>
      practiceReadingSubmit(values, id),
    onSuccess() {
      toast.success("Submit success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
