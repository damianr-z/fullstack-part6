import { useAnecdotes, useAnecdoteActions } from '../store';

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { addVote, deleteAnecdote } = useAnecdoteActions();

  const vote = (id) => {
    addVote(id);
    console.log('vote', id);
  };

  const handleRemove = (id) => {
    deleteAnecdote(id);
    console.log('remove', id);
  };

  if (anecdotes.length === 0) {
    return <div>no anecdote found</div>;
  }

  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
            {anecdote.votes === 0 && (
              <button
                style={{ marginLeft: '10px' }}
                onClick={() => handleRemove(anecdote.id)}
              >
                delete
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
