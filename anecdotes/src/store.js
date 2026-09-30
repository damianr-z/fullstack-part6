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

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  notification: '',

  actions: {
    initialize: async () => {
      const anecdotes = await noteService.getAll();
      set(() => ({ anecdotes }));
    },
    addAnecdote: async (content) => {
      const newAnecdote = await noteService.createNew(content);
      set((state) => ({ anecdotes: [...state.anecdotes, newAnecdote] }));
      get().actions.setNotification('a new anecdote added');
    },
    deleteAnecdote: async (id) => {
      if (!id) return null;
      await noteService.remove(id);
      set((state) => ({
        anecdotes: state.anecdotes.filter((anecdote) => anecdote.id !== id),
      }));
      get().actions.setNotification('anecdote was deleted');
    },
    addVote: async (id) => {
      const anecdote = get().anecdotes.find((anecdote) => anecdote.id === id);
      if (!anecdote) return;
      const updatedAnecdote = await noteService.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });
      set((state) => ({
        anecdotes: state.anecdotes.map((bendAnecdote) =>
          bendAnecdote.id === id ? updatedAnecdote : bendAnecdote,
        ),
      }));
      get().actions.setNotification(`you voted '${updatedAnecdote.content}'`);
    },
    setFilter: (value) => set(() => ({ filter: value })),
    setNotification: (value) => set(() => ({ notification: value })),
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

export const useNotification = () =>
  useAnecdoteStore((state) => state.notification);

export const useFilter = () => useAnecdoteStore((state) => state.filter);

export const useVotes = () =>
  useAnecdoteStore((state) =>
    state.anecdotes.reduce((acc, anecdote) => acc + anecdote.votes, 0),
  );

export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
