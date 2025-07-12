import React, { useState } from 'react';

function BugForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await onSubmit({ title, description, status });
      setTitle('');
      setDescription('');
      setStatus('open');
    } catch (err) {
      setError('Failed to submit bug. Please try again.');
      console.error('BugForm submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Bug submission form" style={{ marginBottom: '1rem' }}>
      <div>
        <label htmlFor="title">Title *</label><br />
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={submitting}
          aria-required="true"
          aria-describedby="title-error"
          data-testid="title-input"
          style={{ width: '100%', padding: '0.5rem' }}
        />
        {error && error.toLowerCase().includes('title') && (
          <div id="title-error" style={{ color: 'red' }} data-testid="error">
            {error}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="description">Description</label><br />
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          disabled={submitting}
          rows={3}
          style={{ width: '100%', padding: '0.5rem' }}
          data-testid="description-input"
        />
      </div>

      <div>
        <label htmlFor="status">Status</label><br />
        <select
          id="status"
          value={status}
          onChange={e => setStatus(e.target.value)}
          disabled={submitting}
          data-testid="status-select"
          style={{ padding: '0.5rem' }}
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {error && !error.toLowerCase().includes('title') && (
        <div style={{ color: 'red', marginTop: '0.5rem' }} data-testid="error">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: submitting ? 'not-allowed' : 'pointer' }}
      >
        {submitting ? 'Submitting...' : 'Add Bug'}
      </button>
    </form>
  );
}

export default BugForm;
