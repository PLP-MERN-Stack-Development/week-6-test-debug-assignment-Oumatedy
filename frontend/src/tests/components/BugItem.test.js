import { render, fireEvent, screen } from '@testing-library/react';
import BugItem from '../../components/BugItem';

test('renders bug title and description', () => {
  const bug = { _id: '1', title: 'Bug', description: 'Desc', status: 'open' };
  render(<BugItem bug={bug} onUpdate={jest.fn()} onDelete={jest.fn()} />);
  expect(screen.getByText('Bug')).toBeInTheDocument();
  expect(screen.getByText('Desc')).toBeInTheDocument();
});

test('calls onDelete when delete button clicked', () => {
  const onDelete = jest.fn();
  const bug = { _id: '1', title: 'Bug', description: '', status: 'open' };
  render(<BugItem bug={bug} onUpdate={jest.fn()} onDelete={onDelete} />);
  fireEvent.click(screen.getByTestId('delete-btn'));
  expect(onDelete).toHaveBeenCalledWith('1');
});
