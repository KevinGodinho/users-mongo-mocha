const mongoose = require("mongoose");

// mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect("mongodb://localhost/users_test", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  });
  mongoose.connection
    .once("open", () => done())
    .on("error", err => console.warn("Error", err));
});

beforeEach(done => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
