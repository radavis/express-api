const express = require('express');
const router = express.Router();
const pkg = require('@src/../package.json');

router.get('/', async (request, response) => {
  response.json({
    name: pkg.name,
    version: pkg.version,
    description: pkg.description
  });
});

module.exports = router;
