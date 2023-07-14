//  ------------------------------- Require Express -------------------------------
const express = require("express");

//  ------------------------------- Require Path -------------------------------
const path = require("path");

//  ------------------------------- Define Port -------------------------------
const port = 8000;

//  ------------------------------- Start App -------------------------------
const app = express();

//  ------------------------------- Setting DB -------------------------------
const db = require("./config/mongoose.js");

//  ------------------------------- express - session (Session Cookie) -------------------------------
const session = require("express-session");

//  ------------------------------- Require Passport -------------------------------
const passport = require("passport");

//  ------------------------------- Require Passport Local Strategy-------------------------------
const passportLocal = require("./config/Passport-local-strategy.js");

//  ------------------------------- Mongo Store -------------------------------
const MongoStore = require("connect-mongo");

//  ------------------------------- Setting Up Flash-------------------------------
const flash = require("connect-flash");

//  ------------------------------- Coustom flash middleware-------------------------------
const customMware = require("./config/middleware.js");

//  ------------------------------- Parser Middleware (set data in req.body) -------------------------------
app.use(express.urlencoded({ extended: true }));

//  ------------------------------- Statics files (assets) -------------------------------
app.use(express.static("./assets"));

//  -------------------------------Make the uploades path avaiable to server -------------------------------
app.use('/uploads' , express.static(__dirname + '/uploads'));

//  ------------------------------- View Engine (EJS) -------------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//  ------------------------------- Middleware which takes session cookie and encrypts it-------------------------------
app.use(
  session({
    name: "Social",
    secret: "blah something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/social_db",
      dbName: "social_db",
      autoRemove: "disabled",
    }),
  })
);

//  ------------------------------- Initialize Passport -------------------------------
app.use(passport.initialize());
app.use(passport.session());

//  -------------------------------Middleware check whether session cookie is present or not -------------------------------
app.use(passport.setAuthenticatedUser);

//  ------------------------------- Use Flash -------------------------------
app.use(flash());
app.use(customMware.setFlash);

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
