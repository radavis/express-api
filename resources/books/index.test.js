const api = require('~');
const supertest = require('supertest');
const request = supertest(api);

describe('books resource', () => {
  describe('GET /books', () => {
    const response = request.get('/books');
    expect(response.status).toBe(200);
  });
});
