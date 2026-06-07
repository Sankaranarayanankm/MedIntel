export const errorMiddleware = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  const message = error.message || "internal servier error";
  return res.status(error.statusCode).json({
    success: false,
    message,
  });
};
