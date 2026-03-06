const express = require("express");
const { authMiddleware, roleMiddleware } = require("../../middleware/auth.middleware");
const getTasksByAdmin = require("../../controllers/admin/getTasks.controller");
const getUsersByAdmin = require("../../controllers/admin/getUsers.controller");
// Creating router instance

const router = express.Router();

// admin routes

router.get("/tasks", authMiddleware, roleMiddleware, getTasksByAdmin);
router.get("/users", authMiddleware, roleMiddleware, getUsersByAdmin);

module.exports = router;
