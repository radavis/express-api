exports.seed = function(knex) {
  return knex('books').select()
    .then(function(books) {
      return knex('comments').insert([
        {
          user_email: 'someone@someplace.org',
          content: 'This one is next up.',
          book_id: books[0].id
        },
        {
          user_email: 'user@aol.com',
          content: 'I really enjoyed it!',
          book_id: books[0].id
        },
        {
          user_email: 'surfguy@yahoo.com',
          content: 'Highly recommended!',
          book_id: books[1].id
        },
      ]);
    })
};
