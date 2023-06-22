const User = require("../models/User.js");
// Profile Page
module.exports.profile = function (req, res) {
  if (!req.cookies.user_id) return res.redirect("/users/sign-in");
  User.findById(req.cookies.user_id)
    .then(function (user) {
      if (!user) {
        console.log("Your Session is Expired , Please Login Again ");
        return res.redirect("/users/sign-in");
      }
      return res.render("profile", {
        title: "Profile Page",
        User: user,
      });
    })
    .catch(function (err) {
      console.log("Error in profile", err);
      return res.redirect("/users/sign-in");
    });
};
// Render The Sign Up Page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Sign Up",
  });
};
// Render The Sign In Page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Sign In",
  });
};
// Sign Up User
module.exports.create = function (req, res) {
  if (req.body.password !== req.body.confirmPassword) {
    return res.redirect("back");
  }
  User.find({ email: req.body.email })
    .then(function (user) {
      if (!user) {
        console.log("User Already Exits ", user);
        return res.redirect("/users/sign-in");
      }
      User.create(req.body)
        .then(function (newUser) {
          console.log("New User Created ", newUser);
          return res.redirect("/users/sign-in");
        })
        .catch(function (err) {
          console.log("Error in Creating User ", err);
          return res.redirect("back");
        });
    })
    .catch(function (err) {
      console.log("Error in finding User ", err);
    });
};

// Sign In User
module.exports.createSession = function (req, res) {
  User.findOne({ email: req.body.email })
    .then(function (user) {
      if (!user) {
        console("User Does Not exits ! Create User");
        return res.redirect("/users/sign-up");
      }
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      // Setting Up cookies
      res.cookie("user_id", user._id);
      return res.redirect("/users/profile");
    })
    .catch(function (err) {
      console.log("User Does not exits or Error in sign in", err);
      return res.redirect("back");
    });
};
