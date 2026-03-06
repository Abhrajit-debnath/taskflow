const Task = require("../../models/task.model");
const AppError = require("../../utils/AppError");
const logger = require("../../utils/logger");

async function deleteTask(req, res, next) {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    logger.info(`Task deleted: ${id}`);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = deleteTask;
