const jwt = require("jsonwebtoken");

// Generate token helper

function generateAccessToken(id, role) {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
}

function decodeToken(token) {
  return jwt.verify(token,process.env.JWT_SECRET);
}

module.exports = { generateAccessToken,decodeToken };