const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const validator = require("../validation/helper");

/**
 * routes getting 'filtered' through middlewares
 */
router.get("/", postController.getPost);
router.post(
  "/post/new/:userId",
  authController.requireSignin,
  postController.createPost,
  validator.createPostValidator //needs to run at the end so formidable package doesnt throw "Insert Title" error
);
router.get(
  "/post/by/:userId",
  //authController.requireSignin,  //maybe we dont need auth for this?
  postController.postsByUser
);

router.param("userId", userController.userById); //userById() with be executed in routes that have :userId

module.exports = router;
