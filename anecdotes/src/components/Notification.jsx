import { useEffect } from 'react';
import { useAnecdoteActions, useNotification } from '../store';

const Notification = () => {
  const notification = useNotification();
  const { setNotification } = useAnecdoteActions();

  useEffect(() => {
    if (notification !== '') {
      const timer = setTimeout(() => {
        setNotification('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [setNotification, notification]);

  if (!notification) return null;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  return (
    <div style={style} data-testid="notification">
      <p>{notification}</p>
    </div>
  );
};

export default Notification;
