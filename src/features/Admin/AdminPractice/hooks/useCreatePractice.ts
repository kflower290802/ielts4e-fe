import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { createPractice } from "@/api/AdminAPI/practice";
export const useCreatePractice = () => {
  return useMutation({
    mutationFn: (data: FormData) => createPractice(data),
    onSuccess() {
      toast.success("Create Part Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
