const assert = require("assert");
const User = require("../src/user");

describe("validating records", () => {
  it("requires a user name", () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === "Name is required.");
  });

  it("user's name has to be longer than 2 characters", () => {
    const user = new User({ name: "Al" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === "Name must be longer than 2 characters");
  });

  it("rejects invalid records from saving", done => {
    const user = new User({ name: "Al" });
    user.save().catch(validationResult => {
      const { message } = validationResult.errors.name;

      assert(message === "Name must be longer than 2 characters");
      done();
    });
  });
});
