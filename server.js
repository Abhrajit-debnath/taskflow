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
const taskRoutes = require("./src/routes/tasks/task.routes");
const adminRoutes = require("./src/routes/admin/admin.routes");
const errorHandler = require("./src/middleware/error.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");



const PORT = process.env.PORT || 8000;

// Creating express instance

const app = express();

// Connect to db

connectDB();

// Middlewares

// Middleware to read body

app.use(express.json());

app.use(morgan("dev"));

// Auth Route

app.use("/api/v1/auth", authRoutes);

// Task Route

app.use("/api/v1/task", taskRoutes);

app.use("/api/v1/admin", adminRoutes);

// Middleware to handel error

app.use(errorHandler);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Listening to server

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
