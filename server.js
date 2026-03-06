// Dotenv importing

const dotenv = require("dotenv");

// Injecting dotenv at top for to fetch the value before creating server

dotenv.config();

// Requiring Logger for logs

const logger = require("./src/utils/logger");
const morgan = require("morgan");
const express = require("express");
const connectDB = require("./src/config/database");
const authRoutes = require("./src/routes/auth/auth.routes");
const errorHandler = require("./src/middleware/error.middleware");

const PORT = process.env.PORT || 8000;

// Creating express instance

const app = express();

// Connect to db

connectDB();

// Middlewares

// Middleware to read body

app.use(express.json());

app.use(morgan("dev"));

// Auth Routes

app.use("/api/v1/auth", authRoutes);

// Middleware to handel error

app.use(errorHandler);

// Listening to server

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
