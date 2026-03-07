const express = require("express");
const {
  taskValidator,
  handelValidation,
} = require("../../validators/task.validator");
const createTask = require("../../controllers/tasks/createTask.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");
const getTasks = require("../../controllers/tasks/getTask.controller");
const updateTask = require("../../controllers/tasks/updateTask.controller");
const deleteTask = require("../../controllers/tasks/deleteTask.controller");

const router = express.Router();

/**
 * @swagger
 * /api/v1/task:
 *   post:
 *     tags: [Tasks]
 *     summary: Create a new task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: task1
 *               description:
 *                 type: string
 *                 example: Buy a cake
 *               status:
 *                 type: string
 *                 enum: [todo, in-progress, completed]
 *                 example: todo
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: medium
 *     responses:
 *       201:
 *         description: Task created successfully
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Validation error
 *   get:
 *     tags: [Tasks]
 *     summary: Get all tasks for logged in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *       401:
 *         description: Unauthorized
 */

router.post("/", authMiddleware, taskValidator, handelValidation, createTask);
router.get("/", authMiddleware, getTasks);

/**
 * @swagger
 * /api/v1/task/{id}:
 *   put:
 *     tags: [Tasks]
 *     summary: Update a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [todo, in-progress, completed]
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *   delete:
 *     tags: [Tasks]
 *     summary: Delete a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */

router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;