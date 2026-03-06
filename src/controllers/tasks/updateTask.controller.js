
const Task = require("../../models/task.model");
const AppError = require("../../utils/AppError");
const logger = require("../../utils/logger");

// Update task controller

async function updateTask(req, res, next) {
  const { id } = req.params;
  const { title, description, status, priority } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, description, status, priority },
      { returnDocument: "after", runValidators: true },
    );

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    logger.info(`Task updated: ${id}`);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: { task },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = updateTask;
