const Post = require("../models/Post.js");
module.exports.create = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then((post) => {
      console.log("Post Created");
      return res.redirect("/");
    })
    .catch((err) => {
      console.log("Error in creating post", err);
      return;
    });
};
