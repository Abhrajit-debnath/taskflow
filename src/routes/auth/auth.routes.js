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

// creating swagger doc with swagger jsDocs

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Abhrajit
 *               email:
 *                 type: string
 *                 example: abhrajit@gmail.com
 *               password:
 *                 type: string
 *                 example: Test1234!
 *     responses:
 *       201:
 *         description: User registered successfully
 *       422:
 *         description: Validation error
 *       409:
 *         description: Email already exists
 */

router.post("/register", registerValidator, handelValidation, registerUser);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login and get JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Abhrajit
 *               email:
 *                 type: string
 *                 example: abhrajit@gmail.com
 *               password:
 *                 type: string
 *                 example: Test1234!
 *     responses:
 *       200:
 *         description: Login successful, return JWT token
 *       401:
 *         description: Invalid credentials
 *       422:
 *         description: validation error
 */
router.post("/login", loginValidator, handelValidation, loginUser);

module.exports = router;
