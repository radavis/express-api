// https://expressjs.com/en/resources/middleware.html
const express = require('express');
const logger = require('morgan');
const { NODE_ENV } = process.env;

const middleware = [
  NODE_ENV !== 'test' && logger('tiny'),
  express.json(),
  express.urlencoded({ extended: false }),
].filter(Boolean);

module.exports = middleware;
