import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { signUp } from '@/api/auth';
import { validateError } from '@/utils/validate';

import { IUserSignUp } from '@/types/auth';
import { useNavigate } from 'react-router-dom';
import { Route } from '@/constant/route';
export const useSignUp = () => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: (values: IUserSignUp) => signUp(values),
    onSuccess() {
      toast.success('Sign Up Success!');
      nav(Route.Login);
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
