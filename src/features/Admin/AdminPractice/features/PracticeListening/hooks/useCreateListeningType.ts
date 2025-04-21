import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { ICreatePracticeListeningType } from "@/types/admin";
import { createPracticeListeningType } from "@/api/AdminAPI/practice";
export const useCreatePracticeListeningType = () => {
  return useMutation({
    mutationFn: (data: ICreatePracticeListeningType) => createPracticeListeningType(data),
    onSuccess() {
      toast.success("Create Type Listening Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
