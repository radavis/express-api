# express-api

How to connect an express api to a database, with tests.


## stack

* node
* express
* knex
* postgres
* jest


## setup

```bash
$ mkdir {{projectName}} && cd $_
$ npm init -y
$ npm install --save knex pg
```

update `package.json` with `scripts: { "knex": "knex" }`

initialize knex: `npm run knex init`

update `knexfile.js` with connection settings


## create a datastore for books

```bash
$ createdb {{projectName}}_development
$ npm run knex migrate:make create-books
```

update `db/migrations/yyyymmddhhmmss_create-books.js` with appropriate columns
to represent a book.

execute migrations: `npm run knex migrate:latest`

view changes:

```bash
$ psql {{projectName}}_development
{{projectName}}_development=# \dt
{{projectName}}_development=# \d books
{{projectName}}_development=# \q
```


## seed the datastore

```bash
$ npm run knex -- --help
$ npm run knex seed:make add-books  # edit db/seeds/add-books.js
$ npm run knex seed:run
```

verify: `psql -d {{projectName}}_development -c "select * from books;"`


## add comments

```bash
$ npm run knex migrate:make create-comments  # edit migration
$ npm run knex seed:make add-comments  # edit seed file
$ npm run knex migrate:latest
$ npm run knex seed:run
```

verify `psql -d {{projectName}}_development -c "select * from comments;"`
