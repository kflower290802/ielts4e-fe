import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateError } from "@/utils/validate";
import { createLearnBlog } from "@/api/AdminAPI/learn";
export const useCreateBlog = () => {
  return useMutation({
    mutationFn: (data: FormData) => createLearnBlog(data),
    onSuccess() {
      toast.success("Create Learn Blog Success");
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
