class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = this.statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
