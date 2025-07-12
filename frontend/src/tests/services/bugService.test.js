import axios from 'axios';
import * as bugService from '../../services/bugService';

jest.mock('axios');

test('getBugs returns data', async () => {
  axios.get.mockResolvedValue({ data: [{ _id: '1', title: 'Bug' }] });
  const data = await bugService.getBugs();
  expect(data[0].title).toBe('Bug');
});

test('createBug posts data', async () => {
  axios.post.mockResolvedValue({ data: { _id: '1', title: 'Bug' } });
  const data = await bugService.createBug({ title: 'Bug' });
  expect(data.title).toBe('Bug');
});
