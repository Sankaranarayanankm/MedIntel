import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    role: { type: String, default: "admin" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true },
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
         