import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes }));
    },
    vote: async (id) => {
      const anecdoteToChange = get().anecdotes.find((a) => a.id === id);
      const updatedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      const savedAnecdote = await anecdoteService.update(id, updatedAnecdote);
      set((state) => ({
        anecdotes: state.anecdotes.map((a) =>
          a.id === id ? savedAnecdote : a,
        ),
      }));
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content);
      set((state) => ({
        anecdotes: state.anecdotes.concat(newAnecdote),
      }));
    },
    deleteAnecdote: async (id) => {
      await anecdoteService.remove(id);
      set((state) => ({
        anecdotes: state.anecdotes.filter((a) => a.id !== id),
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

export default useAnecdoteStore;
