const { validateBugInput } = require('../../utils/validation');

describe('Bug Input Validation', () => {
  it('should fail if title is missing', () => {
    const { isValid, errors } = validateBugInput({});
    expect(isValid).toBe(false);
    expect(errors.title).toBe('Title is required');
  });

  it('should fail if status is invalid', () => {
    const { isValid, errors } = validateBugInput({ title: 'Bug', status: 'invalid' });
    expect(isValid).toBe(false);
    expect(errors.status).toBe('Invalid status');
  });

  it('should pass for valid input', () => {
    const { isValid } = validateBugInput({ title: 'Bug', status: 'open' });
    expect(isValid).toBe(true);
  });
});
