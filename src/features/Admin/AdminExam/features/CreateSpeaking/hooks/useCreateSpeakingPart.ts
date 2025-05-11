import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { createSpeakingPart } from "@/api/AdminAPI/exam";
export const useCreateSpeakingPart = () => {
  return useMutation({
    mutationFn: (data: {examId: string}) => createSpeakingPart(data),
    onSuccess() {
      toast.success("Create Part Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
