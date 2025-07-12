import { render, screen } from '@testing-library/react';
import BugList from '../../components/BugList';

test('renders empty message when no bugs', () => {
  render(<BugList bugs={[]} onUpdate={jest.fn()} onDelete={jest.fn()} />);
  expect(screen.getByTestId('empty-list')).toHaveTextContent('No bugs reported.');
});

test('renders bug items', () => {
  const bugs = [{ _id: '1', title: 'Bug1', description: '', status: 'open' }];
  render(<BugList bugs={bugs} onUpdate={jest.fn()} onDelete={jest.fn()} />);
  expect(screen.getByTestId('bug-item')).toHaveTextContent('Bug1');
});
