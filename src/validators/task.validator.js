const { body, validationResult } = require("express-validator");

const taskValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("status")
    .optional()
    .isIn(["todo", "in-progress", "completed"])
    .withMessage("Invalid status"),
  body("priority")
    .optional()
    .isIn(["medium", "low", "high"])
    .withMessage("Invalid status"),
];


const handelValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

module.exports = {
  taskValidator,
  handelValidation,
};
