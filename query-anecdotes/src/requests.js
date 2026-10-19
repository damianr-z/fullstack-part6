const baseUrl = 'http://localhost:3000/anecdotes';

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error('failed to fetch anecdotes');
  }
  return await response.json();
};

export const createAnecdote = async (newAnecdote) => {
  const entry = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: newAnecdote }),
  };

  const response = await fetch(baseUrl, entry);

  if (!response.ok) {
    throw new Error('failed to create note');
  }

  if (response.status === 400) {
    throw new Error('bad request');
  }

  return await response.json();
};

export const votedAnecdote = async (anecdote) => {
  const entry = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...anecdote, votes: anecdote.votes + 1 }),
  };

  const response = await fetch(`${baseUrl}/${anecdote.id}`, entry);

  if (!response.ok) {
    throw new Error('failed to vote anecdote');
  }

  return await response.json();
};
