import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { createTopic } from "@/api/AdminAPI/learn";
export const useCreateTopic = () => {
  return useMutation({
    mutationFn: (data: {name: string}) => createTopic(data),
    onSuccess() {
      toast.success("Create Topic Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
