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

  return await response.json();
};
