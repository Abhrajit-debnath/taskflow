const express = require("express");
const registerUser = require("../../controllers/auth/register.controller");
const { registerValidator, handelValidation } = require("../../validators/auth.validator");

// Creating router instance

const router = express.Router();

// routes

router.post("/register", registerValidator, handelValidation, registerUser);

module.exports = router;
