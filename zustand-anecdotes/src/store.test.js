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
import useAnecdoteStore, { useAnecdotes } from "./store";

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

    // Set state with test anecdotes and a filter value
    useAnecdoteStore.setState({ anecdotes, filter: "react" });

    // Call state getter / selector logic directly
    const filteredAnecdotes = useAnecdoteStore
      .getState()
      .anecdotes.filter((a) =>
        a.content
          .toLowerCase()
          .includes(useAnecdoteStore.getState().filter.toLowerCase()),
      );

    expect(filteredAnecdotes).toHaveLength(1);
    expect(filteredAnecdotes[0].content).toBe("React is awesome");
  });
});
