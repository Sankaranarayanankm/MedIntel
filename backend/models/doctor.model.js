import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "doctor" },
    image: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    doctorEmail: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: { type: String, required: true, select: false },
    availability: {    
      type: String,
      enum: ["available", "unavailable"],      
      default: "available",
    },
    qualification: { type: String, required: true },
    rating: { type: Number, required: true },
    successRate: { type: Number, required: true },
    about: { type: String, required: true },
    scheduleSlots: { type: [String], required: true },
    fee: { type: Number, required: true },
  },
  { timestamps: true },
);
const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
