const express = require("express");
const router = express.Router();
const { description, name, version } = require("@root/config");

router.get("/", async (request, response) => {
  response.json({
    name,
    version,
    description,
  });
});

module.exports = router;
