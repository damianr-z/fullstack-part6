import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';
import anecdotesService from './services/anecdotes';

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
      const anecdotes = await anecdotesService.getAll();
      set(() => ({ anecdotes }));
    },
    addAnecdote: async (content) => {
      const newAnecdote = await anecdotesService.createNew(content);
      set((state) => ({ anecdotes: [...state.anecdotes, newAnecdote] }));
      get().actions.setNotification('a new anecdote added');
    },
    deleteAnecdote: async (id) => {
      if (!id) return null;
      await anecdotesService.remove(id);
      set((state) => ({
        anecdotes: state.anecdotes.filter((anecdote) => anecdote.id !== id),
      }));
      get().actions.setNotification('anecdote was deleted');
    },
    addVote: async (id) => {
      const anecdote = get().anecdotes.find((anecdote) => anecdote.id === id);
      if (!anecdote) return;
      const updatedAnecdote = await anecdotesService.update(id, {
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

const useAnecdotes = () =>
  useAnecdoteStore(
    useShallow(({ anecdotes, filter }) =>
      anecdotes.filter((anecdote) => {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase());
      }),
    ),
  );

const useNotification = () => useAnecdoteStore((state) => state.notification);

const useFilter = () => useAnecdoteStore((state) => state.filter);

const useVotes = () =>
  useAnecdoteStore((state) =>
    state.anecdotes.reduce((acc, anecdote) => acc + anecdote.votes, 0),
  );

const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions);

export {
  useAnecdoteStore, 
  useAnecdotes,
  useNotification,
  useFilter,
  useVotes,
  useAnecdoteActions,
};
