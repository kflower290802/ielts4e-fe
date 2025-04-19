import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { createPracticePassage } from "@/api/AdminAPI/practice";
export const useCreatePracticePassage = () => {
  return useMutation({
    mutationFn: (data: FormData) => createPracticePassage(data),
    onSuccess() {
      toast.success("Create Passage Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
