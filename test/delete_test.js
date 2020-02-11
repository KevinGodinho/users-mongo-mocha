const assert = require("assert");
const User = require("../src/user");

describe("delete a user", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  it("model instance 'joe' remove", done => {
    joe
      .deleteOne()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("class method 'User' remove", done => {
    // remove records with given criteria
    User.deleteMany({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("class method 'User' findAndRemove", done => {
    // find one and remove
    User.findOneAndRemove({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("class method 'User' findByIdAndRemove", done => {
    // find one and remove
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
});
