import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    availability: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    about: { type: String, required: true },
    instructions: { type: [String], required: true },
    scheduleSlots: { type: [String], required: true },
  },
  { timestamps: true },
);

const Service = mongoose.model("Service", servicesSchema);

export default Service;
