const execa = require("execa");
const fs = require("fs");

const resourceName = "things";

describe("generate migration", () => {
  it("creates a migration file", async (done) => {
    const path = "./db/migrations";
    const initialMigrations = fs.readdirSync(path);
    const { stdout, stderr } = await execa("npm", [
      "run",
      "generate",
      "migration",
      resourceName,
      "artist title notes year:integer",
    ]);
    const migrations = fs.readdirSync(path);
    const newMigrations = migrations.filter(
      (x) => !initialMigrations.includes(x)
    );
    expect(newMigrations.length).toBe(1);
    fs.unlinkSync(`${path}/${newMigrations.pop()}`);
    done();
  });
});
