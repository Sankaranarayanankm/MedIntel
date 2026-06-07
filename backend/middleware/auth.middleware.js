import jwt from "jsonwebtoken";
import CustomError from "../utls/customError.js";

export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new CustomError("Invalid or expired token", 401);
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // if token is null the jwt.verify throw error so check if we need to throw error manually since its in try catch block
    if (!decoded) {
      throw new CustomError("invalid token", 401);
    }

    req.user = decoded;

    next();
  } catch (err) {
    next(err);
    // res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const err = new CustomError("you are not allowed to visit this", 403);
      next(err);
    }
    next();
  };
};
