//  ------------------------------- Require Express -------------------------------
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller.js");

router.get("/", homeController.home);
router.use("/posts", require("./posts.js"));
router.use("/users", require("./users.js"));
router.use("/comments", require("./comments.js"));

module.exports = router;

//  ------------------------------- Notes -------------------------------
// 1.) Controller is a set of action -> app.get('/' , function)
// 2.) Here require("express") is not new instance it is created by index.js(main)
// 3.) app.all means all the requests
