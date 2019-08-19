require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const Note = require('../lib/models/Note');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates and returns a note', () => {
    return request(app)
      .post('/api/v1/notes')
      .send({ title: 'test title', body: 'test body' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'test title',
          body: 'test body'
        });
      });
  });

  it('returns all notes', async() => {
    await Note.create([
      { title: 'test title', body: 'test body' },
      { title: 'Second note', body: 'second note body' }
    ]);
    return request(app)
      .get('/api/v1/notes')
      .then(res => {
        expect(res.body).toHaveLength(2);
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          title: expect.any(String),
          body: expect.any(String)
        });
      });
  });
});
