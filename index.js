//  ------------------------------- Require Express -------------------------------
const express = require("express");

//  ------------------------------- Require cookieParser -------------------------------
const cookieParser = require("cookie-parser");

//  ------------------------------- Require Path -------------------------------
const path = require("path");

//  ------------------------------- Define Port -------------------------------
const port = 8000;

//  ------------------------------- Start Port -------------------------------
const app = express();

//  ------------------------------- Setting DB -------------------------------
const db = require("./config/mongoose.js");

//  ------------------------------- Parser Middleware (set data in req.body) -------------------------------
app.use(express.urlencoded({ extended: true }));

//  ------------------------------- CookieParser Middleware (Setting Up cookie) -------------------------------
app.use(cookieParser());

//  ------------------------------- Statics files (assets) -------------------------------
app.use(express.static("./assets"));

//  ------------------------------- View Engine (EJS) -------------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//  ------------------------------- Router (EJS) -------------------------------
app.use("/", require("./routes"));

//  ------------------------------- Listen Port -------------------------------
app.listen(port, function (err) {
  if (err) {
    console.log("Error in starting server");
    return;
  }
  console.log("Server is live on port ", port);
});
