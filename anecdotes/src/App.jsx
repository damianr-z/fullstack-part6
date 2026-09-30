import { useAnecdoteActions } from './store';
import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const { initialize } = useAnecdoteActions();

  
  useEffect(() => {
    initialize();
  }, [initialize]);
  
  // DONE 6.4
  return (
    <div>
      <Filter />
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
