function validateBugInput(data) {
  const errors = {};
  if (!data.title || data.title.trim() === '') {
    errors.title = 'Title is required';
  }
  if (data.status && !['open', 'in-progress', 'resolved'].includes(data.status)) {
    errors.status = 'Invalid status';
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}

module.exports = { validateBugInput };
