const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();

// User Signup POST Route
router.post("/signup", UserController.createUser);

// User Login POST Route
router.post("/login", UserController.loginUser);

module.exports = router;
