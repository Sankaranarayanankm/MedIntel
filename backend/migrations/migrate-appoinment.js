// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import Appoinment from "../models/appoinments.model.js";
// // import Appoinment from '../models/appoinments.model'
// import Doctor from "../models/doctor.model.js";

// dotenv.config({ path: "./backend/.env" });

// console.log(process.env.MONGO_URI);
// const migrateAppoinment = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     const appoinments = await Appoinment.find();
//     for (const appoinment of appoinments) {
//       const doctor = await Doctor.findById(appoinment.doctor);
//       appoinment.fee = doctor.fee;
//       await appoinment.save();
//     }
//     await mongoose.connection.close();
//     process.exit(0);
//   } catch (error) {
//     console.log(error.message);
//     process.exit(1);
//   }
// };
// migrateAppoinment();
