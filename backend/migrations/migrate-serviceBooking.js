import mongoose from "mongoose";
import dotenv from "dotenv";
import ServiceBooking from "../models/serviceBooking.model.js";
dotenv.config({ path: "/backend/.env" });

const migrateServiceBooking = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    await ServiceBooking.updateMany(
      {},
      {
        $set: {
          paymentMethod: "online",
        },
      },
    );
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
