import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes }));
    },
    vote: async (id) => {
      const anecdoteToUpdate = useAnecdoteStore
        .getState()
        .anecdotes.find((anecdote) => anecdote.id === id);

      if (!anecdoteToUpdate) {
        return;
      }

      const updatedAnecdote = await anecdoteService.update(id, {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      });

      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id ? updatedAnecdote : anecdote,
        ),
      }));
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content);
      set((state) => ({
        anecdotes: state.anecdotes.concat(newAnecdote),
      }));
    },
    setFilter: (filter) => set(() => ({ filter })),
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);

  if (!filter) {
    return anecdotes;
  }

  return anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()),
  );
};

export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
