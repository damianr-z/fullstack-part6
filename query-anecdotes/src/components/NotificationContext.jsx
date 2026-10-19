import { createContext, useState } from 'react';

const NotificationContext = createContext();
export default NotificationContext;

export const NotificationContextProvider = (props) => {
  const [message, setMessage] = useState(null);

  const newAnecdoteNotification = (content) =>
    setMessage(`New anecdote added: "${content}"`);
  const voteNotification = (content) =>
    setMessage(`Anecdote "${content}" voted`);

  return (
    <NotificationContext.Provider
      value={{ message, setMessage, newAnecdoteNotification, voteNotification }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};
