import Appoinment from "../models/appoinments.model.js";
import Doctor from "../models/doctor.model.js";
import CustomError from "../utls/customError.js";

export const getAllDoctorAppointmentService = async (doctorId) => {
  const doctorAppoinments = await Appoinment.find({
    doctor: doctorId,
  }).lean();
  return doctorAppoinments;
};
export const updateDoctorAppointmentService = async (
  status,
  doctorId,
  appoinmentId,
) => {
  if (!status) {
    throw new CustomError("status field missing", 400);
  }
  const appoinment = await Appoinment.findOne({
    _id: appoinmentId,
    doctor: doctorId,
  });

  if (!appoinment) {
    throw new CustomError("appointment not found", 404);
  }
  if (appoinment.adminCancel) {
    throw new CustomError("appoinment cancelled by admin");
  }
  if (appoinment.status !== "pending" && appoinment.status !== "confirmed") {
    throw new CustomError("appoinment has already taken", 400);
  }
  await Appoinment.findByIdAndUpdate(
    appoinmentId,
    { status },
    { returnDocument: "after", runValidators: true },
  );
};
export const getDoctorDetailsService = async (doctorId) => {
  const doctor = await Doctor.findById(doctorId).lean();
  const doctorAppointments = await Appoinment.find({ doctor: doctorId }).lean();

  if (!doctor) {
    throw new CustomError("doctor not found", 404);
  }
  const totalEarnings = doctorAppointments
    .filter((appointment) => appointment.status === "completed")
    .reduce((sum, appointment) => sum + appointment.fee, 0);
  const completed = doctorAppointments.filter(
    (appointment) => appointment.status == "completed",
  ).length;
  const cancelled = doctorAppointments.filter(
    (appointment) => appointment.status == "cancelled",
  ).length;
  return { ...doctor.toObject(), totalEarnings, completed, cancelled };
};
export const editDoctorDetailsService = async (doctorId, data) => {
  const doctor = await Doctor.findByIdAndUpdate(doctorId, data, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!doctor) {
    throw new CustomError("doctor not found", 404);
  }
  return doctor;
};
