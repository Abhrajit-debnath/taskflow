const User = require("../../models/user.model");
const logger = require("../../utils/logger");

async function getUsersByAdmin(req, res, next) {
  try {
    const users = await User.find({}).select("-password");

    logger.info(`Admin fetched all users`);

    res.status(200).json({
      success: true,
      message: "All Users fetched successfully",
      data: { users },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getUsersByAdmin;
