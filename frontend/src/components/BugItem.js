import React from 'react';

function BugItem({ bug, onUpdate, onDelete }) {
  return (
    <div data-testid="bug-item">
      <h4>{bug.title}</h4>
      <p>{bug.description}</p>
      <select
        value={bug.status}
        onChange={e => onUpdate(bug._id, { ...bug, status: e.target.value })}
        data-testid="status-select"
      >
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>
      <button onClick={() => onDelete(bug._id)} data-testid="delete-btn">Delete</button>
    </div>
  );
}

export default BugItem;
