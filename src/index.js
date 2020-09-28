const express = require("express");
const middleware = require("@src/middleware");
const resources = require("@src/resources");

const api = express();
middleware.forEach((middlewareFn) => api.use(middlewareFn));
resources.forEach((resource) => api.use(resource));

module.exports = api;
