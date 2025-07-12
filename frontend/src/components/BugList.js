import React from 'react';
import BugItem from './BugItem';

function BugList({ bugs, onUpdate, onDelete }) {
  if (bugs.length === 0) {
    return <div data-testid="empty-list">No bugs reported.</div>;
  }
  return (
    <div>
      {bugs.map(bug => (
        <BugItem key={bug._id} bug={bug} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default BugList;
