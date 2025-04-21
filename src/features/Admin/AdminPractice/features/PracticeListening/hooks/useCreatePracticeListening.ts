import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { createPracticeListen } from "@/api/AdminAPI/practice";
export const useCreatePracticeListening = () => {
  return useMutation({
    mutationFn: (data: FormData) => createPracticeListen(data),
    onSuccess() {
      toast.success("Add Audio Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
