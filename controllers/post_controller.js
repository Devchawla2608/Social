const Post = require("../models/Post.js");
const Comment = require('../models/Comment.js')

//  ------------------------------- Nested Population (User + Comments Populating)  -------------------------------
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

//  ------------------------------- Nested Population (User + Comments Populating)  -------------------------------

module.exports.destroy = function (req, res) {
  Post.findById(req.params.id)
    .then((post) => {
      // When i compare to id then we have to convert the object id into string so that's why we did not used _id
      console.log(post.user)
      if (post.user == req.user.id) {
        post.deleteOne();
        Comment.deleteMany({post:req.params.id}).then(()=>{
            return res.redirect('back')
        }).catch(()=>{
            return res.redirect('back')
        })
      }
    })
    .catch((err) => {
        console.log("There is an error " , err);
        return res.redirect('back')
    })
}