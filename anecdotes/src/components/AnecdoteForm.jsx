import { useAnecdoteActions } from '../store';

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdoteActions();

  const addAnecdoteHandlder = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    await addAnecdote(content);
    e.target.reset();
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdoteHandlder}>
        <div>
          <input name="anecdote" data-testid="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
