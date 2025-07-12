const request = require('supertest');
const express = require('express');
const bugRoutes = require('../../routes/bugRoutes');
const errorHandler = require('../../middleware/errorHandler');

// Mock Bug model
jest.mock('../../models/Bug');
const Bug = require('../../models/Bug');

const app = express();
app.use(express.json());
app.use('/api/bugs', bugRoutes);
app.use(errorHandler);

describe('Bug API Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new bug', async () => {
    Bug.prototype.save = jest.fn().mockResolvedValue({ _id: '1', title: 'Bug' });
    const res = await request(app).post('/api/bugs').send({ title: 'Bug' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Bug');
  });

  it('should return all bugs', async () => {
    Bug.find = jest.fn().mockResolvedValue([{ _id: '1', title: 'Bug' }]);
    const res = await request(app).get('/api/bugs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
