const Task = require("../../models/task.model");
const logger = require("../../utils/logger");

async function createTask(req, res, next) {
 
  try {
    
    const { title, description, status, priority } = req.body;
    
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      user: req.user._id 
    });

    logger.info(`Task created by user: ${req.user._id}`);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: { task }
    });

  } catch (error) {
    next(error);
  }
}

module.exports = createTask;