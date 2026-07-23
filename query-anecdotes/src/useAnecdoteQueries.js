import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAnecdote, getAnecdotes, updateAnecdote } from "./requests";

export const useAnecdotes = () =>
  useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  });

export const useCreateAnecdote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });
};

export const useVoteAnecdote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });
};
