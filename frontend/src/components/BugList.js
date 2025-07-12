import React from 'react';
import BugItem from './BugItem';

function BugList({ bugs, onUpdate, onDelete, loading, error }) {
  if (loading) {
    return <p data-testid="loading">Loading bugs...</p>;
  }

  if (error) {
    return (
      <div role="alert" style={{ color: 'red' }} data-testid="error-message">
        {error}
      </div>
    );
  }

  if (bugs.length === 0) {
    return <p data-testid="empty-list">No bugs reported yet.</p>;
  }

  return (
    <div aria-live="polite" aria-relevant="additions removals">
      {bugs.map((bug) => (
        <BugItem key={bug._id} bug={bug} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default BugList;
