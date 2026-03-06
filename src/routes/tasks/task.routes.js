const express = require("express");
const {
  taskValidator,
  handelValidation,
} = require("../../validators/task.validator");
const createTask = require("../../controllers/tasks/createTask.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");

// Creating router instance

const router = express.Router();

// routes

router.post(
  "/create",
  authMiddleware,
  taskValidator,
  handelValidation,
  createTask,
);

module.exports = router;
