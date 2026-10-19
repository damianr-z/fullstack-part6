const baseUrl = 'http://localhost:3000/anecdotes';

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error('failed to fetch anecdotes');
  }
  return await response.json();
};
