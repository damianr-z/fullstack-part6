import { useEffect } from 'react';
import useNotify from '../hooks/useNotify';

const Notification = () => {
  const { message, clearNotification } = useNotify();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, clearNotification]);

  return message ? (
    <div data-testid="notification" style={style}>
      {message}
    </div>
  ) : null;
};

export default Notification;
