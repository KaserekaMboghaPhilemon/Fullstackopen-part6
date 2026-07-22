import { describe, it, expect, beforeEach, vi } from "vitest";

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

describe("Anecdote store initialization", () => {
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
});
