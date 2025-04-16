import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { createType } from "@/api/AdminAPI/exam";
export const useCreateType = () => {
  return useMutation({
    mutationFn: (data: FormData) => createType(data),
    onSuccess() {
      toast.success("Create Type Passage Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
