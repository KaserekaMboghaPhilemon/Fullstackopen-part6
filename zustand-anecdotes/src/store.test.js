import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock the backend service layer
vi.mock("./services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}));

import anecdoteService from "./services/anecdotes";
import useAnecdoteStore from "./store";

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});

describe("Anecdote store and components", () => {
  it("initializes state with anecdotes returned by the backend", async () => {
    const mockAnecdotes = [
      { id: "1", content: "If it hurts, do it more often", votes: 0 },
      {
        id: "2",
        content: "Adding manpower to a late software project makes it later!",
        votes: 5,
      },
    ];

    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    await useAnecdoteStore.getState().actions.initialize();

    expect(useAnecdoteStore.getState().anecdotes).toEqual(mockAnecdotes);
    expect(anecdoteService.getAll).toHaveBeenCalledTimes(1);
  });

  it("filters anecdotes correctly based on the store filter", () => {
    const anecdotes = [
      { id: "1", content: "React is awesome", votes: 3 },
      { id: "2", content: "Zustand handles state easily", votes: 8 },
      { id: "3", content: "JavaScript is fun", votes: 1 },
    ];

    useAnecdoteStore.setState({ anecdotes, filter: "react" });

    const state = useAnecdoteStore.getState();
    const filteredAnecdotes = state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase()),
    );

    expect(filteredAnecdotes).toHaveLength(1);
    expect(filteredAnecdotes[0].content).toBe("React is awesome");
  });

  it("increases the vote count of an anecdote when voted", async () => {
    const initialAnecdote = {
      id: "1",
      content:
        "Debugging is twice as hard as writing the code in the first place.",
      votes: 0,
    };

    useAnecdoteStore.setState({ anecdotes: [initialAnecdote], filter: "" });

    // Mock the backend update response returning incremented votes
    const updatedAnecdote = { ...initialAnecdote, votes: 1 };
    anecdoteService.update.mockResolvedValue(updatedAnecdote);

    // Call the vote action
    await useAnecdoteStore.getState().actions.vote("1");

    // Verify service was called with incremented object
    expect(anecdoteService.update).toHaveBeenCalledWith("1", {
      ...initialAnecdote,
      votes: 1,
    });

    // Verify store state updated correctly
    const anecdotesInStore = useAnecdoteStore.getState().anecdotes;
    expect(anecdotesInStore[0].votes).toBe(1);
  });
});
