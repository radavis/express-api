const api = require("@src");
const config = require("@root/config");
const db = require("@src/db");
const request = require("supertest");

const ninteenEightyFour = {
  title: "1984",
  author: "George Orwell",
  year: 1949,
  paperback: true,
};

describe("books resource", () => {
  beforeEach(async () => {
    await db.migrate.latest().then(() => db.seed.run());
  });

  afterEach(async () => {
    await db.migrate.rollback(config.knex.migrations, true);
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
      const response = await request(api)
        .post("/books")
        .send(ninteenEightyFour);
      expect(response.status).toBe(201);
      done();
    });

    it("returns status 422, when data is invalid", async (done) => {
      const response = await request(api).post("/books").send({});
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("validation failed");
      expect(response.body.errors.length > 0).toBe(true);
      done();
    });
  });

  describe("PUT /books/:id", () => {
    it("returns status 200", async (done) => {
      const { body } = await request(api).get("/books");
      const book = body[0];
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
      const response = await request(api)
        .put(`/books/NaN`)
        .send({
          ...ninteenEightyFour,
          author: "anonymous",
        });
      expect(response.status).toBe(404);
      done();
    });
  });

  describe("DELETE /books/:id", () => {
    it("returns status 200", async (done) => {
      const { body } = await request(api)
        .post("/books")
        .send(ninteenEightyFour);

      const response = await request(api).delete(`/books/${body.id}`);
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
