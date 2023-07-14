const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination:function(req , file , cb){
    cb(null , path.join(__dirname, '..' , AVATAR_PATH))
  },
  filename:function(req , file , cb){
     cb(null , file.fieldname + '-' + Date.now());
  }
})

// Static Methods
userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("User", userSchema);
module.exports = User;

// User in mongoose.model will be the name of user schema in database
