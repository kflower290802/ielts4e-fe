import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { validateError } from '@/utils/validate';
import { examReadingSubmit } from '@/api/exam';
import { IExamAnswerSubmit } from '@/types/exam';
export const useExamReadingSubmit = (id: string) => {
  return useMutation({
    mutationFn: (values: IExamAnswerSubmit[]) => examReadingSubmit(values, id),
    onSuccess() {
      toast.success('Submit success');
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
