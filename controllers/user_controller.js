const User = require("../models/User.js");
const path = require('path');
const fs = require('fs');

//  ------------------------------- Profile Page  -------------------------------
module.exports.profile = function (req, res) {
  User.findById(req.params.id).
    then((user) => {
      return res.render("profile", {
        title: "profile",
        profile_user: user
      });
    }).catch((err) => {
      console.log("Error", err);
      return res.redirect('back');
    })
};

//  ------------------------------- Update  -------------------------------

module.exports.update = async function (req, res) {
    if (req.params.id == req.user.id) {
        try{
            let user = await User.findById(req.params.id)
            User.uploadedAvatar(req , res , function(err){
                if(err){
                    console.log("************* Multer Error ********** ", err);
                    return ;
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if( fs.existsSync(path.join(__dirname , '..' , user.avatar)) === true && user.avatar){
                        //  ------------------------------- To delete image from uploads folder-------------------------------
                        // 
                        fs.unlinkSync(path.join(__dirname , '..' , user.avatar))
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        }catch(err){
            console.log("User Does Not exits", err);
            return res.status(401).send     ('Unauthorized');
        }
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
          req.flash('success', "Signed up  Successfully")
          return res.redirect("/users/sign-in");
        })
        .catch(function (err) {
          console.log("Error in Creating User ", err);
          return res.redirect("back");
        });
    })
    .catch(function (err) {
      req.flash('error', "Error in signing up")
      return;
    });
};


//  -------------------------------  Sign In User  -------------------------------
module.exports.createSession = function (req, res) {
  // TODO
  req.flash('success', "Logged in Successfully")
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.flash('success', "Logged out Successfully")
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  return res.redirect("/");
};
