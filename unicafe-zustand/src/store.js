import { create } from "zustand";

const useUnicafeStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  actions: {
    good: () => set((state) => ({ good: state.good + 1 })),
    neutral: () => set((state) => ({ neutral: state.neutral + 1 })),
    bad: () => set((state) => ({ bad: state.bad + 1 })),
    reset: () => set({ good: 0, neutral: 0, bad: 0 }),
  },
}));

// Select primitive state values individually to preserve stable references
export const useUnicafeGood = () => useUnicafeStore((state) => state.good);
export const useUnicafeNeutral = () =>
  useUnicafeStore((state) => state.neutral);
export const useUnicafeBad = () => useUnicafeStore((state) => state.bad);

export const useUnicafeActions = () =>
  useUnicafeStore((state) => state.actions);
