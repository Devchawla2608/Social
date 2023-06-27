const Comment = require("../models/Comment.js");
const Post = require("../models/Post.js");

//  ------------------------------- Create Comment  -------------------------------

module.exports.create = function (req, res) {
  Post.findById(req.body.post)
    .then((post) => {
      Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post,
      })
        .then((comment) => {
          req.flash("success" , "Comment  Created");
          console.log("Comment Created");
          post.comments.push(comment);
          post.save();
          return res.redirect("back");
        })
        .catch((err) => {
          req.flash("error" , "Comment not Created");
          console.log("Error in creating Commet", err);
          return;
        });
    })
    .catch((err) => {
      req.flash("error" , "Comment not Created");
      console.log("Post Does Not Exits", err);
      return;
    });
};

//  ------------------------------- Destroy Comment  -------------------------------
module.exports.destroy = async function(req , res){
    try{
        let comment = await Comment.findById(req.params.id)
        if(req.user.id == comment.user){
            let post = await Post.findByIdAndUpdate(comment.post , {$pull : {comment:req.params.id}}) 
            comment.deleteOne();
            req.flash("success" , "Comment Deleted");
            return res.redirect('back')
        }
        req.flash("error" , "Comment not Deleted");
        return res.redirect('back')
    }catch(err){
        req.flash("error" , "Comment not Deleted");
        return res.redirect('back')
    }

}