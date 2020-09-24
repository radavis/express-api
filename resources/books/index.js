const express = require('express');
const router = express.Router();
const db = require('db');

router.get('/books', async (request, response) => {
  const books = await db('books').select();
  response.json(books);
});

module.exports = router;
