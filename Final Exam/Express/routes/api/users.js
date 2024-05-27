let express = require("express");
let router = express.Router();
let User = require("../../models/User");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
// const config = require("../../config");

// create
router.post("/api/user/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user with this email already exists");

  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  let salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  return res.send(_.pick(user, ["name", "email"]));
});

router.post("/api/user/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not registered");

  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("invalid Password");

  let token = jwt.sign(
    { _id: user._id, name: user.name },
    // config.get("jwtPrivateKey")
    "somePrivateKey"


  );

//   res.send("Login Successful");
  res.send(token);
});

module.exports = router;
