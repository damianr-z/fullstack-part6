import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useAnecdoteStore } from '../store';
import AnecdoteList from './AnecdoteList';

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' });
});


describe('AnecdoteList', () => {
  it(' the component displaying anecdotes receives the anecdotes from the store sorted by votes', async () => {
    const mockAnecdotes = [
      {
        id: 1,
        content: 'Test anecdote',
        votes: 2,
      },
      {
        id: 2,
        content: 'Another test anecdote',
        votes: 5,
      },
      {
        id: 3,
        content: 'Yet another test anecdote',
        votes: 1,
      },
    ];

    useAnecdoteStore.setState({ anecdotes: mockAnecdotes });
    render(<AnecdoteList />);
    const renderedAnecdotes = screen
      .getAllByText(/test anecdote/i)
      .map((element) => element.textContent);
    expect(renderedAnecdotes).toEqual([
      'Another test anecdote',
      'Test anecdote',
      'Yet another test anecdote',
    ]);
    // console.log(
    //   screen.getAllByText(/test anecdote/i).map((el) => el.textContent),
    // );
  });

  it('the correct React component receives a properly filtered list of anecdotes.', async () => {
    const mockAnecdotes = [
      {
        id: 1,
        content: 'Test anecdote',
        votes: 2,
      },
      {
        id: 2,
        content: 'Another test anecdote',
        votes: 5,
      },
      {
        id: 3,
        content: 'A filtered test anecdote',
        votes: 1,
      },
    ];

    useAnecdoteStore.setState({
      anecdotes: mockAnecdotes,
      filter: 'FILTERED',
    });
    render(<AnecdoteList />);
    const renderedAnecdotes = screen
      .getAllByText(/test anecdote/i)
      .map((element) => element.textContent);
    expect(renderedAnecdotes).toEqual(['A filtered test anecdote']);
  });
});
