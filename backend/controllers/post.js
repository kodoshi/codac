const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

/**
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
 * @param {*} next allows the method to go to the next middleware
 * @param {string} id holds individual _id of user
 * Post by Id method, finds post by an ID and assigns it to req.post object, or returns 400 http code with a json error
 */
exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("posted_by", "_id name") //needed to communicate with User model, that holds (user) _id and name
    .populate("comments.posted_by", "_id name")
    .populate("posted_by", "_id name role")
    .select("_id title body created_at likes comments photo")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({ error: err });
      }
      req.post = post;
      next();
    });
};

/**
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
 * Get Post function currently, queries and selections to/from db are made here with standart MongoDB methods, json response is being returned
 */
exports.getPosts = (req, res) => {
  const posts = Post.find()
    .populate("posted_by", "_id name") //lets you reference documents in other collections, in out case the User model
    .populate("comments", "text created_at")
    .populate("comments.posted_by", "_id name")
    .select("_id title body created_at likes")
    .sort({ created_at: -1 })
    .then((posts) => {
      res.json(posts); //default 200 http code
    })
    .catch((err) => console.log(err));
};

/**
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
 * @param {*} next allows the method to go to the next middleware
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
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
 * Posts by User function currently, queries and selections to/from db are made here with standart MongoDB methods, json response is being returned
 */
exports.postsByUser = (req, res) => {
  Post.find({ posted_by: req.profile._id })
    .populate("posted_by", "_id name") //populate needs to be used because "_id name" is getting pulled from User model, not Post model
    .select("_id title body created_at likes")
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
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
 * @param {*} next allows the method to go to the next middleware
 * Is Poster method, checks if req.post and req.auth exist and that the ID of the User that posted that specific post matches with the User ID currently authorized
 */
exports.isPoster = (req, res, next) => {
  let sameUser = req.post && req.auth && req.post.posted_by._id == req.auth._id;
  let adminUser = req.post && req.auth && req.auth.role === "admin";

  if (!(sameUser || adminUser)) {
    return res.status(403).json({ error: "User is not authorized" });
  }
  next();
};

/**
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
 * @param {*} next allows the method to go to the next middleware
 * Update Post function that edits the post inside the req.post with lodash.extend method,
 * date of update gets persisted in the DB and updated post is returned in the response
 */
exports.updatePost = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ 
        error: "Picture upload failed" });
    }

    // save post
    let post = req.post;
    post = _.extend(post, fields); //lodash changes the post object with the added info from the request body
    post.updated_at = Date.now(); //date of update gets logged to be saved in the DB below

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }

    post.save((err) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.json(post);
    });
  });
};

/**
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
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

/**
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
 * @param {*} next allows the method to go to the next middleware
 * Photo method, sets the response’s HTTP header field to the extention that the picture has
 * (eg: .png . jpeg  etc...), and sends the data of the file itself in the response
 */
exports.photo = (req, res, next) => {
  res.set("Content-Type", req.post.photo.contentType);
  return res.send(req.post.photo.data);
};

/**
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
 * Single Post method, returns a single post in json format
 */
exports.singlePost = (req, res) => {
  return res.json(req.post);
};

/**
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
 * Like method, userId that likes a post gets added to that posts 'likes' column in the DB
 */
exports.like = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId, //comes from frontend
    {
      $push: { likes: req.body.userId },
    },
    { new: true } //needed for mongoose so it returns updated resource
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      res.json(result);
    }
  });
};

/**
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
 * Unlike method, userId that unlikes a post gets removed from that posts 'likes' column in the DB
 */
exports.unlike = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId, //comes from frontend
    {
      $pull: { likes: req.body.userId },
    },
    { new: true } //needed for mongoose so it returns updated resource
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      res.json(result);
    }
  });
};

/**
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
 * Comment method, takes from frontend request, checks/operates on DB and returns results in json
 */
exports.comment = (req, res) => {
  let comment = req.body.comment;
  comment.posted_by = req.body.userId; //userId comes from frontend

  Post.findByIdAndUpdate(
    req.body.postId, //comes from frontend
    {
      $push: { comments: comment },
    },
    { new: true } //needed for mongoose so it returns updated resource
  )
    .populate("comments.posted_by", "_id name")
    .populate("posted_by", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      } else {
        res.json(result);
      }
    });
};

/**
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
 * Uncomment method, takes from frontend request, checks/operates on DB and returns results in json
 */
exports.uncomment = (req, res) => {
  let comment = req.body.comment;

  Post.findByIdAndUpdate(
    req.body.postId, //comes from frontend
    {
      $pull: { comments: { _id: comment._id } },
    },
    { new: true } //needed for mongoose so it returns updated resource
  )
    .populate("comments.posted_by", "_id name")
    .populate("posted_by", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      } else {
        res.json(result);
      }
    });
};

/**
 * @param {*} req HTTP request from express
 * @param {*} res HTTP response from express
 * Update Comment method, takes from frontend request, checks/operates on DB and returns results in json
 */
exports.updateComment = (req, res) => {
  let comment = req.body.comment;

  Post.findByIdAndUpdate(req.body.postId, {
    $pull: { comments: { _id: comment._id } },
  }).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      Post.findByIdAndUpdate(
        req.body.postId,
        { $push: { comments: comment, updated: new Date() } },
        { new: true }
      )
        .populate("comments.posted_by", "_id name")
        .populate("posted_by", "_id name")
        .exec((err, result) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          } else {
            res.json(result);
          }
        });
    }
  });
};
