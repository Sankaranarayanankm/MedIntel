import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from "../models/doctor.model.js";

dotenv.config({ path: "./backend/.env" });
const migrateDoctor = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const doctor = await Doctor.updateMany(
      {},
      {
        $set: {
          location: "Kerala",
          patients: "23k",
        },
      },
    );

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

migrateDoctor();
