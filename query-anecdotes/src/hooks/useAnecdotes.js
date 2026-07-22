import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAnecdote as createAnecdoteRequest,
  getAnecdotes,
  updateAnecdote,
} from "../requests";

const useAnecdotes = () => {
  const queryClient = useQueryClient();

  const anecdotesQuery = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  });

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdoteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const createAnecdote = (content) => {
    createAnecdoteMutation.mutate({ content, votes: 0 });
  };

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
  };

  return {
    anecdotes: anecdotesQuery.data ?? [],
    isLoading: anecdotesQuery.isLoading,
    isError: anecdotesQuery.isError,
    createAnecdote,
    handleVote,
  };
};

export default useAnecdotes;
