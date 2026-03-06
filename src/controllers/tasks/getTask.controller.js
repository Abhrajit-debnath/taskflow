const Task = require("../../models/task.model");
const logger = require("../../utils/logger");

async function getTasks(req, res, next) {
  try {
    const { _id } = req.user;

    const tasks = await Task.find({
     user:_id
    });

    logger.info(`Task found: ${tasks}`);

    res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      data: { tasks },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getTasks;
