
const AppError = require("../../utils/AppError")
const User = require("../../models/user.model");
const logger = require("../../utils/logger");

async function registerUser(req, res, next) {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError("Email already exists", 409));
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    logger.info(`New user registered: ${email}`);

    //  Returning response

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = registerUser;
