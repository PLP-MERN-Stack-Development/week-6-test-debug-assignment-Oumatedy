import React, { useEffect, useState } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';
import * as bugService from './services/bugService';

function App() {
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState('');

  const fetchBugs = async () => {
    try {
      const data = await bugService.getBugs();
      setBugs(data);
    } catch (err) {
      setError('Failed to fetch bugs');
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const handleAdd = async (bug) => {
    try {
      const newBug = await bugService.createBug(bug);
      setBugs([...bugs, newBug]);
    } catch (err) {
      setError('Failed to add bug');
    }
  };

  const handleUpdate = async (id, bug) => {
    try {
      const updated = await bugService.updateBug(id, bug);
      setBugs(bugs.map(b => (b._id === id ? updated : b)));
    } catch (err) {
      setError('Failed to update bug');
    }
  };

  const handleDelete = async (id) => {
    try {
      await bugService.deleteBug(id);
      setBugs(bugs.filter(b => b._id !== id));
    } catch (err) {
      setError('Failed to delete bug');
    }
  };

  return (
    <ErrorBoundary>
      <div>
        <h1>Bug Tracker</h1>
        {error && <div data-testid="global-error">{error}</div>}
        <BugForm onSubmit={handleAdd} />
        <BugList bugs={bugs} onUpdate={handleUpdate} onDelete={handleDelete} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
