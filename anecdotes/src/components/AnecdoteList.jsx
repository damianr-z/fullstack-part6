import { useAnecdotes, useVotes, useAnecdoteActions } from '../store';

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { addVote } = useAnecdoteActions();

  const vote = (id) => {
    addVote(id);
    console.log('vote', id);
  };

  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
