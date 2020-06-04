const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(403).json({
      //403 http code
      error: "Email is already in use!",
    });
  }
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ message: "Sign-up successful!" });
};

exports.signin = (req, res) => {
  //WIP
  const { _id, email, password } = req.body;
};
