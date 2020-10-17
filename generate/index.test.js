const execa = require("execa");
const fs = require("fs");

describe("generate schema", () => {
  it("creates a schema.json, and validate.js files", async (done) => {
    const { stdout, stderr } = await execa("npm", [
      "run",
      "generate",
      "schema",
      "things",
      "thing",
      "artist title notes year:integer",
    ]);
    const path = "./src/resources/things";
    ["schema.json", "validate.js"].forEach((filename) => {
      const exists = fs.existsSync(`${path}/${filename}`);
      expect(exists).toBeTruthy();
    });
    fs.rmdirSync(path, { recursive: true });
    done();
  });
});
