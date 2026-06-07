import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./backend/.env" });

export const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("db connected");
};
