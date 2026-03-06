const Task = require("../../models/task.model");
const logger = require("../../utils/logger");

async function getTasksByAdmin(req, res, next) {
  try {
    const tasks = await Task.find({}).populate("user", "name email");

    logger.info(`Admin fetched all tasks`);

    res.status(200).json({
      success: true,
      message: "All tasks fetched successfully",
      data: { tasks }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getTasksByAdmin;