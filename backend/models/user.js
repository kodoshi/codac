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

  photo: {
    data: Buffer,
    contentType: String
  },

  about: {
    type: String,
    trim: true,
  },

  following: [{ type: mongoose.Schema.ObjectId, ref: "User" }],

  followers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
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

/**
 * Methods of User model, Authenticate function that compares plaintext password to hashed password,
 * Encrypt password function that encrypts the given plaintext with sha1 + salt
 */
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

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
