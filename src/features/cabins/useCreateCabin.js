import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateCabin({ reset }) {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created!');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createCabin, isCreating };
}
