const Post = require("../models/post");

exports.getPost = (req, res) => {
  const posts = Post.find()
    .select("_id title body")
    .then((post) => {
      res.json({ posts: post }); //default 200 http code
    })
    .catch((err) => console.log(err));
};

exports.createPost = (req, res) => {
  const post = new Post(req.body);
  //console.log(req.body);
  post.save().then((result) => {
    res.json({
      post: result,
    });
  });
};
