const User = require("../models/user");
const jwt = require("jsonwebtoken");
const express_jwt = require("express-jwt");
const config = require("../config/config");

exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(403).json({
      //403 http code
      error: "Email is already in use",
    });
  }
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ message: "Sign-up successful" });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "This email does not exist",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Password is incorrect",
      });
    }
    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET); //token being generated with user id and JWT secret
    res.cookie("monedhe", token, { expire: new Date() + 3600000 }); //1 hour remember me cookie
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, email, name } }); //sending the user and his token to frontend
  });
};

exports.signout = (req, res) => {
  res.clearCookie("monedhe"); //to log out we clear the token
  return res.json({ message: "Sign out successful" });
};

exports.requireSignin = express_jwt({
  //if json web token is valid, express jwt adds the verified id to the request object
  secret: config.JWT_SECRET,
  userProperty: "auth",
});
