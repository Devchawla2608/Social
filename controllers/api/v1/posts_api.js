const Post = require('../../../models/Post.js')
const Comment = require("../../../models/Comment.js")
module.exports.index = async function(req , res){
    let posts = await Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });
    return res.status(401).send({
        message:"List of Posts",
        posts:posts
    })
}

module.exports.destroy = async function (req, res) {
    try{
        let post = await Post.findById(req.params.id)

        if(post.user == req.user.id){
            if(!post){
                return res.status(500);
            }
            post.deleteOne();
            await Comment.deleteMany({post:req.params.id})
            return res.status(200).send({
                message:"Post and Comments are Deleted"
            })
        }else{
            return res.status(401).send({
                message:"User Does not match"
            })
        }
    }
    catch(err){
        return res.status(500).send({
            message:"Error",
            Error:err
        })
    }
}