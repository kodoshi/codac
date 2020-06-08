const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

/**
 * Post by Id method, finds post by an ID and assigns it to req.post object, or returns 400 http code with a json error
 */
exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("posted_by", "_id name") //needed to communicate with User model, that holds (user) _id and name
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({ error: err });
      }
      req.post = post;
      next(); //we continue on the next middleware
    });
};

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
 * Create Post function currently, queries and selections to/from db are made here with standart MongoDB methods, json response is being returned
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

/**
 * Is Poster method, checks if req.post and req.auth exist and that the ID of the User that posted that specific post matches with the User ID currently authorized
 */
exports.isPoster = (req, res, next) => {
  let is_valid_poster =
    req.post && req.auth && req.post.posted_by._id == req.auth._id;
  if (!is_valid_poster) {
    return res.status(403).json({ error: "User is not authorized" });
  }
  next(); // going to the next middleware
};

/**
 * Update Post function that edits the post inside the req.post with lodash.extend method,
 * date of update gets persisted in the DB and updated post is returned in the response
 */
exports.updatePost = (req, res, next) => {
  let post = req.post;
  post = _.extend(post, req.body); //lodash changes the post object with the added info from the request body
  post.updated_at = Date.now(); //date of update gets logged to be saved in the DB below
  post.save((err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(post);
  });
};

/**
 * Delete Post method, gets a post from req.body object, removes it and returns a json success message
 */
exports.deletePost = (req, res) => {
  let post = req.post;
  post.remove((err, post) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json({ message: "Post was deleted" });
  });
};
