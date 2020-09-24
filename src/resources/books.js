const express = require('express');
const router = express.Router();
const db = require('@src/db');

router.get('/books', async (request, response) => {
  const books = await db('books').select();
  response.json(books).end();
});

router.post('/books', async (request, response) => {
  const {
    title,
    author,
    year,
    paperback
  } = request.body;

  await db('books')
    .returning(['id', 'title', 'author', 'year', 'paperback', 'created_at', 'updated_at'])
    .insert({ title, author, year, paperback })
    .then(book => response.status(201).json(book[0]))
    .catch(err => response.status(422).send(err));
});

router.delete('/books/:id', async (request, response) => {
  const { id } = request.params;

  await db('books')
    .where('id', id)
    .del()
    .then(() => response.status(200).end())  // this .end() statement is important!
    .catch(err => response.status(404).send(err));
});

module.exports = router;
