import { vi, describe, it, expect, beforeEach } from 'vitest';
import anecdotesService from './services/anecdotes';
import { useAnecdoteStore } from './store';

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}));

beforeEach(() => {
  useAnecdoteStore.setState({
    anecdotes: [],
    filter: '',
    notification: '',
  });
  vi.clearAllMocks();
});

describe('useAnecdoteStore', () => {
  it('state is initialized with the anecdotes returned by the backend', async () => {
    const mockAnecdotes = [
      {
        id: 1,
        content: 'Test anecdote',
        votes: 0,
      },
    ];
    anecdotesService.getAll.mockResolvedValue(mockAnecdotes);

    await useAnecdoteStore.getState().actions.initialize();

    const result = useAnecdoteStore.getState().anecdotes;
    expect(result).toEqual(mockAnecdotes);
  });

  it('voting increases the number of votes for an anecdote', async () => {
    const mockAnecdote = { id: 1, content: 'Test anecdote', votes: 0 };
    useAnecdoteStore.setState({ anecdotes: [mockAnecdote] });

    anecdotesService.update.mockResolvedValue({
      ...mockAnecdote,
      votes: 1,
    });

    await useAnecdoteStore.getState().actions.addVote(1);

    expect(anecdotesService.update).toHaveBeenCalledWith(1, {
      ...mockAnecdote,
      votes: 1,
    });
    expect(useAnecdoteStore.getState().anecdotes[0].votes).toEqual(1);
    expect(useAnecdoteStore.getState().notification).toBe(
      "you voted 'Test anecdote'",
    );
  });
});
