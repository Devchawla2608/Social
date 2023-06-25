const Post = require("../models/Post.js");
const User = require('../models/User.js')
//  ------------------------------- Single Population (User Populating)  -------------------------------

// module.exports.home = function (req, res) {
//   // Populate user in every post to showing auther (Read Notes)
//   Post.find({})
//     .populate("user")
//     .exec()
//     .then((posts) => {
//       console.log("Posts Found");
//       return res.render("home", {
//         title: "Home",
//         posts: posts,
//       });
//     })
//     .catch((err) => {
//       console.log("Error", err);
//       return res.redirect("back");
//     });
// };

//  ------------------------------- Nested Population (User + Comments Populating)  -------------------------------
module.exports.home = function (req, res) {
  // Populate user in every post to showing auther (Read Notes)
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec()
    .then((posts) => {
      User.find({})
      .then((users)=>{
        return res.render("home", {
            title: "Home",
            posts: posts,
            all_users:users,
          });
      })
      .catch((err)=>{
        console.log("Error in Fiding users", err);
        return res.redirect('back')
      })
    })
    .catch((err) => {
      console.log("Error", err);
      return res.redirect("back");
    });
};
