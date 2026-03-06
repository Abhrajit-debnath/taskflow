// Dotenv importing

const dotenv = require("dotenv");

// Injecting dotenv at top for to fetch the value before creating server

dotenv.config();

// Requiring Logger for logs

const logger = require("./src/utils/logger");
const express = require("express");
const connectDB = require("./src/config/database");

const PORT = process.env.PORT || 8000;

// Creating express instance

const app = express();

// Connect to db

connectDB();

// Listening to server

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
