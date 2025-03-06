import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { validateError } from '@/utils/validate';
import { IWritingAnswer } from '@/types/writingExam';
import { userExamWritingAnswers } from '@/api/writingExam';
export const useWritingExamAnswers = () => {
  return useMutation({
    mutationFn: (values: IWritingAnswer[]) => userExamWritingAnswers(values),
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
