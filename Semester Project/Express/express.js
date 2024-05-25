const express = require("express");
const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const path = require("path");
const app = express();
app.use(express.json());

const bcrypt = require('bcryptjs');

app.set("view engine", "ejs");
app.use(express.static("public"));
var expressLayouts = require("express-ejs-layouts");
var morgan = require("morgan");
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const checkAuth = require("./middlewares/checkAuth");
const isAuthenticated = require("./middlewares/isAuthenticated");

// app.use(require("./middlewares/siteMiddleware"));

const session = require("express-session");
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 10 * 60 * 1000,
    },
  })
);

// app.use((req, res, next) => {
//   if (req.session.user && req.cookies.your_secret_key) {
//     const userName = req.session.user ? req.session.user.name : "guest";
//     res.render("homepage", { userName: userName });
//   }
//   next();
// });

app.use(checkAuth);

let User = require("./models/User");

app.use("/", require("./routes/api/books"));
app.use("/", require("./routes/api/users"));
app.use("/", require("./routes/sites/books"));

// pages start here
app.get("/", (req, res) => {
  const userName = req.session.user ? req.session.user.name : "guest";
  res.render("homepage", { userName: userName });
});

app.get("/contact-us", isAuthenticated, function (req, res) {
  res.render("contact-us");
});
app.get("/signup", function (req, res) {
  res.render("signup");
});
app.get("/login", function (req, res) {
  res.render("login");
});

// app.get("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return res.redirect("/");
//     }
//     res.clearCookie("connect.sid"); // Ensure the session cookie is cleared
//     res.redirect("/");
//   });
// });

app.get("/logout", (req, res) => {
  req.session.user=null;
    // res.clearCookie("connect.sid"); // Ensure the session cookie is cleared
    res.redirect("/");
  
});

app.get("/apipage", function (req, res) {
  res.render("apipage");
});

app.get("/errorPage", (req, res) => {
  res.render("errorPage");
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      console.log("User already exists with email:", req.body.email); // Add this line for logging
      // return res.status(400).send("User already exists");
      return res.render("errorPage", { msg: "This user already exists" });
    }

    // Create a new user
    // const newUser = new User({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password,
    // });

    const newUser = new User(req.body);
const salt = await bcrypt.genSalt(10);
newUser.password = await bcrypt.hash(req.body.password, salt);


    await newUser.save();
    console.log("User saved:", newUser); // Add this line for logging
    res.redirect("/login");
  } catch (error) {
    console.error("Error during signup:", error); // Add this line for logging
    res.status(500).send("Error during signup");
  }
});

// Login with sessions
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email: email });

//     if (!existingUser) {
//       return res.redirect("/signup");
//     }

//     if (existingUser.password !== password) {
//       return res.render("errorPage",{msg:"Password incorrect"});
//     }

//     // Store user information in the session
//     req.session.user = {
//       id: existingUser._id,
//       name: existingUser.name,
//       email: existingUser.email,
//     };

//     res.redirect("/");
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).send("Error during login");
//   }
// });


app.post("/login", async (req, res) => {

  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      return res.render("errorPage",{msg:"User doesn't exist"});
    }

    const validPassword = await bcrypt.compare(req.body.password, existingUser.password);

    if (validPassword) {
      // Store user information in the session
      req.session.user = {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      };
      return res.redirect("/");
    } else {
      // Password is invalid
      console.log("password invalid");
      return res.render("errorPage",{msg:"Password incorrect"});
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error during login");
  }
});




mongoose.connect("mongodb://localhost:27017/project").then((data) => {
  console.log("DB Connected");
});
app.listen(4000, () => {
  console.log("Server started at localhost:4000");
});
