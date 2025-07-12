import React, { useEffect, useState } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';
import * as bugService from './services/bugService';

function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalError, setGlobalError] = useState('');

  const fetchBugs = async () => {
    setLoading(true);
    setGlobalError('');
    try {
      const data = await bugService.getBugs();
      setBugs(data);
    } catch (err) {
      setGlobalError('Failed to fetch bugs. Please try again later.');
      console.error('App fetchBugs error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const handleAdd = async (bug) => {
    setGlobalError('');
    try {
      const newBug = await bugService.createBug(bug);
      setBugs((prev) => [...prev, newBug]);
    } catch (err) {
      setGlobalError('Failed to add bug. Please try again.');
      console.error('App handleAdd error:', err);
      throw err; // re-throw so BugForm can handle it
    }
  };

  const handleUpdate = async (id, updatedBug) => {
    setGlobalError('');
    try {
      const updated = await bugService.updateBug(id, updatedBug);
      setBugs((prev) => prev.map((b) => (b._id === id ? updated : b)));
    } catch (err) {
      setGlobalError('Failed to update bug. Please try again.');
      console.error('App handleUpdate error:', err);
      throw err;
    }
  };

  const handleDelete = async (id) => {
    setGlobalError('');
    try {
      await bugService.deleteBug(id);
      setBugs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      setGlobalError('Failed to delete bug. Please try again.');
      console.error('App handleDelete error:', err);
      throw err;
    }
  };

  return (
    <ErrorBoundary>
      <main style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
        <h1>🐞 Bug Tracker</h1>
        {globalError && (
          <div role="alert" style={{ backgroundColor: '#fdd', color: '#900', padding: '0.5rem', marginBottom: '1rem' }} data-testid="global-error">
            {globalError}
          </div>
        )}

        <BugForm onSubmit={handleAdd} />

        <BugList bugs={bugs} onUpdate={handleUpdate} onDelete={handleDelete} loading={loading} error={globalError} />
      </main>
    </ErrorBoundary>
  );
}

export default App;
