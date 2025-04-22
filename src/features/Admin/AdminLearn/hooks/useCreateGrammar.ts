import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { createGrammar } from "@/api/AdminAPI/learn";
export const useCreateGrammar = () => {
  return useMutation({
    mutationFn: (data: {name: string}) => createGrammar(data),
    onSuccess() {
      toast.success("Create Grammar Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
