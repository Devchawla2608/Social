const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User.js");

//  ------------------------------- Signing (Authentication using passport) -------------------------------
//  ------------------------------- Tell passport to use local strategy -------------------------------
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback:true
    },
    function (req,email, password, done) {
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            console.log("Invalid Username / Password ");
            req.flash('error' , "Invalid Username / Password")
            return done(null, false);
            // done(err , user)
          }
          req.flash('success' , "SuccessFull sign in")
          return done(null, user);
        })
        .catch((err) => {
          console.log("Error in finding user ---> passport");
          return done(err);
        });
    }
  )
);
//  ------------------------------- Serialize and deserialize -------------------------------
passport.serializeUser(function (user, done) {
  done(null, user.id);
  // Wanting to store user id in encrypted format which it automatically encryptes
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      console.log("Error in finding User -->passport");
      return done(err);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // If user is signed in the pass the req to next controller
  if (req.isAuthenticated()) return next();
  // redirect to sign in
  return res.redirect("/users/sign-in");
};
// if User is signed in then the information is avaliable in req.user becuase we used user model
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;

//! Notes
// 1.) done function is inbuilt which will call on the bases of conditions which are happenining automatically whether successfull or something else
// 2.) Find a user and establish the identity
// 3.) Done takes two arguments -> done(err , user)
// 4.) Serializeing the user to decide which key to be kept in the cookie
// 5.) Deserialize  the user from the key in the cookie when req comes from browser
