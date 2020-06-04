const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const validator = require("../validation/helper");

/**
 * routes getting 'filtered' through middlewares
 */

router.post("/signup", validator.userSignupValidator, authController.signup);
router.post("/signin", authController.signin);
router.get("/signout", authController.signout);

module.exports = router;
