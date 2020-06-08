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
  "/post",
  authController.requireSignin,
  validator.createPostValidator,
  postController.createPost
);

router.param("userId", userController.userById); //userById() with be executed in routes that have :userId

module.exports = router;
