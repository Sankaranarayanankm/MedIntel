import mongoose from "mongoose";

const appoinmentsSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    timeSlot: { type: String, required: true },
    reason: { type: String, required: true },
    adminCancel: { type: Boolean, default: false },
    paymentMethod: {
      type: String,
      enum: ["online", "cash"],
    },
    cancelReason: { type: String },
    fee: { type: Number, required: true },
  },
  { timestamps: true },
);

const Appoinment = mongoose.model("Appoinment", appoinmentsSchema);

export default Appoinment;
