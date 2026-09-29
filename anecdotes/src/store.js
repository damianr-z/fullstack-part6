import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';
import noteService from './services/anecdotes';

/// Previous logic used to create an object from a plain string (anecdote)
// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => ({
//   content: anecdote,
//   id: getId(),
//   votes: 0,
// });

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  // DONE 6.2
  actions: {
    initialize: async () => {
      const anecdotes = await noteService.getAll();
      set(() => ({ anecdotes }));
    },
    addAnecdote: async (content) => {
      const newAnecdote = await noteService.createNew(content);
      set((state) => ({ anecdotes: [...state.anecdotes, newAnecdote] }));
    },
    addVote: (id) =>
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote,
        ),
      })),
    setFilter: (value) => set(() => ({ filter: value })),
  },
}));

export const useAnecdotes = () =>
  useAnecdoteStore(
    useShallow(({ anecdotes, filter }) =>
      anecdotes.filter((anecdote) => {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase());
      }),
    ),
  );

export const useFilter = () => useAnecdoteStore((state) => state.filter);

export const useVotes = () =>
  useAnecdoteStore((state) =>
    state.anecdotes.reduce((acc, anecdote) => acc + anecdote.votes, 0),
  );
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
