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


## add comments to the datastore

```bash
$ npm run knex migrate:make create-comments  # edit migration
$ npm run knex seed:make add-comments  # edit seed file
$ npm run knex migrate:latest
$ npm run knex seed:run
```

verify `psql -d {{projectName}}_development -c "select * from comments;"`


## setup dotenv

[[npmjs/dotenv](https://www.npmjs.com/package/dotenv)]

```bash
$ npm i dotenv
$ echo "PORT=3000" >> .env
$ echo "PORT=3000" >> .env.example
$ echo ".env" >> .gitignore
$ echo "require('dotenv').config()\n$(cat index.js)" > index.js
```


## setup jest

```bash
$ npm i --save-dev jest
```

update `package.json` with `scripts: { "test": "jest" }`

run: `npm run test -- --init` to generate a large `jest.config.js` file with many comments

run: `npm run test`


## setup express

```bash
$ npm i express morgan
```


## ❌ absolute imports with `NODE_PATH=.`

By setting `"start": "NODE_PATH=. node start.js"` in `package.json` scripts,
you can require packages by name, without using relative paths. Unfortunately,
this breaks down when attemtping to load the `index.js` file in the project
root.
