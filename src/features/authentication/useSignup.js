import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { signup as signupAPI } from '../../services/apiAuth';

export const useSignup = () => {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupAPI,
    onSuccess: () => {
      toast.success(
        "Account successfully created. Please verify the new account from the user's email address"
      );
    },
  });

  return { isPending, signup };
};
