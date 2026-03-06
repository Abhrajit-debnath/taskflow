const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const { decodeToken } = require("../utils/token");

// Auth Middleware

async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(new AppError("Not Authorized", 401));
    }

    const decodedToken = decodeToken(token);
    req.user = await User.findById(decodeToken.id).select("-password");
    next();
  } catch (error) {
    next(new AppError("Not authorized, invalid token", 401));
  }
}

// Role Middleware

function rolemiddleware(...role) {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(new AppError("Access forbidden", 403));
    }
  };
  next();
}

module.exports = {
  rolemiddleware,
  authMiddleware,
};
