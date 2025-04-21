import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { createPracticeSpeaking } from "@/api/AdminAPI/practice";
export const useCreatePracticeSpeaking = () => {
  return useMutation({
    mutationFn: (data: FormData) => createPracticeSpeaking(data),
    onSuccess() {
      toast.success("Create Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
