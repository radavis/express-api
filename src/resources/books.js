const Ajv = require("ajv");
const router = require("express").Router();
const db = require("@src/db");
const bookSchema = require("./books.json");

const ajv = new Ajv();
const validateBook = ajv.compile(bookSchema);

router.get("/books", async (request, response) => {
  const books = await db("books").select();
  response.json(books);
});

router.post("/books", async (request, response) => {
  await validateBook(request.body)
    .then((bookParams) => db("books").returning(["id"]).insert(bookParams))
    .then((book) => response.status(201).json(book[0]))
    .catch((err) => response.status(422).send(err));
});

router.put("/books/:id", async (request, response) => {
  const { id } = request.params;
  await validateBook(request.body)
    .catch((err) => response.status(404).send(err))
    .then((bookParams) => db("books").where({ id }).update(bookParams))
    .then(() => response.status(200).end())
    .catch(() => response.status(404).end());
});

router.delete("/books/:id", async (request, response) => {
  const { id } = request.params;
  await db("books")
    .where({ id })
    .del()
    .then(() => response.status(200).end())
    .catch((err) => response.status(404).send(err));
});

module.exports = router;
