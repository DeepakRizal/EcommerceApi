const ErrorHandler = require("./../utils/errorHandler");
const errorHandler = require("./../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  //Wrong Mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found.Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Moongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  //wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid try again`;
    err = new ErrorHandler(message, 400);
  }

  //jwt expire error
  if (err.name === "tokenExpiredError") {
    const message = `Json web token has expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
