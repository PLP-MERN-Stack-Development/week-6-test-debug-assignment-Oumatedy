import React, { useState } from 'react';

function BugItem({ bug, onUpdate, onDelete }) {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setUpdating(true);
    setError('');
    try {
      await onUpdate(bug._id, { ...bug, status: newStatus });
    } catch (err) {
      setError('Failed to update status');
      console.error('BugItem update error:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this bug?')) return;
    setDeleting(true);
    setError('');
    try {
      await onDelete(bug._id);
    } catch (err) {
      setError('Failed to delete bug');
      console.error('BugItem delete error:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      data-testid="bug-item"
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        marginBottom: '0.5rem',
        borderRadius: '4px',
        backgroundColor: bug.status === 'resolved' ? '#e6ffe6' : 'white',
      }}
      aria-live="polite"
    >
      <h3>{bug.title}</h3>
      <p>{bug.description || <em>No description provided</em>}</p>

      <label htmlFor={`status-select-${bug._id}`}>Status:</label>{' '}
      <select
        id={`status-select-${bug._id}`}
        value={bug.status}
        onChange={handleStatusChange}
        disabled={updating || deleting}
        data-testid="status-select"
        aria-label={`Change status for bug ${bug.title}`}
      >
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>

      <button
        onClick={handleDelete}
        disabled={updating || deleting}
        data-testid="delete-btn"
        style={{ marginLeft: '1rem', color: 'white', backgroundColor: '#d9534f', border: 'none', padding: '0.3rem 0.7rem', cursor: deleting ? 'not-allowed' : 'pointer' }}
        aria-label={`Delete bug ${bug.title}`}
      >
        {deleting ? 'Deleting...' : 'Delete'}
      </button>

      {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
    </div>
  );
}

export default BugItem;
