import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { createPracticeType } from "@/api/AdminAPI/practice";
export const useCreatePracticeType = () => {
  return useMutation({
    mutationFn: (data: FormData) => createPracticeType(data),
    onSuccess() {
      toast.success("Create Type Passage Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
