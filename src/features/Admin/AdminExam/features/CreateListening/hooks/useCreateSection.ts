import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { createSection } from "@/api/AdminAPI/exam";
export const useCreateSection = () => {
  return useMutation({
    mutationFn: (data: { examId: string }) => createSection(data),
    onSuccess() {
      toast.success("Create Section Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
