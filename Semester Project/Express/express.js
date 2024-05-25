const express = require("express");
const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
// const path = require("path");
const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
var expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(require("./middlewares/siteMiddleware"));
// app.use(require("/middlewares/checkAuth"));

const checkAuth = require('./middlewares/checkAuth');


const session = require('express-session');
app.use(session({
  secret: 'your_secret_key', // Replace with a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Use true if you're serving over HTTPS
}));


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


app.get("/contact-us", function (req, res) {
  res.render("contact-us");
});
app.get("/signup", function (req, res) {
  res.render("signup");
});
app.get("/login", function (req, res) {
  res.render("login");
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/');
    }
    res.clearCookie('connect.sid'); // Ensure the session cookie is cleared
    res.redirect('/'); // Redirect to the homepage or login page
  });
});

app.get("/apipage", function (req, res) {
  res.render("apipage");
});



app.post("/signup", async (req, res) => {
  console.log(req.body)
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


// login code
// app.post("/login", async (req, res) => {
//   console.log("sdsd",req.body)
//   const { email, password} = req.body;
  
//   try {
//     const existingUser = await User.findOne({ email: email });

//     console.log("Existing user:", existingUser); 

//     if (!existingUser) {
//       return res.redirect("/signup")
//     }

//     console.log(existingUser.password)

//     console.log("dsds",password)

//     if(!(existingUser.password == password)){
//       return res.redirect('/login')
//     }

//     console.log("User saved:", existingUser);
//     res.redirect("/");
//   } catch (error) {
//     console.error("Error during signup:", error); 
//     res.status(500).send("Error during signup");
//   }
// });


// my new login with sessions
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.redirect("/signup");
    }

    if (existingUser.password !== password) {
      return res.redirect('/login');
    }

    // Store user information in the session
    req.session.user = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email
    };

    res.redirect("/");
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
