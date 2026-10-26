import { createContext, useState } from 'react';

const NotificationContext = createContext();
export default NotificationContext;

export const NotificationContextProvider = (props) => {
  const [message, setMessage] = useState(null);

  const newAnecdoteNotification = (content) =>
    setMessage(`New anecdote added: "${content}"`);
  const voteNotification = (content) =>
    setMessage(`Anecdote "${content}" voted`);
  const clearNotification = () => setMessage(null);
  const shortMessageError = () =>
    setMessage('Too short anecdote, must have length 5 or more');

  return (
    <NotificationContext.Provider
      value={{
        message,
        setMessage,
        newAnecdoteNotification,
        voteNotification,
        clearNotification,
        shortMessageError,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};
