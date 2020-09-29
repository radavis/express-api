# express-api

A JSON Web API built in express.

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
$ git clone git@github.com:radavis/express-api.git
$ cd express-api
$ npm install
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
