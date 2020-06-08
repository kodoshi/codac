const User = require("../models/user");
const _ = require("lodash");

/**
 * User by ID function, fills req.profile object with the user that corresponds to the ID given
 */
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.profile = user; //profile object in request gets user info
    next(); //so we dont get stuck
  });
};

/**
 * Has Authorization function, compares ID from req.profile to the ID currently authenticated, if this is true=> user is accessing his own resources.
 * If the admin is authenticated, he has automatic authorization.
 */
exports.hasAuthorization = (req, res, next) => {
  let sameUser = req.profile && req.auth && req.profile._id == req.auth._id;
  let adminUser = req.profile && req.auth && req.auth.role === "admin";

  const authorized = sameUser || adminUser;

  // console.log("req.profile ", req.profile, " req.auth ", req.auth);
  // console.log("SAMEUSER", sameUser, "ADMINUSER", adminUser);

  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized to perform this action",
    });
  }
  next();
};

/**
 * All Users function, finds all users in DB and returns them in a single object, in json format
 */
exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ users });
  }).select("name email created_at updated_at");
};

/**
 * Get User function that returns the user inside the request.profile object (json), with salt and hashed_password omitted
 */
exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined; //not sent to the front-end, security-based omission
  req.profile.salt = undefined; //not sent to the front-end, security-based omission
  return res.json(req.profile);
};

/**
 * Update User function that edits the user inside the req.profile with lodash.extend method,
 * date of update gets persisted in the DB and updated user is returned in the response
 */
exports.updateUser = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body); //lodash changes the user object with the added info from the request body
  user.updated_at = Date.now(); //date of update gets logged to be saved in the DB below
  user.save((err) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "Not authorized to edit this content" });
    }
    user.hashed_password = undefined; //not sent to the front-end, security-based omission
    user.salt = undefined; //not sent to the front-end, security-based omission
    res.json({ user });
  });
};

/**
 * Delete User function, gets current user from req.profile, removes it and returns a json success message
 */
exports.deleteUser = (req, res, next) => {
  let user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json({ message: "User deletion successful" });
  });
};
