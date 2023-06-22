const User = require("../models/User.js");
// Profile Page
module.exports.profile = function (req, res) {
  return res.render("profile", {
    title: "profile",
  });
};
// Render The Sign Up Page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Sign Up",
  });
};
// Render The Sign In Page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
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
      return;
    });
};

// Sign In User
module.exports.createSession = function (req, res) {
  // TODO
  return res.redirect("/users/profile");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  return res.redirect("/");
};
