// Require the librabry
const mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb://localhost/social_db");

// acuire the connection (to checm if it is successful)
const db = mongoose.connection;

// error

db.on("error", console.error.bind(console, "error connection to db"));

// up and running then print the message
db.once("open", function () {
  console.log("Successfully connected to the database");
});
