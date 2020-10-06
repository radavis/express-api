const execa = require("execa");
const fs = require("fs");

describe("generate factory", () => {
  it("creates a file", async () => {
    await execa("npm", [
      "run",
      "generate",
      "factory",
      "albumsResource",
      "albumResource",
      "artist title notes year:integer",
    ]);
    const path = ".././src/resources/albumsResource";
    const filename = "factory.js";
    const exists = fs.existsSync(`${path}/${filename}`);
    expect(exists).toBeTruthy();
    fs.unlinkSync(path);
  });
});
