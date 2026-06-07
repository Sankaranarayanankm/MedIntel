// import mongoose from "mongoose";
// import dotevn from "dotenv";
// import Service from "../models/services.model.js";
// import ServiceBooking from "../models/serviceBooking.model.js";

// dotevn.config({ path: "./backend/.env" });

// const migrateService = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     const services = await ServiceBooking.find().select("+service");
//     for (let booking of services) {
//       const service = await Service.findById(booking.service);
//       // console.log(booking);
//       console.log(service.price);
//       booking.fee = service.price;
//       await booking.save();
//     }
//     await mongoose.connection.close();
//     process.exit(0);
//   } catch (error) {
//     console.log(error.message);
//     process.exit(1);
//   }
// };

// migrateService();
