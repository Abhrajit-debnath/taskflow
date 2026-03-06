const express = require("express");
const { authMiddleware, roleMiddleware } = require("../../middleware/auth.middleware");

// Creating router instance

const router = express.Router();

// admin routes

router.get("/tasks", authMiddleware, roleMiddleware, getTasksByAdmin);
router.get("/users", authMiddleware, roleMiddleware, getUsersByAdmin);

module.exports = router;
