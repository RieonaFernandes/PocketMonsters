const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      code: statusCode,
      details: err.details || { message: "Something went wrong" }, // if err.details does not have data
    },
  });
};

module.exports = { errorHandler };
