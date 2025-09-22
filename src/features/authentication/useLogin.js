import { useMutation } from '@tanstack/react-query';
import { login as loginAPI } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useLogin() {
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { login, isPending };
}
