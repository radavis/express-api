const router = require("express").Router();
const db = require("@root/db");
const validate = require("./validate");

router.get("/albums", async (request, response) => {
  const albums = await db("albums").select();
  response.json(albums);
});

router.post("/albums", async (request, response) => {
  await validate(request.body)
    .then((albumParams) => db("albums").returning(["id"]).insert(albumParams))
    .then((album) => response.status(201).json(album[0]))
    .catch((err) => response.status(422).send(err));
});

router.put("/albums/:id", async (request, response) => {
  const { id } = request.params;
  await validate(request.body)
    .catch((err) => response.status(404).send(err))
    .then((albumParams) => db("albums").where({ id }).update(albumParams))
    .then(() => response.status(200).end())
    .catch(() => response.status(404).end());
});

router.delete("/albums/:id", async (request, response) => {
  const { id } = request.params;
  await db("albums")
    .where({ id })
    .del()
    .then(() => response.status(200).end())
    .catch(() => response.status(404).end());
});

module.exports = router;
