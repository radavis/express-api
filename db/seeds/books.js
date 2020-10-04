const books = [
  {
    title: "A People's History of the United States: 1492-2001",
    author: "Howard Zinn",
    year: 2015,
    paperback: true,
  },
  {
    title: "Not in My Neighborhood: How Bigotry Shaped a Great American City",
    author: "Antero Pietila",
    year: 2010,
    paperback: true,
  },
  {
    title: "Where Wizards Stay Up Late: The Origins of the Internet",
    author: "Katie Hafner",
    year: 1998,
    paperback: true,
  },
];

exports.seed = function (knex) {
  return knex("books").insert(books); // seed books
};
