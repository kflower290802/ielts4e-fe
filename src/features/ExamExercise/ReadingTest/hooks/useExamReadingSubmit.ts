import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { validateError } from '@/utils/validate';
import { IExamAnswerSubmit } from '@/types/exam';
import { examReadingSubmit } from '@/api/readingExam';
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
