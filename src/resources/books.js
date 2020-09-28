const router = require("express").Router();
const db = require("@src/db");

router.get("/books", async (request, response) => {
  const books = await db("books").select();
  response.json(books);
});

router.post("/books", async (request, response) => {
  const { title, author, year, paperback } = request.body;

  await db("books")
    .returning(["id"])
    .insert({ title, author, year, paperback })
    .then((book) => response.status(201).json(book[0]))
    .catch((err) => response.status(422).send(err));
});

router.put("/books/:id", async (request, response) => {
  const { id } = request.params;
  const { title, author, year, paperback } = request.body;

  await db("books")
    .where({ id })
    .update({ title, author, year, paperback })
    .then(() => response.status(200).end())
    .catch((err) => response.status(404).send(err));
});

router.delete("/books/:id", async (request, response) => {
  const { id } = request.params;

  await db("books")
    .where("id", id)
    .del()
    .then(() => response.status(200).end())
    .catch((err) => response.status(404).send(err));
});

module.exports = router;
