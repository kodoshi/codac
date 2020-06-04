const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const validator = require("../validation/helper");


/**
 * routes getting 'filtered' through middlewares
 */
router.get("/", postController.getPost);
router.post("/post", validator.createPostValidator, postController.createPost);

module.exports = router;
