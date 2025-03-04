import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { validateError } from '@/utils/validate';
import { IUserAnswer } from '@/types/exam';
import { userListeningExamAnswers } from '@/api/listeningExam';
export const useListeningExamAnswers = () => {
  return useMutation({
    mutationFn: (values: IUserAnswer[]) => userListeningExamAnswers(values),
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
