const Post = require("../models/post");

/**
 * currently, queries and selections to/from db are made here with standart MongoDB methods, json response is being returned
 */

exports.getPost = (req, res) => {
  const posts = Post.find()
    .select("_id title body")
    .then((post) => {
      res.json({ posts: post }); //default 200 http code
    })
    .catch((err) => console.log(err));
};

/**
 * currently, queries and selections to/from db are made here with standart MongoDB methods, json response is being returned
 */
exports.createPost = (req, res) => {
  const post = new Post(req.body);
  //console.log(req.body);
  post.save().then((result) => {
    res.json({
      post: result,
    });
  });
};
