import { render, fireEvent, screen } from '@testing-library/react';
import BugForm from '../../components/BugForm';

test('shows error when title is missing', () => {
  const onSubmit = jest.fn();
  render(<BugForm onSubmit={onSubmit} />);
  fireEvent.change(screen.getByTestId('title-input'), { target: { value: '' } });
  fireEvent.click(screen.getByText(/Add Bug/i));
  expect(screen.getByTestId('error')).toHaveTextContent('Title is required');
});

test('calls onSubmit with correct data', () => {
  const onSubmit = jest.fn();
  render(<BugForm onSubmit={onSubmit} />);
  fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Bug' } });
  fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'Desc' } });
  fireEvent.change(screen.getByTestId('status-select'), { target: { value: 'open' } });
  fireEvent.click(screen.getByText(/Add Bug/i));
  expect(onSubmit).toHaveBeenCalledWith({ title: 'Bug', description: 'Desc', status: 'open' });
});
