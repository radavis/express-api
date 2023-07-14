const api = require("@src");
const config = require("@root/config");
const db = require("@root/db");
const { newBook, createBook } = require("./factory");
const request = require("supertest");

describe("books resource", () => {
  beforeEach(async () => {
    // await db.migrate.latest().then(() => db.seed.run());
  });

  afterEach(async () => {
    // await db.migrate.rollback(config.knex.migrations, true);
  });

  describe("GET /books", () => {
    it("returns status 200", async (done) => {
      const response = await request(api).get("/books");
      expect(response.status).toBe(200);
      expect(response.body.length > 0).toBe(true);
      done();
    });
  });

  describe("POST /books", () => {
    it("returns status 201", async (done) => {
      const book = newBook();
      const response = await request(api).post("/books").send(book);
      expect(response.status).toBe(201);
      done();
    });

    it("returns status 422, when data is invalid", async (done) => {
      const response = await request(api).post("/books").send({});
      expect(response.status).toBe(422);
      expect(response.body.errors.length > 0).toBe(true);
      done();
    });
  });

  describe("PUT /books/:id", () => {
    it("returns status 200", async (done) => {
      const book = await createBook();
      const response = await request(api)
        .put(`/books/${book.id}`)
        .send({
          ...book,
          author: "anonymous",
        });
      expect(response.status).toBe(200);
      done();
    });

    it("returns status 404, when id does not exist", async (done) => {
      const response = await request(api).put(`/books/NaN`).send(newBook());
      expect(response.status).toBe(404);
      done();
    });
  });

  describe("DELETE /books/:id", () => {
    it("returns status 200", async (done) => {
      const book = await createBook();
      const response = await request(api).delete(`/books/${book.id}`);
      expect(response.status).toBe(200);
      done();
    });

    it("returns status 404, when id does not exist", async (done) => {
      const response = await request(api).delete("/books/NaN");
      expect(response.status).toBe(404);
      done();
    });
  });
});
