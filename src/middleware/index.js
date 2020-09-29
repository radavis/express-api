// https://expressjs.com/en/resources/middleware.html
const errorhandler = require("errorhandler");
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");

const { environment } = require("@root/config");

// middleware functions that will be loaded by the express api
const middleware = [
  ["development", "test"].includes(environment) && errorhandler(),
  express.json(),
  express.urlencoded({ extended: false }),
  helmet(),
  ["development", "production"].includes(environment) && logger("tiny"),
].filter(Boolean);

module.exports = middleware;
