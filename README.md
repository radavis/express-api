# express-api

A json api built with express and a relational database, tests included.

## stack

- node
- express
- knex
- postgres
- ajv
- jest
- supertest

## run api locally

```bash
$ git clone git@github.com:radavis/express-api
$ cd express-api
$ cp .env.example .env
$ createdb express-api_development
$ NODE_ENV=development npm run knex migrate:latest
$ NODE_ENV=development npm run knex seed:run
$ npm run start-dev
```

## run tests

```bash
$ createdb express-api_test
$ npm test
```
