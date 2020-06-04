const mongoose = require("mongoose");
//const uuidv1 = require("uuid/v1");  deprecated?
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },

  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150,
  },

  hashed_password: {
    type: String,
    required: true,
  },

  salt: {
    type: String,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
  },
});

/**
 * Virtual fields that don't get persisted in the DB
 */

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password; //temp var to hold the current password
    this.salt = uuidv1(); //salt based on timestamp
    this.hashed_password = this.encryptPassword(password); //encrypting and logging passw as hashed_passw in DB
  })
  .get(function () {
    return this._password;
  });

//method of User model
userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
