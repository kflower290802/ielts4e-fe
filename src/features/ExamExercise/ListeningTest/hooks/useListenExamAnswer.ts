import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { validateError } from '@/utils/validate';
import { IUserListenAnswer } from '@/types/exam';
import { userListeningExamAnswers } from '@/api/listeningExam';
export const useListenExamAnswers = () => {
  return useMutation({
    mutationFn: (values: IUserListenAnswer[]) => userListeningExamAnswers(values),
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
