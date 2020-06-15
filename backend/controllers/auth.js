const User = require("../models/user");
const jwt = require("jsonwebtoken");
const express_jwt = require("express-jwt");
const config = require("../config/config");

/**
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
 * Sign Up method, queries and selections to/from db are made here with standart MongoDB methods, json response is being returned
 */
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

/**
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
 * Sign in method, queries and selections to/from db are made here with standart MongoDB methods, json response is being returned
 */
exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    //if email does not exists
    if (err || !user) {
      return res.status(401).json({
        error: "This email does not exist",
      });
    }
    //if the password is not same as the hashed version
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Password is incorrect",
      });
    }

    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET); //token being generated with user id and JWT secret
    res.cookie("monedhe", token, { expire: new Date() + 604800 }); //1 week remember me cookie
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, email, name } }); //sending the user and his token to frontend
  });
};

/**
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
 * Logout method, to log out we just clear the cookie that holds the token
 */
exports.signout = (req, res) => {
  res.clearCookie("monedhe"); //to log out we clear the token
  return res.json({ message: "Sign out successful" });
};

/**
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
 * Require Signin method, if json web token is valid,
 * express jwt adds the verified id in an auth key to the request object
 */
exports.requireSignin = express_jwt({
  secret: config.JWT_SECRET,
  userProperty: "auth",
});
