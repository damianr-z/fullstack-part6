import { getAnecdotes, createAnecdote } from '../requests';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

export const useAnecdotes = () => {
  const queryClient = useQueryClient();

  const { isPending, isError, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (anecdotes) =>
        anecdotes.concat(newAnecdote),
      );
    },
  });

  return {
    isPending,
    isError,
    data,
    addAnecdote: newAnecdoteMutation.mutate,
  };
};
