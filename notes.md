# notes

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

run: `createdb {{projectName}}_test && NODE_ENV=test npm run knex migrate:latest`

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

## knex console

```bash
$ node
> const db = require('./src/db')
> db('books').select().then(books => console.log(books))
> const books = require('./src/db/seeds/add-books')
> books.seed()
> .exit
```

## todo

- [ ] add json-schema descriptions for resources
- [ ] validate requests using json-schema
- [ ] generate code. input: model name and attributes, output: migration, resource and test
- [ ] serve open-api specification
- [ ] authentication via GitHub/Google/Some OAuth Service
- [ ] authorization layer
- [ ] consider adding middleware to transform request body keys from `camelCase` to `snake_case`, and response body keys from `snake_case` to `camelCase`. [[inspiration](https://github.com/zzswang/express-humps/blob/master/src/index.js)]
- [ ] consider use `camelCase` naming throughout the stack

## resources

- [REST API Tutorial: Using HTTP Methods for RESTful Services](https://restapitutorial.com/lessons/httpmethods.html)
- [Twilio: A Guide to Node.js Logging](https://www.twilio.com/blog/guide-node-js-logging#library-logs)