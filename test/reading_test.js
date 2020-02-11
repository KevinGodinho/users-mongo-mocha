const assert = require("assert");
const User = require("../src/user");

describe("reading users out of the db", () => {
  let joe, maria, alex, zach;

  beforeEach(done => {
    zach = new User({ name: "Zach" });
    maria = new User({ name: "Maria" });
    alex = new User({ name: "Alex" });
    joe = new User({ name: "Joe" });
    Promise.all([zach.save(), maria.save(), alex.save(), joe.save()]).then(() =>
      done()
    );
  });

  it("finds all users with name joe", done => {
    User.find({ name: "Joe" }).then(users => {
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it("find user with specific id", done => {
    User.findOne({ _id: joe._id }).then(user => {
      assert(user.name === "Joe");
      done();
    });
  });

  it("can skip and limit result set", done => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users.length === 2);
        assert(users[0].name === "Joe");
        assert(users[1].name === "Maria");
        done();
      });
  });
});
