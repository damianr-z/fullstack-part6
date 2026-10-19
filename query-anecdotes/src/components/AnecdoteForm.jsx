import { useContext } from 'react';
import NotificationContext from './NotificationContext';

const AnecdoteForm = ({ addAnecdote }) => {
  const { newAnecdoteNotification, shortMessageError } =
    useContext(NotificationContext);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.reset();

    if (content.length < 5) {
      shortMessageError(content);
      return;
    }

    addAnecdote(content, {
      onSuccess: () => newAnecdoteNotification(content),
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
