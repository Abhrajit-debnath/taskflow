const express = require("express");
const {
  authMiddleware,
  roleMiddleware,
} = require("../../middleware/auth.middleware");
const getTasksByAdmin = require("../../controllers/admin/getTasks.controller");
const getUsersByAdmin = require("../../controllers/admin/getUsers.controller");
// Creating router instance

const router = express.Router();

// admin routes

/**
 * @swagger
 * /api/v1/admin/tasks:
 *   get:
 *     tags: [Admin]
 *     summary: Get all tasks (admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access forbidden
 */
router.get("/tasks", authMiddleware, roleMiddleware("admin"), getTasksByAdmin);

/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     tags: [Admin]
 *     summary: Get all users (admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access forbidden
 */
router.get("/users", authMiddleware, roleMiddleware("admin"), getUsersByAdmin);

module.exports = router;
