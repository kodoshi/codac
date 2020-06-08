const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");

/**
 * Get Post function currently, queries and selections to/from db are made here with standart MongoDB methods, json response is being returned
 */
exports.getPost = (req, res) => {
  const posts = Post.find()
    .populate("posted_by", "_id name") //lets you reference documents in other collections, in out case the User model
    .select("_id title body")
    .then((post) => {
      res.json({ posts: post }); //default 200 http code
    })
    .catch((err) => console.log(err));
};

/**
 * formidable package methods being used to handle image upload within the post
 * Create Post function urrently, queries and selections to/from db are made here with standart MongoDB methods, json response is being returned
 */
exports.createPost = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true; //if picture uploaded is jpeg or png, that specific format will be saved
  //based on request, handle the file parsing
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image upload failed" });
    }
    let post = new Post(fields);
    req.profile.hashed_password = undefined; //not sent to the front-end, security-based ommission
    req.profile.salt = undefined; //not sent to the front-end, security-based ommission
    post.posted_by = req.profile; //profile object in request will hold the user id, name, email etc
    //if the picture exists
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path); //file is stored
      post.photo.contentType = files.photo.type; //type of file get stored as String
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.json(result); //no {} wrapper, result will be the post itself
    });
  });
};

/**
 * Posts by User function currently, queries and selections to/from db are made here with standart MongoDB methods, json response is being returned
 */
exports.postsByUser = (req, res) => {
  Post.find({ posted_by: req.profile._id })
    .populate("posted_by", "_id name") //populate needs to be used because "_id name" is getting pulled from User model, not Post model
    .sort("_created") //earliest gets shown first
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(posts);
    });
};
