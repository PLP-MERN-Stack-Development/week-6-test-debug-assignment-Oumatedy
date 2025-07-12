import React, { useState } from 'react';

function BugForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    onSubmit({ title, description, status });
    setTitle('');
    setDescription('');
    setStatus('open');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        data-testid="title-input"
      />
      <input
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        data-testid="description-input"
      />
      <select value={status} onChange={e => setStatus(e.target.value)} data-testid="status-select">
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>
      {error && <div data-testid="error">{error}</div>}
      <button type="submit">Add Bug</button>
    </form>
  );
}

export default BugForm;
