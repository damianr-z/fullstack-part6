import { vi, describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import anecdotesService from './services/anecdotes';
import  {
  useAnecdoteStore,
  useAnecdotes,
  useNotification,
  useFilter,
  useVotes,
  useAnecdoteActions,
} from './store';

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

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual(mockAnecdotes);
  });
});
