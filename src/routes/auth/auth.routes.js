const express = require("express");
const registerUser = require("../../controllers/auth/register.controller");
const {
  registerValidator,
  handelValidation,
  loginValidator,
} = require("../../validators/auth.validator");
const loginUser = require("../../controllers/auth/login.controller");

// Creating router instance

const router = express.Router();

// routes

router.post("/register", registerValidator, handelValidation, registerUser);
router.post("/login", loginValidator, handelValidation, loginUser);

module.exports = router;
