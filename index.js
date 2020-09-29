const { name, port } = require("./config");
const api = require("@src");

api.listen(port, () => {
  console.info(`🌎 application '${name}' listening on port '${port}'`);
});
