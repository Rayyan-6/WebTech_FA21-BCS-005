const express = require("express");
const mongoose = require("mongoose");
// const path = require("path");
const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
var expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

let User = require("./models/User");


app.use("/", require("./routes/api/books"));
app.use("/", require("./routes/api/users"));
app.use("/", require("./routes/sites/books"));

app.get("/", function (req, res) {
  res.render("homepage");
});

app.get("/contact-us", function (req, res) {
  res.render("contact-us");
});
app.get("/signup", function (req, res) {
  res.render("signup");
});
app.get("/login", function (req, res) {
  res.render("login");
});
app.get("/apipage", function (req, res) {
  res.render("apipage");
});



app.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    console.log("Existing user:", existingUser); // Add this line for logging

    if (existingUser) {
      console.log("User already exists with email:", req.body.email); // Add this line for logging
      return res.status(400).send("User already exists");
    }

    // Create a new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save();
    console.log("User saved:", newUser); // Add this line for logging
    res.redirect("/login");
  } catch (error) {
    console.error("Error during signup:", error); // Add this line for logging
    res.status(500).send("Error during signup");
  }
});

mongoose.connect("mongodb://localhost:27017/project").then((data) => {
  console.log("DB Connected");
});
app.listen(4000, () => {
  console.log("Server started at localhost:4000");
});
