const db = require("@root/db");

const newBook = ({
  title = "My Title",
  author = "Unknown",
  year = 2020,
  paperback = false,
} = {}) => ({
  title,
  author,
  year,
  paperback,
});

const createBook = (props) => {
  const book = newBook(props);
  return db("books")
    .returning(["id", "title", "author", "year", "paperback"])
    .insert(book);
};

module.exports = {
  newBook,
  createBook,
};
