const Comment = require("../models/Comment.js");
const Post = require("../models/Post.js");
module.exports.create = function (req, res) {
  Post.findById(req.body.post)
    .then((post) => {
      Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post,
      })
        .then((comment) => {
          console.log("Comment Created", comment);
          post.comments.push(comment);
          post.save();
          return res.redirect("back");
        })
        .catch((err) => {
          console.log("Error in creating Commet", err);
          return;
        });
    })
    .catch((err) => {
      console.log("Post Does Not Exits", err);
      return;
    });
};
