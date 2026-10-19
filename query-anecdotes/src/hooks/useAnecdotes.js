import { getAnecdotes, createAnecdote, votedAnecdote } from '../requests';
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

  const updateAnecdoteVotes = useMutation({
    mutationFn: votedAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (anecdotes) =>
        anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote,
        ),
      );
    },
  });

  return {
    isPending,
    isError,
    data,
    addAnecdote: newAnecdoteMutation.mutate,
    addVote: updateAnecdoteVotes.mutate,
  };
};
