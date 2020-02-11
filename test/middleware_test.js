const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("middleware", () => {
  let joe, blogPost;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({ title: "JS is great", content: "Yes, it is" });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => {
      done();
    });
  });

  it("remove user's blogposts when user is removed", done => {
    joe
      .remove()
      .then(() => BlogPost.countDocuments())
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});
