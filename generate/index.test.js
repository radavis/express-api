const execa = require("execa");
const fs = require("fs");

// https://github.com/facebook/create-react-app/blob/master/test/fixtures/__shared__/util/setup.js
describe("generate factory", () => {
  xit("creates a file", async () => {
    await execa("npm", [
      "run",
      "generate",
      "factory",
      "albumsResource",
      "albumResource",
      "artist title notes year:integer",
    ]);
    const path = ".././src/resources/albumsResource"; // use a temporary location, instead
    const filename = "factory.js";
    const exists = fs.existsSync(`${path}/${filename}`);
    expect(exists).toBeTruthy();
    // fs.unlinkSync(path);
  });
});
