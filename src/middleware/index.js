// https://expressjs.com/en/resources/middleware.html
const errorhandler = require('errorhandler');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const allEnvironments = Object.freeze(['development', 'production', 'test']);
const { NODE_ENV } = process.env;

if (!allEnvironments.includes(NODE_ENV)) {
  console.error(`NODE_ENV is set to non-standard value: '${NODE_ENV}'`);
  console.error(`accepted values are: ${allEnvironments}`);
  console.error(`terminating app...`);
  process.exit(-1);
}

// middleware functions that will be loaded by the express api
const middleware = [
  ['development', 'test'].includes(NODE_ENV) && errorhandler(),
  express.json(),
  express.urlencoded({ extended: false }),
  helmet(),
  ['development', 'production'].includes(NODE_ENV) && logger('tiny'),
].filter(Boolean);

module.exports = middleware;
