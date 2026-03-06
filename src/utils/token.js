const jwt = require("jsonwebtoken");

// Generating token

function generateAccessToken(id, role) {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
}

module.exports = { generateAccessToken };