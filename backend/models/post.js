const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  body: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1000,
  },
});

module.exports = mongoose.model("Post", postSchema);
