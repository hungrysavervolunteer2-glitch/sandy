const { body, param, query, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

const validateProject = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Project name must be between 3 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('startDate')
    .isISO8601()
    .withMessage('Start date must be a valid ISO date'),
  body('endDate')
    .isISO8601()
    .withMessage('End date must be a valid ISO date')
    .custom((endDate, { req }) => {
      if (new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  body('budget')
    .isFloat({ min: 0 })
    .withMessage('Budget must be a positive number'),
  handleValidationErrors
];

const validateApplication = [
  body('projectId')
    .trim()
    .notEmpty()
    .withMessage('Project ID is required'),
  handleValidationErrors
];

const validateRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  handleValidationErrors
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

const validateProjectId = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Project ID is required'),
  handleValidationErrors
];

const validateApplicationId = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Application ID is required'),
  handleValidationErrors
];

module.exports = {
  validateProject,
  validateApplication,
  validateRegistration,
  validateLogin,
  validateProjectId,
  validateApplicationId,
  handleValidationErrors
};