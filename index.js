require('dotenv').config();
require('module-alias/register');

const pkg = require('./package.json');
const api = require('./src/index.js');

const { PORT } = process.env;

api.listen(PORT, () => {
  console.info(`🌎 application '${pkg.name}' listening on port '${PORT}'`);
});
