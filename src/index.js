require('dotenv').config();
require('module-alias/register');
const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const resources = require('@src/resources');
const api = express();

if (process.env.NODE_ENV !== 'test') api.use(logger('combined'));
api.use(express.json());
api.use(express.urlencoded({ extended: false }));
// api.use(cookieParser());
// api.use(express.static(path.join(__dirname, 'public')));
resources.forEach(resource => api.use(resource));

module.exports = api;
