import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { IExamAnswerSubmit } from "@/types/ExamType/exam";
import { examSubmit } from "@/api/ExamAPI/exam";
export const useExamSubmit = (id: string) => {
  return useMutation({
    mutationFn: (values: IExamAnswerSubmit[]) =>
      examSubmit(values, id),
    onSuccess() {
      toast.success("Submit success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
