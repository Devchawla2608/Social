const User = require("../models/User.js");
 
//  ------------------------------- Profile Page  -------------------------------
module.exports.profile = function (req, res) {
  User.findById(req.params.id).
  then((user)=>{
    return res.render("profile", {
      title: "profile",
      profile_user:user
    });
  }).catch((err)=>{
    console.log("Error" , err);
    return res.redirect('back');
  })
};

//  ------------------------------- Update  -------------------------------

module.exports.update = function(req , res){
    if(req.params.id == req.user.id){
        User.findByIdAndUpdate(req.params.id , req.body)
        .then(()=>{
            return res.redirect('back')
        }).catch((err)=>{
            console.log("User Does Not exits" , err);
            return res.status(401).send('Unauthorized');
        })
    }   
}

 
//  -------------------------------Render The Sign Up Page  -------------------------------
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("user_sign_up", {
    title: "Sign Up",
  });
};

//  -------------------------------Render The Sign In Page  -------------------------------
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("user_sign_in", {
    title: "Sign In",
  });
};


//  -------------------------------  Sign Up User  -------------------------------
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


//  -------------------------------  Sign In User  -------------------------------
module.exports.createSession = function (req, res) {
  // TODO
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  return res.redirect("/");
};
