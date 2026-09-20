import { create } from 'zustand';

export const useRatingStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  actions: {
    incrementGood: () => set((state) => ({ good: state.good + 1 })),
    incrementNeutral: () => set((state) => ({ neutral: state.neutral + 1 })),
    incrementBad: () => set((state) => ({ bad: state.bad + 1 })),
  },
}));

export const good = () => useRatingStore((state) => state.good);
export const neutral = () => useRatingStore((state) => state.neutral);
export const bad = () => useRatingStore((state) => state.bad);
export const useRatingActions = () => useRatingStore((state) => state.actions);
