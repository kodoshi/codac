const User = require("../models/user");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");

/**
 * User by ID function, fills req.profile object with the user that corresponds to the ID given
 */
exports.userById = (req, res, next, id) => {
  User.findById(id)
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, user) => {
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
    res.json(users);
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
 * date of update gets persisted in the DB and updated user is returned in the response,
 * photo uploaded gets saved in the DB with formidable package
 */
        exports.updateUser = (req, res, next) => {
  let form = new formidable.IncomingForm();
  // console.log("incoming form data: ", form);
  form.keepExtensions = true; //saving photo .extention
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Picture upload failed",
      });
    }
    let user = req.profile; //defined in userById method above
    // console.log("user in update: ", user);
    user = _.extend(user, fields); //lodash changes the user object with the added info from the fields
    user.updated_at = Date.now(); //date of update gets logged to be saved in the DB below
    // console.log("USER FORM DATA UPDATE: ", user);

    if (files.photo) {
      //handle the incoming picture, persist it in the DB
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      user.hashed_password = undefined; //security based omision
      user.salt = undefined; //security based omision
      // console.log("user after update with formdata: ", user);
      res.json(user);
    });
  });
}

exports.userPhoto = (req, res, next) => {
  
  //check if the user has uploaded a photo on his user profile page
  if(req.profile.photo.data){
  //set the content type of the file (image, jpg, png etc..)
    res.set(("Content-Type", req.profile.photo.contentType))
    return res.send(req.profile.photo.data);

  }
  next();
 
}



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

/**
 * Add Following method, gets current user id from request.body and updates the following DB field with the followId of another user
 */
exports.addFollowing = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.userId, //sent from frontend
    {
      $push: { following: req.body.followId }, //sent from frontend
    },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      next();
    }
  );
};

/**
 * Add Follower method, gets current followId from request.body and updates the followers DB field with the userId of another user
 */
exports.addFollower = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.followId, //sent from frontend
    {
      $push: { followers: req.body.userId }, //sent from frontend
    },
    { new: true }
  )
    .populate("following", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      result.hashed_password = undefined; //result will contain user and his following list, in json format
      result.salt = undefined;
      res.json(result);
    });
};

/**
 * Remove Following method, gets current user id from request.body and removes from the following DB field the unfollowId of another user
 */
exports.removeFollowing = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.userId, //sent from frontend
    {
      $pull: { following: req.body.unfollowId }, //sent from frontend
    },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      next();
    }
  );
};

/**
 * Remove Follower method, gets current followId from request.body and removes from the followers DB field the userId of another user
 */
exports.removeFollower = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.unfollowId, //sent from frontend
    {
      $pull: { followers: req.body.userId }, //sent from frontend
    },
    { new: true }
  )
    .populate("following", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      result.hashed_password = undefined; //result will contain user and his following list, in json format
      result.salt = undefined;
      res.json(result);
    });
};
