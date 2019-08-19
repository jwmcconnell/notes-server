require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
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
      .send({ title: 'test title', text: 'test text' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'test title',
          text: 'test text'
        });
      });
  });
});
