const AppError = require("../../utils/AppError");
const User = require("../../models/user.model");
const logger = require("../../utils/logger");
const { generateAccessToken } = require("../../utils/token");

async function loginUser(req, res, next) {
  const { email, password } = req.body;
  try {
    // checking user has registered or not
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Comparing password

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Generating token

    const token = generateAccessToken(user._id, user.role);

    logger.info(`User logged in: ${email}`);

    // Returning response

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { token },
    });
  } catch (error) {
    next(new AppError(error.msg, 500));
  }
}

module.exports = loginUser;
