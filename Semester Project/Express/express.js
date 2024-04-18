const express = require("express");
const mongoose = require("mongoose");
// const path = require("path");
const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
var expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

// app.use(express.static(path.join(__dirname, 'public')));

app.use("/", require("./routes/api/books"));
app.use("/", require("./routes/sites/books"));

app.get("/", function (req, res) {
  res.render("homepage");
});

app.get("/contact-us", function (req, res) {
  res.render("contact-us");
});

app.get("/restful", function (req, res) {
  res.send("restful api page");
});
mongoose.connect("mongodb://localhost:27017/project").then((data) => {
  console.log("DB Connected");
});
app.listen(4000, () => {
  console.log("Server started at localhost:4000");
});

