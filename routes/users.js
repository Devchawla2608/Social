const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller.js");
const passport = require("passport");

router.get("/profile/:id", passport.checkAuthentication, userController.profile);
router.get("/sign-in", userController.signIn);
router.get("/sign-up", userController.signUp);
router.get("/sign-out", userController.destroySession);
router.post("/create", userController.create);
router.post("/update/:id", userController.update);

// Use passport as a middleware to authentication
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

module.exports = router;
