const Post = require("../models/Post.js");
// Single Population

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

// Nested Population
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
      console.log("Posts Found");
      return res.render("home", {
        title: "Home",
        posts: posts,
      });
    })
    .catch((err) => {
      console.log("Error", err);
      return res.redirect("back");
    });
};
