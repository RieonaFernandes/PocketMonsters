const { ERROR_TYPES } = require("../utils/constants");

class AppError extends Error {
  constructor(type, message, additionalData = {}) {
    super(message);
    this.statusCode = ERROR_TYPES[type] || 500; // Defaults to 500 if type is not found
    this.details = { message, ...additionalData };
  }
}

// Helper functions for throwing errors
const BAD_REQUEST = (message, additionalData) =>
  new AppError("BAD_REQUEST", message, additionalData);

const NOT_FOUND = (message, additionalData) =>
  new AppError("NOT_FOUND", message, additionalData);

const SERVER_ERROR = (message, additionalData) =>
  new AppError("SERVER_ERROR", message, additionalData);

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
};
