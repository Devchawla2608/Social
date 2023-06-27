const Post = require("../models/Post.js");
const Comment = require('../models/Comment.js')

//  ------------------------------- Nested Population (User + Comments Populating)  -------------------------------
module.exports.create = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then((post) => {
      req.flash("success" , "Post  Created");
      return res.redirect("/");
    })
    .catch((err) => {
      req.flash("error" , "Post  not Created");
      return;
    });
  };

//  ------------------------------- Nested Population (User + Comments Populating)  -------------------------------

module.exports.destroy = async function (req, res) {
    try{
        let post = await Post.findById(req.params.id)
        if (post.user == req.user.id) {
            post.deleteOne();
            await Comment.deleteMany({post:req.params.id})
            req.flash("success" , "Post  deleted");
            return res.redirect('back')
        }
    }
    catch(err){
        req.flash("error" , "Post  not deleted");
        return res.redirect('back')
    }
}