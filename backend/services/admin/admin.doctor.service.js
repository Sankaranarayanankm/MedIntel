import Doctor from "../../models/doctor.model.js";
import bcrypt from "bcrypt";
import CustomError from "../../utls/customError.js";
import cloudinary from "../../utls/cloudinary.js";
import Appoinment from "../../models/appoinments.model.js";
import Patient from "../../models/patient.model.js";

export const getAllDoctorService = async () => {
  const [doctors, appoinments] = await Promise.all([
    Doctor.find().lean(),
    Appoinment.find().lean(),
  ]);
  const updatedDoctors = doctors.map((doc) => {
    let totalAppoinments = 0;
    let completedAppoinments = 0;
    let cancelledAppoinments = 0;
    let revenue = 0;
    for (let appoinment of appoinments) {
      if (appoinment.doctor.toString() !== doc._id.toString()) continue;
      totalAppoinments++;
      if (appoinment.status == "completed") {
        completedAppoinments++;
        revenue += appoinment.fee;
      }
      if (appoinment.adminCancel || appoinment.status == "cancelled") {
        cancelledAppoinments++;
      }
    }
    return {
      ...doc,
      totalAppoinments,
      completedAppoinments,
      cancelledAppoinments,
      revenue,
    };
  });

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
  const [totalPatients, totalDoctors, appoinments] = await Promise.all([
    Patient.countDocuments(),
    Doctor.countDocuments(),
    Appoinment.find().lean(),
  ]);
  let totalRevenue = 0;
  let totalCompletedAppoinments = 0;
  let totalCancelledAppoinments = 0;
  for (let appoinment of appoinments) {
    if (appoinment.status == "completed") {
      totalRevenue += appoinment.fee;
      totalCompletedAppoinments++;
    } else if (appoinment.status == "cancelled") {
      totalCancelledAppoinments++;
    }
  }
  // const totalPatients = await Patient.countDocuments();
  // const totalDoctors = await Doctor.countDocuments();
  // const appoinments = await Appoinment.find().lean();
  // const totalAppoinments = appoinments.length;

  // const totalRevenue = appoinments.reduce((acc, item) => {
  //   return item.status === "completed" ? acc + item.fee : acc;
  // }, 0);

  // const totalCancelledAppoinments = appoinments.filter(
  //   (appoinment) => appoinment.status === "cancelled",
  // ).length;
  // const totalCompletedAppoinments = appoinments.filter(
  //   (appoinment) => appoinment.status === "completed",
  // ).length;
  const dataObj = {
    totalDoctors,
    totalAppoinments: appoinments.length,
    totalRevenue,
    totalCancelledAppoinments,
    totalCompletedAppoinments,
    totalPatients,
  };
  return dataObj;
};
