const express = require("express");
const path = require("path");
const port = 8000;
const app = express();
const db = require("./config/mongoose.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("./assets"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in starting server");
    return;
  }
  console.log("Server is live on port ", port);
});
