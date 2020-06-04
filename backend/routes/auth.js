const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const validator = require("../validation/helper");

/**
 * routes getting 'filtered' through middlewares
 */

router.post("/signup", validator.userSignupValidator, authController.signup);

module.exports = router;
