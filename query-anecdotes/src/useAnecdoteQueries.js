import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote, updateAnecdote } from "./requests";

// MUST HAVE "export"
export const useAnecdotes = () => {
  return useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });
};

export const useAddAnecdote = () => {
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
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      if (anecdotes) {
        queryClient.setQueryData(
          ["anecdotes"],
          anecdotes.map((a) =>
            a.id === updatedAnecdote.id ? updatedAnecdote : a,
          ),
        );
      }
    },
  });
};
