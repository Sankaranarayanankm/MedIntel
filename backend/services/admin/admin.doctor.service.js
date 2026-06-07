import Doctor from "../../models/doctor.model.js";
import bcrypt from "bcrypt";
import CustomError from "../../utls/customError.js";
import cloudinary from "../../utls/cloudinary.js";
import Appoinment from "../../models/appoinments.model.js";
import Patient from "../../models/patient.model.js";

export const getAllDoctorService = async () => {
  const doctors = await Doctor.find().lean();

  const updatedDoctors = await Promise.all(
    doctors.map(async (doc) => {
      const appoinemnts = await Appoinment.find({ doctor: doc._id });
      const completedAppoinments = appoinments.filter(
        (appoin) => appoin.status === "completed",
      ).length;
      const cancelledAppoinments = appoinments.filter(
        (appoin) => appoin.status === "cancelled" || appoin.adminCancel == true,
      ).length;
      const totalAppoinments = appoinments.length;
      let revenue = doc.fee * totalAppoinments;

      return {
        ...doc,
        revenue,
        totalAppoinments,
        completedAppoinments,
        cancelledAppoinments,
      };
    }),
  );

  return updatedDoctors;
};
export const addDoctorService = async ({
  name,
  image,
  specialization,
  experience,
  doctorEmail,
  password,
  qualification,
  rating,
  successRate,
  about,
  scheduleSlots,
  fee,
}) => {
  if (
    !name ||
    !image ||
    !specialization ||
    !experience ||
    !doctorEmail ||
    !password ||
    !qualification ||
    !rating ||
    !successRate ||
    !about ||
    !scheduleSlots ||
    !fee
  ) {
    throw new CustomError("all fields are mandatory", 400);
  }
  const existingDoctor = await Doctor.findOne({ doctorEmail });
  if (existingDoctor) {
    throw new CustomError("doctor already exists", 400);
  }
  if (!Array.isArray(scheduleSlots)) {
    throw new CustomError("schedule slotes should be an array", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // adding image to cloudinary
  const cloudinaryImage = await cloudinary.uploader.upload(image);
  const doctor = await Doctor.create({
    name,
    image: cloudinaryImage.url,
    specialization,
    experience,
    doctorEmail,
    password: hashedPassword,
    qualification,
    rating,
    successRate,
    about,
    scheduleSlots,
    fee,
  });
  return doctor;
};
export const deleteDoctorService = async (doctorId) => {
  const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
  if (!deletedDoctor) {
    throw new CustomError("doctor not found", 404);
  }
  return deletedDoctor;
};

export const adminDashboardService = async () => {
  const totalPatients = await Patient.countDocuments();
  const totalDoctors = await Doctor.countDocuments();
  const appoinments = await Appoinment.find().lean();
  const totalAppoinments = appoinments.length;
  const totalRevenue = appoinments.reduce((acc, item) => {
    return item.status === "completed" ? acc + item.fee : acc;
  }, 0);

  const totalCancelledAppoinments = appoinments.filter(
    (appoinment) => appoinment.status === "cancelled",
  ).length;
  const totalCompletedAppoinments = appoinments.filter(
    (appoinment) => appoinment.status === "completed",
  ).length;
  const dataObj = {
    totalDoctors,
    totalAppoinments,
    totalRevenue,
    totalCancelledAppoinments,
    totalCompletedAppoinments,
    totalPatients,
  };
  return dataObj;
};
