const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment_controller.js");
const passport = require("passport");

router.post("/create", passport.checkAuthentication, commentController.create);

module.exports = router;
