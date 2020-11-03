const execa = require("execa");
const fs = require("fs");

const resourceName = "things";
const singularResourceName = "thing";
const path = `./src/resources/${resourceName}`;

afterAll(() => {
  // fs.rmdirSync(path, { recursive: true });
});

describe("generate factory", () => {
  it("creates a factory.js file", async (done) => {
    const { stdout, stderr } = await execa("npm", [
      "run",
      "generate",
      "factory",
      resourceName,
      singularResourceName,
      "artist title notes year:integer",
    ]);
    const exists = fs.existsSync(`${path}/factory.js`);
    expect(exists).toBeTruthy();
    done();
  });
});

describe("generate schema", () => {
  it("creates a schema.json, and validate.js files", async (done) => {
    const { stdout, stderr } = await execa("npm", [
      "run",
      "generate",
      "schema",
      resourceName,
      singularResourceName,
      "artist title notes year:integer",
    ]);
    ["schema.json", "validate.js"].forEach((filename) => {
      const exists = fs.existsSync(`${path}/${filename}`);
      expect(exists).toBeTruthy();
    });
    done();
  });
});
