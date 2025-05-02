import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { startExam } from "@/api/ExamAPI/exam";
export const useStartExam = () => {
  return useMutation({
    mutationFn: (id: string) => startExam(id),
    onSuccess() {
      toast.success("Start taking the test");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
