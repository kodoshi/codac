const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authController = require("../controllers/auth");

/**
 * routes getting 'filtered' through middlewares
 */

router.get("/users", userController.allUsers);
router.get(
  "/user/:userId",
  authController.requireSignin,
  userController.getUser
);
router.put(
  "/user/:userId",
  authController.requireSignin,
  userController.updateUser
);
router.delete(
  "/user/:userId",
  authController.requireSignin,
  userController.deleteUser
);

router.param("userId", userController.userById); //userById() with be executed in routes that have :userId

module.exports = router;
