// Custom Error class
export default class ApplicationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  if (err instanceof ApplicationError) {
    return res
      .status(err.statusCode)
      .send({ success: false, message: err.message });
  }
  next();
};
