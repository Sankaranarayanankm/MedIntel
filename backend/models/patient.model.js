import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "patient" },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
  },
  { timestamps: true },    
);

const Patient = mongoose.model("Patient", patientSchema);   
   
export default Patient;


