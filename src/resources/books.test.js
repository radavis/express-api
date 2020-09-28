const api = require('@src');
const db = require('@src/db');
const request = require('supertest');

const ninteenEightyFour = {
  title: '1984',
  author: 'George Orwell',
  year: '1949',
  paperback: true
};

const artOfTheDeal = {
  title: 'The Art of the Deal',
  author: 'Donald J. Trump',
  year: '1987',
  paperback: false
};

describe('books resource', () => {

  beforeEach(async () => {
    await db.migrate.latest()
      .then(() => db.seed.run());
  });

  afterEach(async () => {
    await db.migrate.rollback({ directory: ['./src/db/migrations'] }, true);
  });

  describe('GET /books', () => {
    it('returns status 200', async done => {
      const response = await request(api).get('/books');
      expect(response.status).toBe(200);
      expect(response.body.length > 0).toBe(true);
      done();
    });
  });

  describe('POST /books', () => {
    it('returns status 201', async done => {
      const response = await request(api)
        .post('/books')
        .send(ninteenEightyFour);
      expect(response.status).toBe(201);
      done();
    });

    it('returns status 422', async done => {
      const response = await request(api)
        .post('/books')
        .send({});
      expect(response.status).toBe(422);
      done();
    });
  });

  describe('PUT /books/:id', () => {
    it('returns status 200', async done => {
      const { body } = await request(api)
        .post('/books')
        .send(artOfTheDeal);

      const response = await request(api)
        .put(`/books/${body.id}`)
        .send({
          ...body,
          author: 'Tony Schwartz'
        });
      expect(response.status).toBe(200);
      done();
    });
  });

  describe('DELETE /books/:id', () => {
    it('returns status 200', async done => {
      const { body } = await request(api)
        .post('/books')
        .send(artOfTheDeal);

      const response = await request(api)
        .delete(`/books/${body.id}`);
      expect(response.status).toBe(200);
      done();
    });

    it('returns status 404', async done => {
      const response = await request(api).delete('/books/NaN');
      expect(response.status).toBe(404);
      done();
    });
  });
});
