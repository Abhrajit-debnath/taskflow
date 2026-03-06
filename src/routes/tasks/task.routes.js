const express = require("express");
const {
  taskValidator,
  handelValidation,
} = require("../../validators/task.validator");
const createTask = require("../../controllers/tasks/createTask.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");
const getTasks = require("../../controllers/tasks/getTask.controller");

// Creating router instance

const router = express.Router();

// routes

router.post(
  "/",
  authMiddleware,
  taskValidator,
  handelValidation,
  createTask,
);
router.get("/",authMiddleware,getTasks)

module.exports = router;
