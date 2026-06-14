import mongoose from "mongoose";

const serviceBookingSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ["online", "cash"],
    },
    timeSlot: {
      type: String,
      required: true,
    },
    adminCancel: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    fee: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const ServiceBooking = mongoose.model("ServiceBooking", serviceBookingSchema);

export default ServiceBooking;
