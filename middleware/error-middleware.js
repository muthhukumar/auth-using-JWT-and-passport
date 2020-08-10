module.exports.routeNotFound = (req, res, next) => {
  return next(new Error(`Route ${req.originalUrl} not found`));
};

module.exports.errorHandler = (err, req, res, next) => {
  res.status(500);
  res.send({
    error: err,
    stack: process.env.NODE_ENV === "DEVELOPMENT" ? err.stack : null,
  });
};
