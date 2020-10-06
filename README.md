# express-api

A JSON Web API built in express, with code generation and tests.

## stack

- [node v12](https://nodejs.org/dist/latest-v12.x/docs/api/)
- [express v4](https://expressjs.com/en/4x/api.html)
- [knex v0.21](http://knexjs.org/)
- [postgres v11](https://www.postgresql.org/docs/11/index.html)
- [jest v26](https://jestjs.io/docs/en/26.0/expect)
- [supertest v4](https://www.npmjs.com/package/supertest#example)
- [plop](https://plopjs.com/documentation/)
- [ajv](https://ajv.js.org/#getting-started)

## run api locally

```bash
$ git clone git@github.com:radavis/express-api.git
$ cd express-api
$ npm install
$ cp .env.example .env
$ createdb express-api_development
$ NODE_ENV=development npm run db migrate:latest
$ NODE_ENV=development npm run db seed:run
$ npm run start-dev
```

## run tests

```bash
$ createdb express-api_test
$ npm test
```

## resource generation

### generate a migration

```bash
$ npm run generate migration albums "artist title notes:text year:integer owner_id:foreign"
$ # edit the migration, then
$ npm run db migrate:latest
```

### generate routes

```bash
$ npm run generate routes albums # edit the generated files, then
$ npm run test
```

### generate json-schema and validation

```bash
$ npm run generate schema albums album "artist title notes year:integer"
```
