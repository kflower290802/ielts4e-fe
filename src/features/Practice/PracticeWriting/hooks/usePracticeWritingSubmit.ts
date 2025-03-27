import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { practiceWritingSubmit } from "@/api/PracticeAPI/writingExam";
export const usePracticeWritingSubmit = (id: string) => {
  return useMutation({
    mutationFn: (values: {answer: string},) =>
      practiceWritingSubmit(values, id),
    onSuccess() {
      toast.success("Submit success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
