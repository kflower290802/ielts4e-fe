import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { validateError } from '@/utils/validate';
import { userExamAnswers } from '@/api/exam';
import { IUserAnswer } from '@/types/exam';
export const useExamAnswers = () => {
  return useMutation({
    mutationFn: (values: IUserAnswer[]) => userExamAnswers(values),
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
