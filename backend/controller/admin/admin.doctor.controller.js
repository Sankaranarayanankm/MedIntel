import Appoinment from "../../models/appoinments.model.js";
import Doctor from "../../models/doctor.model.js";
import {
  addDoctorService,
  adminDashboardService,
  deleteDoctorService,
  getAllDoctorService,
} from "../../services/admin/admin.doctor.service.js";

export const getAllDoctorsController = async (req, res, next) => {
  try {
    const doctors = await getAllDoctorService();
    res.status(200).json({ success: true, data: doctors });
  } catch (err) {
    next(err);
  }
};

export const addDoctorsController = async (req, res, next) => {
  try {
    const {
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
    } = req.body;

    const doctor = await addDoctorService({
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
    });
    res
      .status(201)
      .json({ success: true, message: "Doctor created", id: doctor._id });
  } catch (err) {
    next(err);
  }
};

export const deleteDoctorController = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const deletedDoctor = await deleteDoctorService(doctorId);
    res.status(200).json({ success: true, message: "doctor deleted " });
  } catch (err) {
    next(err);
  }
};

export const adminDashboardController = async (req, res, next) => {
  try {
    const dashboardData = await adminDashboardService();
    return res.status(200).json({ success: true, data: dashboardData });
  } catch (error) {
    next(error);
  }
};
