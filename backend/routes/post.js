const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const validator = require("../validation/helper");

router.get("/", postController.getPost);
router.post("/post", validator.createPostValidator, postController.createPost);

module.exports = router;
