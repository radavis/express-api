const api = require('@src');
const request = require('supertest');

describe('root resource', () => {
  let response;

  beforeAll(async (done) => {
    response = await request(api).get('/');
    done();
  });

  describe('GET /', () => {
    it('returns status 200', () => {
      expect(response.status).toBe(200);
    });

    it('returns a name, version, and description', () => {
      const {
        name,
        version,
        description
      } = response.body;

      expect(name).toBe('express-api');
      expect(version).toBeDefined();
      expect(description).toBeDefined();
    });
  });
});
